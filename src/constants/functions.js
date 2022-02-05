import { TiStar, TiStarHalf } from "react-icons/ti";

export const starRating = (rating) => {
  if (rating < 1) return <TiStarHalf size={30} color="gold" />;
  return (
    <>
      {<TiStar size={30} color="gold" />} {starRating(rating - 1)}
    </>
  );
};
