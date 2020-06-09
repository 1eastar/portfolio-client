import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div<{ styleParams: any }>`
  width: ${(p) => p.styleParams.width};
  height: ${(p) => p.styleParams.height};
  border-radius: ${(p) => p.styleParams.borderRadius};
  background-color: ${(p) => p.styleParams.backgroundColor};
  color: ${(p) => p.styleParams.color};
  border: ${(p) => p.styleParams.border};
  font-weight: ${(p) => p.styleParams.fontWeight};
  font-size: ${(p) => p.styleParams.fontSize};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

interface ButtonProps {
  styleParams: {
    width: string,
    height: string,
    borderRadius: string,
    backgroundColor: string,
    color: string,
    border: string,
    fontWeight: string,
    fontSize: string,
  }
  text: string
  handler: () => void,
}

const Button: React.FC<ButtonProps> = ({
  styleParams,
  handler,
  text,
}) => (
  <ButtonWrapper styleParams={styleParams} onClick={handler}>
    {text}
  </ButtonWrapper>
);

export default Button;
