import express from 'express'
import mongoose from 'mongoose'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import orderRouter from './routers/OrderRouter.js'
import dotenv from 'dotenv'
dotenv.config()
const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get('/',(req,res)=>{
    res.send('Server is ready')
})

app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/order',orderRouter)


app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log('Serve at port 5000')
})