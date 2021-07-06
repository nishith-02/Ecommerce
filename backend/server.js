import express from 'express'
import mongoose from 'mongoose'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'

const app=express()
mongoose.connect('mongodb+srv://ecommerce:ecommerce123@cluster0.qccee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get('/',(req,res)=>{
    res.send('Server is ready')
})


app.use('/api/users',userRouter)
app.use('/api/products',productRouter)

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log('Serve at port 5000')
})