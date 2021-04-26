const Palette = require("../models/palette");
const User = require("../models/user");
const { verify } = require("jsonwebtoken");


const errorHandler = (err) => {
    return err.message;
}

module.exports.create = async (req, res) => {
    const token = req.cookies.jwt;
    const { palette } = req.body;
    try {
        const decodedToken = verify(token, process.env.JWT_SECRET);
        User.findOne({ _id: decodedToken.id }, (err, result) => {
            try {
                const newPalette = Palette.create({
                    user: result.name,
                    palette: palette
                })
                res.status(200).json({ palette: newPalette });
            }
            catch (err) {
                const error = errorHandler(err);
                res.status(400).json(error);
            }
        })
    } catch (err) {
        console.log("eee")
        //res.redirect(301, "/login");
    }
}

module.exports.findById = async (req, res) => {
    let id = req.body.id;

    try {
        const palette = await Palette.findById(id).exec();
        res.status(200).json(palette);
    } catch (err) {
        const error = errorHandler(err);
        res.status(400).json(error);
    }
}

module.exports.findByUser = async (req, res) => {
    const user = req.query.user;
    const token = req.cookies.jwt;
    //get a name of logged user
    if (token) {
        try {
            //if user name equals query user - redirect to /my-patterns
            const decodedToken = verify(token, process.env.JWT_SECRET);
            await User.findOne({ _id: decodedToken.id }, (err, result) => {
                if (err) {
                    res.status(400).end();
                }
                //if user specified in query equals logged user name, redirect to /my-patterns
                console.log(user, result.name)
                if (user && user === result.name) {
                    res.status(301).json({redirect: true, url: "/my-patterns"})
                } else if (user && user !== result.name) { //if user specified in a query is not equal to logged user name, 
                    //find palletes of user specified in the query
                    Palette.find({ user }, (err, palettes) => {
                        if (err) {
                            res.status(404).json({redirect: false, message: "not found" })
                        }
                        res.status(200).json({redirect: false, palettes });
                    })
                } else { //if there is no user parameter specified, get palettes of logged user
                    Palette.find({ user: result.name }, (err, palettes) => {
                        if (err) {
                            res.status(404).json({redirect: false, message: "not found" })
                        }
                        res.status(200).json({redirect: false, palettes });
                    })
                }
            })
        } catch (err) {
            console.log(err.message)
            errorHandler(err);
        }
    }else{
        Palette.find({ user: user }, (err, palettes) => {
            if (err) {
                res.status(404).json({redirect: false, message: "not found" })
            }
            res.status(200).json({redirect: false, palettes });
        })
    }
}

module.exports.findCreatedByUser = async (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        try{
            const decodedToken = verify(token, process.env.JWT_SECRET);
            await User.findOne({_id: decodedToken.id}, (err, user)=>{
                Palette.find({user: user.name}, (err, palettes)=>{
                    if(err){
                        res.status(400).json({message: "Somathing went wrong!"});
                    }
                    res.status(200).json({palettes});
                })
            })
            
        }catch(err){
            res.status(500).json({message: "Something went wrong!"});
        }
    }
}

module.exports.findLikedByUser = async (req, res) => {
    const token = req.cookies.jwt;
    try{
        const decodedToken = verify(token, process.env.JWT_SECRET);
        await User.findOne({ _id: decodedToken.id }, (err, result) => {
            if(err){
                res.status(400).end();
            }
            try{
                Palette.find({_id: {$in: result.likedPalettes}}, (err, palettes)=>{
                    if(err){
                        console.log(err)
                    }
                    res.status(200).json({redirect: false, palettes})
                })
            }catch(err){
                console.log(err)
            }
        })
    }
    catch(err){
        res.status(301).json({redirect: true, url: "/login"});
    }
}

module.exports.findAll = async (req, res) => {
    Palette.find({}, (err, palletes) => {
        if (err) {
            const error = errorHandler(err);
            res.status(400).json(error);
        }
        res.status(200).json(palletes);
    })
}

module.exports.findLatest = async (req, res) => {
    let limit = parseInt(req.query.more) + 4;

    Palette.find({}, {}, { sort: { "created_at": -1 }, limit: limit }, (err, result) => {
        if (err) {
            res.status(404).json({ message: "resource not found" });
        }
        res.status(200).json({ message: "found", resource: result });
    })
}

module.exports.findMostPopular = async (req, res) => {
    let limit = parseInt(req.query.more) + 4;
    Palette.find({}, {}, { sort: { likes: -1 }, limit: limit }, (err, result) => {
        if (err) {
            res.status(404).json({ message: "resource not found" });
        }
        res.status(200).json({ message: "found", resource: result });
    })
}

module.exports.incrementLikes = async (req, res) => {
    const { id } = req.body;
    Palette.updateOne({ _id: id }, { $inc: { likes: 1 } }, (err, result) => {
        if (err) {
            res.status(400).json({ message: "cant update doc" });
        }
        res.status(200).json({ message: "Document updated" });
    });

}

module.exports.decrementLikes = async (req, res) => {
    const { id } = req.body;
    Palette.updateOne({ _id: id }, { $inc: { likes: -1 } }, (err, result) => {
        if (err) {
            res.status(400).json({ message: "cant update doc" })
        }
        res.status(200).json({ message: "Document updated" })
    })
}