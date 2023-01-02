import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const styles = {
  card: {
    margin: "1rem",
    width: "16rem",
  },
  cardContent: {
    minHeight: "8rem",
  },
  cardActions: {
    height: "3rem",
  },
  iconButton: {
    marginLeft: "auto",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
  },
  expandMore: {
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    padding: "0.5rem",
  },
  select: {
    width: "100%",
    height: "100%",
    opacity: "0",
    cursor: "pointer",
  },
};

function colorme(status) {
  if (status === "taken") {
    return "success.main";
  } else if (status === "enrolled") {
    return "info.main";
  } else if (status === "interested") {
    return "warning.main";
  } else if (status === "none") {
    return "#9e9e9e";
  }
}

function ClassCard(props) {
  const { data, changeClass } = props;
  return (
    <>
      <Grid item>
        <Card style={styles.card}>
          <Box bgcolor={colorme(data.status)}>
            <CardContent style={styles.cardContent}>
              <Typography color="textSecondary" gutterBottom>
                {data.number}
              </Typography>
              <Typography variant="h5">{data.title}</Typography>
            </CardContent>
          </Box>
          <CardActions style={styles.cardActions}>
            <Button disabled>{data.term}</Button>
            <IconButton style={styles.iconButton}>
              <ExpandMore style={styles.expandMore} />
              <Select
                style={styles.select}
                value={data.status}
                onChange={(event) => {
                  let { data } = props;
                  data.status = event.target.value;
                  changeClass(data);
                }}
              >
                <MenuItem value="move" disabled>
                  <Typography variant="body1">Move to...</Typography>
                </MenuItem>
                <MenuItem value="enrolled">
                  <Typography variant="body1">Currently Enrolled</Typography>
                </MenuItem>
                <MenuItem value="interested">
                  <Typography variant="body1">Want to Take</Typography>
                </MenuItem>
                <MenuItem value="taken">
                  <Typography variant="body1">Already Took</Typography>
                </MenuItem>
                <MenuItem value="none">
                  <Box fontStyle="italic">
                    <Typography variant="body1">None</Typography>
                  </Box>
                </MenuItem>
              </Select>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}

export default ClassCard;
ClassCard.propTypes = {
  data: PropTypes.object.isRequired,
  changeClass: PropTypes.func.isRequired
};