import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../chart/Chart';
import { useGlobalContext } from '../../context/GlobalContext';
import { dollar } from '../../utils/Icons';
import History from '../History/History';



function Dashboard() {
  const {totalExpense, totalIncome, totalBalance,getIncomes,getExpenses,incomes,expense} = useGlobalContext()
  
  useEffect(() =>{
    getIncomes()
    getExpenses()
  },[])
  return (
    <DashboardStyled>
        <InnerLayout>
          <h1>All Transactions</h1>
          <div className='stats-con'>
            <div className='chart-con'>
                <Chart/>
                <div className='amount-con'>
                  <div className='income'>
                      <h2>Total Income</h2>
                      <p>
                       &#8377; {totalIncome()}
                      </p>
                  </div>
                  <div className='expense'>
                      <h2>Total Expense</h2>
                      <p>
                      &#8377; {totalExpense()}
                      </p>
                  </div>
                  <div className='balance'>
                      <h2>Total Balance</h2>
                      <p className={totalBalance() < 0 ? 'negative' : ''}>
                      &#8377; {totalBalance()}
                      </p>
                  </div>
                </div>
            </div>
            <div className='history-con'>
              <History/>
              <h2 className='salary-title'>Min<span>Salary</span>Max</h2>
              <div className='salary-item'>
              <p>
              &#8377;{Math.min(...incomes.map(item => item.amount))}
              </p>
              <p>
              &#8377;{Math.max(...incomes.map(item => item.amount))}
              </p>
              </div>

              <h2 className='salary-title'>Min<span>Expense</span>Max</h2>
              <div className='salary-item'>
              <p>
              &#8377;{Math.min(...expense.map(item => item.amount))}
              </p>
              <p>
              &#8377;{Math.max(...expense.map(item => item.amount))}
              </p>
              </div>
            </div>
          </div>
            
        </InnerLayout>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
    @media screen and (max-width: 768px) {
        margin-top: 80px; /* Add space for fixed navigation */
        padding-top: 1rem;
    }
    
    @media screen and (max-width: 480px) {
        margin-top: 70px; /* Slightly less space for smaller screens */
    }

    h1 {
        @media screen and (max-width: 768px) {
            font-size: 1.8rem;
            text-align: center;
            margin-bottom: 1.5rem;
        }
        
        @media screen and (max-width: 480px) {
            font-size: 1.5rem;
        }
    }

    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        
        @media screen and (max-width: 1200px) {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        @media screen and (max-width: 768px) {
            gap: 1rem;
        }
        
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            
            @media screen and (max-width: 1200px) {
                grid-column: 1;
                height: auto;
                min-height: 300px;
            }
            
            @media screen and (max-width: 768px) {
                min-height: 250px;
            }
            
            @media screen and (max-width: 480px) {
                min-height: 200px;
            }
            
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                
                @media screen and (max-width: 1200px) {
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                }
                
                @media screen and (max-width: 768px) {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .income, .expense{
                    grid-column: span 2;
                    
                    @media screen and (max-width: 1200px) {
                        grid-column: span 1;
                    }
                    
                    @media screen and (max-width: 768px) {
                        grid-column: span 1;
                    }
                }
                
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    
                    @media screen and (max-width: 768px) {
                        padding: 0.8rem;
                        border-radius: 15px;
                    }
                    
                    h2 {
                        font-size: 1.2rem;
                        margin-bottom: 0.5rem;
                        
                        @media screen and (max-width: 768px) {
                            font-size: 1rem;
                        }
                        
                        @media screen and (max-width: 480px) {
                            font-size: 0.9rem;
                        }
                    }
                    
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                        
                        @media screen and (max-width: 1200px) {
                            font-size: 2.5rem;
                        }
                        
                        @media screen and (max-width: 768px) {
                            font-size: 2rem;
                        }
                        
                        @media screen and (max-width: 480px) {
                            font-size: 1.5rem;
                        }
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    
                    @media screen and (max-width: 1200px) {
                        grid-column: span 1;
                    }
                    
                    @media screen and (max-width: 768px) {
                        grid-column: span 1;
                    }
                    
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                        
                        @media screen and (max-width: 1200px) {
                            font-size: 3rem;
                        }
                        
                        @media screen and (max-width: 768px) {
                            font-size: 2.5rem;
                        }
                        
                        @media screen and (max-width: 480px) {
                            font-size: 2rem;
                        }
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            
            @media screen and (max-width: 1200px) {
                grid-column: 1;
            }
            
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                
                @media screen and (max-width: 768px) {
                    margin: 0.8rem 0;
                    font-size: 1.1rem;
                }
                
                @media screen and (max-width: 480px) {
                    font-size: 1rem;
                }
            }
            
            .salary-title{
                font-size: 1.2rem;
                
                @media screen and (max-width: 768px) {
                    font-size: 1rem;
                }
                
                @media screen and (max-width: 480px) {
                    font-size: 0.9rem;
                }
                
                span{
                    font-size: 1.8rem;
                    
                    @media screen and (max-width: 768px) {
                        font-size: 1.4rem;
                    }
                    
                    @media screen and (max-width: 480px) {
                        font-size: 1.2rem;
                    }
                }
            }
            
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                
                @media screen and (max-width: 768px) {
                    padding: 0.8rem;
                    border-radius: 15px;
                    margin-bottom: 0.8rem;
                }
                
                @media screen and (max-width: 480px) {
                    padding: 0.6rem;
                    margin-bottom: 0.6rem;
                }
                
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                    
                    @media screen and (max-width: 768px) {
                        font-size: 1.3rem;
                    }
                    
                    @media screen and (max-width: 480px) {
                        font-size: 1.1rem;
                    }
                }
            }
        }
    }
`;

   

export default Dashboard
