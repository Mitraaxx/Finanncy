import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import Chart from "../chart/Chart";
import { useGlobalContext } from "../../context/GlobalContext";
import { dollar } from "../../utils/Icons";
import History from "../History/History";

const DownloadIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 16L7 11L8.4 9.6L11 12.2V4H13V12.2L15.6 9.6L17 11L12 16Z"
      fill="#222260"
    />
    <path d="M5 20V18H19V20H5Z" fill="#222260" />
  </svg>
);

function Dashboard() {
  const {
    totalExpense,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
    incomes,
    expense,
    downloadExcel,
  } = useGlobalContext();

  // Local loading state only for the download button
  const [isDownloadingExcel, setIsDownloadingExcel] = useState(false);

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const handleDownloadExcel = async () => {
    setIsDownloadingExcel(true);
    try {
      await downloadExcel();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloadingExcel(false);
    }
  };

  return (
    <DashboardStyled>
      <InnerLayout>
        <div className="header-container">
          <h1>All Transactions</h1>
          <button
            className="download-btn"
            onClick={handleDownloadExcel}
            disabled={isDownloadingExcel}
          >
            {isDownloadingExcel ? (
              <>
                <div className="spinner"></div>
                Downloading...
              </>
            ) : (
              <>
                <DownloadIcon/>
              </>
            )}
          </button>
        </div>

        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>&#8377; {totalIncome()}</p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>&#8377; {totalExpense()}</p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p className={totalBalance() < 0 ? "negative" : "positive"}>
                  &#8377; {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min<span>Salary</span>Max
            </h2>
            <div className="salary-item">
              <p>
                &#8377;
                {incomes.length > 0
                  ? Math.min(...incomes.map((item) => item.amount))
                  : 0}
              </p>
              <p>
                &#8377;
                {incomes.length > 0
                  ? Math.max(...incomes.map((item) => item.amount))
                  : 0}
              </p>
            </div>

            <h2 className="salary-title">
              Min<span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>
                &#8377;
                {expense.length > 0
                  ? Math.min(...expense.map((item) => item.amount))
                  : 0}
              </p>
              <p>
                &#8377;
                {expense.length > 0
                  ? Math.max(...expense.map((item) => item.amount))
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  @media screen and (max-width: 768px) {
    margin-top: 80px;
    padding-top: 1rem;
  }

  @media screen and (max-width: 480px) {
    margin-top: 70px;
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
      margin-bottom: 1.5rem;
    }
  }

  h1 {
    margin: 0;

    @media screen and (max-width: 768px) {
      font-size: 1.8rem;
      margin-bottom: 0;
    }

    @media screen and (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  .download-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8f9fa;
    color: #2c3e50;
    border: 1px solid #e9ecef;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.2s ease;

    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8),
      0 1px 3px rgba(0, 0, 0, 0.1);

    &:hover:not(:disabled) {
      background: #e9ecef;
      transform: translateY(-1px);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9),
        0 2px 5px rgba(0, 0, 0, 0.15);
    }

    &:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6),
        0 1px 2px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
      background: #f1f3f4;
      color: #9aa0a6;
      border-color: #e8eaed;
      cursor: not-allowed;
      transform: none;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid transparent;
      border-top: 2px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media screen and (max-width: 768px) {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      letter-spacing: 0.3px;

      .spinner {
        width: 16px;
        height: 16px;
      }
    }

    @media screen and (max-width: 480px) {
      padding: 0.45rem 0.9rem;
      font-size: 0.75rem;

      .spinner {
        width: 14px;
        height: 14px;
      }
    }
  }

  .stats-con {
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

    .chart-con {
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

      .amount-con {
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

        .income,
        .expense {
          grid-column: span 2;

          @media screen and (max-width: 1200px) {
            grid-column: span 1;
          }

          @media screen and (max-width: 768px) {
            grid-column: span 1;
          }
        }

        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
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

          p {
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

        .balance {
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

          p {
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

          p.positive {
            color: var(--color-green);
          }

          p.negative {
            color: red;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;

      @media screen and (max-width: 1200px) {
        grid-column: 1;
      }

      h2 {
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

      .salary-title {
        font-size: 1.2rem;

        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }

        @media screen and (max-width: 480px) {
          font-size: 0.9rem;
        }

        span {
          font-size: 1.8rem;

          @media screen and (max-width: 768px) {
            font-size: 1.4rem;
          }

          @media screen and (max-width: 480px) {
            font-size: 1.2rem;
          }
        }
      }

      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
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

        p {
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

export default Dashboard;