import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { getExperienceDetail } from '../api/experience/experienceModule';
import { getPhototextInPost } from '../api/experience/phototextModule';
import Text from '../components/basic/Text';
import { measure } from '../common/common';
import Echo from '../components/basic/Echo';
import DetailScorllButton from '../components/experience/DetailScrollButton';

const Wrapper = styled.div`
    padding-left: 23%;
    min-height: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &> * + * {
        margin-top: 50px;
    }
    &>:last-of-type {
        margin-top: 0px;
    }
    @media screen and (max-width: 1200px) {
        padding-left: 0;
    }
`;

const ContentWrapper = styled.div`
    margin: 0 auto 200px;
    height: auto;
    width: 800px;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1200px) {
        width: 95%;
    }
`;

const PhototextWrapper = styled.div<{index: string, noUnderline: boolean, vertical: boolean}>`
    float: left;
    width: ${p=> p.vertical?'800px':'800px'};
    ${p => p.vertical? css`flex-direction: column;`:css`flex-direction: row;`};
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
    ${p=>!p.noUnderline?css`border-bottom: solid 1px #cacaca;`:null}
    margin-bottom: 40px;
    padding-bottom: 50px;
    ${p => p.index
        ? css`
            &::before {
                content: ${"'"+p.index+"'"};
                left: -30px;
                top: -30px;
                display: block;
                position: absolute;
                font-size: 70px;
                font-weight: 800;
                color: #eeeeee;
                overflow: visible;
            }
        `
        : null}
    @media screen and (max-width: 800px) {
        width: 100%;
    }
    @media screen and (max-width: 768px) {
        width: 100%;
        flex-direction: column;
        ${p => p.index
            ? css`
                &::before {
                    content: "";
                }
            `
            : null}
    }
`;

const TextWrapper = styled.div<{vertical: boolean}>`
    /* width: 45%; */
    height: auto;
    float: left;
    ${p => p.vertical? css`width: 100%;`:css`width: 55%;`};
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

const Img = styled.img<{vertical: boolean}>`
    float: left;
    ${p=>p.vertical?css`width: 60%;align-self: center;margin-bottom: 50px;`:css`width: 35%;`}
    height: auto;
    border-radius: 10px;
    transition: scale .5s;
    cursor: zoom-in;
    &:active {
        transform: scale(1.2);
    }
    @media screen and (max-width: 768px) {
        width: 100%;
        &:active {
            transform: none;
        }
    }
`;

const MainContent = styled.div`
    margin-bottom: 80px;
`;

interface IProps {
    id: string,
}

const ExperienceDetail: React.FC<RouteComponentProps<IProps>> = ({ match }) => {
    const [post, setPost] = useState<any>({});
    const [phototexts, setPhototexts] = useState<any[]>([]);

    useEffect(() => {
        const experience_id: number = parseInt(match.params.id);
        getExperienceDetail(experience_id).then(res => {
            //
            // console.log(res)
            if(res.data){
                setPost(res.data);
                setPhototexts(res.data.phototexts);
                // getPhototextInPost(res.data.id).then(res => {
                //     //
                //     console.log(res)
                //     if(res.data){
                //         setPhototexts(res.data);
                //     }
                // })
                // .catch(err => {
                //     console.log(err);
                // })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const refs = phototexts.reduce((acc: any, value: any) => {
        acc[value.number-1] = React.createRef();
        return acc;
    }, {});

    const scrollNavi = (id: number) => {
        // window.scrollTo(0, refs[id].current.offsetTop);
        refs[id].current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    }

    return (
        <Wrapper>
            <Echo height='50px'/>
            <Text textAlign={'center'} fontSize={'45px'} fontWeight={'800'} letterSpacing={'-0.60px'} color={'#353535'} >
                {post.title}
            </Text>
            {post.content && <MainContent dangerouslySetInnerHTML={ {__html: post.content} } />}
            <ContentWrapper>
                {phototexts.map((data, index) => {
                    if(phototexts.length-1 == index){
                        return (
                            <>
                                <PhototextWrapper vertical={data.vertical_mode} noUnderline={data.no_underline} ref={refs[data.number-1]} index={index+1+''} key={index}>
                                    {data.image && <Img src={data.image} vertical={data.vertical_mode} />}
                                    <TextWrapper vertical={data.vertical_mode} dangerouslySetInnerHTML={ {__html: data.content} }></TextWrapper>
                                </PhototextWrapper>
                                <DetailScorllButton refs={refs} length={phototexts.length} handler={(id: number)=>scrollNavi(id)} />
                            </>
                        )
                    }
                    return (
                        <PhototextWrapper vertical={data.vertical_mode} noUnderline={data.no_underline} ref={refs[data.number-1]} index={index+1+''} key={index}>
                            {data.image && <Img src={data.image} vertical={data.vertical_mode} />}
                            <TextWrapper vertical={data.vertical_mode} dangerouslySetInnerHTML={ {__html: data.content} }></TextWrapper>
                        </PhototextWrapper>
                    )
                })}
            </ContentWrapper>
        </Wrapper>
    )
}

export default ExperienceDetail