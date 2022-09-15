import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import AppBar from "../AppBar/AppBar";
import Footer from "../Footer/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Pages
import Home from "../../Pages/Home/Home";
import Developer from "../../Pages/Developer/Developer";
import Privacy from "../../Pages/Privacy/Privacy";
import Support from "../../Pages/Support/Support";
import About from "../../Pages/About/About";
import CSGO from "../../Pages/Services/CSGO";
// Themes
const lightTheme = createTheme({
  palette: {
    mode: "light",
    // primary: {
    //   main: "#212121",
    // },
    // secondary: {
    //   main: "#3f51b5",
    // },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MasterInterface(props) {
  const [isDarkMode, setDarkMode] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <AppBar set_dark_mode={setDarkMode} />
        <Routes>
          <Route
            exact
            path="/*"
            element={
              <Home
                is_dark_mode={isDarkMode}
                is_mobile={props.is_mobile}
                set_open_backdrop={setOpenBackdrop}
              />
            }
          />

          <Route
            exact
            path="/service/csgo/:handle"
            element={
              <CSGO
                is_dark_mode={isDarkMode}
                is_mobile={props.is_mobile}
                set_open_backdrop={setOpenBackdrop}
              />
            }
          />
          <Route
            exact
            path="/developer"
            element={
              <Developer
                is_dark_mode={isDarkMode}
                is_mobile={props.is_mobile}
                set_open_backdrop={setOpenBackdrop}
              />
            }
          />
          <Route
            exact
            path="/privacy"
            element={
              <Privacy
                is_dark_mode={isDarkMode}
                is_mobile={props.is_mobile}
                set_open_backdrop={setOpenBackdrop}
              />
            }
          />
          <Route
            exact
            path="/support"
            element={
              <Support
                is_dark_mode={isDarkMode}
                is_mobile={props.is_mobile}
                set_open_backdrop={setOpenBackdrop}
              />
            }
          />
          <Route
            exact
            path="/about"
            element={
              <About
                is_dark_mode={isDarkMode}
                is_mobile={props.is_mobile}
                set_open_backdrop={setOpenBackdrop}
              />
            }
          />
        </Routes>
        <Footer is_mobile={props.is_mobile} />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider>
    </Box>
  );
}

export default MasterInterface;
