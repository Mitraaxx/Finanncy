import styled from "styled-components";
import bg from './images/bg.png'
import { MainLayout } from "./styles/Layouts";
import Orb from "./components/orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import React, { useMemo, useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expenses from "./components/Expenses/Expenses";
import { useGlobalContext } from "./context/GlobalContext";
import View from "./components/View/View";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LoadingSpinner from "./Loading";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);
  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  const { loading, loadingStates } = global;
  
  // Debug logging for loading states
  useEffect(() => {
    console.log('App - Loading state:', loading);
    console.log('App - Individual loading states:', loadingStates);
  }, [loading, loadingStates]);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard/>
      case 2:
        return <View/>
      case 3:
        return <Income/>
      case 4:
        return <Expenses/>
      default:
        return <Dashboard/>
    }
  }

  const orbMemo = useMemo(()=> {
    return <Orb/>
  },[])
  
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };
  
  // Check local storage for token on initial load and update isAuthenticated state
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token ? true : false);
  }, []);

  // This used for the bot 
  React.useEffect(() => {
  const script1 = document.createElement("script");
  script1.innerHTML = `
    window.chtlConfig = { chatbotId: "5128478583" };
  `;
  document.body.appendChild(script1);

  const script2 = document.createElement("script");
  script2.src = "https://chatling.ai/js/embed.js";
  script2.async = true;
  script2.setAttribute("data-id", "5128478583");
  script2.setAttribute("id", "chtl-script");
  script2.type = "text/javascript";
  document.body.appendChild(script2);

  return () => {
    document.body.removeChild(script1);
    document.body.removeChild(script2);
  };
}, []);

  return (
    <Router>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        {/* Show loading spinner when any API call is in progress */}
        {loading && (
          <LoadingOverlay>
            <LoadingSpinner size="50px" color="#4b61eb" />
            <LoadingText>Processing...</LoadingText>
          </LoadingOverlay>
        )}
        <MainLayout>
          {isAuthenticated && <Navigation active={active} setActive={setActive} handleLogout={handleLogout} />}
          <main>
            <Routes>
              <Route 
                path="/login" 
                element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
              />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/" 
                element={isAuthenticated ? displayData() : <Navigate to="/login" />} 
              />
            </Routes>
          </main>
        </MainLayout>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
    height: 100vh;
    background-image: url(${props => props.bg});
    position: relative;

    main {
        flex: 1;
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #FFFFFF;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        overflow: auto;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 0;
        }
    }

    @media (max-width: 768px) {
        main {
            border-radius: 24px;
            border: 2px solid #FFFFFF;
            backdrop-filter: blur(3.5px);
        }
    }

    @media (max-width: 480px) {
        main {
            border-radius: 16px;
            border: 1px solid #FFFFFF;
            backdrop-filter: blur(2.5px);
        }
    }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
  
  /* Mobile */
  @media (max-width: 768px) {
    backdrop-filter: blur(1px);
  }
  
  /* Tablet */
  @media (min-width: 769px) and (max-width: 1024px) {
    backdrop-filter: blur(1.5px);
  }
  
  /* Desktop */
  @media (min-width: 1025px) {
    backdrop-filter: blur(2px);
  }
`;

const LoadingText = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 1rem;
  text-align: center;
  
  /* Mobile */
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  /* Tablet */
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.05rem;
  }
  
  /* Desktop */
  @media (min-width: 1025px) {
    font-size: 1.1rem;
  }
`;

export default App;
