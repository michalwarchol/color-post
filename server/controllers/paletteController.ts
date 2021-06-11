import { Request, Response } from "express";
import { Palette } from "../models/palette";
import { User } from "../models/user";
import { verify } from "jsonwebtoken";
import { IUser, IPalette } from "../models/model";
import { CallbackError } from "mongoose";

const errorHandler = (err: Error) => {
  return err.message;
};

export const create = async (req: Request, res: Response) => {
  const token: string = req.cookies.jwt;
  const { palette } = req.body;
  try {
    if (token) {
      const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
      User.findOne({ _id: decodedToken.id }, (err: CallbackError, result: IUser) => {
          if(err){
              throw new Error("Failed to find a record");
          }
          Palette.create({
            user: result.name,
            palette: palette,
          }, (err: CallbackError, doc: IPalette)=>{
              if(err){
                throw new Error("Failed to find a record");
              }
              res.status(200).json({ palette: doc });
          });
          
      });
    } else throw new Error("JWT token expired");
  } catch (err) {
    const error = errorHandler(err);
    res.status(200).json({error});
  }
};

export const findById = async (req: Request, res: Response) => {
  let id = req.body.id;
  try {
    Palette.findById(id, (err: CallbackError, result: IPalette)=>{
        if(err){
            throw new Error("Failed to find a record");
        }
        res.status(200).json(result);
    });
  } catch (err) {
    const error = errorHandler(err);
    res.status(200).json({error});
  }
};

export const findByUser = async (req: Request, res: Response) => {
  const user: string | undefined = req.query.user?.toString();
  try{
    if (user){
        Palette.find({ user }, (err: CallbackError, palettes: IPalette[]) => {
            if (err) {
              throw new Error("Failed to find a record");
            }
            res.status(200).json({ redirect: false, palettes });
          });
      }else throw new Error("Parameter not provided");
  }catch (err) {
    const error = errorHandler(err);
    res.status(200).json({error});
  }
};

export const findCreatedByUser = async (req: Request, res: Response) => {
  const token: string = req.cookies.jwt;
  try{
    if (token) {
        const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
        User.findOne(
          { _id: decodedToken.id },
          (err: CallbackError, user: IUser) => {
            if (err) {
                throw new Error("Failed to find a record");
            }
            Palette.find(
              { user: user.name },
              (err: CallbackError, palettes: IPalette[]) => {
                if (err) {
                    throw new Error("Failed to find a record");
                }
                res.status(200).json({ palettes });
              }
            );
          }
        );
    }else throw new Error("JWT token expired");
  }catch(err){
    const error = errorHandler(err);
    res.status(200).json({error});
  }
  
};

export const findLikedByUser = async (req: Request, res: Response) => {
  const token: string = req.cookies.jwt;
  try{
    if (token) {
        const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
        User.findOne(
          { _id: decodedToken.id },
          (err: Error, result: IUser) => {
            if (err) {
              throw new Error("Failed to find a record");
            }
            Palette.find(
              { _id: { $in: result.likedPalettes } },
              (err: CallbackError, palettes: IPalette[]) => {
                if (err) {
                  throw new Error("Failed to find a record");
                }
                res.status(200).json({ palettes });
              }
            );
          }
        );
      
    } else throw new Error("JWT token expired");
  }catch(err){
    const error = errorHandler(err);
    res.status(200).json({error});
  }
  
};

export const findAll = async (_: Request, res: Response) => {
  try{
    Palette.find({}, (err: CallbackError, palletes: IPalette[]) => {
      if (err) {
        throw new Error("Failed to find a record");
      }
      res.status(200).json({palletes});
    });
  }catch(err){
    const error = errorHandler(err);
    res.status(200).json({error});
  }
};

export const findLatest = async (req: Request, res: Response) => {
  const more: string | undefined = req.query.more?.toString();
  try{
    if (more) {
      let limit = parseInt(more) + 4;
      Palette.find(
        {},
        {},
        { sort: { created_at: -1 }, limit: limit },
        (err: CallbackError, result: IPalette[]) => {
          if (err) {
            throw new Error("Failed to find a record");
          }
          res.status(200).json({ message: "found", resource: result });
        }
      );
    } else throw new Error("Parameter not provided");
  }catch(err){
    const error = errorHandler(err);
    res.status(200).json({error});
  }
};

export const findMostPopular = async (req: Request, res: Response) => {
  const more: string | undefined = req.query.more?.toString();
  try{
    if (more) {
      let limit = parseInt(more) + 4;
      Palette.find(
        {},
        {},
        { sort: { likes: -1, created_at: -1 }, limit: limit },
        (err: CallbackError, result: IPalette[]) => {
          if (err) {
            throw new Error("Failed to find a record");
          }
          res.status(200).json({ message: "found", resource: result });
        }
      );
    } else throw new Error("Parameter not provided");
  }catch(err){
    const error = errorHandler(err);
    res.status(200).json({error});
  }
};

export const findRandom = async (_: Request, res: Response) => {
  try{
    Palette.countDocuments({}, (err: CallbackError, count: number) => {
      if (err) {
        throw new Error("Failed to find a record");
      }
      const random: number = Math.floor(Math.random() * count);
      Palette.findOne(
        {},
        {},
        { skip: random },
        (err: CallbackError, result: IPalette | null) => {
          if (err) {
            throw new Error("Failed to find a record");
          }
          res.status(200).json({ palette: result });
        }
      );
    });
  }catch(err){
    const error = errorHandler(err);
    res.status(200).json({error});
  }
}

export const incrementLikes = async (req: Request, res: Response) => {
  const { id } = req.body;
  try{
    Palette.updateOne(
      { _id: id },
      { $inc: { likes: 1 } },
      {},
      (err: CallbackError, _: IPalette | null) => {
        if (err) {
          throw new Error("Failed to update a record");
        }
        res.status(200).json({ message: "Document updated" });
      }
    );
  }catch(err){
    const error = errorHandler(err);
    res.status(200).json({error});
  }
}

export const decrementLikes = async (req: Request, res: Response) => {
  const { id } = req.body;
  try{
    Palette.updateOne(
      { _id: id },
      { $inc: { likes: -1 } },
      {},
      (err: Error, _: IPalette | null) => {
        if (err) {
          throw new Error("Failed to update a record");
        }
        res.status(200).json({ message: "Document updated" });
      }
    );
  }catch(err){
    const error = errorHandler(err);
    res.status(200).json({error});
  }
}
