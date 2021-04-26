const express = require("express");
const User = require('../models/user');
const jwt = require("jsonwebtoken");

module.exports.findUserById = async (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
            if(err){
                res.status(404).error("ee");
            }
            User.findOne({_id: decodedToken.id}, (err, result)=>{
                if(err){
                    res.status(403).json({message: "cant find user"});
                }
                res.status(200).json({user: result});
            })
        })
    }
}

module.exports.addLikedPattern = async (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
            if(err){
                res.status(400).json({message: "cant add pattern to favourites"})
            }
            User.updateOne({_id: decodedToken.id}, {$push: {likedPalettes: req.body.pattern}}, (err, result)=>{
                if(err){
                    res.status(404).json({message: "cant update user data"})
                }
                res.status(200).json({message: "Document updated"});
            })
        })
    }else{
        res.status(400).json({message: "cant add pattern to favourites"});
    }
}

module.exports.removeLikedPattern = async (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
            if(err){
                res.status(400).json({message: "cant remove pattern from favourites"})
            }
            User.updateOne({_id: decodedToken.id}, {$pull: {likedPalettes: req.body.pattern}}, (err, result)=>{
                if(err){
                    res.status(404).json({message: "cant update user data"})
                }
                res.status(200).json({message: "Document updated"});
            })
        })
    }else{
        res.status(400).json({message: "cant remove pattern from favourites"})
    }
}

module.exports.isPatternLiked = async (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
            if(err){
                res.status(400).json({message: "cant verify user"});
            }
            User.findById(decodedToken.id, (err, result)=>{
                if(err){
                    res.status(400).json({message: "user not found"});
                }
                const isInArray = result.likedPalettes.indexOf(req.body.pattern);
                if(isInArray==-1){
                    res.status(200).json({message: "pattern not found in favourites", isFound: false});
                }else{
                    res.status(200).json({message: "pattern found in favourites", isFound: true});
                }
            })
        })
    }else{
        res.status(200).json({message: "pattern not found in favourites", isFound: false});
    }
}