import { prisma } from "../database/index.js";


export const signUpDB = async (email, password, name, age, username) => {

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
                name,
                username,        
                age
            }
        });
        return user; // Return the created user object
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Re-throw the error for handling in the controller
    } finally {
        await prisma.$disconnect();
    }
}


export const signInDB = async (email, username, password) => {    
    const whereCondition = email ? { email: email } : { username: username };
    
    try {
        const user = await prisma.user.findUnique({
            where: whereCondition,

        });
        
        if (!user) {
            throw new Error("User not found");
        }

        // Here you would typically compare the password with a hashed version stored in the database
        if (user.password !== password) {
            throw new Error("Invalid password");
        }

        return user; // Return the found user object
    } catch (error) {
        console.error("Error signing in user:", error);
        throw error.message; // Re-throw the error for handling in the controller
    } finally {
        await prisma.$disconnect();
    }
}





export const userUpdateDB = async (id, email, password, name, age, username) => {
  try {
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        email,
        password,
        name,
        age,
        username
      }
    });

    return user; // Retorna o usuário atualizado
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; // Repassa o erro para o controller
  } finally {
    await prisma.$disconnect();
  }
};










//rota de delete

export const userDeleteDb = async (id) => {
    try {
        const user = await prisma.user.delete({
            where: { id: id },
           
        });
        return user; // Return the updated user object
    } catch (error) {
        console.error("Error delete user:", error);
        throw error; // Re-throw the error for handling in the controller
    } finally {
        await prisma.$disconnect();
    }
}









export const getUserByIdDB = async (id) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user; // Return the found user object
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error; // Re-throw the error for handling in the controller
    } finally {
        await prisma.$disconnect();
    }
}






export const checkUserExists = async (email, username) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });
        return user !== null; // Return true if user exists, false otherwise
    } catch (error) {
        console.error("Error checking user existence:", error);
        throw error; // Re-throw the error for handling in the controller
    } finally {
        await prisma.$disconnect();
    }
}