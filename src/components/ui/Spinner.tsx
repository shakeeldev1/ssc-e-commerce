const SIZE_CLASSES = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

export const Spinner = ({ size = 'md' }: { size?: keyof typeof SIZE_CLASSES }) => {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-current border-t-transparent opacity-70 ${SIZE_CLASSES[size]}`}
      role="status"
      aria-label="Loading"
    />
  );
};
