import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core'; //interface que possui as tipagens dos formulários
import { Form } from '@unform/web';
import * as Yup from 'yup'; //Validação
import getValidationErrors from '../../utils/getValidationErrors'; // Valida os erros do input
import { Link, useHistory } from 'react-router-dom'; //Trabalhando com rotas
import api from '../../services/api'; //Importando api

import { useToast } from '../../hooks/toast';

import logo from '../../assets/logo.svg';

//Componentes
import Input from '../../components/Imput';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null); //Referenciando o Formulário
  const { addToast } = useToast();
  const history = useHistory();

  // Validando os campos do Imput
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({}); //Precisa iniciar vazio para resetar

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um E-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().min(6, 'Min de 6 caracteres'),
        });

        await schema.validate(data, {
          abortEarly: false, // permite que vc retorne todos os erros de uma vez só
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu logon no Gobarber',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        //Disparar um Toast
        addToast({
          type: 'error',
          title: 'Erro no Cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Container>
        <Background />

        <Content>
          <AnimationContainer>
            <img src={logo} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu Cadastro</h1>
              <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
              <Input
                name="email"
                icon={FiMail}
                type="text"
                placeholder="E-mail"
              />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Cadastrar</Button>
            </Form>

            <Link to="/">
              <FiArrowLeft />
              Voltar para logon
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
