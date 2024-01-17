const express = require("express");
const bodyParser = require("body-parser");

const App = express();
const PORT = 3000 
const adminRouter = require("./Routes/admin");
const userRouter =require("./Routes/user");

App.use(bodyParser.json());
App.use("/admin",adminRouter);
App.use("/user",userRouter)


App.get("/",(req,res)=>{
    res.send("<h1><center>Courses API")
})



App.listen(PORT,()=>{
    console.log(`Server is live at port ${PORT}`)
})

