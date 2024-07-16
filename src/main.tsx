import './index.css';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
  </BrowserRouter>
)
