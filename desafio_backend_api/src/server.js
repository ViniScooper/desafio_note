import express from 'express';
import cors from 'cors';
import { router } from './routers/router.js';
import { orderRouter } from './routers/orderRouter.js';

export const app = express();

app.use(cors());
app.use(express.json());

// ─── Rotas existentes (usuários) ──────────────────────────────────────────────
app.use(router);

// ─── Rotas de Pedidos (PostgreSQL via Prisma) ─────────────────────────────────
app.use('/order', orderRouter);


/*

//-------------------------------------------------------------------------------------------------------------------------//

//rota get para buscar um usuario pelo id

//rota signUp para criar um usuario


app.post('/signup', async (req, res) => {
    

  try {  
   await prisma.user.create({
        data: {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            age: req.body.age
           
        }
        
    })
    return res.status(201).json(req.body) //retorna o status 201 que é de sucesso na criação e uma mensagem
    } catch (error) {
        console.error(error.message)
    }
    
})


//rota signIn para criar um usuario


app.post('/signin', async (req, res) => {
    

  try {  
    
   const user = await prisma.user.findFirst({
        where: {
            email: req.body.email,
            password: req.body.password
           
           
        }

        
        
    })

    if (!user) 
        return res.status(401).json("Email ou senha incorretos") //retorna


    return res.status(201).json("Logado com sucesso") //retorna o status 201 que é de sucesso na criação e uma mensagem
    } catch (error) {
        console.error(error.message)
    }
    
})



//criando o metodo put para atualizar o usuario



app.put('/usuarios/:id', async (req, res) => {
    console.log(req)
   
    
  try {  
   await prisma.user.update({
       
    where: {
        id:req.params.id //aqui estou passando o id do usuario que quero atualizar
    },
        //aqui estou passando os dados que quero atualizar
    data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age 
           
        }
        
    })
    return res.status(201).json(req.body) //retorna o status 201 que é de sucesso na criação e uma mensagem
    } catch (error) {
        console.error(error.message)
    }
 
})




//-------------------------------------------------------------------------------------------------------------------------//


//rota de delete


app.delete('/usuarios/:id', async (req, res) => {
    
   
    
  try {  
    await prisma.user.delete({
        
        where: {
            id:req.params.id //aqui estou passando o id do usuario que quero atualizar
        }
    
    })


    return res.status(200).json({mensage :"user deletado com sucesso "}) //retorna o status 201 que é de sucesso na criação e uma mensagem
    } catch (error) {
        console.error(error.message)
    }
 
})



//-------------------------------------------------------------------------------------------------------------------------//


//rota get para buscar todos os usuarios


app.get('/usuarios', async (req, res) => {
    const { age, name, email } = req.query;

    try {
        // Monta dinamicamente o objeto de filtro
        const where = {
            name: name , 
            age: age ? age : undefined,
            email: email ? email : undefined,
        };

        // Remove campos undefined
        Object.keys(where).forEach(key => where[key] === undefined && delete where[key]);

        const users = await prisma.user.findMany({
            where 

        });

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
})


*/

//-------------------------------------------------------------------------------------------------------------------------//




