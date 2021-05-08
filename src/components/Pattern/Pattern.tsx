import React, { useEffect, useState } from "react"
import {BsHeartFill} from "react-icons/bs"
import { ColorType } from "../../reducers/types";
import { decToHex } from "../ColorWheel/ColorWheelController";
import {
    isPatternLiked,
    addToFavourites,
    removeFromFavourites,
    writeUsername,
    writeLikes,
    setTextColor
  } from "../functions";

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
        isPatternLiked(id, setIsLiked);
    }, [])

    

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
                            color: setTextColor(i, palette)
                        }}>
                            #{decToHex(Math.floor(color.r))}
                            {decToHex(Math.floor(color.g))}
                            {decToHex(Math.floor(color.b))}
                        </div>
                    )
                }
            </div>
            <div className="username">
        <span>
          Added by <a href={"/user?name=" + user}>{writeUsername(user)}</a>
        </span>
      </div>
      <div
        className="likes"
        onClick={
          isLiked
            ? () =>
                removeFromFavourites(
                  id,
                  likeHasBeenClicked,
                  setIsLiked,
                  setLikeHasBeenClicked
                )
            : () =>
                addToFavourites(
                  id,
                  likeHasBeenClicked,
                  setIsLiked,
                  setLikeHasBeenClicked
                )
        }
      >
        <span style={{ background: isLiked ? "#e5383b" : "#222429" }}>
          <BsHeartFill /> {writeLikes(likes, isLiked, setLikeHasBeenClicked)}
        </span>
      </div>
        </div>
    )
}

export default Pattern;