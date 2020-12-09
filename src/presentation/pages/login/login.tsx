import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Styles from './login-styles.scss';
import { LoginHeader, FormStatus, Footer, Input, SubmitButton } from '../../components';
import Context from '../../contexts/form/form-context';
import { Validation } from '../../protocols/validation';
import { Authentication } from '../../../domain/usecases/authentication';
import { SaveAccessToken } from '../../../domain/usecases/save-access-token';

type Props = {
  validation: Validation,
  authentication: Authentication,
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  });

  useEffect(() => {
    const { email, password } = state;
    const formData = { email, password };
    const emailError = validation.validate('email', formData);
    const passwordError = validation.validate('password', formData);
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    });
  }, [state.email, state.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState({
        ...state,
        isLoading: true
      });
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      });
      await saveAccessToken.save(account.accessToken);
      history.replace('/');
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      });
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton text="Cadastrar" />
          <Link to="/signup" data-testid="signup-link" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login;