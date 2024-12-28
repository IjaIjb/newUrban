import { Button } from "@mui/material";

type PropT = {
  width?: string;
  height?: string;
  color?: string;
  type?: any;
  label: string;
  disabled?: boolean;
  onClick?: Function;
};

const OutlineButton = ({
  width,
  height,
  color,
  label,
  type,
  onClick,
  disabled,
}: PropT) => {
  return (
    <Button
      variant="outlined"
      type={type ?? "button"}
      onClick={onClick && onClick()}
      disabled={disabled ?? false}
      style={{
        width: width ?? "100%",
        height: height ?? "3rem",
        color: color ?? "#13213C",
        border: color ? `1.8px solid ${color}` : "1.8px solid #13213C",
        borderRadius: "4px",
      }}
    >
      {label}
    </Button>
  );
};

export default OutlineButton;
