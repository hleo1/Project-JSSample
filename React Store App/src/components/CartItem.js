import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Stack,
  Image,
  GridItem,
  Text,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import PropTypes from "prop-types";

const MIN_QUANTITY = 0;

function CartItem(props) {
  const [quantity, setQuantity] = useState(MIN_QUANTITY);

  // eslint-disable-next-line
  useEffect(() => {setQuantity(props.item.quantity);}, []);

  const { item, updateCart } = props;


  const updateQuantity = (new_quantity) => {
    if (new_quantity >= MIN_QUANTITY) {
      setQuantity(new_quantity);
      updateCart(item, new_quantity);
    }
  };

  const handleOnChange = (event) => {
    const quantity = Number.parseInt(event.target.value);
    updateQuantity(quantity);
  };

  const incrementQuantity = () => {
    const new_quantity = quantity + 1;
    updateQuantity(new_quantity);
  };

  const decrementQuantity = () => {
    const less_quantity = quantity - 1;
    updateQuantity(less_quantity);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2} mb={4}>
      <GridItem>
        <Link to={`/product/${item.id}`}>
          <Image
            rounded="lg"
            boxSize="100px"
            objectFit="scale-down"
            src={item.image}
            alt={item.title}
            draggable="false"
            loading="lazy"
          />
        </Link>
      </GridItem>
      <GridItem colSpan={2}>
        <Stack spacing="0.5">
          <Text fontWeight="sm">{item.title}</Text>
          <Text fontSize="medium" fontWeight="bold">
            ${item.price}
          </Text>
        </Stack>
      </GridItem>
      <GridItem>
        <form onSubmit={handleOnSubmit}>
          <FormControl>
            <FormLabel>Quantity</FormLabel>
            <NumberInput value={quantity}>
              <NumberInputField onChange={handleOnChange} />
              <NumberInputStepper>
                <NumberIncrementStepper onClick={incrementQuantity} />
                <NumberDecrementStepper onClick={decrementQuantity} />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </form>
      </GridItem>
    </Grid>
  );
}

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  updateCart: PropTypes.func.isRequired
};
