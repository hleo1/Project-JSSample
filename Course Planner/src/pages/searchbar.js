import Grid from "@material-ui/core/Grid";
import SearchBar from "material-ui-search-bar";
import ClassCard from "../components/ClassCard";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";

function SearchClass(props) {
  const {
    search_bar_value,
    search_data,
    search_pagination,
    searchDisplay,
    changeClass,
  } = props;

  let handleChange = (event, value) => {
    searchDisplay(search_bar_value, value);
  };

  return (
    <>
      
        <SearchBar
          value={search_bar_value}
          onChange={(newValue) => searchDisplay(newValue, 1)}
        />

        <Pagination
          count={search_pagination ? search_pagination : 0}
          defaultPage={1}
          onChange={handleChange}
          style = {{
            display: "flex",
            justifyContent: "center"
          }}
            
        />

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <br />
          {search_data.map((course, index) => {
            return (
              <ClassCard key={index} data={course} changeClass={changeClass} />
            );
          })}
        </Grid>
    </>
  );
}

export default SearchClass;

SearchClass.propTypes = {
  search_bar_value: PropTypes.string.isRequired,
  search_data: PropTypes.array.isRequired,
  searchDisplay: PropTypes.func.isRequired,
  changeClass: PropTypes.func.isRequired,
};
