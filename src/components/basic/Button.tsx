import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div<{ styleParams: any, addStyle?: string }>`
  width: ${(p) => p.styleParams.width};
  height: ${(p) => p.styleParams.height};
  min-width: ${(p) => p.styleParams.minWidth};
  min-height: ${(p) => p.styleParams.minHeight};
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
  float: left;
  ${p=>p.addStyle?p.addStyle:null}
`;

interface ButtonProps {
  styleParams: {
    width: string,
    height: string,
    borderRadius: string,
    backgroundColor: any,
    color: any,
    border: string,
    fontWeight: string,
    fontSize: string,
    minWidth?: string,
    minHeight?: string,
  }
  text: string
  handler: () => void,
  addStyle?: string,
}

const Button: React.FC<ButtonProps> = ({
  styleParams,
  handler,
  text,
  addStyle
}) => (
  <ButtonWrapper addStyle={addStyle} styleParams={styleParams} onClick={handler}>
    {text}
  </ButtonWrapper>
);

export default Button;
