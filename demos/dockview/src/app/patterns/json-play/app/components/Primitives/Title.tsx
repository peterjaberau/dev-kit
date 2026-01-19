
export const Title = ({
  className,
  children,
}: any) => {
  return (
    <h2 className={`font-sans font-bold text-xl ${className}`}>{children}</h2>
  );
};
