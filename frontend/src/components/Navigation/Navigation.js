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
    
    &:hover {
        color: rgba(34, 34, 96, 1);
        background: rgba(252, 246, 249, 0.9);
    }
    
    svg {
        font-size: 1.4rem;
    }
`;

const NavStyled = styled.nav`
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
    .user-con{
            height: 100px;
            display: flex;
            align-items: center;
            gap: 1rem;
            img{
                width: 80px;
                height: 80px;
                border-radius:50%;
                object-fit: cover;
                background: #fcf6f9;
                border: 2px solid #FFFFFF;
                padding: .2rem;
                box-shadow: 0px 1px 17px rgba(0,0,0,0.06);
            }
            h2{
                color: rgba(34, 34, 96, 1);
            }
            p{
                color: rgba(34 , 34, 96, .6);
            }        
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            marginL .6rem 0;
            font-weightL 500,
            cursor: pointer;
            transitionL all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34,34,96,0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
            &::before{
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 4px;
                height: 100%;
                background: #222260;
                border-radius: 0 10px 10px 0;
            }
    }
`;

export default Navigation