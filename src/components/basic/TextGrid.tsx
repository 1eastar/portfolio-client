import React from 'react';
import styled from 'styled-components';


const TextGrid = styled.div<{
    fontSize: {l?: string, lm?: string, m?: string, ms?: string, s?: string},
    letterSpacing: string,
    fontWeight: {l?: string, lm?: string, m?: string, ms?: string, s?: string},
    lineHeight?: {l?: string, lm?: string, m?: string, ms?: string, s?: string},
    width?: {l?: string, lm?: string, m?: string, ms?: string, s?: string},
    color?: string,
    textAlign?: string,
}>`
    width: ${p => p.width?.l};
    font-size: ${(p) => p.fontSize.l};
    color: ${p => p.color? p.color : '#303030'};
    font-stretch: normal;
    font-style: normal;
    font-family: NanumSquareRoundR;
    font-weight: ${(p) => p.fontWeight.l};
    line-height: normal;
    letter-spacing: ${(p) => p.letterSpacing};
    line-height: ${p => p.lineHeight?.l};
    float: left;
    text-align: ${p => p.textAlign};

    @media screen and (max-width: 1200px) {
        width: ${p => p.width?.lm};
        font-size: ${(p) => p.fontSize.lm};
        font-weight: ${(p) => p.fontWeight.lm};
        line-height: ${p => p.lineHeight?.lm};
    }
    @media screen and (max-width: 600px) {
        width: ${p => p.width?.s};
        font-size: ${(p) => p.fontSize.s};
        font-weight: ${(p) => p.fontWeight.s};
        line-height: ${p => p.lineHeight?.s};
        padding: 0 15px 0 15px;
    }
`;

export default TextGrid;