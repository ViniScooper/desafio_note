import { checkUserExists, getUserByIdDB, signInDB, signUpDB, userUpdateDB,userDeleteDb } from '../repository/users.js';



export const signUp = async (req, res) => {
    const { email, password, username, age, name } = req.body
    if (!email || !password || !username || !age || !name) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    try {
        const  check = await checkUserExists(email, username);
        if (check) return res.status(403).json({ error: 'User already exists' });

        const result = await signUpDB(email,password,name, age, username);

        return res.status(201).json({ message: 'User signed up successfully' });

    } catch(error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}





export const signIn = async (req, res) => {
    const { email, username, password } = req.body;
    if ((!email && !username) || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    let result;
    try {
        result = await signInDB(email, username, password);

        if (!result) {
            // Senha inválida OU usuário não existe
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Sucesso!
        return res.status(200).json({
            token: "fake-jwt-token",
            user: {
                id: result.id,
                name: result.name,
                email: result.email,
                username: result.username
            }
        });
    } catch (error) {
        console.error("Erro no signInDB:", error);
        return res.status(500).json({ error: 'Internal Server Error senha incorreta' });
    }
};








export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, name, age, username } = req.body;

    if (!email || !password || !name || !age || !username) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await userUpdateDB(Number(id), email, password, name, age, username);
        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};









export const deleteUser = async (req,res) =>{
    const {id} = req.params;

    try{
        await userDeleteDb(Number(id));
        return res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}











export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await getUserByIdDB(parseInt(id));

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


