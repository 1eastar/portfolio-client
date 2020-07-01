import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ fontSize?: string }>`
    position: relative;
    font-size: ${p=>p.fontSize};
    float: left;
    padding: 15px;
    padding-top: 3px;
    padding-bottom: 20px;
    width: 100%;
    height: auto;
    cursor: pointer;
    filter: brightness(90%);
    border-radius: 8px;
    transition: transform .5s;
    &:hover{
        filter: brightness(100%);
        transform: scale(1.04);
        font-size: ${p=>parseFloat(p.fontSize!.split('px')[0]) * 1.3}px;
    }
`;

const Img = styled.img`
    float: left;
    width: 100%;
    border-radius: 8px;
    /* -webkit-transition: width 2s, height 2s, background-color 2s, -webkit-transform 2s, bottom 2s; */
    transition: width 2s, height 2s, background-color 2s, transform .5s, bottom 2s;
    &:hover{
        box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.3);
        /* -webkit-transform:rotate(180deg); */
        transform: translateY(-10px);
        /* width: 50%; */
        filter: brightness(100%);
    }
`;

const Text = styled.div<{color?: string, fontSize?: string, fontWeight?: string, letterSpacing?: string}>`
    position: absolute;
    float: left;
    width: 100%;
    color: ${p=>p.color};
    /* font-size: ${p=>p.fontSize}; */
    font-weight: ${p=>p.fontWeight};
    letter-spacing: ${p=>p.letterSpacing};
    top: 48%;
    left: 0%;
    text-align: center;
    @media screen and (max-width: 768px) {
        font-size: ${p=>parseFloat(p.fontSize!.split('px')[0])/3*2}px;
    }
    @media screen and (max-width: 600px) {
        font-size: ${p=>p.fontSize};
    }
`;

interface IProps {
    src: string,
    text: string,
    color?: string,
    fontSize?: string,
    letterSpacing?: string,
    fontWeight?: string,
    handler?: ()=>void,
}

const ImgWithText: React.FC<IProps> = ({
    src, text, color, fontSize, fontWeight, handler, letterSpacing
}) => {
    return (
        <Wrapper fontSize={fontSize} onClick={handler}>
            <Img src={src}/>
            <Text letterSpacing={letterSpacing} color={color} fontSize={fontSize} fontWeight={fontWeight}>{text}</Text>
        </Wrapper>
    )
}

export default ImgWithText;