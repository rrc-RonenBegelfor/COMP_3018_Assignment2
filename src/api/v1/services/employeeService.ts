import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Employee } from "../models/employeeModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const collection: string = "employees";

/**
 * Gets all employees.
 * 
 * @returns A promise that resolves to an array of Employee objects.
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
            const snapshot: QuerySnapshot = await getDocuments(collection);
            const employees: Employee[] = snapshot.docs.map((doc) => {
                const data: DocumentData = doc.data();
                return {
                    id: doc.id,
                    ...data,
                } as Employee;
            });
    
            return employees;
        } catch (error: unknown) {
            throw error;
        }
};

/**
 * Creates a new employee with the provided details.
 * 
 * @param employeeData - An object containing the details of the employee to be created.
 * @returns A promise that resolves to the newly created Employee object.
 * 
 * Added functionality that helps create a unique ID number using mapping.
 */
export const createEmployee = async (employeeData: {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: number;
}): Promise<Employee> => {
    try {
            const newEmployee: Partial<Employee> = {
                ...employeeData,
            };
    
            const employeeId: string = await createDocument<Employee>(collection, newEmployee);
    
            return structuredClone({ id: employeeId, ...newEmployee} as Employee);
        } catch (error: unknown) {
            throw error;
        }
};

/**
 * Gets an employee by its ID.
 * 
 * @param id - The ID of the employee to retrieve.
 * @returns A promise that resolves to the Employee object if found, otherwise undefined.
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    try {
        const doc: DocumentSnapshot | null = await getDocumentById(
            collection,
            id
        );

        if (!doc) {
            throw new Error(`Employee with ID ${id} not found`);
        }

        const data: DocumentData | undefined = doc.data();
        const employee: Employee = {
            id: doc.id,
            ...data,
        } as Employee;

        return structuredClone(employee);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Updates an employee by its ID with the provided details.
 * 
 * @param id - The ID of the employee to update
 * @param employeeData - The data to update the employee with
 * @returns - The updated Employee object
 * @throws - An error if the employee with the specified ID is not found
 */
export const updateEmployee = async (
    id: string,
    employeeData: Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId">,
): Promise<Employee> => {
    try {
        const employee: Employee = await getEmployeeById(id);

        if (!employee) {
            throw new Error(`Employee with ${id} not found`);
        }

        const updateEmployee: Employee = {
            ...employee,
        };

        if (employeeData.name !== undefined) {
            updateEmployee.name = employeeData.name;
        }
        if (employeeData.position !== undefined) {
            updateEmployee.position = employeeData.position;
        }
        if (employeeData.department !== undefined) {
            updateEmployee.department = employeeData.department;
        }
        if (employeeData.email !== undefined) {
            updateEmployee.email = employeeData.email;
        }
        if (employeeData.phone !== undefined) {
            updateEmployee.phone = employeeData.phone;
        }
        if (employeeData.branchId !== undefined) {
            updateEmployee.branchId = employeeData.branchId;
        }

        await updateDocument<Employee>(collection, id, updateEmployee);

        return structuredClone(updateEmployee);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Deletes an employee by its ID.
 * 
 * @param id - The ID of the employee to delete
 * @returns - A promise that resolves when the employee is deleted
 * @throws - An error if the employee with the specified ID is not found
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    try {
        const employee: Employee = await getEmployeeById(id);

        if (!employee) {
            throw new Error(`Employee with ${id} not found`);
        }

        await deleteDocument(collection, id);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Gets all employees for a specific branch ID.
 * 
 * @param branchId - The ID of the branch to retrieve employees for
 * @returns A promise that resolves to an array of Employee objects associated with the specified branch ID.
 */
export const getAllEmployeesForBranch = async (branchId: number): Promise<Employee[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(collection);
        const employees: Employee[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Employee;
        });

        const filteredEmployees = employees.filter((e) => e.branchId === branchId);

        return filteredEmployees;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Gets all employees for a specific department.
 * 
 * @param department - The department to filter employees by
 * @returns A promise that resolves to an array of Employee objects associated with the specified department.
 */
export const getAllEmployeesForDepartment = async (department: string): Promise<Employee[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(collection);
        const employees: Employee[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Employee;
        });

        const filteredEmployees = employees.filter((e) => e.department.toLowerCase() === department.toLowerCase());

        return filteredEmployees;
    } catch (error: unknown) {
        throw error;
    }
}