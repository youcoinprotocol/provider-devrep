import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertColor } from "@mui/material";

type Props = {
  severity: AlertColor;
  message: string;
  open: boolean;
  setOpen: (v: boolean) => void;
};

export const CustomSnackbar: React.FC<Props> = ({
  severity,
  message,
  open,
  setOpen,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Alert
        severity={severity}
        onClose={() => {
          setOpen(false);
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
