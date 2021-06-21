import React, { useEffect, useRef, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { ColorType } from "../../reducers/types";
import { decToHex } from "../ColorWheel/ColorWheelController";
import {
  isPatternLiked,
  addToFavourites,
  removeFromFavourites,
  writeUsername,
  writeLikes,
  setTextColor,
} from "../PatternFunctions";
import NotificationBadge from "../NotificationBadge/NotificationBadge";

interface Props {
  id: string;
  user: string;
  palette: ColorType[];
  likes: number;
}

const Pattern: React.FC<Props> = ({ id, user, palette, likes }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeHasBeenClicked, setLikeHasBeenClicked] = useState<boolean>(false);
  const [showNotification, setShowNotificaction] = useState<boolean | null>(
    null
  );

  const didMount = useRef(false);

  useEffect(() => {
    isPatternLiked(id, setIsLiked);
  }, []);

  useEffect(() => {
    if (didMount.current) {
      if (isLiked) setShowNotificaction(true);
      if (!isLiked) setShowNotificaction(false);
    }
    else{
      didMount.current=true;
    }
  }, [likeHasBeenClicked]);

  return (
    <div className="pattern d-flex col-6 col-md-3 flex-column">
      <div className="colors">
        {palette.map((color, i) => (
          <div
            className="color"
            key={i}
            style={{
              background:
                "rgb(" +
                Math.floor(color.r) +
                "," +
                Math.floor(color.g) +
                "," +
                Math.floor(color.b) +
                ")",
              color: setTextColor(i, palette),
            }}
          >
            #{decToHex(Math.floor(color.r))}
            {decToHex(Math.floor(color.g))}
            {decToHex(Math.floor(color.b))}
          </div>
        ))}
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

export default Pattern;
