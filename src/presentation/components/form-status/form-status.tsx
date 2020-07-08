import React from 'react';
import Spinner from '../../components/spinner/spinner';
import Styles from './form-styles.scss';

const FormStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>Error</span>
    </div>
  );
}

export default FormStatus;