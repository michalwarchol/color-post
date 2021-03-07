const { verify } = require("jsonwebtoken")


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decodedToken = verify(token, process.env.JWT_SECRET);
            next();
        } catch (err) {
            res.redirect(301, "/login");
        }
    }
    else {
        res.redirect(301, "/login");
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.redirect(301, "/login");
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.redirect(301, "/login")
    }
}



module.exports = { requireAuth, checkUser };