import Add from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import HeaderHomePage from "../components/Header";
import SimplifiedAccordion from "../components/SimplifiedAccordion";
import PropTypes from "prop-types";
const styles = {
  fab: {
    position: "fixed",
    bottom: "3rem",
    right: "3rem",
  },
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

function HomePage(props) {
  const { data, changeClass } = props;
  return (
    <>
      <HeaderHomePage />
      <SimplifiedAccordion
        data={data}
        changeClass={changeClass}
        title="Currently Enrolled"
        status="enrolled"
      />
      <SimplifiedAccordion
        data={data}
        changeClass={changeClass}
        title="Want to Take"
        status="interested"
      />
      <SimplifiedAccordion
        data={data}
        changeClass={changeClass}
        title="Already Took"
        status="taken"
      />
      <Link to="/search">
        <Fab style={styles.fab} color="primary">
          <Add />
        </Fab>
      </Link>
    </>
  );
}
export default withStyles(styles)(HomePage);

HomePage.propTypes = {
  data: PropTypes.array.isRequired,
  changeClass: PropTypes.func.isRequired
};
