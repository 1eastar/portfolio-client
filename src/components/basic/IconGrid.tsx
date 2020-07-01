import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<{width?: any, height?: any, url: string, isHandler?: boolean, float?: string, isCircle?: boolean }>`
    width: ${p=>p.width.l?p.width.l:'100%'};
    height: ${p=>p.height.l?p.height.l:'100%'};
    background: url('/images/${p=>p.url}.png') no-repeat center center;
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
    @media screen and (max-width: 1200px) {
        width: ${p=>p.width.lm?p.width.lm:'100%'};
        height: ${p=>p.height.lm?p.height.lm:'100%'};
    }
    @media screen and (max-width: 992px) {
        width: ${p=>p.width.m?p.width.m:'100%'};
        height: ${p=>p.height.m?p.height.m:'100%'};
    }
    @media screen and (max-width: 768px) {
        width: ${p=>p.width.ms?p.width.ms:'100%'};
        height: ${p=>p.height.ms?p.height.ms:'100%'};
    }
    @media screen and (max-width: 600px) {
        width: ${p=>p.width.s?p.width.s:'100%'};
        height: ${p=>p.height.s?p.height.s:'100%'};
    }
`;


interface IProps {
    width?: {l?: string, lm?: string, m?: string, ms?: string, s?: string},
    height?: {l?: string, lm?: string, m?: string, ms?: string, s?: string},
    url: string,
    handler?: () => void,
    ishandler?: boolean, // for 'cursor: pointer;'
    float?: string,
    isCircle?: boolean,
}

const IconGrid: React.FC<IProps> = ({ width, height, url, handler, ishandler, float, isCircle }) => (
    <Wrapper isCircle={isCircle} float={float} isHandler={ishandler} onClick={handler} width={width} height={height} url={url} />
)
export default IconGrid