const express=require("express")
const app=express();
const mongoose=require('mongoose');
const router=require("./Routes/routes")
const cors=require('cors')
const bodyParsser=require('body-parser');


app.use(cors());
app.use(bodyParsser.json());
mongoose.connect('mongodb://localhost:27017/UserDB');
mongoose.connection.once('open',()=>{
    console.log('connected to the DB');
}).on('error',(err)=>{
    console.log(err);
})
app.use('/',router)


app.listen(5050,()=>{
    console.log("hete is the porst at 5050")
})