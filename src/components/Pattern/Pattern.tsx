import React, { useEffect, useState } from "react"
import {BsHeartFill} from "react-icons/bs"
import { ColorType } from "../../reducers/types";
import { decToHex } from "../ColorWheel/ColorWheelController";

interface Props {
    id: string,
    user: string,
    palette: ColorType[],
    likes: number
}

const Pattern: React.FC<Props> = ({ id, user, palette, likes }) => {

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeHasBeenClicked, setLikeHasBeenClicked] = useState<boolean>(false);

    useEffect(() => {
        isPatternLiked();
    }, [])

    const isPatternLiked = () => {
        fetch("/user/isPatternLiked", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pattern: id
            })
        })
            .then(response => response.json())
            .then(res => {
                setIsLiked(res.isFound);
            })
            .catch(err => console.log(err));
    }

    const addToFavourites = () => {
        fetch("/api/v1/palette/incrementLikes", {
            method: "put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id
            })
        }).then(response => {
            console.log("response")
            if (response.redirected == true) {
                location.assign(response.url);
                return;
            } else {
                fetch("/user/addToFavourites", {
                    method: "put",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        pattern: id
                    })
                })
                    .then(response => response.json())
                    .then(res => {
                        setIsLiked(true);
                        setLikeHasBeenClicked(!likeHasBeenClicked)
                    })
                    .catch(err => console.log(err))
            }
        })
            .catch(err => console.log(err));
    }

    const removeFromFavourites = () => {
        fetch("/api/v1/palette/decrementLikes", {
            method: "put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id
            })
        }).then(response => {
            if (response.redirected == true) {
                location.assign(response.url);
                return;
            } else {
                fetch("/user/removeFromFavourites", {
                    method: "put",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        pattern: id
                    })
                }).then(response => response.json())
                    .then(res => {
                        setIsLiked(false);
                        setLikeHasBeenClicked(!likeHasBeenClicked)
                    })
                    .catch(err => console.log(err))
            }
        })
            .catch(err => console.log(err));
    }

    const setTextColor = (i: number) => {
        let value = palette[i].r + palette[i].g + palette[i].b;
        if (value >= (256 * 3) / 2)
            return "#1e2022";
        else
            return "#d7d8d7";
    }

    const writeUsername = (username: string) => {
        if (username.length > 15) {
            return username.slice(0, 16) + "...";
        }
        return username;
    }

    const writeLikes = (likes: number) => {
        if (isLiked && likeHasBeenClicked) return likes + 1;
        else if (isLiked && !likeHasBeenClicked) return likes;
        else if (!isLiked && likeHasBeenClicked) return likes - 1;
        else return likes;
    }

    return (
        <div className="pattern d-flex col-6 col-md-3 flex-column">
            <div className="colors">
                {
                    palette.map((color, i) =>
                        <div className="color" key={i} style={{
                            background: "rgb(" +
                                Math.floor(color.r) + "," +
                                Math.floor(color.g) + "," +
                                Math.floor(color.b) + ")",
                            color: setTextColor(i)
                        }}>
                            #{decToHex(Math.floor(color.r))}
                            {decToHex(Math.floor(color.g))}
                            {decToHex(Math.floor(color.b))}
                        </div>
                    )
                }
            </div>
            <div className="username">
                <span>Added by <a href={"/user?name="+user}>{writeUsername(user)}</a></span>
            </div>
            <div className="likes" onClick={isLiked ? removeFromFavourites : addToFavourites}>
                <span style={{background:isLiked?"#ff3d8b":"#1e2022"}}><BsHeartFill /> {writeLikes(likes)}</span>
            </div>
        </div>
    )
}

export default Pattern;