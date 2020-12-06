import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Styles from './login-styles.scss';
import { LoginHeader, FormStatus, Footer, Input } from '../../components';
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
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    });
  }, [state.email, state.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
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
          <button data-testid="submit" className={Styles.submit} type="submit" disabled={!!state.emailError || !!state.passwordError}>Entrar</button>
          <Link to="/signup" data-testid="signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login;