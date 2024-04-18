/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express'
// import { getAll } from '../controllers/todo.controller'
import * as QuoteController from '../controllers/quote.controller'
import { validate } from '../utils/validate'
// import { isQuoteOwner } from '../middlewares/authentication.middleware';
import { authenticateToken } from '../middlewares/authentication.middleware'
import { createQuoteDto,  updateQuoteDto } from '../validators/create-quote.validator'
const route = express.Router()



route.get('/', QuoteController.getAll)

route.get('/:id', authenticateToken, QuoteController.findOne)

route.post('/', validate( createQuoteDto), authenticateToken, QuoteController.create)

// route.delete('/:id', isQuoteOwner, QuoteController.remove);

// route.patch('/:id', validate(updateQuoteDto), isQuoteOwner, QuoteController.update);

route.delete('/:id',  authenticateToken, QuoteController.remove)

route.patch('/:id',validate(updateQuoteDto), authenticateToken, QuoteController.update)


export default route;