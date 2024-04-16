import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";
import HttpStatusCodes from "http-status-codes";

// export const getAll = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const activeStatus = req.query.active
//     const users = await UserService.getAll(Boolean(activeStatus))
//   } catch (error) {
//     next (error)
//   }
//   }

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = req.body;
    console.log(req.body, " is request body");
    const users = await UserService.createUser(user);
    res.status(HttpStatusCodes.CREATED).send(users);
  } catch (error: any) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password }: { email: string; password: string } =
            req.body
        const { token } = await UserService.login( email, password)
        res.json(token)
    } catch (error) {
        next(error)
    }
  }

  export const remove = async  (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id)
    console.log(userId, ' request params ko id yo ho hai')
    try {
    const user = await UserService.remove(userId)
    res.status(HttpStatusCodes.NO_CONTENT).send()
  }catch(err){
    next(err)
  }
  }