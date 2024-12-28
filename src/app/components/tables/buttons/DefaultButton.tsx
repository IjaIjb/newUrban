import { Button } from "@mui/material";
import { ClipLoader } from "react-spinners";

type PropT = {
  title: string;
  handleSubmit?: Function;
  isDisabled?: boolean;
  isLoading: boolean;
  width?: string;
  height?: string; // Fixed a typo in the prop name
  backgroundColor?: string;
  color?: string;
  type?: any;
};

export default function DefaultButton({
  title,
  handleSubmit,
  isDisabled,
  isLoading,
  width,
  height,
  backgroundColor,
  color,
  type,
}: PropT) {
  return (
    <Button
      variant="contained"
      className={`default-button flex items-center justify-center rounded-[0.20rem] ${
        backgroundColor ?? "bg-primary"
      } ${color ?? "text-white"} h-${height ?? "12"} ${width ?? "w-full"}`}
      style={{
        textTransform: "capitalize",
        fontWeight: "100",
      }}
      type={type ? type : "submit"}
      disabled={isDisabled || isLoading} // Disable the button when isLoading is true
      onClick={() => handleSubmit && handleSubmit()}
    >
      {isLoading ? <ClipLoader size={16} color={"#ffffff"} /> : title}
    </Button>
  );
}
