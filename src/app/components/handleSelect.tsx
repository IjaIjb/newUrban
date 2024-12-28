import { SelectChangeEvent } from "@mui/material";

export const handleCountrySelect = (
  event: SelectChangeEvent,
  setFieldValue: any
) => {
  console.log("event.target.value", event.target.value);
  setFieldValue("country", event.target.value as string);
};
