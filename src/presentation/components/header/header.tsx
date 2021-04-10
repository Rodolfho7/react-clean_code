import React, { memo, useContext } from 'react';
import { ApiContext } from '../../contexts';
import { Logo } from '..';
import Styles from './header-styles.scss';
import { useHistory } from 'react-router-dom';

const Header: React.FC = () => {
  const history = useHistory();
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext);
  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setCurrentAccount(undefined);
    history.replace('/login');
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{ getCurrentAccount().name }</span>
          <a data-testid="logout" href="#" onClick={logout}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header);