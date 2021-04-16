const Palette = require("../models/palette");


const errorHandler = (err) => {
    return err.message;
}

module.exports.create = async (req, res) => {
    const {user, palette} = req.body;
    try{
        const newPalette = await Palette.create({
            user: user,
            palette: palette
        })
        res.status(200).json({palette: newPalette});
    }
    catch(err){
        const error = errorHandler(err);
        res.status(400).json(error);
    }
}

module.exports.findById = async (req, res) => {
    let id = req.body.id;

    try{
        const palette = await Palette.findById(id).exec();
        res.status(200).json(palette);
    }catch(err){
        const error = errorHandler(err);
        res.status(400).json(error);
    }
}

module.exports.findByUser = async (req, res) => {
    const user = req.query.user;
    Palette.find({user}, (err, palettes)=>{
        if(err){
            res.status(404).json({message: "not found"})
        }
        res.status(200).json({palettes})
    })
}

module.exports.findAll = async (req, res) => {
    Palette.find({}, (err, palletes)=>{
        if(err){
            const error = errorHandler(err);
            res.status(400).json(error);
        }
        res.status(200).json(palletes);
    })
}

module.exports.findLatest = async (req, res) => {
    let limit = parseInt(req.query.more)+4;

    Palette.find({}, {}, {sort: {"created_at": 1}, limit: limit}, (err, result) => {
        if(err){
            res.status(404).json({message: "resource not found"});
        }
        res.status(200).json({message: "found", resource: result});
    })
}

module.exports.findMostPopular = async (req, res) => {
    let limit = parseInt(req.query.more)+4;
    Palette.find({}, {}, {sort: {likes: -1}, limit: limit}, (err, result) => {
        if(err){
            res.status(404).json({message: "resource not found"});
        }
        res.status(200).json({message: "found", resource: result});
    })
}

module.exports.incrementLikes = async (req, res) => {
    const {id} = req.body;
    Palette.updateOne({_id: id}, {$inc: {likes: 1}}, (err, result)=>{
        if(err){
            res.status(400).json({message: "cant update doc"});
        }
        res.status(200).json({message: "Document updated"});
    });
    
}

module.exports.decrementLikes = async (req, res) => {
    const {id} = req.body;
    Palette.updateOne({_id: id}, {$inc: {likes: -1}}, (err, result)=>{
        if(err){
            res.status(400).json({message: "cant update doc"})
        }
        res.status(200).json({message: "Document updated"})
    })
}