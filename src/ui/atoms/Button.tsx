import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const ButtonComponent = styled.button`
  background-color: #0051ad;
  font-size: 17px;
  padding: 1.5rem 3rem;
  color: white;
`;

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <ButtonComponent {...props} />
);

export default Button;
