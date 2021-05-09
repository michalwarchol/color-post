import {Model, Schema, model} from 'mongoose';
import {IPalette} from "./model";

const paletteSchema: Schema = new Schema({
    user: {
        type: String,
        required: false,
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

export const Palette: Model<IPalette> = model<IPalette>("Palette", paletteSchema, "palettes");