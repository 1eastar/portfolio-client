import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Text from '../components/basic/Text';
import { navigator } from '../common/navigator';
import { measure } from '../common/common';
import { getExperienceList } from '../api/experience/experienceModule';
import ImgWithText from '../components/experience/ImgWithText';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: ${window.innerHeight-100}px;
    &> * + * {
        margin-top: 150px;
    }
    &>:first-of-type {
        margin-top: 100px;
    }
`;

const ImgWrapper = styled.div`
    width: ${measure.MAIN_WIDTH}px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &> * + * {
        margin-left: 10px;
    }
    &> * {
        padding-right: 17px;
        border-right: dashed 1px #e5e5e5;
    }
    &>:last-of-type {
        border-right: 0px;
    }
`;

const ImgLineWrapper = styled.div`
    width: 370px;   
    height: auto;
    &> * {
        margin-bottom: 5px;
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
                Experiences
            </Text>
            <ImgWrapper>
                <ImgLineWrapper>
                    {line1.map((data, index) => {
                        return (
                            <ImgWithText
                                key={index}
                                src={data.main_image} 
                                text={data.main_title} 
                                color={'#353535'} 
                                fontSize={"30px"} 
                                fontWeight={"800"} 
                                letterSpacing={"-0.46px"}
                                handler={()=>navigator(history, `/experience/${data.id}`)} />
                        )
                    })}
                </ImgLineWrapper>
                <ImgLineWrapper>
                    {line2.map((data, index) => {
                        return (
                            <ImgWithText
                                key={index}
                                src={data.main_image} 
                                text={data.main_title} 
                                color={'#353535'} 
                                fontSize={"30px"} 
                                fontWeight={"800"} 
                                letterSpacing={"-0.46px"}
                                handler={()=>navigator(history, `/experience/${data.id}`)} />
                        )
                    })}
                </ImgLineWrapper>
                <ImgLineWrapper>
                    {line3.map((data, index) => {
                        return (
                            <ImgWithText
                                key={index}
                                src={data.main_image} 
                                text={data.main_title} 
                                color={'#353535'} 
                                fontSize={"30px"} 
                                fontWeight={"800"} 
                                letterSpacing={"-0.46px"}
                                handler={()=>navigator(history, `/experience/${data.id}`)} />
                        )
                    })}
                </ImgLineWrapper>
            </ImgWrapper>
        </Wrapper>
    )
}

export default Experience