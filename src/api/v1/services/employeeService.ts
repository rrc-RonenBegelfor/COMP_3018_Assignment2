import { employees, Employee} from "../../../data/employees";

/**
 * Gets all employees.
 * 
 * @returns A promise that resolves to an array of Employee objects.
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return structuredClone(employees);
};

/**
 * Creates a new employee with the provided details.
 * 
 * @param employeeData - An object containing the details of the employee to be created.
 * @returns A promise that resolves to the newly created Employee object.
 */
export const createEmployee = async (employeeData: {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: number;
}): Promise<Employee> => {
    const uniqueId: number = Math.max(0, ...employees.map(b => b.id)) + 1;

    const newEmployee: Employee = {
        id: uniqueId,
        name: employeeData.name,
        position: employeeData.position,
        department: employeeData.department,
        email: employeeData.phone,
        phone: employeeData.phone,
        branchId: employeeData.branchId,
    };

    employees.push(newEmployee);

    return structuredClone(newEmployee);
};

/**
 * Gets an employee by its ID.
 * 
 * @param id - The ID of the employee to retrieve.
 * @returns A promise that resolves to the Employee object if found, otherwise undefined.
 */
export const getEmployeeById = async (id: number): Promise<Employee | undefined> => {
    return employees.find(e => e.id === id);
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
    id: number,
    employeeData: Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId">,
): Promise<Employee> => {
    const index: number = employees.findIndex((e: Employee) => e.id === id);

    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    employees[index] = {
        ...employees[index],
        ...employeeData,
    };

    return structuredClone(employees[index]);
};

/**
 * Deletes an employee by its ID.
 * 
 * @param id - The ID of the employee to delete
 * @returns - A promise that resolves when the employee is deleted
 * @throws - An error if the employee with the specified ID is not found
 */
export const deleteEmployee = async (id: number): Promise<void> => {
    const index: number = employees.findIndex((e: Employee) => e.id === id);

    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    employees.splice(index, 1);
};

/**
 * Gets all employees for a specific branch ID.
 * 
 * @param branchId - The ID of the branch to retrieve employees for
 * @returns A promise that resolves to an array of Employee objects associated with the specified branch ID.
 */
export const getAllEmployeesForBranch = async (branchId: number): Promise<Employee[]> => {
    return employees.filter(e => e.branchId === branchId);
};

/**
 * Gets all employees for a specific department.
 * 
 * @param department - The department to filter employees by
 * @returns A promise that resolves to an array of Employee objects associated with the specified department.
 */
export const getAllEmployeesForDepartment = async (department: string): Promise<Employee[]> => {
    return employees.filter(e => e.department.toLowerCase() === department.toLowerCase());
}