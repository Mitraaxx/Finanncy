import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;   
    }
    
    
    :root{
        --primary-color: #222260;
        --primary-color2: 'color: rgba(34,34,96,.6)';
        --primary-color3: 'color: rgba(34,34,96,.4)';
        --color-green: #42AD00;
        --color-grey: #aaa;
        --color-accent: #F56692;
        --color-delete: #FF0000;
    }

    body{
        font-family: "Barlow", serif;
        font-size: 0.875rem; /* Reduced from clamp(1rem, 1.5vw, 1.25rem) to 14px equivalent */
        overflow: hidden;
        color: rgba(34,34,96,.6);
    }

    h1{
        font-size: 1.5rem; /* 24px */
        color: var(--primary-color)
    }
    
    h2{
        font-size: 1.25rem; /* 20px */
        color: var(--primary-color)
    }
    
    h3{
        font-size: 1.125rem; /* 18px */
        color: var(--primary-color)
    }
    
    h4{
        font-size: 1rem; /* 16px */
        color: var(--primary-color)
    }
    
    h5{
        font-size: 0.875rem; /* 14px */
        color: var(--primary-color)
    }
    
    h6{
        font-size: 0.75rem; /* 12px */
        color: var(--primary-color)
    }

    .error{
        color:red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0%{
                transform: translateX(0);
            }
            25%{
                transform: translateX(10px);
            }
            50%{
                transform: translateX(-10px);
            }
            75%{
                transform: translateX(10px);
            }
            100%{
                transform: translateX(0);
            }
        }
    }
`;