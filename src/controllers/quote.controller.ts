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
  try {
  const quotes: any = req.body
  const id = Number(req.params.id)
  const quote = await QuoteService.update(id, quotes)
  res.status(HttpStatusCodes.OK).send(quote);
  } catch(error) {
    next(error)
  }
}


export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
  // @TODO: Handle errors
  const quotes = await QuoteService.remove(Number(id))
  res.status(HttpStatusCodes.NO_CONTENT).send()
}catch(error){
  next(error)
}
}


export const findOne =async (req: Request, res: Response, next: NextFunction) => {
  try {
      const  id  = Number(req.params.id);
      const quotes =  await QuoteService.findOne(id);

      res.status(HttpStatusCodes.ACCEPTED).send(quotes);
  } catch (error: any) {
    next(error);
  }
  }

