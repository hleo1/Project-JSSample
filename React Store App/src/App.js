import { useState } from "react";
import { Switch, Route } from "react-router";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Confirmation from "./pages/Confirmation";
import Header from "./components/Header";
import NewIconButton from "./components/IconButton";

import { useToast,
  Container,
  Center, 

  useColorMode } from "@chakra-ui/react";


function App(props) {

  const [cart, setCart] = useState({});
  // const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();


  const addToCart = (item, quantity) => {
    const currQuantity = cart[item.id]
          ? cart[item.id].quantity + quantity
          : quantity;
    setCart( {
      ...cart,
      [item.id]: { ...item, quantity: currQuantity },
    });

    toast({
      title: "Alert!",
      description: "Item added to the cart!",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  };

  // PRE: item is already in the cart!
  const updateCart = (item, new_quantity) => {


    let new_cart = cart;

    if (new_quantity === 0) {
      delete new_cart[item.id];
      toast({
        title: "Alert!",
        description: "Item removed from the cart!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      new_cart[item.id].quantity = new_quantity;
    }
    setCart(new_cart);
  };

  const clearCart = () => {
    setCart({});
  };

  const {colorMode, toggleColorMode } = useColorMode();

    return (
      <Center>
        <Container>
          <NewIconButton colorMode = {colorMode} toggleColorMode = {toggleColorMode} />
        <Switch>
          <Route exact path="/">
            <Header numItems={Object.keys(cart).length} />
            <Shop addToCart={addToCart}  />
          </Route>
          <Route path="/product/:id">
            <Product addToCart={addToCart} />
          </Route>
          <Route path="/cart" >
            <Header numItems={Object.keys(cart).length} />
            <Cart items={Object.values(cart)} updateCart={updateCart} />
          </Route>
          <Route path="/confirmation">
            <Confirmation clearCart={clearCart} />
          </Route>
        </Switch>
      </Container>
      </Center>
      
    );
}

export default App;
