import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons'; //Passando as propriedades dos ícones para a interface

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}
// o Icone precisou ser renomeado para que o React reconhecesse que Icon é um component, não uma tag
const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Container>
    {Icon && <Icon size={20} />}
    <input {...rest} />{' '}
  </Container>
);

export default Input;
