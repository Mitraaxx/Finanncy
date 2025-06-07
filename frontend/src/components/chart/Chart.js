import React from 'react'
import {Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/GlobalContext'
import {dateFormat} from '../../utils/dateFormat'


ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
 const {incomes ,expense} = useGlobalContext()

 const data ={
    labels: incomes.map((inc) =>{
        const {date} = inc
        return dateFormat(date)
    }),

    datasets: [
        {
          label: 'Income',
          data: [
               ...incomes.map((income) =>{
                const{amount} = income
                return amount
               })
          ],
          backgroundColor: 'green',
          tension: .2
        },
        {
            label: 'Expenses',
            data: [
                 ...expense.map((expense) =>{
                  const{amount} = expense
                  return amount
                 })
            ],
            backgroundColor: 'red',
            tension: .2
          }
    ]
 }

  return (
    <chartStyled>
        <Line data={data}/>
    </chartStyled>
  )
}

const chartStyled = styled.div`
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
  width: 100%;
  
  /* Mobile First - Small screens */
  @media (max-width: 480px) {
    padding: 0.75rem;
    border-radius: 12px;
    border-width: 1px;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.04);
  }
  
  /* Tablet */
  @media (min-width: 481px) and (max-width: 768px) {
    padding: 0.875rem;
    border-radius: 16px;
  }
  
  /* Desktop */
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 1rem;
    border-radius: 18px;
  }
  
  /* Large Desktop */
  @media (min-width: 1025px) {
    padding: 1.25rem;
    border-radius: 20px;
  }
  
  /* Ensure content doesn't overflow */
  overflow: hidden;
  box-sizing: border-box;
  
  /* Handle very small screens */
  @media (max-width: 320px) {
    padding: 0.5rem;
    border-radius: 8px;
    min-height: 200px;
  }
`;

export default Chart
