import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const InputComponent = styled.input`
  width: 100%;
  border: 3px solid #0051ad;
  padding: 0rem 2rem;
  outline: 0;
`;

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <InputComponent {...props} />
);

export default Input;
