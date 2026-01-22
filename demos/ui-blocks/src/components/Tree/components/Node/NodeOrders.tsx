import { cn } from "#utils";

interface NodeOrderProps {
  order?: number;
}

export const NodeOrder = ({ order }: NodeOrderProps) => {
  return <div className={cn("text-blue-500 underline")}>{order ?? "-"}</div>;
};
