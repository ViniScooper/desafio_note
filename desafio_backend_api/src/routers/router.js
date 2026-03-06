import { Router} from "express";
import { signIn, signUp, updateUser,deleteUser } from '../controllers/users.js'


export const router = Router()


//User

router.post('/signup', signUp )
router.post('/signin', signIn)
router.put('/userUpdate/:id', updateUser)
router.delete('/userDelete/:id' ,deleteUser)



