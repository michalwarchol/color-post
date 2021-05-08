import { ColorType } from "reducers/types";

export const isPatternLiked = (
  id: string,
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  fetch("/user/isPatternLiked", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pattern: id,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      setIsLiked(res.isFound);
    })
    .catch((err) => console.log(err));
};

export const addToFavourites = (
  id: string,
  likeHasBeenClicked: boolean,
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>,
  setLikeHasBeenClicked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  fetch("/api/v1/palette/incrementLikes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((response) => {
      console.log("response");
      if (response.redirected == true) {
        location.assign(response.url);
        return;
      } else {
        fetch("/user/addToFavourites", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pattern: id,
          }),
        })
          .then((response) => response.json())
          .then((_) => {
            setIsLiked(true);
            setLikeHasBeenClicked(!likeHasBeenClicked);
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

export const removeFromFavourites = (
  id: string,
  likeHasBeenClicked: boolean,
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>,
  setLikeHasBeenClicked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  fetch("/api/v1/palette/decrementLikes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((response) => {
      if (response.redirected == true) {
        location.assign(response.url);
        return;
      } else {
        fetch("/user/removeFromFavourites", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pattern: id,
          }),
        })
          .then((response) => response.json())
          .then((_) => {
            setIsLiked(false);
            setLikeHasBeenClicked(!likeHasBeenClicked);
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

export const writeUsername = (username: string) => {
  if (username.length > 15) {
    return username.slice(0, 16) + "...";
  }
  return username;
};

export const writeLikes = (
  likes: number,
  isLiked: boolean,
  likeHasBeenClicked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (isLiked && likeHasBeenClicked) return likes + 1;
  else if (isLiked && !likeHasBeenClicked) return likes;
  else if (!isLiked && likeHasBeenClicked) return likes - 1;
  else return likes;
};

export const setTextColor = (i: number, palette: ColorType[]) => {
    let value = palette[i].r + palette[i].g + palette[i].b;
    if (value >= (256 * 3) / 2)
        return "#1e2022";
    else
        return "#d7d8d7";
}