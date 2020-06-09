import React from 'react';
import styled from 'styled-components';

const EchoWrapper = styled.div<{ width?: string, height?: string, backgroundColor?: string}>`
    width: ${p => p.width};
    height: ${p => p.height};
    background-color: ${p => p.backgroundColor};
`;

interface IProps {
    width?: string,
    height?: string,
    backgrountColor?: string,
}

const Echo: React.FC<IProps> = ({
    width, height, backgrountColor
}) => {

    return (
        <EchoWrapper width={width} height={height} backgroundColor={backgrountColor} />
    )
}

export default Echo;