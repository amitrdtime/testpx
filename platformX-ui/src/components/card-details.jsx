import { Card, Grid, Typography, ListItemText } from "@mui/material";
import "../styles/user-style.css";

const CardDetails = ({ details }) => {

  const formatDate = (utcDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const isValidDate = typeof utcDate === 'string' && utcDate.includes('T') && utcDate.includes(':');
    let localDateString = '';
    if (isValidDate) {
      // Convert the UTC date string to a Date object
      const date = new Date(utcDate);
      // Format the date to the user's local time
      localDateString = date.toLocaleString(undefined, options); // Customize if needed
    } else {
      localDateString = utcDate;
    }
    return localDateString;
  };


  return (
    <Card
      sx={{
        padding: "20px",
        position: "relative",
        boxShadow: 0,
        borderRadius: 0,
      }}
    >
      <Grid container spacing={4}>
        {details.map((detail, index) => (
          <Grid item xs={12} md={4} key={index}>
            <ListItemText
              primary={
                <Typography className="display-fields">
                  {detail.label}
                </Typography>
              }
              secondary={
                <Typography className="display-values">
                  {formatDate(detail.value)} 
                </Typography>
              }
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default CardDetails;
