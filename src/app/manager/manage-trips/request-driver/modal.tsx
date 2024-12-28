import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ClipLoader } from "react-spinners";
import tripOBJs from "@/common/classes/trip.class";
import { useSelector } from "react-redux";
import Button from "@/app/components/button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 1,
  p: 4,
};
interface FunctionArgs {
  header: string;
  body: any;
  handleClose: any;
  handleOpen: any;
  open: boolean;
  handleSubmitFromModal: any;
  isLoading: boolean;
}
export default function BasicModal({
  header,
  body,
  handleClose,
  handleOpen,
  open,
  handleSubmitFromModal,
  isLoading,
}: FunctionArgs) {
  let userData = useSelector((a: any) => a?.authUser?.authUser);
  React.useEffect(() => {
    if (body.tripCode) {
      tripOBJs
        .getAll(userData)
        .then((res) => {
          console.log(res, "this is the request from the trip");
        })
        .catch((err) => console.log(err, "this is the error"));
    }
    console.log("this is the model");
  }, [body.tripCode]);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Driver Request
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You are trying to request for a driver for {body.tripCode}.
          </Typography>
          <Box className="mt-6 w-full flex gap-[10px]">
            <Button
              style="danger"
              type="button"
              size="xs"
              className="text-white"
              onClick={handleClose}
            >
              Cancel Request
            </Button>
            <Button
              className="text-white"
              type="button"
              size="xs"
              onClick={() => handleSubmitFromModal()}
            >
              {isLoading ? <ClipLoader color="#ffffff" /> : "Send Request"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
