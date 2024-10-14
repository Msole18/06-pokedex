import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PokemonPage } from './pages/PokemonPage';
import { PageNotFound } from './pages/PageNotFound';

function App() {

  return (
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/pokemon/:id'
          element={<PokemonPage />}
        />
        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
  );
}

export default App;
