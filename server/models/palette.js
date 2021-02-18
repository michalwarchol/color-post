const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paletteSchema = new Schema({
    user: {
        type: String,
        required: false
    },
    palette: {
        type: Array,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})


module.exports = mongoose.model("Palette", paletteSchema, "palettes");