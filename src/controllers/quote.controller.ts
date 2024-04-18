import { NextFunction, Request, Response } from "express"
import * as QuoteService from '../services/quote.service'
import HttpStatusCodes from "http-status-codes"


export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log((req as any).user)
        // const userId = (req as any).user.userId;
        const data = await QuoteService.getAll()
        res.json(data)
    } catch (error) {
        next(error)
    }
}


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try{
    console.log(req.body, ' is request body')
    const quotes = await QuoteService.create(req.body, (req as any).user.userId)
  res.status(HttpStatusCodes.CREATED).send(quotes)
} catch(error){
  next(error)
}
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try{
      const { id } = req.params
  const loggedInUserId = (req as any).user.userId;

  // @TODO: Handle errors
  const post = await QuoteService.updatequoteById(Number(id), req.body, loggedInUserId)

  res.status(HttpStatusCodes.CREATED).json(post)
  } catch(e) {
      next(e)
  }
}
// export const update = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId = Number(req.params.id); // Assuming you have middleware to extract user ID from the request
//     const quoteId = Number(req.params.id);
//     const { newText } = req.body;

//     await QuoteService.update(quoteId, userId, newText);
    
//     res.status(HttpStatusCodes.OK).send({ message: 'Quote updated successfully' });
//   } catch(error) {
//     next(error);
//   }
// }


// export const removebyId = async (req: Request, res: Response, next: NextFunction) => {
//   try{

//       const { id } = req.params
//       // @TODO: Handle errors
//       // const loggedInUserId = ( req as any ).user.userId
//       const data = await QuoteService.removeById(Number(id), (req as any ).user.userId)
//       res.status(HttpStatusCodes.NO_CONTENT).send()
  
//   } catch(error)  {
//       next(error)
//   }
// }

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.body.userId;

    await QuoteService.remove(Number(id), loggedInUserId);

    res.status(HttpStatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export const findOne =async (req: Request, res: Response, next: NextFunction) => {
  try {
      const  id  = Number(req.params.id);
      const quotes =  await QuoteService.findOne(id);

      res.status(HttpStatusCodes.ACCEPTED).send(quotes);
  } catch (error: any) {
    next(error);
  }
  }

export function removebyId(arg0: string, authenticateToken: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Response<any, Record<string, any>> | undefined, removebyId: any) {
    throw new Error('Function not implemented.')
}

