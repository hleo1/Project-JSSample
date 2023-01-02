import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
// import theme from "./theme"
import { ColorModeScript } from "@chakra-ui/react"
ReactDOM.render(
  <ChakraProvider>
    <Router>
      <ColorModeScript initialColorMode="light"/>
      <App />
    </Router>
  </ChakraProvider>,
  document.getElementById("root")
);
