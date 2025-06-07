import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/GlobalContext';
import Form from '../Form/Form';
import IncomeItems from '../IncomeItems/IncomeItems';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons'
import Button from '../Button/Button';
import { dateFormat } from '../../utils/dateFormat';

function View() {
    const {ViewHistory} = useGlobalContext()
      
    const [...view] = ViewHistory()

  return (
    <ViewStyled>
        <h2 className='all'>ALL TRANSACTIONS</h2>
        {view.map((item) =>{
        const {id, title, amount, type,date} = item
        return (
            <div key={id} className="history-item">
                    <p style={{
                        color: type === 'expense' ? 'red' : 'var(--color-green)' 
                    }}>
                        {title}
                    </p>

                    <p style={{
                        color: (type === 'expense') ? 'red' : 'var(--color-green)'
                    }}> 
                        {
                            type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0: amount}`
                        }
                    </p>

                    <p style={{
                        color: type === 'expense' ? 'red' : 'var(--color-green)' 
                    }}>
                        {calender} {dateFormat(date)}
                    </p>
                </div>
            )
        })}
    </ViewStyled>
  )
}

const ViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  
  /* Remove fixed zoom and make it responsive */
  zoom: .65;
  
  .history-item {
    background: #FCF6F9;
    border: 1px solid #FFFFFF;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    padding: 2rem;
    border-radius: 30px;
    font-size: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem;
    width: calc(100% - 2rem);
    box-sizing: border-box;
    
    /* Mobile First - Small screens */
    @media (max-width: 480px) {
      padding: 1rem;
      margin: 0.5rem;
      width: calc(100% - 1rem);
      font-size: 1rem;
      border-radius: 16px;
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
      box-shadow: rgba(50, 50, 93, 0.15) 0px 6px 12px -3px, rgba(0, 0, 0, 0.2) 0px 4px 8px -4px;
    }
    
    /* Small tablets */
    @media (min-width: 481px) and (max-width: 768px) {
      padding: 1.5rem;
      margin: 0.75rem;
      width: calc(100% - 1.5rem);
      font-size: 1.2rem;
      border-radius: 20px;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    /* Tablets */
    @media (min-width: 769px) and (max-width: 1024px) {
      padding: 1.75rem;
      margin: 1rem;
      font-size: 1.4rem;
      border-radius: 25px;
    }
    
    /* Desktop and larger */
    @media (min-width: 1025px) {
      padding: 2rem;
      margin: 1rem;
      font-size: 1.6rem;
      border-radius: 30px;
    }
  }
  
  .all {
    margin-top: 1rem;
    
    /* Mobile First - Center on small screens */
    @media (max-width: 768px) {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      width: 100%;
    }
    
    /* Tablet - Reduce left margin */
    @media (min-width: 769px) and (max-width: 1024px) {
      margin-left: 25%;
    }
    
    /* Desktop - Original positioning */
    @media (min-width: 1025px) {
      margin-left: 37.5%;
    }
    
    /* Large desktop - Adjust for very wide screens */
    @media (min-width: 1440px) {
      margin-left: 40%;
    }
  }
  
  /* Container responsive adjustments */
  @media (max-width: 480px) {
    gap: 0.5rem;
    padding: 0 0.5rem;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    gap: 0.75rem;
    padding: 0 1rem;
  }
  
  @media (min-width: 769px) {
    gap: 1rem;
  }
  
  /* Very small screens handling */
  @media (max-width: 320px) {
    .history-item {
      padding: 0.75rem;
      margin: 0.25rem;
      width: calc(100% - 0.5rem);
      font-size: 0.9rem;
      border-radius: 12px;
    }
  }
`;



export default View
