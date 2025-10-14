import { branches} from "../../../data/branches";
import { Branch } from "../models/branchModel";

/**
 * Gets all branches.
 * 
 * @returns A promise that resolves to an array of Branch objects.
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    return structuredClone(branches);
};

/**
 * Creates a new branch with the provided details.
 * 
 * @param branchData - An object containing the details of the branch to be created.
 * @returns A promise that resolves to the newly created Branch object.
 * 
 * Added functionality that helps create a unique ID number using mapping.
 */
export const createBranch = async (branchData: {
    name: string;
    address: string;
    phone: string;
}): Promise<Branch> => {
    const existingIds: Set<number> = new Set(branches.map(b => b.id));
    
    let uniqueId: number = 1;
    
    while(existingIds.has(uniqueId)) {
        uniqueId++;
    }

    const newEmployee: Branch = {
        id: uniqueId,
        name: branchData.name,
        address: branchData.address,
        phone: branchData.phone,
    };

    branches.push(newEmployee);

    return structuredClone(newEmployee);
};

/**
 * Gets a branch by its ID.
 * 
 * @param id - The ID of the branch to retrieve.
 * @returns A promise that resolves to the Branch object if found, otherwise undefined.
 */
export const getBranchById = async (id: number): Promise<Branch | undefined> => {
    return branches.find(b => b.id === id);
};

/**
 * Updates a branch by its ID with the provided details.
 * 
 * @param id - The ID of the branch to update
 * @param branchData - The data to update the branch with
 * @returns - The updated Branch object
 * @throws - An error if the branch with the specified ID is not found
 */
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

/**
 * Deletes a branch by its ID.
 * 
 * @param id - The ID of the branch to delete
 * @returns - A promise that resolves when the branch is deleted
 * @throws - An error if the branch with the specified ID is not found
 */
export const deleteBranch = async (id: number): Promise<void> => {
    const index: number = branches.findIndex((b: Branch) => b.id === id);

    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    branches.splice(index, 1);
};