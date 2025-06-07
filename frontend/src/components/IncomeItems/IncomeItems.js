import React from 'react'
import styled from 'styled-components'
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons'
import Button from '../Button/Button';
import { dateFormat } from '../../utils/dateFormat';

function IncomeItems({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () =>{
        switch(category){
            case 'salary':
                return money;
            case 'freelancing':
                return freelance;
                case 'investments':
                    return stocks;
                case 'stocks':
                    return users;
                case 'bitcoin':
                    return bitcoin;
                case 'bank':
                    return card;
                case 'youtube':
                    return yt;
                case 'other':
                    return piggy;
                default:
                    return ''         
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    } 


  return (
    <IncomeItemStyled indicator={indicatorColor}>
        <div className='icon'>
            {type === 'expense' ? expenseCatIcon() : categoryIcon()}
        </div>
        <div className='content'>
            <h5>{title}</h5>
            <div className='inner-content'>
                <div className='text'>
                    <p>&#8377;{amount}</p>
                    <p>{calender} {dateFormat(date)}</p>
                    <p>
                        {comment}
                        {description}
                    </p>
                </div>
                <div className='btn-con'>
                    <Button
                        icon={trash}
                        bPad={'1rem'}
                        bRad={'50%'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                        iColor={'#fff'}
                        hColor={'var(--color-green)'}
                        onClick={() => deleteItem(id)}
                    />
                </div>
            </div>
        </div>
    </IncomeItemStyled>
  )
}

const IncomeItemStyled = styled.div`
    background: linear-gradient(135deg, #FFFFFF 0%, #FCF6F9 100%);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 
                0 2px 8px rgba(0, 0, 0, 0.04);
    border-radius: 24px;
    padding: 1.5rem;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    color: #1a1a2e;
    position: relative;
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12),
                    0 4px 16px rgba(0, 0, 0, 0.06);
        border-color: rgba(255, 255, 255, 1);
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, ${props => props.indicator || '#6c5ce7'}, transparent);
        border-radius: 24px 24px 0 0;
    }

    /* Tablet Styles */
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        gap: 1.25rem;
        padding: 1.25rem;
        border-radius: 20px;
        margin-bottom: 1rem;
        
        &:hover {
            transform: translateY(-1px);
        }
    }

    /* Mobile Styles */
    @media (max-width: 480px) {
        padding: 1rem;
        margin-bottom: 0.875rem;
        border-radius: 18px;
        gap: 1rem;
    }

    /* Extra Small Mobile */
    @media (max-width: 360px) {
        padding: 0.875rem;
        gap: 0.875rem;
        border-radius: 16px;
    }

    .icon {
        width: 88px;
        height: 88px;
        border-radius: 22px;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid rgba(255, 255, 255, 0.9);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        flex-shrink: 0;
        transition: all 0.3s ease;
        
        &:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
            width: 72px;
            height: 72px;
            border-radius: 18px;
            align-self: center;
            margin-bottom: 0.5rem;
        }

        @media (max-width: 480px) {
            width: 64px;
            height: 64px;
            border-radius: 16px;
        }

        @media (max-width: 360px) {
            width: 56px;
            height: 56px;
            border-radius: 14px;
        }

        i {
            font-size: 2.75rem;
            color: ${props => props.indicator || '#6c5ce7'};
            transition: color 0.3s ease;
            
            @media (max-width: 768px) {
                font-size: 2.25rem;
            }

            @media (max-width: 480px) {
                font-size: 2rem;
            }

            @media (max-width: 360px) {
                font-size: 1.75rem;
            }
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        min-width: 0; /* Prevents flex overflow */
        
        @media (max-width: 768px) {
            width: 100%;
            gap: 0.75rem;
        }

        @media (max-width: 480px) {
            gap: 0.625rem;
        }

        h5 {
            font-size: 1.375rem;
            font-weight: 600;
            padding-left: 2.5rem;
            position: relative;
            color: #1a1a2e;
            line-height: 1.4;
            margin: 0;
            letter-spacing: -0.02em;
            
            @media (max-width: 768px) {
                font-size: 1.25rem;
                padding-left: 0;
                text-align: center;
                padding: 0 1rem;
            }

            @media (max-width: 480px) {
                font-size: 1.125rem;
                padding: 0 0.5rem;
            }

            @media (max-width: 360px) {
                font-size: 1rem;
            }

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                background: linear-gradient(135deg, ${props => props.indicator || '#6c5ce7'}, ${props => props.indicator ? `${props.indicator}cc` : '#5a4fcf'});
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                
                @media (max-width: 768px) {
                    display: none;
                }
            }
        }

        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            
            @media (max-width: 768px) {
                flex-direction: column;
                align-items: stretch;
                gap: 0.75rem;
            }

            @media (max-width: 480px) {
                gap: 0.625rem;
            }

            .text {
                display: flex;
                align-items: center;
                gap: 2rem;
                flex-wrap: wrap;
                
                @media (max-width: 968px) {
                    gap: 1.5rem;
                }
                
                @media (max-width: 768px) {
                    flex-direction: column;
                    align-items: stretch;
                    gap: 0.5rem;
                    width: 100%;
                }

                @media (max-width: 480px) {
                    gap: 0.375rem;
                }

                p {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #4a5568;
                    font-weight: 500;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    margin: 0;
                    white-space: nowrap;
                    
                    @media (max-width: 768px) {
                        font-size: 0.9rem;
                        justify-content: center;
                        white-space: normal;
                        text-align: center;
                    }

                    @media (max-width: 480px) {
                        font-size: 0.85rem;
                        gap: 0.5rem;
                    }

                    @media (max-width: 360px) {
                        font-size: 0.8rem;
                        gap: 0.375rem;
                    }

                    i {
                        font-size: 1.1em;
                        color: ${props => props.indicator || '#6c5ce7'};
                        
                        @media (max-width: 480px) {
                            font-size: 1em;
                        }
                    }
                }
            }

            .amount {
                font-size: 1.5rem;
                font-weight: 700;
                color: ${props => props.indicator || '#6c5ce7'};
                text-align: right;
                white-space: nowrap;
                letter-spacing: -0.02em;
                
                @media (max-width: 768px) {
                    font-size: 1.375rem;
                    text-align: center;
                    padding: 0.5rem;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }

                @media (max-width: 480px) {
                    font-size: 1.25rem;
                    padding: 0.375rem;
                    border-radius: 10px;
                }

                @media (max-width: 360px) {
                    font-size: 1.125rem;
                }
            }
        }
    }

    /* Loading state */
    &.loading {
        opacity: 0.7;
        pointer-events: none;
        
        .icon {
            animation: pulse 2s infinite;
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 0.7;
        }
        50% {
            opacity: 1;
        }
    }



    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
        transition: none;
        
        &:hover {
            transform: none;
        }
        
        .icon {
            transition: none;
            
            &:hover {
                transform: none;
            }
        }
        
        &.loading .icon {
            animation: none;
        }
    }
`;

export default IncomeItems
