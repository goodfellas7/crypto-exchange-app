import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Exchanges from '../exchanges/Exchanges';

const HomePage = () => {
  const params = useParams();
  const { cryptocurrencyPair } = params;
  const inputTimeout = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();

  return (
    <div id='home'>
      <Container sx={{ width: 500, alignItems: 'center' }}>
        <TextField
          defaultValue={cryptocurrencyPair?.split('_').join('/')}
          id='cryptocurrency-pair-input'
          label='Standard'
          variant='standard'
          style={{ marginBottom: 20 }}
          onChange={e => {
            const searchValue = (e.target.value || '').split('/').join('_') || '';
            clearTimeout(inputTimeout?.current);
            inputTimeout.current = setTimeout(() => {
              navigate(`/${searchValue}`, { replace: true });
            }, 500);
          }}
        />
        <Exchanges cryptocurrencyPair={cryptocurrencyPair} />
      </Container>
    </div>
  );
};

export default HomePage;
