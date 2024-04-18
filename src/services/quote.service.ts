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
   

// async function update(quoteId: number, userId: number, newText: string): Promise<void> {
//   // Check if the quote with the given ID exists and is associated with the specified user
//   const quote = await prisma.quote.findUnique({
//     where: { id: quoteId },
//     select: { userId: true },
//   });

//   if (!quote) {
//     throw new Error("Quote not found");
//   }

//   if (quote.userId !== userId) {
//     throw new Error("You are not authorized to update this quote");
//   }

//   // If the quote belongs to the user, update its text
//   await prisma.quote.update({
//     where: { id: quoteId },
//     data: { text: newText },
//   });
// }

// export { update };
export const updatequoteById = async (id: number, quote: any, loggedInUserId: number) => 
  {
  const quoteToUpdate = await prisma.quote.findFirstOrThrow( {
    where: {
      id
    }})
  if(quoteToUpdate.userId != loggedInUserId) {
      throw Boom.forbidden('You cannnot do this')
  }
  return await prisma.quote.update({
      where: { id: Number(id) },
      data: {
          text: quote.text,
          author: quote.author
      },
  })
}

  
//   export const removebyId = async (id: Number, loggedInUserId: number) => {
//     try{
//         const quote = await prisma.quote.delete({
//             where: {
//                 id: Number(id),
//             },
//         })
//         if(quote.userId !== loggedInUserId){
//             throw Boom.forbidden("This ain't your quote")
//         }
//         return await prisma.quote.delete({
//             where: {
//                 id: Number(id),
//             },
//         })
//     } catch(error: any) {
//         console.log('something terrible is happing', error)
//     }
// }

export const remove = async (id: number, loggedInUserId: number) => {
  try {
      const quote = await prisma.quote.findUnique({
          where: {
              id: Number(id),
          },
          select: {
              userId: true,
          },
      });

      if (!quote) {
          throw Boom.notFound("Quote not found");
      }

      if (quote.userId !== loggedInUserId) {
          throw Boom.forbidden("This ain't your quote");
      }

      return await prisma.quote.delete({
          where: {
              id: Number(id),
          },
      });
  } catch (error: any) {
      console.log('Something terrible is happening', error);
      throw error; // Re-throw the error to propagate it further
  }
};


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
export function isQuoteOwner(userId: any, quoteId: number) {
    throw new Error('Function not implemented.')
}

