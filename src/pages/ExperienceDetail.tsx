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
`;

const ContentWrapper = styled.div`
    float: left;
    height: auto;
    width: 1200px;
    overflow: visible;
    @media screen and (max-width: 1200px) {
        width: 95%;
    }
`;

const PhototextWrapper = styled.div<{index: string}>`
    float: left;
    width: 1200px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
    border-bottom: solid 1px #cacaca;
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
    @media screen and (max-width: 1200px) {
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

const TextWrapper = styled.div`
    width: 45%;
    height: auto;
    float: left;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

const Img = styled.img`
    float: left;
    width: 45%;
    height: auto;
    border-radius: 10px;
    transition: scale .5s;
    cursor: zoom-in;
    &:active {
        transform: scale(1.2);
    }
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

interface IProps {
    id: string,
}

const ExperienceDetail: React.FC<RouteComponentProps<IProps>> = ({ match }) => {
    const [post, setPost] = useState<any>({});
    const [phototexts, setPhototexts] = useState<any[]>([]);
    
    useEffect(() => {
        const experience_id: number = parseInt(match.params.id);
        getExperienceDetail(experience_id).then(res => { // 1: post id
            //
            if(res.data){
                setPost(res.data);
                getPhototextInPost(res.data.id).then(res => {
                    //
                    console.log(res)
                    if(res.data){
                        setPhototexts(res.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const scrollNavi = (id: number) => {
        // window.scrollTo(0, refs[id].current.offsetTop);
        refs[id].current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    }

    const refs = phototexts.reduce((acc: any, value: any) => {
        acc[value.id] = React.createRef();
        return acc;
    }, {});

    return (
        <Wrapper>
            <Echo height='50px'/>
            <Text fontSize={'45px'} fontWeight={'800'} letterSpacing={'-0.60px'} color={'#353535'} >
                {post.title}
            </Text>
            {post.content && <div dangerouslySetInnerHTML={ {__html: post.content} } />}
            <ContentWrapper>
                {phototexts.map((data, index) => {
                    return (
                        <PhototextWrapper ref={refs[data.id]} index={index+1+''} key={index}>
                            {data.image && <Img src={data.image} />}
                            <TextWrapper dangerouslySetInnerHTML={ {__html: data.content} }></TextWrapper>
                        </PhototextWrapper>
                    )
                })}
            </ContentWrapper>
            <DetailScorllButton refs={refs} length={phototexts.length} handler={(id: number)=>scrollNavi(id)} />
        </Wrapper>
    )
}

export default ExperienceDetail