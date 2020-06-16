import React from 'react';
import styled from 'styled-components';


const Text = styled.div<{
    fontSize: string,
    letterSpacing: string,
    fontWeight: string,
    lineHeight?: string,
    width?: string,
    color?: string,
}>`
    width: ${p => p.width};
    font-size: ${(p) => p.fontSize};
    color: ${p => p.color? p.color : '#303030'};
    font-stretch: normal;
    font-style: normal;
    font-weight: ${(p) => p.fontWeight};
    line-height: normal;
    letter-spacing: ${(p) => p.letterSpacing};
    line-height: ${p => p.lineHeight};
`;

export default Text;