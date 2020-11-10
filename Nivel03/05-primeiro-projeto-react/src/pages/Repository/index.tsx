import React from 'react';
import { useRouteMatch } from 'react-router-dom';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>(); // useRouteMatch serve para pegar os parametros da rota
  return <h1>Repository:{params.repository}</h1>;
};

export default Repository;
