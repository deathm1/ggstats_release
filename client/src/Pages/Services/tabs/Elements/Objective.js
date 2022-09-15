import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import target from "../../../../Assets/target.png";
import bomb from "../../../../Assets/bomb.png";
import wanted from "../../../../Assets/cowboy.png";
import kills from "../../../../Assets/knife.png";
import death from "../../../../Assets/skull.png";
import kd from "../../../../Assets/kd.png";
import score from "../../../../Assets/score.png";
import damage from "../../../../Assets/damage.png";
import bullet from "../../../../Assets/bullet.png";
import rupee from "../../../../Assets/rupee.png";
import percentage from "../../../../Assets/percentage.png";
import accuracy from "../../../../Assets/accuracy.png";
import domination from "../../../../Assets/domination.png";
import sniper from "../../../../Assets/sniper.png";
import revenger from "../../../../Assets/revenger.png";
import tool from "../../../../Assets/tool.png";

import MyGridInfo from "./MyGridInfo";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Matches(props) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h4">Objectives</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid container>
            <Grid item sm={4} xs={12}>
              <MyGridInfo
                header="Bombs Planted"
                body={props.stats.bombsPlanted.displayValue}
                image={bomb}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MyGridInfo
                header="Bombs Defused"
                body={props.stats.bombsDefused.displayValue}
                image={tool}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MyGridInfo
                header="Money Earned"
                body={props.stats.moneyEarned.displayValue}
                image={rupee}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={4} xs={12}>
              <MyGridInfo
                header="Hostages Rescued"
                body={props.stats.hostagesRescued.displayValue}
                image={domination}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MyGridInfo
                header="MVP's"
                body={props.stats.mvp.displayValue}
                image={wanted}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MyGridInfo
                header="Damage"
                body={props.stats.damage.displayValue}
                image={damage}
              />
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
