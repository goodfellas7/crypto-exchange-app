import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TradesTableProps } from './tradesTypes';

const TradesTable = ({
  trades
}: TradesTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell align='right'>Amount</TableCell>
            <TableCell align='right'>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((trade, index) => (
            <TableRow
              key={`${trade.price}${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='td' scope='row'>
                {trade.price.toFixed(5)}
              </TableCell>
              <TableCell component='td' scope='row' align='right'>
                {trade.amount.toFixed(5)}
              </TableCell>
              <TableCell component='td' scope='row' align='right'>
                {trade.total.toFixed(5)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TradesTable;
