import React from 'react';
import styled, { css } from 'styled-components';


const InputBox = styled.input<{ styleParams: any }>`
    width: ${(p) => p.styleParams.width.large};
    height: ${(p) => p.styleParams.height.large};
    min-width: ${(p) => p.styleParams.minWidth};
    min-height: ${(p) => p.styleParams.minHeight};
    border-radius: ${(p) => p.styleParams.borderRadius};
    background-color: ${(p) => p.styleParams.backgroundColor};
    color: ${(p) => p.styleParams.color};
    border: ${(p) => p.styleParams.border};
    font-weight: ${(p) => p.styleParams.fontWeight};
    font-size: ${(p) => p.styleParams.fontSize.large};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    ${p => p.styleParams.additionalStyle?p.styleParams.additionalStyle:null};
    float: ${(p) => p.styleParams.float?p.styleParams.float:'left'};
    ${(p) => p.styleParams.margin? p.styleParams.margin.large: null}
    ::placeholder {

    }
    @media screen and (max-width: 1200px) {
        width: ${(p) => p.styleParams.width.lm};
        height: ${(p) => p.styleParams.height.lm};
        font-size: ${(p) => p.styleParams.fontSize.lm};
        ${(p) => p.styleParams.margin? p.styleParams.margin.lm: null}
    }
    @media screen and (max-width: 992px) {
        width: ${(p) => p.styleParams.width.mid};
        height: ${(p) => p.styleParams.height.mid};
        font-size: ${(p) => p.styleParams.fontSize.mid};
        ${(p) => p.styleParams.margin? p.styleParams.margin.mid: null}
    }
    @media screen and (max-width: 768px) {
        width: ${(p) => p.styleParams.width.ms};
        height: ${(p) => p.styleParams.height.ms};
        font-size: ${(p) => p.styleParams.fontSize.ms};
        ${(p) => p.styleParams.margin? p.styleParams.margin.ms: null}
    }
    @media screen and (max-width: 600px) {
            width: ${(p) => p.styleParams.width.small};
            height: ${(p) => p.styleParams.height.small};
            font-size: ${(p) => p.styleParams.fontSize.small};
            ${(p) => p.styleParams.margin? p.styleParams.margin.small: null}
            /* ${(p) => p.styleParams.isMenu
                ? css`
                    background: url('images/ic_menu.png') no-repeat center center;
                    background-size: contain;
                    width: 25px;
                    height: 25px;
                `
                : null} */
    }
`;

interface InputProps {
    styleParams: {
        width: {large?: string, lm?: string, mid?: string, ms?: string, small?: string},
        height: {large?: string, lm?: string, mid?: string, ms?: string, small?: string},
        borderRadius: string,
        backgroundColor: any,
        color: any,
        border: string,
        fontWeight: string,
        fontSize: {large?: string, lm?: string, mid?: string, ms?: string, small?: string},
        minWidth?: string,
        minHeight?: string,
        float?: string,
        margin?: {large?: string, lm?: string, mid?: string, ms?: string, small?: string},
        isMenu?: boolean,
        additionalStyle?: string,
    }
    placeholder: string
}

const Input: React.FC<InputProps> = ({
    styleParams, placeholder
}) => (
    <InputBox styleParams={styleParams} placeholder={placeholder}/>
)

export default Input;