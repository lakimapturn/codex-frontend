import { TiStar } from "react-icons/ti";

export const starRating = (rating) => {
  if (rating === 0) return;
  return (
    <>
      {starRating(rating - 1)} {<TiStar size={30} color="gold" />}
    </>
  );
};
