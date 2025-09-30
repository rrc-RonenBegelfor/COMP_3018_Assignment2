import { branches, Branch} from "../../../data/branches";

export const getAllBranches = async (): Promise<Branch[]> => {
    return structuredClone(branches);
};

export const createBranch = async (branchData: {
    name: string;
    address: string;
    phone: string;
}): Promise<Branch> => {
    const uniqueId: number = Math.max(0, ...branches.map(b => b.id)) + 1;

    const newEmployee: Branch = {
        id: uniqueId,
        name: branchData.name,
        address: branchData.address,
        phone: branchData.phone,
    };

    branches.push(newEmployee);

    return structuredClone(newEmployee);
};

export const getBranchById = async (id: number): Promise<Branch | undefined> => {
    return branches.find(b => b.id === id);
};

export const updateBranch = async (
    id: number,
    branchData: Pick<Branch, "name" | "address" | "phone">,
): Promise<Branch> => {
    const index: number = branches.findIndex((b: Branch) => b.id === id);

    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    branches[index] = {
        ...branches[index],
        ...branchData,
    };

    return structuredClone(branches[index]);
};

export const deleteBranch = async (id: number): Promise<void> => {
    const index: number = branches.findIndex((b: Branch) => b.id === id);

    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    branches.splice(index, 1);
};