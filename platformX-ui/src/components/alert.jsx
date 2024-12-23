import React, { useState } from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function CustomAlert({ severity = "success", content, duration = 3000, onCloseCallback}) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onCloseCallback) {
      onCloseCallback(true); // Call the callback when closing
    }
  };

  return (
    <Snackbar
      open={visible}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >{severity === "success" ?
      (<Alert onClose={handleClose} severity={severity} sx={{width: "100%", backgroundColor: '#29cf3a', color: '#fffaf0', '& .MuiAlert-icon': {
        color: '#fffaf0' }}}>
        {content}
      </Alert>)
      :(<Alert onClose={handleClose} severity={severity} sx={{width: "100%", backgroundColor: '#DA2828', color: '#fffaf0', '& .MuiAlert-icon': {
        color: '#fffaf0' }}}>
        {content}
      </Alert>)
}
    </Snackbar>
  );
}

CustomAlert.propTypes = {
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired,
  content: PropTypes.string.isRequired,
  duration: PropTypes.number,
};

export default CustomAlert;
