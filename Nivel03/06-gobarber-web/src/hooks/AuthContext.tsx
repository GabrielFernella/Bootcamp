// O context serve para vc acessar as informações de qualquer lugar da aplicação
// Quando é uma informação que necessita estar em vários lugares, faz sentido criarmos um contexto
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api'; // Config da api

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData); //criando um contexto de um objeto

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');
    //confere se já possui no localSorage
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    //Conectando a API
    const response = await api.post('sessions', {
      email,
      password,
    });
    //Salvando os dados dento do LocalStorage
    const { token, user } = response.data;
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  //Logout - Removendo os dados do local Storage
  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  //Esse é o componente que passamos como um context, assim conseguimos disponibilizar essas informações por todo o sistema
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Criamos esse retorno que já passa as propriedade de context, não necessita importar context onde for usar e diminui o acoplamento
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
