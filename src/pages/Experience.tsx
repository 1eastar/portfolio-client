import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';

import Text from '../components/basic/Text';
import TextGrid from '../components/basic/TextGrid';
import { navigator } from '../common/navigator';
import { measure } from '../common/common';
import { getExperienceList } from '../api/experience/experienceModule';
import ImgWithText from '../components/experience/ImgWithText';

const Wrapper = styled.div`
    float: left;
    position: relative;
    padding-left: 23%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 1000px;
    &> * + * {
        margin-top: 20px;
    }
    &> * + * + * {
        margin-top: 150px;
    }
    &>:first-of-type {
        margin-top: 100px;
    }
    @media screen and (max-width: 1200px) {
        padding: 0;
    }
    @media screen and (max-width: 600px) {
        &>:first-of-type {
            margin-top: 50px;
        }
        margin-top: 50px;
    }
`;

const ImgWrapper = styled.div`
    float: left;
    /* width: 1000px; */
    width: 100%;
    @media screen and (min-width: 600px) {
        &> * + * {
            /* margin-left: 10px; */
        }
        &> * {
            /* padding-right: 17px; */
            border-right: dashed 1px #e5e5e5;
        }
        &>:last-of-type {
            border-right: 0px;
        }
    }
    @media screen and (min-width: 1200px) {
        width: 900px;
    }
    @media screen and (min-width: 1300px) {
        width: 1000px;
    }
`;

const ImgLineWrapper = styled.div<{forMobile: boolean}>`
    float: left;
    width: 33.333%;
    height: auto;
    overflow: visible;
    /* padding-right: 10px;
    padding-left: 10px; */
    &> * {
        margin-bottom: 5px;
    }
    ${p => p.forMobile
        ? css`
            display: none;
        `
        : null};
    @media screen and (max-width: 600px) {
        width: 80%;
        margin: 0 auto;
        float: none;
        ${p => p.forMobile
            ? css`
                display: block;
            `
            : null};
    }
`;

const Img = styled.div<{url: string}>`
    background: url(${p => p.url}) no-repeat center center;
    text-align: center;
    color: #ffffff;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.46px;
    max-width: 100%;
    height: auto;
`;

interface IProps {

}

const Experience: React.FC<IProps> = () => {
    const history = useHistory();
    const [post, setPost] = useState<any[]>([]);
    const [line1, setLine1] = useState<any[]>([]);
    const [line2, setLine2] = useState<any[]>([]);
    const [line3, setLine3] = useState<any[]>([]);


    const divide_3_line = (posts: any[]) => {
        let tmp1: any[] = [];
        let tmp2: any[] = [];
        let tmp3: any[] = [];
        if(posts){
            for(let i of posts){
                if(i.id % 3 == 1){
                    tmp1 = [...tmp1, i];
                }
                else if(i.id % 3 == 2){
                    tmp2 = [...tmp2, i];
                }
                else {
                    tmp3 = [...tmp3, i];
                }
            }
            setLine1(tmp1);
            setLine2(tmp2);
            setLine3(tmp3);
        }
    }

    useEffect(() => {
        getExperienceList().then(res => {
            // console.log(res)
            if(res.data){
                setPost(res.data);
                divide_3_line(res.data);
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <Wrapper>
            <Text fontSize={'45px'} fontWeight={'800'} letterSpacing={'-0.50px'} color={'#464646'} >
                Portfolio
            </Text>
            <TextGrid fontSize={{l:'17px', lm:'15px', s:'13px'}} fontWeight={{l:'600'}} letterSpacing={'-0.60px'} color={'#464646'} >
                지금의 저를 만들어준 소중한 경험들입니다
            </TextGrid>
            <ImgWrapper>
                <ImgLineWrapper forMobile={true}>
                    {post.map((data, index) => {
                        return (
                            <ImgWithText
                                key={index}
                                src={data.main_image} 
                                text={data.main_title} 
                                color={data.main_title_color} 
                                fontSize={"25px"} 
                                fontWeight={"900"} 
                                letterSpacing={"-0.46px"}
                                handler={()=>navigator(history, `/experience/${data.id}`)} />
                        )
                    })}
                </ImgLineWrapper>
                
                <>
                    <ImgLineWrapper forMobile={false}>
                        {line1.map((data, index) => {
                            return (
                                <ImgWithText
                                    key={index}
                                    src={data.main_image} 
                                    text={data.main_title} 
                                    color={data.main_title_color} 
                                    fontSize={"25px"} 
                                    fontWeight={"900"} 
                                    letterSpacing={"-0.46px"}
                                    handler={()=>navigator(history, `/experience/${data.id}`)} />
                            )
                        })}
                    </ImgLineWrapper>
                    <ImgLineWrapper forMobile={false}>
                        {line3.map((data, index) => {
                            return (
                                <ImgWithText
                                    key={index}
                                    src={data.main_image} 
                                    text={data.main_title} 
                                    color={data.main_title_color} 
                                    fontSize={"25px"} 
                                    fontWeight={"900"} 
                                    letterSpacing={"-0.46px"}
                                    handler={()=>navigator(history, `/experience/${data.id}`)} />
                            )
                        })}
                    </ImgLineWrapper>
                    <ImgLineWrapper forMobile={false}>
                        {line2.map((data, index) => {
                            return (
                                <ImgWithText
                                    key={index}
                                    src={data.main_image} 
                                    text={data.main_title} 
                                    color={data.main_title_color} 
                                    fontSize={"25px"} 
                                    fontWeight={"900"} 
                                    letterSpacing={"-0.46px"}
                                    handler={()=>navigator(history, `/experience/${data.id}`)} />
                            )
                        })}
                    </ImgLineWrapper>
                </>
            </ImgWrapper>
        </Wrapper>
    )
}

export default Experience