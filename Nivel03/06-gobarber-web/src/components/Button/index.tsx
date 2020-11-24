import React, { ButtonHTMLAttributes } from 'react'; //Precisa importar o tipo da tag do HTML

import { Container } from './styles'; //arquivo de estilos

//Forma compacta de criar interfaces sem a necessidade de passar atributos
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; //Busca os atributos de Button no HTML

//Componente que com seus parametros
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;

//children = se refere a content dentro da tag
// ...rest = se refere a todos os outros atributos
