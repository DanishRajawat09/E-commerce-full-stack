import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { clearAllMessage } from "../features/snackbarSlice";
import { useEffect } from "react";

const SnackBar = () => {
  const { errorMessage, successMessage, open } = useSelector(
    (state) => state.snackBarSlice
  );

  const dispatch = useDispatch();

  const vertical = "top";
  const horizontal = "right";

useEffect(() => {
  if ((successMessage || errorMessage) && open) {
    const timer = setTimeout(() => {
      dispatch(clearAllMessage());
    }, 5000);

    return () => clearTimeout(timer); 
  }
}, [successMessage, errorMessage, open]);


  const handleCloseSuccess = () => dispatch(clearAllMessage());

  const handleCloseError = () => dispatch(clearAllMessage());

  return (
    <>
      {successMessage && open && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
          key={"success" + vertical + horizontal}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      )}

      {errorMessage && open && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseError}
          key={"error" + vertical + horizontal}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMessage || "Something went wrong"}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SnackBar;
