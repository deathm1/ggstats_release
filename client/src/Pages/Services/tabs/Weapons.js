import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function Matches(props) {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4">Hits</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Weapon Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Hits</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.stats.map((value, key) => {
                  var my_arr = value.name.split('_')

                  if (my_arr[0] === 'total' && my_arr[1] === 'hits') {
                    return (
                      <TableRow
                        key={key}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell>{value.name}</TableCell>

                        <TableCell>{value.value}</TableCell>
                      </TableRow>
                    )
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4">Kills</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Weapon Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Kills</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.stats.map((value, key) => {
                  var my_arr = value.name.split('_')

                  if (my_arr[0] === 'total' && my_arr[1] === 'kills') {
                    return (
                      <TableRow
                        key={key}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell>{value.name}</TableCell>

                        <TableCell>{value.value}</TableCell>
                      </TableRow>
                    )
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
