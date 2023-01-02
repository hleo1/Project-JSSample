import { Component } from "react";
import Container from "@material-ui/core/Container";

import { Route, Switch } from "react-router";
import HomePage from "./pages/homepage";
import SearchClass from "./pages/searchbar";
//backend helper functions
import { create, getAll, search, update, remove } from "./services/api.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //keeps track of data inside the PLANNER
      data: [],
      //keeps track of data that is displayed in the search page
      search_bar_data: [],
      //keeps track of what user has typed in the search page
      search_bar_value: "",
      search_pagination_limit: 0,
      search_bar_page: 1
    };
  }

  //before app loads, configure data on the planner/homepage!
  componentDidMount() {
    getAll().then((result) => {
      this.setState((state) => {
        return {
          data: result,
        };
      });
    });
  }

  // handles all "change status" dropdowns in both pages

  changeClass = (curr_class) => {
    // if changed to none, then delete from the planner. update API, and
    //data from homepage & search bar as well, to sync color changes
    if (curr_class.status === "none") {
      remove(curr_class).then((removed_class) => {
        getAll().then((classes_in_planner) => {
          search(this.state.search_bar_value, this.state.search_bar_page).then((search_class_result) => {
            const classes_cross_referenced = this.cross_reference(
              search_class_result,
              classes_in_planner
            );
            this.setState(() => {
              return {
                data: classes_in_planner,
                search_bar_data: classes_cross_referenced,
              };
            });
          });
        });
      });
    } else {
      //if curr_class._id is undefined, then its not in the planner, add it first! update API, and
      //data from homepage & search bar as well, to sync color changes
      if (curr_class._id === undefined) {
        create(curr_class).then(() => {
          getAll().then((classes_in_planner) => {
            search(this.state.search_bar_value, this.state.search_bar_page).then((search_class_result) => {
              const classes_cross_referenced = this.cross_reference(
                search_class_result,
                classes_in_planner
              );
              this.setState(() => {
                return {
                  data: classes_in_planner,
                  search_bar_data: classes_cross_referenced
                };
              });
            });
          });
        });
      }

      //if its already in the planner, then just update the status! update API, and
      //data from homepage & search bar as well, to sync color changes
      else {
        update(curr_class, curr_class.status).then(() => {
          getAll().then((classes_in_planner) => {
            search(this.state.search_bar_value, this.state.search_bar_page).then((search_class_result) => {
              const classes_cross_referenced = this.cross_reference(
                search_class_result,
                classes_in_planner
              );
              this.setState(() => {
                return {
                  data: classes_in_planner,
                  search_bar_data: classes_cross_referenced,
                };
              });
            });
          });
        });
      }
    }
  };

  //called when search bar chagnes
  searchAndDisplay = async (newValue, pageNumber) => {
    try {
      this.setState(() => {
        return {
          search_bar_value: newValue,
          search_bar_page: pageNumber
        };
      });
      let search_class_result = await search(newValue, pageNumber);
      let classes_in_planner = await getAll();

      const classes_cross_referenced = this.cross_reference(
        search_class_result,
        classes_in_planner
      );
      this.setState(() => {
        return {
          search_bar_data: classes_cross_referenced,
          search_pagination_limit: search_class_result.pagination.last
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  //helper function to "combine" results for the search bar results.
  // if the relevant queries is not in the planner, should resort to "none" as status and grey background
  cross_reference(search_class_result, classes_in_planner) {
    return search_class_result.data.map((element) => {
      let found = false;
      let new_status = "";
      let _id = "";

      classes_in_planner.forEach((each_class) => {
        if (
          each_class.number === element.number &&
          each_class.term === element.term &&
          each_class.title === element.title
        ) {
          found = true;
          new_status = each_class.status;
          _id = each_class._id;
        }
      });

      let new_element = element;
      new_element.status = found ? new_status : "none";
      if (found) {
        new_element._id = _id;
      }
      return new_element;
    });
  }

  render() {
    return (
      <>
        <Container>
          <Switch>
            <Route exact path="/">
              <HomePage data={this.state.data} changeClass={this.changeClass} />
            </Route>
            <Route path="/search">
              <SearchClass
                search_bar_value={this.state.search_bar_value}
                search_data={this.state.search_bar_data}
                search_pagination = {this.state.search_pagination_limit}
                searchDisplay={this.searchAndDisplay}
                changeClass={this.changeClass}
              />
            </Route>
            <Route>
              <b>404 - Not Found!</b>
            </Route>
          </Switch>
        </Container>
      </>
    );
  }
}

export default App;
