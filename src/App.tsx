
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import DetailsPage from './features/details/DetailsPage';

function App() {
  return (
    <div className='App'>
      <header>
        <h1>Crypto Exchange App</h1>
      </header>
      <div className='content'>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/:cryptocurrencyPair' element={<HomePage />} />
          <Route path='/:cryptocurrencyPair/details' element={<DetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
