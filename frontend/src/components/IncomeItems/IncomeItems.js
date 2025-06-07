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
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.8rem;
        padding: 0.8rem;
        border-radius: 15px;
    }

    @media (max-width: 480px) {
        padding: 0.6rem;
        margin-bottom: 0.8rem;
        border-radius: 12px;
    }

    .icon {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        
        @media (max-width: 768px) {
            width: 60px;
            height: 60px;
            border-radius: 15px;
            align-self: center;
        }

        @media (max-width: 480px) {
            width: 50px;
            height: 50px;
            border-radius: 12px;
        }

        i {
            font-size: 2.6rem;
            
            @media (max-width: 768px) {
                font-size: 2rem;
            }

            @media (max-width: 480px) {
                font-size: 1.6rem;
            }
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        
        @media (max-width: 768px) {
            width: 100%;
            gap: 0.4rem;
        }

        h5 {
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            
            @media (max-width: 768px) {
                font-size: 1.1rem;
                padding-left: 1.5rem;
                text-align: center;
                padding-right: 1.5rem;
            }

            @media (max-width: 480px) {
                font-size: 1rem;
                padding-left: 1.2rem;
                padding-right: 1.2rem;
            }

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
                
                @media (max-width: 768px) {
                    width: 0.6rem;
                    height: 0.6rem;
                }

                @media (max-width: 480px) {
                    width: 0.5rem;
                    height: 0.5rem;
                }
            }
        }

        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            @media (max-width: 768px) {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }

            @media (max-width: 480px) {
                gap: 0.3rem;
            }

            .text {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                
                @media (max-width: 768px) {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.3rem;
                    width: 100%;
                }

                @media (max-width: 480px) {
                    gap: 0.2rem;
                }

                p {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                    
                    @media (max-width: 768px) {
                        font-size: 0.9rem;
                    }

                    @media (max-width: 480px) {
                        font-size: 0.8rem;
                        gap: 0.3rem;
                    }
                }
            }
        }
    }
`;

export default IncomeItems
