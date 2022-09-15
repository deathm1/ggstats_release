import * as React from 'react'
import Grid from '@mui/material/Grid'
import { Paper, Typography } from '@mui/material'
import { Pie } from 'react-chartjs-2'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import AssessmentIcon from '@mui/icons-material/Assessment'
import Divider from '@mui/material/Divider'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat'
import NumbersIcon from '@mui/icons-material/Numbers'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)
const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
}

export default function Matches(props) {
  for (var i = 0; i < props.stats.length; i++) {
    if (props.stats[i].name === 'total_kills_headshot') {
      console.log(i)
    }
  }
  return (
    <Grid sx={{ marginBottom: 4, marginTop: 2 }} container spacing={1}>
      <Grid item lg={8} xs={12}>
        <Typography variant="h5">Kill Death Chart</Typography>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EmojiEventsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Total Kills"
              secondary={props.stats[10].value}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AirlineSeatFlatIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Total Deaths"
              secondary={props.stats[12].value}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AssessmentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="K/D Ratio"
              secondary={(
                props.stats[10].value / props.stats[12].value
              ).toFixed(2)}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <NumbersIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Headshot Percentage"
              secondary={`${(
                (props.stats[21].value / props.stats[10].value) *
                100
              ).toFixed(2)} %`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Grid>
      <Grid item lg={4} xs={12} align="center">
        <Pie
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
          data={{
            labels: ['Deaths', 'Kills'],
            datasets: [
              {
                label: 'Kills / Death Chart',
                data: [props.stats[12].value, props.stats[10].value],
                backgroundColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)'],
                borderColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)'],
              },
            ],
          }}
        />
      </Grid>
    </Grid>
  )
}
