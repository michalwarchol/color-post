import { Request, Response } from "express";
import { User } from "../models/user";
import { verify } from "jsonwebtoken";
import { IUser } from "../models/model";

const errorHandler = (err: Error) => {
  return err.message;
};

export const findUserById = async (req: Request, res: Response) => {
  const token: string | null = req.cookies.jwt;
  try {
    if (token) {
      const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
      User.findOne({ _id: decodedToken.id }, (err: Error, result: IUser) => {
        if (err) {
          throw new Error("Failed to find a record");
        }
        res.status(200).json({ user: result });
      });
    } else throw new Error("JWT token expired");
  } catch (err) {
    const error = errorHandler(err);
    res.status(200).json({error});
  }
};

export const addLikedPattern = async (req: Request, res: Response) => {
  const token: string | null = req.cookies.jwt;
  try {
    if (token) {
      const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
      User.updateOne(
        { _id: decodedToken.id },
        { $push: { likedPalettes: req.body.pattern } },
        {},
        (err: Error, _: IUser) => {
          if (err) {
            throw new Error("Failed to update a record");
          }
          res.status(200).json({ message: "Document updated" });
        }
      );
    } else throw new Error("JWT token expired");
  } catch (err) {
    const error = errorHandler(err);
    res.status(200).json({error});
  }
};

export const removeLikedPattern = async (req: Request, res: Response) => {
  const token: string | null = req.cookies.jwt;
  try {
    if (token) {
      const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
      User.updateOne(
        { _id: decodedToken.id },
        { $pull: { likedPalettes: req.body.pattern } },
        {},
        (err: Error, _: IUser) => {
          if (err) {
            throw new Error("Failed to update a record");
          }
          res.status(200).json({ message: "Document updated" });
        }
      );
    } else throw new Error("JWT token expired");
  } catch (err) {
    const error = errorHandler(err);
    res.status(200).json({error});
  }
};

export const isPatternLiked = async (req: Request, res: Response) => {
  const token: string | null = req.cookies.jwt;
  try {
    if (token) {
      const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
      User.findById(decodedToken.id, (err: Error, result: IUser) => {
        if (err) {
          throw new Error("Failed to find a record");
        }
        const isInArray = result.likedPalettes.indexOf(req.body.pattern);
        if (isInArray == -1) {
          res.status(200).json({
            message: "pattern not found in favourites",
            isFound: false,
          });
        } else {
          res
            .status(200)
            .json({ message: "pattern found in favourites", isFound: true });
        }
      });
    } else throw new Error("JWT token expired");
  } catch (err) {
    const error = errorHandler(err);
    res.status(200).json({ error, isFound: false });
  }
};