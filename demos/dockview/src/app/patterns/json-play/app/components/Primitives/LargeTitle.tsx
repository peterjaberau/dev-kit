
export const LargeTitle = ({
  className,
  children,
}: any) => {
  return (
    <h1 className={`font-sans font-bold text-2xl ${className}`}>{children}</h1>
  );
};
