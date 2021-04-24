import React, { useContext, useRef } from 'react';
import Styles from './input-styles.scss';
import Context from '../../contexts/form/form-context';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const inputRef = useRef<HTMLInputElement>();

  const error = state[`${props.name}Error`];

  const getStatus = (): string => {
    return error ? '💡' : '✅';
  }

  const getTitle = (): string => {
    return error || 'Tudo certo';
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${props.name}-wrap`}
    >
      <input
        {...props}
        placeholder=" "
        data-testid={props.name}
        onChange={handleChange}
        ref={inputRef}
        title={error}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => inputRef.current.focus()}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input;