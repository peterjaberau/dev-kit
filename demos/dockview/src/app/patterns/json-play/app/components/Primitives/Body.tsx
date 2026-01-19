import { FunctionComponent } from "react";

export const Body = ({
  className,
  children,
}: any) => {
  return <p className={`font-sans text-base ${className}`}>{children}</p>;
};
