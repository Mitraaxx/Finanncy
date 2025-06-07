import React from 'react'
import styled from 'styled-components'
import { menuItems } from '../../utils/menuItems';
import { signout } from '../../utils/Icons';
import avatar from '../../images/avatar.png'
import { useNavigate } from 'react-router-dom'

function Navigation({active, setActive, handleLogout}) {
  const navigate = useNavigate();
  
  // Get username directly from localStorage
  const username = localStorage.getItem('username') || 'User';
  
  const handleSignOut = () => {
    // Clear any auth tokens or user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Also remove the username
    sessionStorage.clear();
    
    // Call the existing handleLogout function if it exists
    if (handleLogout) {
      handleLogout();
    }
    
    // Force a complete page reload to clear any React state
    window.location.href = '/login';
  }

  return (
    <NavStyled>
        <div className='user-con'>
            <img src= {avatar} alt=''/>
            <div className='text'>
                <h2>{username}</h2>
                <p>Your Money</p>
            </div>
        </div>
        <ul className='menu-items'>
            {menuItems.map((item) =>{
                return<li key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                >
                    {item.icon}
                    <span>{item.title}</span>
                </li>
            })}
        </ul>
        <div className='bottom-nav'>
            <ButtonStyled onClick={handleSignOut}>
                {signout} Sign Out
            </ButtonStyled>
        </div>
    </NavStyled>
  )
}

const ButtonStyled = styled.button`
    zoom: .90;
    display: flex;
    align-items: center;
    gap: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: rgba(34, 34, 96, 0.6);
    transition: all .4s ease-in-out;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    width: 100%;
    justify-content: center;
    
    &:hover {
        color: rgba(34, 34, 96, 1);
        background: rgba(252, 246, 249, 0.9);
    }
    
    svg {
        font-size: 1.4rem;
    }

    @media screen and (max-width: 768px) {
        font-size: 0.9rem;
        padding: 0.4rem 0.8rem;
        gap: 0.5rem;
        
        svg {
            font-size: 1.2rem;
        }
    }
`;

const NavStyled = styled.nav`
    zoom : 0.63;
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    @media screen and (max-width: 1200px) {
        width: 320px;
        padding: 1.5rem 1rem;
    }

    @media screen and (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: auto;
        padding: 1rem;
        border-radius: 0 0 20px 20px;
        gap: 1rem;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        
        .user-con {
            flex-shrink: 0;
            min-width: auto;
        }
        
        .menu-items {
            flex: 1;
            flex-direction: row;
            gap: 0.5rem;
            justify-content: center;
            padding: 0;
            
            li {
                white-space: nowrap;
                min-width: auto;
                justify-content: center;
                padding: 0.5rem;
                border-radius: 10px;
                
                span {
                    display: none;
                }
            }
        }
        
        .bottom-nav {
            flex-shrink: 0;
            min-width: auto;
        }
    }

    @media screen and (max-width: 480px) {
        padding: 0.8rem;
        gap: 0.5rem;
        
        .menu-items {
            gap: 0.3rem;
            
            li {
                padding: 0.4rem;
            }
        }
    }
    
    .user-con {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        
        @media screen and (max-width: 1200px) {
            gap: 0.8rem;
        }
        
        @media screen and (max-width: 768px) {
            height: auto;
            flex-direction: row;
            text-align: left;
            gap: 0.5rem;
        }
        
        @media screen and (max-width: 480px) {
            gap: 0.3rem;
        }
        
        @media screen and (max-width: 360px) {
            gap: 0.2rem;
        }
        
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0,0,0,0.06);
            
            @media screen and (max-width: 1200px) {
                width: 70px;
                height: 70px;
            }
            
            @media screen and (max-width: 768px) {
                width: 50px;
                height: 50px;
            }
            
            @media screen and (max-width: 480px) {
                width: 40px;
                height: 40px;
            }
            
            @media screen and (max-width: 360px) {
                width: 35px;
                height: 35px;
            }
        }
        
        .text {
            flex: 1;
            min-width: 0; /* Allows text to shrink */
            
            @media screen and (max-width: 480px) {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }
        
        h2 {
            color: rgba(34, 34, 96, 1);
            font-size: clamp(0.9rem, 2.5vw, 1.5rem);
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            
            @media screen and (max-width: 1200px) {
                font-size: clamp(0.9rem, 2.2vw, 1.3rem);
            }
            
            @media screen and (max-width: 768px) {
                font-size: clamp(0.8rem, 3vw, 1rem);
                white-space: normal;
                overflow: visible;
                text-overflow: unset;
                line-height: 1.2;
            }
            
            @media screen and (max-width: 480px) {
                font-size: clamp(0.75rem, 3.5vw, 0.9rem);
                display: block;
            }
            
            @media screen and (max-width: 360px) {
                font-size: clamp(0.7rem, 4vw, 0.8rem);
            }
        }
        
        p {
            color: rgba(34, 34, 96, .6);
            font-size: clamp(0.8rem, 2vw, 1rem);
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            
            @media screen and (max-width: 1200px) {
                font-size: clamp(0.75rem, 1.8vw, 0.9rem);
            }
            
            @media screen and (max-width: 768px) {
                font-size: clamp(0.7rem, 2.5vw, 0.8rem);
                white-space: normal;
                overflow: visible;
                text-overflow: unset;
            }
            
            @media screen and (max-width: 480px) {
                font-size: clamp(0.65rem, 3vw, 0.75rem);
                display: block;
            }
            
            @media screen and (max-width: 360px) {
                font-size: clamp(0.6rem, 3.5vw, 0.7rem);
            }
        }        
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        
        @media screen and (max-width: 768px) {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
            overflow-x: auto;
            padding: 0;
        }
        
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            
            @media screen and (max-width: 768px) {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0.5rem;
                margin: 0;
                gap: 0.2rem;
                min-width: 60px;
                flex-shrink: 0;
            }
            
            @media screen and (max-width: 480px) {
                min-width: 50px;
                padding: 0.4rem 0.2rem;
            }
            
            i {
                color: rgba(34,34,96,0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
                
                @media screen and (max-width: 768px) {
                    font-size: 1.2rem;
                }
                
                @media screen and (max-width: 480px) {
                    font-size: 1rem;
                }
            }
            
            span {
                @media screen and (max-width: 768px) {
                    display: none;
                }
            }
        }
    }

    .active {
        color: rgba(34, 34, 96, 1) !important;
        
        @media screen and (max-width: 768px) {
            background: rgba(252, 246, 249, 0.9);
            border-radius: 10px;
        }
        
        i {
            color: rgba(34, 34, 96, 1) !important;
        }
        
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
            
            @media screen and (max-width: 768px) {
                display: none;
            }
        }
    }
`;


export default Navigation
