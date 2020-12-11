import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'; //Importação de ícones
import { FormHandles } from '@unform/core'; //Método de submit de formulário diferente
import { Form } from '@unform/web'; //Método de submit de formulário diferente
import * as Yup from 'yup'; //Usado para validação de schema
import { Link, useHistory } from 'react-router-dom'; //Trabalhando com rotas

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg'; //importando Logo

//Componentes utilizados
import Input from '../../components/Imput';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  // Validando os campos do Imput
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({}); //Precisa iniciar vazio para resetar

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um E-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false, // permite que vc retorne todos os erros de uma vez só
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        //Disparar um Toast
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            <img src={logo} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu logon</h1>
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

              <Button type="submit">Entrar</Button>

              <a href="forgot">Esqueci minha senha</a>
            </Form>

            <Link to="/signup">
              <FiLogIn />
              Criar conta
            </Link>
          </AnimationContainer>
        </Content>

        <Background />
      </Container>
    </>
  );
};

export default SignIn;
