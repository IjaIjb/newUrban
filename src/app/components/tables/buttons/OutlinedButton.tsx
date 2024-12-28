import Button from "@mui/material/Button";
// import Spinner from "../Spinner";
import { ClipLoader } from "react-spinners";
import "../button.scss";

interface IOutlineBtn {
  title: string;
  handleSubmit?: Function;
  isDisabled?: boolean;
  isLoading?: boolean;
  width?: string;
  heigth?: string;
  txtcolor?: string;
  bordercolor?: string;
  type?: "";
}
export default function OutlinedButton({
  title,
  handleSubmit,
  isDisabled,
  isLoading,
  width,
  heigth,
  txtcolor,
  bordercolor,
  type,
}: IOutlineBtn) {
  return (
    <Button
      variant="outlined"
      className="btn-outline"
      style={{
        color: txtcolor ? txtcolor : "inherit",
        height: heigth ? heigth : "48px",
        width: width ? width : "128px",
        borderColor: bordercolor ? bordercolor : "none",
        textTransform: "capitalize",
      }}
      type={type ? type : "button"}
      disabled={isDisabled}
      onClick={() => handleSubmit && handleSubmit()}
    >
      {isLoading ? <ClipLoader  /> : title}
    </Button>
  );
}
