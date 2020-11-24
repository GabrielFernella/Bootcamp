//Esse index serve para generalizar todos os Hooks em um só componente, assim o App.tsx não fica tão poluído
import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

//A ordem depende se um depender do outro
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
