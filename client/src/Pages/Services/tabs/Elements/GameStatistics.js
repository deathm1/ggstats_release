import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export default function Matches(props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Game Statistics ({props.stats.length})</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container justifyContent="center">
          <Grid item sm={9} xs={12}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Parameter</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.stats.map((value, key) => {
                    return (
                      <TableRow
                        key={key}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell>{key + 1}</TableCell>
                        <TableCell>{value.name}</TableCell>
                        <TableCell>{value.value}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
