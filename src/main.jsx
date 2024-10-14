import { createRoot } from 'react-dom/client'
import { PokemonsProvider } from './context/PokemonsContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PokemonsProvider>
      <App />
    </PokemonsProvider>
  </BrowserRouter>
);

