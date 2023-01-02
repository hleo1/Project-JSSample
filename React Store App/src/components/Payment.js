import { useState } from "react";
import { withRouter } from "react-router";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function Payment(props) {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [card, setCard] = useState("");


  const updateForm = (event) => {

    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "address") {
      setAddress(event.target.value);
    } else if (event.target.name === "card") {
      setCard(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const location = {
      pathname: "/confirmation",
      state: { name: name, total: props.total },
    };
    props.history.push(location);
  };

  const isValid =
    name.length >= 3 && address.length >= 6 && card.length >= 16;

    return (
      <Box p={4} borderWidth="2px" borderRadius="lg" overflow="hidden">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              id="name"
              minLength="3"
              name="name"
              placeholder="(minimum 3 characters)"
              required
              type="text"
              value={name}
              onChange={updateForm}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="name">Address</FormLabel>
            <Input
              id="address"
              minLength="6"
              name="address"
              placeholder="(minimum 6 characters)"
              required
              type="text"
              value={address}
              onChange={updateForm}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="name">Credit Card</FormLabel>
            <Input
              id="card"
              maxLength="16"
              minLength="16"
              name="card"
              placeholder="(16-digits number)"
              required
              type="number"
              value={card}
              onChange={updateForm}
            />
          </FormControl>
          <FormControl mt={4}>
            <Button colorScheme="teal" disabled={!isValid} type={"submit"}>
              Submit
            </Button>
          </FormControl>
        </form>
      </Box>
    );
  
}

export default withRouter(Payment);
Payment.propTypes = {
  total: PropTypes.number.isRequired
};