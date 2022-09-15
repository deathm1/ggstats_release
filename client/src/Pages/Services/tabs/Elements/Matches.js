import * as React from 'react'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
}

export default function Matches(props) {
  return (
    <Grid sx={{ marginBottom: 4, marginTop: 2 }} container spacing={1}>
      <Grid item lg={4} xs={12} align="center">
        <Pie
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
          data={{
            labels: ['Draws/Losses', 'Macth Wins'],
            datasets: [
              {
                label: 'Win Loss Pie Chart',
                data: [
                  props.stats[69].value - props.stats[96].value,
                  props.stats[96].value,
                ],
                backgroundColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)'],
                borderColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)'],
              },
            ],
          }}
        />
      </Grid>
      <Grid item lg={8} xs={12}>
        <Typography variant="h5">Match Chart</Typography>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AssessmentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Matches Played"
              secondary={props.stats[69].value}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EmojiEventsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Matches Won"
              secondary={props.stats[96].value}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ThumbDownOffAltIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Match Lost / Draws"
              secondary={props.stats[69].value - props.stats[96].value}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Grid>
    </Grid>
  )
}
