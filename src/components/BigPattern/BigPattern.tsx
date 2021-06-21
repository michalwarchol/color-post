import React, { useState, useEffect, useRef } from "react";
import { BsHeartFill } from "react-icons/bs";
import { PatternType } from "reducers/types";
import { decToHex } from "../ColorWheel/ColorWheelController";
import NotificationBadge from "../NotificationBadge/NotificationBadge";
import {
  isPatternLiked,
  addToFavourites,
  removeFromFavourites,
  writeUsername,
  writeLikes,
  setTextColor,
} from "../PatternFunctions";

interface Props {
  pattern: PatternType;
  k: number;
}

const BigPattern: React.FC<Props> = ({ k, pattern }) => {
  const { user, palette, likes } = pattern;
  const id = pattern._id;

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeHasBeenClicked, setLikeHasBeenClicked] = useState<boolean>(false);
  const [showNotification, setShowNotificaction] =
    useState<boolean | null>(null);

  const didMount = useRef(false);

  useEffect(() => {
    isPatternLiked(id, setIsLiked);
  }, []);

  useEffect(() => {
    if (didMount.current) {
      if (isLiked) setShowNotificaction(true);
      if (!isLiked) setShowNotificaction(false);
    } else {
      didMount.current = true;
    }
  }, [likeHasBeenClicked]);

  const colorInit = () => {
    const colors = palette.map((elem, i, colors) => (
      <div
        key={i}
        className="color col-6 col-md-2 d-flex justify-content-center align-items-center"
        style={{
          background: "rgb(" + elem.r + "," + elem.g + "," + elem.b + ")",
          color: setTextColor(i, colors),
        }}
      >
        <span>
          #{decToHex(elem.r)}
          {decToHex(elem.g)}
          {decToHex(elem.b)}
        </span>
      </div>
    ));
    return colors;
  };

  const handleClickLike = () => {
    if (isLiked) {
      removeFromFavourites(
        id,
        likeHasBeenClicked,
        setIsLiked,
        setLikeHasBeenClicked
      );
      return;
    }
    addToFavourites(id, likeHasBeenClicked, setIsLiked, setLikeHasBeenClicked);
  };

  return (
    <div key={k} className="bigPattern d-flex col-12 flex-column">
      <div className="colors d-flex flex-column flex-md-row align-items-center justify-content-center">
        {colorInit()}
      </div>
      <div className="username d-flex justify-content-center">
        <span>
          Added by <a href={"/user?name=" + user}>{writeUsername(user)}</a>
        </span>
      </div>
      <div
        className="likes d-flex justify-content-center"
        onClick={handleClickLike}
      >
        <span style={{ background: isLiked ? "#e5383b" : "#282828" }}>
          <BsHeartFill /> {writeLikes(likes, isLiked, likeHasBeenClicked)}
        </span>
      </div>
      {showNotification && typeof showNotification === "boolean" && (
        <NotificationBadge text="Added to Liked Patterns" />
      )}
      {!showNotification && typeof showNotification === "boolean" && (
        <NotificationBadge text="Removed from Liked patterns" />
      )}
    </div>
  );
};
export default BigPattern;
