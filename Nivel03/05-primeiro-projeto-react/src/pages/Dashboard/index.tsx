import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/39594204?s=460&u=c3395abbd7a4c831add26f21eae655454fe34b2f&v=4"
            alt="Fernella"
          />
          <div>
            <strong>GabrielFernella/unform</strong>
            <p>Criando aplicações react com typescript🚀</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/39594204?s=460&u=c3395abbd7a4c831add26f21eae655454fe34b2f&v=4"
            alt="Fernella"
          />
          <div>
            <strong>GabrielFernella/unform</strong>
            <p>Criando aplicações react com typescript🚀</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/39594204?s=460&u=c3395abbd7a4c831add26f21eae655454fe34b2f&v=4"
            alt="Fernella"
          />
          <div>
            <strong>GabrielFernella/unform</strong>
            <p>Criando aplicações react com typescript🚀</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
