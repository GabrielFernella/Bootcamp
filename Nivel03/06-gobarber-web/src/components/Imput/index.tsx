import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons'; //Passando as propriedades dos ícones para a interface
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core'; // Dentro desse componente fica a lógica de registro para envio de formulário

//import Tooltip from '../../components/Tooltip';

import { Container, Error } from './styles';

//propriedades da tag Input
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}
// o Icone precisou ser renomeado para que o React reconhecesse que Icon é um component, não uma tag
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null); //Referencia, permite ter acessa a essa referencia de qualquer lugar

  const [isFocused, setIsFocused] = useState(false); // state para verificar o focus do input
  const [isFilled, setIsFilled] = useState(false); // está preenchido (verifica se tem valor no input)

  const { fieldName, defaultValue, error, registerField } = useField(name); // Busca as atualizações do submit

  //Hook callcback - Funções que não são recriadas quando o componente for atualizado(são memorizadas)
  // Essa fução procura se possui algum valor no input para ficar com a mesma cor
  const handleInputBlur = useCallback(() => {
    // Quando houver uma função dentro de um componente, use o useCallback
    setIsFocused(false);
    //if (inputRef.current?.value) setIsFilled(true);
    //else setIsFilled(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    //Quando for ativado o submit do formulário, temos que buscar o valor de cada input
    //Registro de cada input
    registerField({
      name: fieldName, // retorno do nome
      ref: inputRef.current, // referencia do elemento
      path: 'value', //acessando a propriedade value
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus} //quando ganhou foco
        onBlur={handleInputBlur} //quando perdeu foco
        defaultValue={defaultValue} //permite setar um valor inicial
        ref={inputRef} // aplica referencia ao input
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
