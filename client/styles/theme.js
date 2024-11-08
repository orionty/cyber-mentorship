import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
    cyber: {
      primary: "#00ff00",
      secondary: "#0000ff",
      accent: "#ff00ff",
    },
  },
  fonts: {
    heading: "'Roboto', sans-serif",
    body: "'Open Sans', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === "dark" ? "cyber.primary" : "cyber.secondary",
          color: "white",
        }),
      },
    },
  },
});

export default theme;

