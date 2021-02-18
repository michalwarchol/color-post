const Palette = require("../models/palette");


const errorHandler = (err) => {
    return err.message;
}

module.exports.create = async (req, res) => {
    const {verified, user, palette} = req.body;
    try{
        const newPalette = await Palette.create({
            user: user,
            palette: palette
        })
        res.status(200).json(newPalette);
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

module.exports.findAll = async (req, res) => {
    Palette.find({}, (err, palletes)=>{
        if(err){
            const error = errorHandler(err);
            res.status(400).json(error);
        }
        res.status(200).json(palletes);
    })
}