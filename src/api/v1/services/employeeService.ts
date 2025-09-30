import { employees, Employee} from "../../../data/employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
    return structuredClone(employees);
};

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

export const getEmployeeById = async (id: number): Promise<Employee | undefined> => {
    return employees.find(e => e.id === id);
};

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

export const deleteEmployee = async (id: number): Promise<void> => {
    const index: number = employees.findIndex((e: Employee) => e.id === id);

    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    employees.splice(index, 1);
};

export const getAllEmployeesForBranch = async (branchId: number): Promise<Employee[]> => {
    return employees.filter(e => e.branchId === branchId);
};