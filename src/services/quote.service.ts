import { PrismaClient } from "@prisma/client"
import  Boom from "@hapi/boom"

const prisma = new PrismaClient()

export const getAll = async () => {
  try { 
    
  return await prisma.quote.findMany( )
    }
    // return await prisma.quote.findMany()
    
  catch (error: any) {
    
    console.log( error );

    if ( error.code === 'P2025') {
        throw Boom.notFound(' nothing to show my dear ')
    } else {
      throw (error)
    }
  }
}
  
  
  
  
  export const create = async (body: any, userId: number) => {
    // const { title } = body
    try {
      return await prisma.quote.create({

      data: {

        text: body.text,
        author: body.author,
        userId:userId,
        
      }
    })
    // return 'create garne api'
  } catch( error: any) {
    console.log(error);

    if ( error.code === 'P2003') {
      throw Boom.notFound('cannot be created')
    } else {
      throw(error)
    }
  }
}
   
  export const update = async (id: number, body: any) => {
     try {

      return await prisma.quote.update({
        data:{
          text: body.text,
          author: body.author
        },
        where:{
            id: Number(id)
        }
      })
      
  }catch(error: any) {
    console.log( error )
    if ( error.code === 'P2025') {
      
      throw Boom.notFound('Nothing to change my dear')
     } else {
      throw(error)
     }
     
   } 
  }

  
  export const remove = async (id: Number) => {
 try{
  
    return await prisma.quote.delete({
        where: {
            id: Number(id),
        },
    })
} catch(error: any){
  if ( error.code === 'P2025') {
      
    throw Boom.notFound('Nothing to delete my dear')
   } else {
    throw(error)
   }
}
  }

//   // ( id: number ) => {
//   //   try {
//   //    await prisma.quote.delete ({ where: { id: id  } })
     
//   //    return 'remove garne api'
    
//   //  } catch (error: any){
//   //    console.log( error );
 
//   //    if ( error.code === 'P2025') {
//   //      throw Boom.notFound(' Nothing to delete my dear')
//   //    } else {
//   //      throw(error)
//   //    }
//   //  } 
//   //  }



  export const findOne = async ( id: number ) => {
    try {
     return await prisma.quote.findFirstOrThrow ({ where: { 
      id: id 
    }, 
  })
   } catch (error: any){

     console.log( error )

     if ( error.code === 'P2025') {
      
      throw Boom.notFound('Nothing posted my dear')
     } else {
      throw(error)
     }
     
   } 
   }

   