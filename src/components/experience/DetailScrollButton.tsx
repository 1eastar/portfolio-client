import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<{posY: number}>`
    position: fixed;
    scroll-behavior: smooth;
    width: 30px;
    height: auto;
    right: 100px;
    /* top: ${p=>p.posY}px; */
    top: 150px;
    @media screen and (max-width: 768px) {
        display: none;
    }
    @media screen and (max-width: 992px) {
        right: 70px;
        left: auto;
    }
    @media screen and (max-width: 1200px) {
        right: 30px;
        left: auto;
    }
`;

const SubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SmallCircle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #eeeeee;
    margin-top: -1px;
    margin-bottom: -1px;
    z-index: -1;
`;

const Button = styled.div<{isFocus: boolean}>`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    ${p => p.isFocus
        ? css`
            background-color: rgba(55, 55, 55, 0.8);
            color: #ffffff;
        `
        : css`
            background-color: #eeeeee;
            color: #dddddd;
        `
        }
`;

interface IProps {
    length: number,
    handler: (id: number) => void,
    refs: any,
}

let scrollTop: any = 0;

const DetailScrollButton: React.FC<IProps> = ({
    length, handler, refs
}) => {
    const [numberset, setNumberset] = useState<any[]>([]);
    const [scrTop, setScrTop] = useState(0);

    useEffect(()=>{
        setNumberset(Array.from(Array(length).keys()));
    },[length])

    useEffect(()=>{
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    },[])

    const onScroll = (e: any) => {
        // const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
        // let scrollTop = e.srcElement.body.scrollTop;]
        // scrollTop = e.srcElement.scrollingElement.scrollTop;
        setScrTop(e.srcElement.scrollingElement.scrollTop);
        // console.log(scrollTop)
    }

    const isInViewPort = (id: number, offset=0) => {
        if(!refs[id].current) return false;
        const top = refs[id].current.getBoundingClientRect().top;
        const height = refs[id].current.getBoundingClientRect().height;
        // console.log(top)
        // console.log(height)
        // console.log(scrTop)
        // console.log(window.innerHeight/2)
        return window.innerHeight/2 >= top && window.innerHeight/2 <= top+height;
        // return true;
    }
    return (
        <Wrapper posY={scrTop+300}>
            {numberset.map((number, index) => {
                return (
                    <SubWrapper>
                        <Button onClick={()=>handler(index+1)} isFocus={isInViewPort(index+1)}>
                            {number+1}
                        </Button>
                        {number+1!=length && <SmallCircle />}
                    </SubWrapper>
                )
            })}

            {/* {refs[7] && <Button onClick={()=>handler(7)} isFocus={isInViewPort(7)}>
                {7}
            </Button>} */}
        </Wrapper>
    )
}

export default DetailScrollButton;