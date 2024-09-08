import  prisma  from "../../prisma/client";

export const createCategory = async (name: string, userId: string) => {
    try {
        return await prisma.tasksList.create({
            data: {
              name,
              userId,
            },
          });
    } catch (error) {
        console.error("Error creating category", error);
        throw new Error("Failed to create category");
    }
};

export const getCategories = async (userId: string) => {
    try {
        return await prisma.tasksList.findMany({
            where: {userId}
        });
    } catch (error) {
        console.error("Error fetching categories", error);
        throw new Error("Failed to fetch categories");
    }
}

export const deleteCategory = async (id: string) => {
    try {
        return await prisma.tasksList.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Error deleting category", error);
        throw new Error("Failed to delete category");
    }
}