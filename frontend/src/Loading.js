import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = ({ size = '40px', color = '#4b61eb', overlay = false }) => {
    if (overlay) {
        return (
            <OverlayStyled>
                <SpinnerStyled size={size} color={color} />
            </OverlayStyled>
        );
    }

    return <SpinnerStyled size={size} color={color} />;
};

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const OverlayStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(2px);
`;

const SpinnerStyled = styled.div`
    width: ${props => props.size};
    height: ${props => props.size};
    border: 3px solid rgba(75, 97, 235, 0.3);
    border-top: 3px solid ${props => props.color};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;

export default LoadingSpinner;
