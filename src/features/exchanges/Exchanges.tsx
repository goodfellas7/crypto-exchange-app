import { memo, useState, } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { Platform, Sort } from '../common/commonTypes';
import ExchangesTable from './ExchangesTable';
import { Exchange, ExchangesProps } from './exchangesTypes';
import useExchanges from './useExchanges';
import TradesTable from '../trades/TradesTable';
import useTrades from '../trades/useTrades';

const Exchanges = ({
  cryptocurrencyPair
}: ExchangesProps) => {
  const [platform, setPlatform] = useState<Platform | null>();
  const [sort, setSort] = useState<Sort<keyof Exchange>>();
  const {
    exchanges,
    isLoading,
  } = useExchanges({ cryptocurrencyPair, sort });
  const trades = useTrades({ platform, cryptocurrencyPair });

  return (
    <div id='exchanges'>
      <Container sx={{ height: 50 }}>{isLoading ? <CircularProgress /> : null}</Container>
      <ExchangesTable
        exchanges={exchanges}
        sort={sort}
        onSortChange={setSort}
        onShowExchange={platform => setPlatform(platform)}
      />
      <Dialog
        open={!!platform}
        onClose={() => setPlatform(null)}
      >
        <DialogTitle>{cryptocurrencyPair?.split('_').join('/')}</DialogTitle>
        <TradesTable trades={trades} />
      </Dialog>
    </div>
  );
}

export default memo(Exchanges);
