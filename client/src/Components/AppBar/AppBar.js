import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import LightModeIcon from "@mui/icons-material/LightMode";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import CheckIcon from "@mui/icons-material/Check";
import ComputerIcon from "@mui/icons-material/Computer";
const pages = ["developer", "privacy", "support", "about"];
const services = ["CSGO"];

const ResponsiveAppBar = (props) => {
  const [drawerRight, setDrawerRight] = useState(false);
  const [drawerLeft, setDrawerLeft] = useState(false);
  const [siteTheme, setSiteTheme] = useState("light");
  const [enableDisableCookies, setEnableDisableCookies] = useState("enable");

  useEffect(() => {
    return () => {
      const areCookiesAllowed = Cookies.get("cookiesAllowed");
      const currentTheme = Cookies.get("siteTheme");

      if (areCookiesAllowed === "enable" || areCookiesAllowed !== undefined) {
        setEnableDisableCookies(areCookiesAllowed);
        setSiteTheme(currentTheme);

        if (currentTheme === "system") {
          if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          ) {
            props.set_dark_mode(true);
          } else {
            props.set_dark_mode(false);
          }
        } else if (currentTheme === "dark") {
          props.set_dark_mode(true);
        } else if (currentTheme === "light") {
          props.set_dark_mode(false);
        } else {
          if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          ) {
            props.set_dark_mode(true);
          } else {
            props.set_dark_mode(false);
          }
          setSiteTheme("system");
        }
      } else {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          props.set_dark_mode(true);
        } else {
          props.set_dark_mode(false);
        }
        setSiteTheme("system");
        setEnableDisableCookies("disable");
      }
    };
  }, []);
  const handleTheme = (event, myCurrentTheme) => {
    if (myCurrentTheme !== null) {
      setSiteTheme(myCurrentTheme);
      if (myCurrentTheme === "system") {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          props.set_dark_mode(true);
        } else {
          props.set_dark_mode(false);
        }
      }

      if (myCurrentTheme === "dark") {
        props.set_dark_mode(true);
      }

      if (myCurrentTheme === "light") {
        props.set_dark_mode(false);
      }
      const arCookiesAllowed = Cookies.get("cookiesAllowed", {
        path: "/",
        expires: 7,
        sameSite: "lax",
      });

      if (arCookiesAllowed === "enable" && arCookiesAllowed !== undefined) {
        Cookies.set("siteTheme", myCurrentTheme);
      }
    }
  };
  const handleCookies = (event, myCurrentState) => {
    if (myCurrentState !== null) {
      setEnableDisableCookies(myCurrentState);
      Cookies.set("cookiesAllowed", myCurrentState, {
        path: "/",
        expires: 7,
        sameSite: "lax",
      });

      if (myCurrentState === "disable") {
        Cookies.remove("cookiesAllowed");
        Cookies.remove("siteTheme");
      }
    }
  };
  const handleCloseLeftDrawer = (page_to_nav) => {
    setDrawerLeft(false);
    window.location = page_to_nav;
  };
  const handleLogoClick = (myLoc) => {
    window.location = myLoc;
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <AppBar elevation={0} color="inherit" position="static">
      <Container>
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            disableRipple
            onClick={() => handleLogoClick("/")}
          >
            <SportsEsportsIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,

                color: "inherit",
                textDecoration: "none",
              }}
            >
              ggStats
            </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Tooltip title="Menu">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  setDrawerLeft(!drawerLeft);
                }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>

            <SwipeableDrawer
              anchor="left"
              open={drawerLeft}
              onClose={() => {
                setDrawerLeft(!drawerLeft);
              }}
              onOpen={() => {
                setDrawerLeft(!drawerLeft);
              }}
            >
              <Box width="300px" role="presentation">
                <Box
                  sx={{
                    display: "flex",
                    borderRadius: 1,
                    m: 2,
                  }}
                >
                  <IconButton
                    href="/"
                    disableRipple
                    sx={{ flexGrow: 1, display: "flex", fontWeight: "bold" }}
                  >
                    <Typography
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        fontWeight: "bold",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                      variant="p"
                      noWrap
                    >
                      <SportsEsportsIcon sx={{ m: 1 }} />
                      ggStats
                    </Typography>
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setDrawerLeft(!drawerLeft);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Typography
                  sx={{ m: 1, marginTop: "10px", fontWeight: "bold" }}
                  color="text.secondary"
                >
                  Menu
                </Typography>
                <Divider />

                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => handleCloseLeftDrawer(page)}
                  >
                    <Typography>{capitalizeFirstLetter(page)}</Typography>
                  </MenuItem>
                ))}
              </Box>
            </SwipeableDrawer>
          </Box>
          <IconButton
            color="inherit"
            onClick={() => handleLogoClick("/")}
            disableRipple
            sx={{ mr: 2, display: { xs: "flex", md: "none" }, flexGrow: 1 }}
          >
            <SportsEsportsIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: "bold",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ggStats
            </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                color="inherit"
                key={page}
                onClick={() => handleCloseLeftDrawer(page)}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Tooltip title="Site Settings">
            <IconButton
              color="inherit"
              onClick={() => {
                setDrawerRight(!drawerRight);
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <SwipeableDrawer
          anchor="right"
          open={drawerRight}
          onClose={() => {
            setDrawerRight(!drawerRight);
          }}
          onOpen={() => {
            setDrawerRight(!drawerRight);
          }}
        >
          <Box width="300px" role="presentation">
            <Box
              sx={{
                display: "flex",
                borderRadius: 1,
                m: 2,
              }}
            >
              <Typography sx={{ flexGrow: 1, fontWeight: "bold" }} variant="h5">
                Site Settings
              </Typography>
              <IconButton
                onClick={() => {
                  setDrawerRight(!drawerRight);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />
            <Typography
              sx={{ m: 1, marginTop: "10px", fontWeight: "bold" }}
              color="text.secondary"
            >
              Mode
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                m: 1,
              }}
            >
              <ToggleButtonGroup
                required
                fullWidth
                value={siteTheme}
                exclusive
                onChange={handleTheme}
              >
                <ToggleButton value="light">
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <LightModeIcon />
                    <Typography
                      sx={{ marginLeft: "2px", textTransform: "none" }}
                    >
                      Light
                    </Typography>
                  </Box>
                </ToggleButton>
                <ToggleButton value="system">
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <ComputerIcon />
                    <Typography
                      sx={{ marginLeft: "2px", textTransform: "none" }}
                    >
                      System
                    </Typography>
                  </Box>
                </ToggleButton>
                <ToggleButton value="dark">
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <BedtimeIcon />
                    <Typography
                      sx={{ marginLeft: "2px", textTransform: "none" }}
                    >
                      Dark
                    </Typography>
                  </Box>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Typography
              sx={{ m: 1, marginTop: "10px", fontWeight: "bold" }}
              color="text.secondary"
            >
              Cookies
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                m: 1,
              }}
            >
              <ToggleButtonGroup
                fullWidth
                defaultChecked
                value={enableDisableCookies}
                exclusive
                onChange={handleCookies}
              >
                <ToggleButton value="enable">
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <CheckIcon />
                    <Typography
                      sx={{ marginLeft: "2px", textTransform: "none" }}
                    >
                      Enable
                    </Typography>
                  </Box>
                </ToggleButton>

                <ToggleButton value="disable">
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <CloseIcon />
                    <Typography
                      sx={{ marginLeft: "2px", textTransform: "none" }}
                    >
                      Disable
                    </Typography>
                  </Box>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </SwipeableDrawer>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
