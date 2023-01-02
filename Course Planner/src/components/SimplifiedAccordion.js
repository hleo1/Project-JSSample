import ClassCard from "../components/ClassCard";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

import PropTypes from "prop-types";

function SimplifiedAccordion(props) {
  const { data, changeClass, title, status } = props;

  return (
    <>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box py={2}>
            <Typography variant="h6">{title}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {data
              .filter((course) => course.status === status)
              .map((course, index) => {
                return (
                  <ClassCard
                    key={index}
                    data={course}
                    changeClass={changeClass}
                  />
                );
              })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default SimplifiedAccordion;
SimplifiedAccordion.propTypes = {
  data: PropTypes.array.isRequired,
  changeClass: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};
