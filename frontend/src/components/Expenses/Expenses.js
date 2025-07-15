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

   // Sort expenses by date (newest first)
  const sortedExpenses = [...expense].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
    <ExpenseStyled>
        <InnerLayout>
              <h1>Expenses</h1>
                <h2 className='total-income'>Total Expense: <span>&#8377;{totalExpense()}</span></h2>
               <div className='income-content'>
                <div className='form-container'>
                  <ExpenseForm/>
                </div>
                <div className='incomes-container'>
                    <div className='incomes'>
                        {sortedExpenses.map(income=>{
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
                 
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-delete);
        }
                 
        @media (max-width: 768px) {
            font-size: 1.5rem;
            padding: .75rem;
            margin: .75rem 0;
            border-radius: 15px;
                         
            span {
                font-size: 2rem;
            }
        }
                 
        @media (max-width: 480px) {
            font-size: 1.25rem;
            padding: .5rem;
            margin: .5rem 0;
            border-radius: 10px;
            flex-direction: column;
            text-align: center;
                         
            span {
                font-size: 1.5rem;
            }
        }
    }
         
    .income-content{
        display: flex;
        gap: 2rem;
        height: calc((100vh - 180px) / 0.71); // Adjusted for zoom: 0.71 in InnerLayout
        
        .form-container {
            overflow: visible; // Remove scroll from form
        }
                 
        .incomes-container{
            flex: 1;
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 20px;
            padding: 1rem;
            overflow: hidden;
            
            .incomes{
                height: 100%;
                overflow-y: auto;
                padding-right: 0.5rem;
                
                /* Custom scrollbar styling to match theme */
                &::-webkit-scrollbar {
                    width: 8px;
                }
                
                &::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                
                &::-webkit-scrollbar-thumb {
                    background: var(--color-delete);
                    border-radius: 10px;
                    opacity: 0.7;
                }
                
                &::-webkit-scrollbar-thumb:hover {
                    background: var(--color-delete);
                    opacity: 1;
                }
                
                /* Firefox scrollbar styling */
                scrollbar-width: thin;
                scrollbar-color: var(--color-delete) #f1f1f1;
            }
        }
                 
        @media (max-width: 768px) {
            gap: 1.5rem;
            flex-direction: column;
            height: auto;
            
            .incomes-container {
                height: 500px; // Increased height for mobile
            }
        }
                 
        @media (max-width: 480px) {
            gap: 1rem;
            
            .incomes-container {
                height: 450px; // Increased height for very small screens
                padding: 0.75rem;
                border-radius: 15px;
            }
        }
    }
         
    @media (max-width: 768px) {
        flex-direction: column;
        overflow: visible;
    }
         
    @media (max-width: 480px) {
        padding: 0 .5rem;
    }
`;

export default Expenses