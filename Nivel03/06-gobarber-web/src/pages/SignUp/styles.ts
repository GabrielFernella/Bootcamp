import styled from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh; /*Force container a ocupar 100% da tela*/

  display: flex;
  align-items: stretch; /*Estica o conteudo */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center; /*Alinha tudo no centro*/

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  /*Funciona como uma ancora, ou seja, ele só estiliza todos os conteudos que estiver no mesmo nível que está sendo declarado, não afetando outras tags */
  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Background = styled.div`
  flex: 1; /*Ocupa todo o espaço, menos o do container ao lado*/

  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover; /*Faz a imagem ocupar todo o espaço*/
`;