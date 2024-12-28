import { Box, Typography } from "@mui/material";
import React from "react";
import Modal from ".";
import Button from "../button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
  message: string;
  isLoading: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  title,
  message,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box className="flex flex-col justify-between">
        <Box className="">
          <Typography
            style={{
              fontSize: "16px",
              fontWeight: 700,
            }}
            className="text-center text-[16px] font-[700]"
          >
            {title}
          </Typography>
          <Typography className="text-center text-[14px] font-[400]">
            {message}
          </Typography>
        </Box>
        <Box className="flex justify-between py-4 mt-4 gap-2">
          <Button
            style={"outline"}
            onClick={onClose}
            className="w-full"
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            isLoading={isLoading}
            style={"danger"}
            className="text-white w-full"
            type="button"
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
