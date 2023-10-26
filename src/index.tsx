import ReactDOM from 'react-dom/client';
import { App } from './App';

import { ChakraProvider } from "@chakra-ui/react"
import { theme } from './shared/chakra-ui-api/theme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
