const { Admin } = require("../dB");

function AdminMiddleware(req,res,next) {

    const username  = req.headers.username;
    const password  = req.headers.password;

    Admin.findOne({
        username:username,
        password:password
    }).then((val)=>{
        if(val){
            next();
        }
        else{
            res.status(403).json({
                msg:`Admin ${username} doesn't exist`
            })
        }
    })
    
}

module.exports = AdminMiddleware;