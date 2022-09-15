import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { load } from "recaptcha-v3";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import LinearProgress from "@mui/material/LinearProgress";

//tabs
import Dashboard from "./tabs/Dashboard";
import Weapons from "./tabs/Weapons";
import Maps from "./tabs/Maps";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//config
const {
  REACT_APP_GET_APP_DETAILS,
  REACT_APP_RECAPTCHA_TOKEN,
  REACT_APP_GENERATE_SHARABLE_LINK,
} = process.env;

export default function CSGO(props) {
  const [responseData, setResponseData] = React.useState(null);
  const [isDataFetched, setIsDataFetched] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [sharableLoading, setsharableLoading] = React.useState(false);
  const [sharableLink, setSharableLink] = React.useState("");
  const [enalbesharableCopy, setenalbesharableCopy] = React.useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const generateSharableLink = () => {
    setsharableLoading(true);
    load(REACT_APP_RECAPTCHA_TOKEN, {
      useRecaptchaNet: true,
      autoHideBadge: true,
    }).then((recaptcha) => {
      recaptcha
        .execute("submit")
        .then((token) => {
          axios({
            method: "post",
            url: REACT_APP_GENERATE_SHARABLE_LINK,
            data: {
              handle: responseData.steamID,
              platformName: "STEAM",
              endPoint: 0,
            },
            headers: {
              "Content-Type": "application/json",
              response: token,
            },
          })
            .then(function (response) {
              setSharableLink(response.data.id);
              setenalbesharableCopy(true);
            })
            .catch(function (error) {
              setenalbesharableCopy(false);
            })
            .then(function () {
              setsharableLoading(false);
            });
        })
        .catch((error) => {
          setenalbesharableCopy(false);
          setsharableLoading(false);
        });
    });
  };

  const [value, setValue] = React.useState("1");

  function _calculateAge(birthday) {
    // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { handle } = useParams();
  useEffect(() => {
    return () => {
      props.set_open_backdrop(true);
      load(REACT_APP_RECAPTCHA_TOKEN, {
        useRecaptchaNet: true,
        autoHideBadge: true,
      }).then((recaptcha) => {
        recaptcha
          .execute("submit")
          .then((token) => {
            axios({
              method: "post",
              url: `${REACT_APP_GET_APP_DETAILS}0`,
              data: {
                handle: handle,
              },
              headers: {
                "Content-Type": "application/json",
                response: token,
              },
            })
              .then(function (response) {
                props.set_open_backdrop(false);
                setResponseData(response.data);
                setIsDataFetched(true);
              })
              .catch(function (error) {
                props.set_open_backdrop(false);
                setIsDataFetched(false);
              })
              .then(function () {
                props.set_open_backdrop(false);
              });
          })
          .catch((error) => {
            props.set_open_backdrop(false);
            setIsDataFetched(false);
          });
      });
    };
  }, []);
  if (isDataFetched) {
    return (
      <Container>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container justifyContent="center">
            <Grid item lg={3} xs={12} align="center">
              <Card sx={{ maxWidth: 350, marginInline: 1 }}>
                <CardMedia
                  component="img"
                  image={responseData.playerSummary.avatarfull}
                  alt={responseData.playerSummary.personaname}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <b>{responseData.playerSummary.personaname}</b>
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <b>
                      {responseData.playerSummary.realname} [
                      {responseData.playerSummary.loccountrycode}]
                    </b>
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    created this profile on{" "}
                    <b>
                      {new Date(
                        responseData.playerSummary.timecreated * 1000
                      ).toLocaleString("en-IN")}
                    </b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    has been using it for{" "}
                    <b>
                      {_calculateAge(
                        new Date(responseData.playerSummary.timecreated * 1000)
                      )}
                    </b>{" "}
                    year(s).
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <CopyToClipboard text={responseData.playerSummary.steamid}>
                      <Button>Copy Steam ID</Button>
                    </CopyToClipboard>
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleClickOpen}
                  >
                    Share
                  </Button>

                  <Button
                    size="small"
                    color="primary"
                    href={responseData.playerSummary.profileurl}
                  >
                    Steam Profile
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item lg={9} xs={12}>
              <TabContext value={value}>
                <TabList
                  onChange={handleChange}
                  aria-label="CSGO Tabs"
                  variant="scrollable"
                  allowScrollButtonsMobile
                  scrollButtons
                >
                  <Tab label="Dashboard" value="1" />
                  <Tab label="Weapons" value="2" />
                  <Tab label="Maps" value="3" />
                </TabList>

                <TabPanel value="1">
                  <Dashboard
                    achievements={responseData.csgoData.achievements}
                    stats={responseData.csgoData.stats}
                  />
                </TabPanel>
                <TabPanel value="2">
                  <Weapons
                    stats={responseData.csgoData.stats.sort(function (a, b) {
                      return b.value - a.value;
                    })}
                  />
                </TabPanel>

                <TabPanel value="3">
                  <Maps
                    stats={responseData.csgoData.stats.sort(function (a, b) {
                      return b.value - a.value;
                    })}
                  />
                </TabPanel>
              </TabContext>
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
          <DialogTitle>{"Generate Sharable Link"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              With ggstats you can share any CSGO Profile for free by generating
              a short/sharable link. The link will expire automatically in 15
              miunutes.
              {enalbesharableCopy ? (
                <>
                  <br></br>
                  <br></br>
                  Click Here to copy link
                  <br></br>
                  <CopyToClipboard text={sharableLink}>
                    <Button style={{ textTransform: "none" }}>
                      {sharableLink}
                    </Button>
                  </CopyToClipboard>
                </>
              ) : (
                ""
              )}
              {sharableLoading ? <LinearProgress /> : ""}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={generateSharableLink}>Generate</Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  } else {
    return (
      <Container>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Fetching Data...</Typography>
          <Typography variant="p">
            Data is still being fetched, please wait. It this page is stuck here
            then probably the details you have entered are invalid.
            <h3>Possible Reasons</h3>
            <ul>
              <li>Your Steam profile visibility is private.</li>

              <li>You have been issued a VAC / Overwatch Ban.</li>
            </ul>
          </Typography>
        </Box>
      </Container>
    );
  }
}
