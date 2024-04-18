/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import * as QuoteService from '../services/quote.service';
import  HttpStatusCodes  from 'http-status-codes';

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Extract the token from the request headers
    const token =
        req.headers.authorization && req.headers.authorization.split(' ')[1]

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: 'Missing authentication token' })
    }


    try {
        // Verify and decode the token
        const decodedToken = jwt.verify(token, 'random-secret')
        console.log('but not here right?')
        // Attach the decoded token to the request object
        // @ts-ignore
        req.user = decodedToken

        next() // Proceed to the next middleware or route handler
    } catch (error) {
        return res
            .status(403)
            .json({ success: false, message: 'Invalid authentication token' })
    }
}

// export async function isQuoteOwner(req: Request, res: Response, next: NextFunction) {
//     try {
//         const userId = req.user.id;
//         const quoteId = Number(req.params.id);

//         const isOwner = await QuoteService.isQuoteOwner(userId, quoteId);

//         if (isOwner) {
//             next();
//         } else {
//             return res.status(HttpStatusCodes.FORBIDDEN).json({
//                 success: false,
//                 message: 'Unauthorized: You are not allowed to modify this quote',
//             });
//         }
//     } catch (error) {
//         next(error);
//     }
// }