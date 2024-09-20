import clsx from "clsx";

interface Props extends React.PropsWithChildren {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Cell: React.FC<Props> = ({
  onClick,
  children,
  className,
  isActive = false,
}) => {
  return (
    <div
      onClick={!isActive ? onClick : undefined}
      className={clsx(
        "h-10 flex items-center justify-center select-none transition-colors py-6",
        {
          "cursor-pointer hover:bg-gray-100 active:bg-gray-200 bg-white rounded-md":
            !isActive && onClick,
          "font-bold text-white bg-black-2 rounded-md": isActive,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Cell;   