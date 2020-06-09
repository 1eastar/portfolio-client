import React from 'react';
import styled from 'styled-components';


const Text = styled.div<{
    fontSize: string,
    letterSpacing: string,
    fontWeight: string,
    lineHeight?: string,
    width?: string,
}>`
    width: ${p => p.width};
    font-size: ${(p) => p.fontSize};
    font-stretch: normal;
    font-style: normal;
    font-weight: ${(p) => p.fontWeight};
    line-height: normal;
    letter-spacing: ${(p) => p.letterSpacing};
    line-height: ${p => p.lineHeight};
`;

export default Text;