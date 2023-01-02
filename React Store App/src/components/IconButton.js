import PropTypes from "prop-types";

import { SunIcon, MoonIcon } from "@chakra-ui/icons";

import { IconButton} from "@chakra-ui/react";
function NewIconButton(props) {

    const {colorMode, toggleColorMode } = props;
    return (

        <IconButton size="s" variant="ghost" onClick = { toggleColorMode } style={{ 'marginTop': '1vh', display: 'block', margin: 'auto' }}>
            {(colorMode === "dark") ? <MoonIcon /> : <SunIcon />}
        </IconButton>
    );
    
}
  
export default NewIconButton;

NewIconButton.propTypes = {
    colorMode: PropTypes.string.isRequired,
    toggleColorMode : PropTypes.func.isRequired
  };
  