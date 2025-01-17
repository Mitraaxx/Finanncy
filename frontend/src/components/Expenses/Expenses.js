import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/GlobalContext';
import Form from '../Form/Form';
import IncomeItems from '../IncomeItems/IncomeItems';
import ExpenseForm from './ExpenseForm';


function Expenses() {

  const {addIncome,expense,getExpenses,deleteExpense, totalExpense} = useGlobalContext()

  useEffect(() =>{
    getExpenses()
  },[])

  return (
    <ExpenseStyled>
        <InnerLayout>
              <h1>Expenses</h1>  
              <h2 className='total-income'>Total Expense: <span>&#8377;{totalExpense()}</span></h2> 
              <div className='income-content'>
                <div className='form-container'>
                  <ExpenseForm/>
                </div>
                <div className='incomes'>
                    {expense.map(income=>{
                      const {_id, title, amount, date, category, description,type} = income;
                      return <IncomeItems
                          key={_id}
                          id={_id} 
                          title={title} 
                          description={description} 
                          amount={amount} 
                          date={date} 
                          type={type}
                          category={category} 
                          indicatorColor="var(--color-delete)"
                          deleteItem={deleteExpense}
                      />
                    })}
                </div>
                </div>   
        </InnerLayout>
    </ExpenseStyled>
  )
}

const ExpenseStyled = styled.div`
      display: flex;
      overflow: auto;
      .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-delete);
        }
      }  
      .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
          flex: 1;
        }
      }
`;

export default Expenses