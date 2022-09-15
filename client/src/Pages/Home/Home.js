import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import LoadingButton from "@mui/lab/LoadingButton";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import { Button, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import { load } from "recaptcha-v3";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
const {
  REACT_APP_GET_SHARABLE_LINK,
  REACT_APP_STEAM_QUERY_NORMALIZER,
  REACT_APP_RECAPTCHA_TOKEN,
} = process.env;
const options = ["Counter Strike : Global Offensive"];
const inputPlaceholder = [
  "Enter SteamID / Steam Handle",
  "Enter Valorant handle ex. somename#1234 ",
  "Enter Ubisoft Username",
];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Home(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentSelection, setCurrentSelection] = React.useState("Select App");
  const [userQuery, setUserQuery] = React.useState("");
  const [platformSelected, setPlatformSelected] = React.useState(false);
  const [platformHandle, setPlatformHandle] = React.useState(
    "Enter Platform Handle"
  );
  const [openSnack, setOpenSnack] = React.useState(false);
  const [navigateLink, setnavigateLink] = React.useState("");

  const [snackMessage, setSnackMessage] = React.useState("Snack Message");
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleNavigate = (link) => {
    window.location = link;
  };

  const action = (
    <React.Fragment>
      <IconButton color="inherit" onClick={handleSnackClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const selectApp = (key) => {
    setAnchorEl(null);
    setCurrentSelection(options[key]);
    setPlatformHandle(inputPlaceholder[key]);
    setPlatformSelected(true);
    setCurrentIndex(key);
  };
  const handleOnChange = (e) => {
    setUserQuery(e.target.value);
  };
  React.useEffect(() => {
    return () => {
      const raw = window.location.pathname;
      if (raw !== "/") {
        const url = raw.substring(1, raw.length);
        shortURLHandler(url);
      }
    };
  }, []);

  const shortURLHandler = (myURL) => {
    const myRegex = new RegExp("^[a-zA-Z0-9]{6}$");
    if (myRegex.test(myURL)) {
      load(REACT_APP_RECAPTCHA_TOKEN, {
        useRecaptchaNet: true,
        autoHideBadge: true,
      }).then((recaptcha) => {
        recaptcha
          .execute("submit")
          .then((token) => {
            axios({
              method: "post",
              url: REACT_APP_GET_SHARABLE_LINK,
              data: {
                sharebleString: myURL,
              },
              headers: {
                "Content-Type": "application/json",
                response: token,
              },
            })
              .then(function (response) {
                if (response.data.data.endPoint === 0) {
                  if (response.data.success) {
                    setOpenDialog(true);
                    setnavigateLink(
                      `/service/csgo/${response.data.data.handle}`
                    );
                  }
                }
              })
              .catch(function (error) {
                setLoading(false);
                setOpenSnack(true);
                setSnackMessage(error.response.data.status);
              })
              .then(function () {
                setLoading(false);
              });
          })
          .catch((error) => {
            setLoading(false);
            setOpenSnack(true);
            setSnackMessage(
              "Something went wrong while processing request data."
            );
          });
      });
    } else {
      setOpenSnack(true);
      setSnackMessage("Error, Invalid URL / Short URL.");
    }
  };

  const handleSearchResult = () => {
    setLoading(true);
    if (userQuery === "" || !platformSelected) {
      setOpenSnack(true);
      setSnackMessage("Error, Missing details.");
      setLoading(false);
    } else {
      if (currentIndex === 0) {
        load(REACT_APP_RECAPTCHA_TOKEN, {
          useRecaptchaNet: true,
          autoHideBadge: true,
        }).then((recaptcha) => {
          recaptcha
            .execute("submit")
            .then((token) => {
              axios({
                method: "post",
                url: REACT_APP_STEAM_QUERY_NORMALIZER,
                data: {
                  platform: currentIndex,
                  handle: userQuery,
                },
                headers: {
                  "Content-Type": "application/json",
                  response: token,
                },
              })
                .then(function (response) {
                  window.location = `/service/csgo/${response.data.steamId}`;
                })
                .catch(function (error) {
                  setLoading(false);
                  setOpenSnack(true);
                  setSnackMessage(
                    `Something went wrong while fetching data for/from ${currentSelection}`
                  );
                })
                .then(function () {
                  setLoading(false);
                });
            })
            .catch((error) => {
              setLoading(false);
              setOpenSnack(true);
              setSnackMessage(
                "Something went wrong while processing request data."
              );
            });
        });
      }
    }
  };

  return (
    <Box
      sx={{
        marginTop: 2,
        p: props.is_mobile ? 2 : 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{ m: 1, fontWeight: "bold", marginBottom: "20px" }}
        variant={props.is_mobile ? "h4" : "h5"}
      >
        Get &amp; Share Game Stats For Free !!!
      </Typography>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "5px 5px 5px",
          width: props.is_mobile ? 1 : 0.6,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={platformHandle}
          value={userQuery}
          onChange={handleOnChange}
        />
        {props.is_mobile ? (
          ""
        ) : (
          <>
            <Button
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ textTransform: "none" }}
              variant="outlined"
            >
              {currentSelection}
            </Button>
            <Menu anchorEl={anchorEl} open={open}>
              {options.map((value, key) => {
                return (
                  <MenuItem
                    key={key}
                    onClick={() => {
                      selectApp(key);
                    }}
                  >
                    {value}
                  </MenuItem>
                );
              })}
            </Menu>
            <LoadingButton
              sx={{ marginLeft: "5px", textTransform: "none" }}
              onClick={handleSearchResult}
              loading={loading}
              loadingPosition="start"
              startIcon={<SearchIcon />}
              variant="contained"
            >
              Search
            </LoadingButton>
          </>
        )}
      </Paper>
      {props.is_mobile ? (
        <>
          <Box
            sx={{ marginTop: "10px", display: "flex", textTransform: "none" }}
            variant="contained"
          >
            <Button
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ textTransform: "none" }}
              variant="outlined"
            >
              {currentSelection[0] +
                currentSelection[1] +
                currentSelection[2] +
                currentSelection[3] +
                currentSelection[4] +
                currentSelection[5] +
                currentSelection[6] +
                "..."}
            </Button>
            <Menu anchorEl={anchorEl} open={open}>
              {options.map((value, key) => {
                return (
                  <MenuItem
                    key={key}
                    onClick={() => {
                      selectApp(key);
                    }}
                  >
                    {value}
                  </MenuItem>
                );
              })}
            </Menu>
            <LoadingButton
              sx={{ marginLeft: "5px", textTransform: "none" }}
              onClick={handleSearchResult}
              loading={loading}
              loadingPosition="start"
              startIcon={<SearchIcon />}
              variant="contained"
            >
              Search
            </LoadingButton>
          </Box>
        </>
      ) : (
        ""
      )}
      <Typography
        sx={{ m: 1, width: props.is_mobile ? "100%" : "60%" }}
        color="text.secondary"
      >
        Choose your platform from the dropdown and enter your username/handle
        and get statistics instantly.
      </Typography>
      <Box sx={{ width: props.is_mobile ? "100%" : "60%" }}>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item xs={12}>
            <h3>Release Notes</h3>
            <ul>
              <li>Initial Release v1.0.0</li>
              <li>Linked Steam CS:GO statistics with ggStats</li>
              <li>Dark / Light Mode toggle</li>
              <li>Ablility to generate sharable links</li>
            </ul>
            <h3>Dev Notes</h3>
            <ul>
              <li>
                Stats from Valorant and Rainbow Six Siege are not yet
                implemented
              </li>
            </ul>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Resolve Shortlink"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            A valid sharable link has been detected, Please click on 'Go' to
            fetch platform details.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={() => {
              handleNavigate(navigateLink);
            }}
          >
            Go
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={snackMessage}
        action={action}
      />
    </Box>
  );
}
