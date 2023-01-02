import { Link } from "react-router-dom";
import { Box, Heading, Text, Badge } from "@chakra-ui/react";
import PropTypes from "prop-types";
function Header(props) {
  const { numItems } = props;
  return (
    <Box my={2} p={4} borderWidth="2px" borderRadius="lg" overflow="hidden">
      <Box mb={2} >
        <Heading>React Store</Heading>
      </Box>
      <Text>
      <Link to="/">Product List</Link> | <Link to="/cart">Cart 🛒</Link>
      {numItems > 0 ? (
        <Text as="sup">
          <Badge colorScheme="red">{numItems}</Badge>
        </Text>
      ) : (
        <></>
      )}
      </Text>
      
      
    </Box>
  );
}

export default Header;

Header.propTypes = {
  numItems: PropTypes.number.isRequired
};
