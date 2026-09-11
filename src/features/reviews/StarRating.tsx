export const StarRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange?: (rating: number) => void;
}) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-0.5">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(star)}
          className={`text-lg leading-none ${
            star <= value ? 'text-amber-400' : 'text-slate-300'
          } ${onChange ? 'cursor-pointer' : 'cursor-default'}`}
          aria-label={`${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
};
