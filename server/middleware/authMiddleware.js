const { verify } = require("jsonwebtoken")


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        try{
            const decodedToken = verify(token, "project secret") //not quite good to keep secret that way
            next()                                               //better keep it in .env file
        }catch(err){                                             //install dotenv, create .env file and store it there
            res.redirect("/login");
        }
    }
    else {
        res.redirect("/login");
    }
}



module.exports = { requireAuth };