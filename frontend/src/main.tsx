import {createRoot} from 'react-dom/client';
import App from './containers/App';
import {ThemeProvider} from '@mui/material';
import theme from './theme';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <App/>
  </ThemeProvider>,
);
