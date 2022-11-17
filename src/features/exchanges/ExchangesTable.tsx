import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { Exchange, ExchangeTableProps } from './exchangesTypes';

const ExchangeTable = ({
  exchanges,
  sort,
  onSortChange,
  onShowExchange
}: ExchangeTableProps) => {

  const onSortLabelClick = (field: keyof Exchange) => {
    const order = (sort?.orderBy === field && sort?.order === 'asc') ? 'desc' : 'asc';
    onSortChange({ orderBy: field, order });
  };

  return (
    <div id='exchanges-table'>
      <Container maxWidth='md'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Platform</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sort?.orderBy === 'price'}
                    direction={sort?.orderBy === 'price' ? sort?.order : 'asc'}
                    onClick={() => onSortLabelClick('price')}
                  >
                    Price
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exchanges.map((item) => {
                const [firstPair, secondPair] = item.pair?.split('_') || ['', ''];
                return (
                  <TableRow
                    key={item.platform}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='td' scope='row' align='left' >
                      {item.platform}
                    </TableCell>
                    <TableCell
                      onClick={e => {
                        e.preventDefault();
                        if (item.status !== 'failed') {
                          onShowExchange(item.platform);
                        }
                      }}
                    >
                      {item.status === 'failed' ? 'Symbol not supported.'
                        : <Link href='#'>1 ${firstPair} = ${item.price} ${secondPair}</Link>}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default ExchangeTable;
