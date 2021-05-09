import { Request, Response } from "express";
import { User } from "../models/user";
import { verify } from "jsonwebtoken";
import { IUser } from "../models/model";

export const findUserById = async (req: Request, res: Response) => {
  const token: string | null = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
      User.findOne({ _id: decodedToken.id }, (err: Error, result: IUser) => {
        if (err) {
          res.status(404).json({ message: "Filed to find user" });
        }
        res.status(200).json({ user: result });
      });
    } catch (err) {
      res.status(404).json({ message: "Failed find user" });
    }
  }
};

export const addLikedPattern = async (req: Request, res: Response) => {
    const token: string | null = req.cookies.jwt;
  if (token) {
      try{
        const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
        User.updateOne(
            { _id: decodedToken.id },
            { $push: { likedPalettes: req.body.pattern } },
            {},
            (err: Error, _: IUser) => {
              if (err) {
                res.status(404).json({ message: "cant update user data" });
              }
              res.status(200).json({ message: "Document updated" });
            }
          );
      }catch(err){
        res.status(400).json({ message: "cant add pattern to favourites" });
      }
  } else {
    res.status(400).json({ message: "cant add pattern to favourites" });
  }
};

export const removeLikedPattern = async (req: Request, res: Response) => {
    const token: string | null = req.cookies.jwt;
  if (token) {
      try{
        const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
        User.updateOne(
            { _id: decodedToken.id },
            { $pull: { likedPalettes: req.body.pattern } },
            {},
            (err: Error, _: IUser) => {
              if (err) {
                res.status(404).json({ message: "cant update user data" });
              }
              res.status(200).json({ message: "Document updated" });
            }
          );
      }catch(err){
        res
        .status(400)
        .json({ message: "cant remove pattern from favourites" });
      }
    }
    else {
    res.status(400).json({ message: "cant remove pattern from favourites" });
  }
};

export const isPatternLiked = async (req: Request, res: Response) => {
    const token: string | null = req.cookies.jwt;
  if (token) {
      try{
        const decodedToken: any = verify(token, process.env.JWT_SECRET as string);
        User.findById(decodedToken.id, (err: Error, result: IUser) => {
            if (err) {
              res.status(400).json({ message: "user not found" });
            }
            const isInArray = result.likedPalettes.indexOf(req.body.pattern);
            if (isInArray == -1) {
              res
                .status(200)
                .json({
                  message: "pattern not found in favourites",
                  isFound: false,
                });
            } else {
              res
                .status(200)
                .json({ message: "pattern found in favourites", isFound: true });
            }
          });
      }catch(err){
        res.status(400).json({ message: "cant verify user" });
      }
  } else {
    res
      .status(200)
      .json({ message: "pattern not found in favourites", isFound: false });
  }
};
