import express from 'express'
import QuoteRouter from './routes/quote.route'
import userRouter from './routes/user.route'
// import cors from 'cors'
// import compression from 'compression'
import { genericErrorHandler } from './middlewares/errors.middleware'
const PORT = 3333
const app = express()

app.use(express.json())

// app.use(cors({
//   origin: 'http://localhost:3001',
//   optionsSuccessStatus: 200 
// }
// ))
app.use('/quotes', QuoteRouter)
app.use('/users', userRouter)



// app.use(compression())

app.listen(PORT, () => {
    
  console.log('Running on port', PORT);
})

app.use(genericErrorHandler)

export default app;