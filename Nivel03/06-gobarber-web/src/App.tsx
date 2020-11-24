import React from 'react';

import GlobalStyle from './styles/global'; //Importando os estilos globais
import SignIn from './pages/SignIn'; // Importando tela
//import SignUp from './pages/SignUp';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
