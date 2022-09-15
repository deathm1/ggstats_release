import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export default function Matches(props) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Map Name</b>
            </TableCell>
            <TableCell>
              <b>Round Wins</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.stats.map((value, key) => {
            var my_arr = value.name.split('_')

            if (my_arr[0] === 'total' && my_arr[1] === 'wins') {
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
  )
}
