import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import {
  Box,
  Stack,
  VStack,
  Image,
  Button,
  Text,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import * as API from "../services/api";
import PropTypes from "prop-types";

const MIN_QUANTITY = 1;

function Product(props) {

  const [item, setItem] = useState({});

  const [quantity, setQuantity] = useState(MIN_QUANTITY);

  useEffect(() => {
    API.get(props.match.params.id)
      .then((item) => setItem(item))
      .catch((err) => console.log(err));
  // eslint-disable-next-line
  }, []);

  const updateQuantity = (event) => {
    const new_quantity = Number.parseInt(event.target.value);
    if (new_quantity >= MIN_QUANTITY) {
      setQuantity(new_quantity);
    }
  };

  const incrementQuantity = () => {
    const new_quantity = quantity + 1;
    if (new_quantity >= MIN_QUANTITY) {
      setQuantity(new_quantity);
    }
  };

  const decrementQuantity = () => {
    const new_quantity = quantity - 1;
    if (new_quantity >= MIN_QUANTITY) {
      setQuantity(new_quantity);
    }
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    const { addToCart } = props;
    addToCart(item, quantity);
    setQuantity(1);
    props.history.push("/");
  };

    return (
      <Box
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        align={"center"}
        p={5}
        my={4}
      >
        {!item ? (
          <Box m="2">
            <VStack spacing={4} align="center">
              <Box>
                <Text fontSize="lg">No item found!</Text>
              </Box>
              <Link to="/">
                <Button variant="outline">Back to product list</Button>
              </Link>
            </VStack>
          </Box>
        ) : (
          <>
            <Image
              boxSize="500px"
              objectFit="scale-down"
              loading="eager"
              src={item.image}
              alt={item.title}
            />
            <Box m="2">
              <Text fontSize="lg">{item.title}</Text>
            </Box>
            <Box m="2">
              <Text fontSize="lg" fontWeight="bold" as="kbd">
                ${item.price}
              </Text>
            </Box>
            <Box m="2" align={"left"} color="gray.500">
              <Text fontSize="lg">{item.description}</Text>
            </Box>
            <Box p={6}>
              <form>
                <FormControl>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput value={quantity}>
                    <NumberInputField onChange={updateQuantity} />
                    <NumberInputStepper>
                      <NumberIncrementStepper
                        onClick={incrementQuantity}
                      />
                      <NumberDecrementStepper
                        onClick={decrementQuantity}
                      />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <Stack spacing={4} direction="row" align="center" mt={4} >
                  <Button onClick={(event) => {
                    handleOnClick(event);
                  }} >Add to cart</Button>
                  <Link to = "/">
                  <Button >Back to product list</Button>
                  </Link>                                    
                </Stack>
              </form>
            </Box>
          </>
        )}
      </Box>
    );
  
}

export default withRouter(Product);

Product.propTypes = {
  addToCart: PropTypes.func.isRequired
};