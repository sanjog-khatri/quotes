
import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom"
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { z } from "zod";
import { createUserDtoBody } from "../validators/create-user.validator";
const prisma = new PrismaClient()
 
    export const createUser = async (user: z.infer<typeof createUserDtoBody>) => {
      try {
      const { username, email, password} = user
       return await prisma.user.create({
  
        data : {
          username,
          email ,
          password: await bcrypt.hash(user.password as string, 10) ,
        
        }
      })
    } catch (error: any){
          console.log(error);
          if (error.code == "P2002") {
              throw Boom.conflict('Email must be unique')
          }   else {
            throw(error)
          }
    }
  }

      // await bcrypt.hash(user.passsword as string, 10)
//   } catch (error: any){
//     console.log(error);
//     if (error.code == "P2002") {
//         throw Boom.conflict('Email must be unique')
//     }   else {
//       throw(error)
//     }
//   }
// }
    
export async function login( email: string, password: string) {
  const user = await prisma.user.findFirstOrThrow({ where: { email } })

  // const users = await prisma.user.findFirstOrThrow({ where: { username} })

  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
      // Password does not match
      // If you want to throw a http error, you can. This is throw internal server error
      throw Error('Password not correct')
  }

  // Generate a token
  const token = jwt.sign(
      { userId: user.id },
      'random-secret',
      {
          expiresIn: '1h',
      }
  )

  // Return the token to the client
  return { success: true, token }
}




export const remove = async (userId: any) =>{
  try{
      return  await prisma.user.delete({where: {id:userId}})

  }catch(error:any){


  console.log(error)
  if(error.code === 'P2003'){
  throw Boom.notFound("you have todos here")
}else{
throw error
}
}
}


  