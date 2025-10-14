import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Branch } from "../models/branchModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const collection: string = "branches";

/**
 * Gets all branches.
 * 
 * @returns A promise that resolves to an array of Branch objects.
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(collection);
        const branches: Branch[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Branch;
        });

        return branches;
    } catch (error: unknown) {
        throw error;
    }
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
    try {
        const newBranch: Partial<Branch> = {
            ...branchData,
        };

        const branchId: string = await createDocument<Branch>(collection, newBranch);

        return structuredClone({ id: branchId, ...newBranch} as Branch);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Gets a branch by its ID.
 * 
 * @param id - The ID of the branch to retrieve.
 * @returns A promise that resolves to the Branch object if found, otherwise undefined.
 */
export const getBranchById = async (id: string): Promise<Branch> => {
    try {
        const doc: DocumentSnapshot | null = await getDocumentById(
            collection,
            id
        );

        if (!doc) {
            throw new Error(`Branch with ID ${id} not found`);
        }

        const data: DocumentData | undefined = doc.data();
        const branch: Branch = {
            id: doc.id,
            ...data,
        } as Branch;

        return structuredClone(branch);
    } catch (error: unknown) {
        throw error;
    }
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
    id: string,
    branchData: Pick<Branch, "name" | "address" | "phone">,
): Promise<Branch> => {
    try {
        const branch: Branch = await getBranchById(id);

        if (!branch) {
            throw new Error(`Branch with ${id} not found`);
        }

        const updateBranch: Branch = {
            ...branch,
        };

        if (branchData.name !== undefined) {
            updateBranch.name = branchData.name;
        }
        if (branchData.address !== undefined) {
            updateBranch.address = branchData.address;
        }
        if (branchData.phone !== undefined) {
            updateBranch.phone = branchData.phone;
        }

        await updateDocument<Branch>(collection, id, updateBranch);

        return structuredClone(updateBranch);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Deletes a branch by its ID.
 * 
 * @param id - The ID of the branch to delete
 * @returns - A promise that resolves when the branch is deleted
 * @throws - An error if the branch with the specified ID is not found
 */
export const deleteBranch = async (id: string): Promise<void> => {
    try {
        const branch: Branch = await getBranchById(id);

        if (!branch) {
            throw new Error(`Branch with ${id} not found`);
        }

        await deleteDocument(collection, id);
    } catch (error: unknown) {
        throw error;
    }
};