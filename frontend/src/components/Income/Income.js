import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/GlobalContext';
import Form from '../Form/Form';
import IncomeItems from '../IncomeItems/IncomeItems';

function Income() {

  const {addIncome,incomes,getIncomes,deleteIncome, totalIncome} = useGlobalContext()

  useEffect(() =>{
    getIncomes()
  },[])

  return (
    <IncomeStyled>
        <InnerLayout>
              <h1>Incomes</h1>  
              <h2 className='total-income'>Total Income: <span>&#8377;{totalIncome()}</span></h2> 
              <div className='income-content'>
                <div className='form-container'>
                  <Form/>
                </div>
                <div className='incomes'>
                    {incomes.map(income=>{
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
                          indicatorColor="var(--color-green)"
                          deleteItem={deleteIncome}
                      />
                    })}
                </div>
                </div>   
        </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
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
            color: var(--color-green);
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
        
        .incomes{
            flex: 1;
        }
        
        @media (max-width: 768px) {
            gap: 1.5rem;
            flex-direction: column;
        }
        
        @media (max-width: 480px) {
            gap: 1rem;
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

export default Income
