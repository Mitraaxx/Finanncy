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
    .history-item{
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
    }
    .all{
    margin-left: 37.5%;
    margin-top: 1rem;
    }
`;

export default View