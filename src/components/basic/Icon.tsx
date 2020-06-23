import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<{width?: string, height?: string, url: string, isHandler?: boolean, float?: string, isCircle?: boolean }>`
    width: ${p=>p.width?p.width:'100%'};
    height: ${p=>p.height?p.height:'100%'};
    background: url('/images/${p=>p.url}.png');
    background-size: cover;
    ${p => p.float
        ? css `
            float: ${p.float};
        `
        : null}
    ${p=>p.isHandler
        ? css`
            cursor: pointer;
        `
        : null}
    ${p=>p.isCircle
        ? css`
            border-radius: 50%;
        `
        : null}
`;


interface IProps {
    width?: string,
    height?: string,
    url: string,
    handler?: () => void,
    ishandler?: boolean,
    float?: string,
    isCircle?: boolean,
}

const Icon: React.FC<IProps> = ({ width, height, url, handler, ishandler, float, isCircle }) => (
    <Wrapper isCircle={isCircle} float={float} isHandler={ishandler} onClick={handler} width={width} height={height} url={url} />
)
export default Icon