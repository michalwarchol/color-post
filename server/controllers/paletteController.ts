import {Request, Response} from "express";
import {Palette} from "../models/palette";
import {User} from "../models/user";
import { verify } from "jsonwebtoken";
import { IUser, IPalette } from "../models/model";
import { CallbackError } from "mongoose";


const errorHandler = (err: Error) => {
    return err.message;
}

export const create = async (req: Request, res: Response) => {
    const token: string = req.cookies.jwt;
    const { palette } = req.body;
    if(token){
        try {
            const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
            User.findOne({ _id: decodedToken.id }, (_: Error, result: IUser) => {
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
            const error = errorHandler(err);
            res.status(400).json(error);
        }
    }
    
}

export const findById = async (req: Request, res: Response) => {
    let id = req.body.id;
    try {
        const palette = await Palette.findById(id).exec();
        res.status(200).json(palette);
    } catch (err) {
        const error = errorHandler(err);
        res.status(400).json(error);
    }
}

export const findByUser = async (req: Request, res: Response) => {
    const user: string|undefined = req.query.user?.toString();
    if(user)
    Palette.find({ user }, (err: Error, palettes: IPalette[]) => {
        if (err) {
            res.status(404).json({ redirect: false, message: "not found" })
        }
        res.status(200).json({ redirect: false, palettes });
    })

}

export const findCreatedByUser = async (req: Request, res: Response) => {
    const token: string = req.cookies.jwt;
    if (token) {
        try {
            const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
            await User.findOne({ _id: decodedToken.id }, (err: Error, user: IUser) => {
                if(err){
                    res.status(400).json({ message: "Somathing went wrong!" });
                }
                Palette.find({ user: user.name }, (err: Error, palettes: IPalette[]) => {
                    if (err) {
                        res.status(400).json({ message: "Somathing went wrong!" });
                    }
                    res.status(200).json({ palettes });
                })
            })

        } catch (err) {
            res.status(500).json({ message: "Something went wrong!" });
        }
    }
}

export const findLikedByUser = async (req: Request, res: Response) => {
    const token: string = req.cookies.jwt;
    if(token){
        try {
            const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
            await User.findOne({ _id: decodedToken.id }, (err: Error, result: IUser) => {
                if (err) {
                    res.status(400).end();
                }
                try {
                    Palette.find({ _id: { $in: result.likedPalettes} }, (err: Error, palettes: IPalette[]) => {
                        if (err) {
                            console.log(err)
                        }
                        res.status(200).json({ redirect: false, palettes })
                    })
                } catch (err) {
                    console.log(err)
                }
            })
        }
        catch (err) {
            res.status(301).json({ redirect: true, url: "/login" });
        }
    }else {
        res.status(400).end();
    }
}

export const findAll = async (_: Request, res: Response) => {
    Palette.find({}, (err: Error, palletes: IPalette[]) => {
        if (err) {
            const error = errorHandler(err);
            res.status(400).json(error);
        }
        res.status(200).json(palletes);
    })
}

export const findLatest = async (req: Request, res: Response) => {
    const more: string|undefined = req.query.more?.toString();
    if(more){
        let limit = parseInt(more) + 4;
        Palette.find({}, {}, { sort: { "created_at": -1 }, limit: limit }, (err: Error, result: IPalette[]) => {
            if (err) {
                res.status(404).json({ message: "resource not found" });
            }
            res.status(200).json({ message: "found", resource: result });
        })
    }else{
        res.status(404).json({ message: "resource not found" });
    }
}

export const findMostPopular = async (req: Request, res: Response) => {
    const more: string|undefined = req.query.more?.toString();
    if(more){
        let limit = parseInt(more) + 4;
        Palette.find({}, {}, { sort: { likes: -1 }, limit: limit }, (err: Error, result: IPalette[]) => {
            if (err) {
                res.status(404).json({ message: "resource not found" });
            }
            res.status(200).json({ message: "found", resource: result });
        })
    }else{
        res.status(404).json({ message: "resource not found" });
    }
    
}

export const findRandom = async (_: Request, res: Response) => {
    Palette.countDocuments({}, (err: Error, count: number)=> {
        if(err){
            res.status(500).json({message: "Error 500"})
        }
        const random: number = Math.floor(Math.random() * count);
        Palette.findOne({}, {}, {skip: random}, (err: CallbackError, result: IPalette|null)=>{
            if(err){
                res.status(500).json({message: "Error 500"})
                return;
            }
            res.status(200).json({palette: result});
        })
    })
}

export const incrementLikes = async (req: Request, res: Response) => {
    const { id } = req.body;
    Palette.updateOne({ _id: id }, { $inc: { likes: 1 } }, {}, (err: Error, _: IPalette|null) => {
        if (err) {
            res.status(400).json({ message: "cant update doc" });
        }
        res.status(200).json({ message: "Document updated" });
    });

}

export const decrementLikes = async (req: Request, res: Response) => {
    const { id } = req.body;
    Palette.updateOne({ _id: id }, { $inc: { likes: -1 } }, {}, (err: Error, _: IPalette|null) => {
        if (err) {
            res.status(400).json({ message: "cant update doc" });
        }
        res.status(200).json({ message: "Document updated" });
    })
}