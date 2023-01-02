import { Link } from "react-router-dom";
import { useEffect } from "react";
import { withRouter } from "react-router";
import { Box, Heading, Stack, Button, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Confirmation(props) {

  useEffect(() => {
    return () => props.clearCart();
    // eslint-disable-next-line
  }, []);

    const name = props.location.state
      ? props.location.state.name
      : undefined;
    const total = props.location.state
      ? props.location.state.total
      : 0;

    return (
      <Box my={2} p={4} borderWidth="2px" borderRadius="lg" overflow="hidden">
        <Stack spacing={6}>
          {!name ? (
            <Heading>No order has been placed!</Heading>
          ) : (
            <>
              <Heading>Success! 🎉</Heading>
              <Text fontSize="lg">
                Thank you, <Text as="i">{name}</Text>!
              </Text>
              <Text fontSize="lg">
                Your <Text as="kbd">${total.toFixed(2)}</Text> order is
                confirmed!
              </Text>
              <Text fontSize="lg">
                Please allow 1-3 business day(s) for shipping!
              </Text>
            </>
          )}
          <Link to="/">
            <Button>Back to store!</Button>
          </Link>
        </Stack>
      </Box>
    );
  
}

export default withRouter(Confirmation);

Confirmation.propTypes = {
  clearCart: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};
