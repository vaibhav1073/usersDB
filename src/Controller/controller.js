const userModel=require('../Models/userModel');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

async function GetAllUsers(req,res){
    try{const users= await userModel.find({}); 
    res.status(200).send(users);}
    catch(err){
        console.log(err);
    }
    //res.send("hwllo world");
}

async function PostUser(req,res){
    try {
        const user = new userModel(req.body);
        const password=user.password;
        const hashed=await bcrypt.hash(password,8).then(hash=>{user.password=hash})
        
        const data = await user.save();
        res.status(200).send(data);
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server Error" });
      }
    
}
async function CheckUser(req,res){
    try{
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email});
        if(user){
          const passConfirm=await bcrypt.compare(password,user.password)
          const userResponse = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            isAdmin: user.isAdmin,
            cart:user.cart
          };
          if (passConfirm) {
            const token=jwt.sign({email:userResponse.email},"This is my secret Kye")
            
            res.status(200).send({token,userResponse});
          } else {
            console.log("Invalid email or password");
            res.status(401).json({ msg: "Invalid email or password" });
          }
        }
        else{
          res.status(401).json({msg:"invalid password or email"})
        }
    
        
    }
    catch(err){
        console.log(err);
    }
    // res.send("hwllo world")
    // try{
    //     const user=userMode.find({email:req.body.})
    // }
}

async function sendUserDetailsFromJWT(req,res){
  const header =req.headers["authorization"];
  const token=header && header.split(" ")[1];
  console.log(token)
  if(!token){
    return res.status(401).json({msg:"unauthenticated"});
  }
  else{
    jwt.verify(token,"This is my secret Kye",(err,data)=>{
      if(err)return res.status(403).json(err.message)
      else{
        const email=data.email;
        userModel.findOne({email:email}).then((data)=>{
          res.status(200).json(data);
        }).catch((err)=>{
          res.status(500).json(err.message);
        })
      }
    })
  }




}

module.exports={GetAllUsers,PostUser,CheckUser,sendUserDetailsFromJWT};