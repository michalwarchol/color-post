import React, { useState, useEffect } from "react";
import { BsHeartFill } from "react-icons/bs";
import { PatternType } from "reducers/types";
import {
  isPatternLiked,
  addToFavourites,
  removeFromFavourites,
  writeUsername,
  writeLikes,
} from "../functions";

interface Props {
  pattern: PatternType;
  k: number;
}

const BigPattern: React.FC<Props> = ({ k, pattern }) => {
  const { user, palette, likes } = pattern;
  const id = pattern._id;

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeHasBeenClicked, setLikeHasBeenClicked] = useState<boolean>(false);

  useEffect(() => {
    isPatternLiked(id, setIsLiked);
  }, []);

  const colorInit = () => {
    const colors = palette.map((elem, i) => (
      <div
        key={i}
        className="color col-2"
        style={{
          background: "rgb(" + elem.r + "," + elem.g + "," + elem.b + ")",
        }}
      ></div>
    ));
    return colors;
  };

  return (
    <div key={k} className="bigPattern d-flex col-12 flex-column">
      <div className="colors d-flex flex-row justify-content-center">
        {colorInit()}
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
          <BsHeartFill /> {writeLikes(likes, isLiked, likeHasBeenClicked)}
        </span>
      </div>
    </div>
  );
};
export default BigPattern;
