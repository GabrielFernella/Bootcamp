import React from 'react';

import GlobalStyle from './styles/global'; //Importando os estilos globais
import SignIn from './pages/SignIn'; // Importando tela
//import SignUp from './pages/SignUp';

import AppProvider from './hooks/index'; //Hooks que está agregando diversos outros hooks

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
