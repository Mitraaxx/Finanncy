import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = ({ 
    size = '40px', 
    color = '#4b61eb', 
    overlay = false, 
    text = null,
    backgroundColor = 'rgba(255, 255, 255, 0.9)'
}) => {
    if (overlay) {
        return (
            <OverlayStyled backgroundColor={backgroundColor}>
                <SpinnerContainer>
                    <SpinnerStyled size={size} color={color} />
                    {text && <LoadingText>{text}</LoadingText>}
                </SpinnerContainer>
            </OverlayStyled>
        );
    }

    return (
        <SpinnerContainer>
            <SpinnerStyled size={size} color={color} />
            {text && <LoadingText>{text}</LoadingText>}
        </SpinnerContainer>
    );
};

const spin = keyframes`
    0% { 
        transform: rotate(0deg); 
    }
    100% { 
        transform: rotate(360deg); 
    }
`;

const pulse = keyframes`
    0%, 100% { 
        opacity: 1; 
    }
    50% { 
        opacity: 0.5; 
    }
`;

const OverlayStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.backgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    backdrop-filter: blur(3px);
    
    /* Ensure it's always visible */
    pointer-events: auto;
    visibility: visible;
    opacity: 1;
    
    /* Smooth entrance animation */
    animation: ${pulse} 0.3s ease-in-out;
`;

const SpinnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SpinnerStyled = styled.div`
    width: ${props => props.size};
    height: ${props => props.size};
    border: 4px solid rgba(75, 97, 235, 0.2);
    border-top: 4px solid ${props => props.color};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    
    /* Ensure high visibility */
    box-shadow: 0 0 10px rgba(75, 97, 235, 0.3);
`;

const LoadingText = styled.div`
    color: #333;
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 12px;
    text-align: center;
    animation: ${pulse} 2s ease-in-out infinite;
`;

export default LoadingSpinner;
