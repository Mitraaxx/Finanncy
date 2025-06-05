import styled from "styled-components";
import bg from './images/bg.png'
import { MainLayout } from "./styles/Layouts";
import Orb from "./components/orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import React, { useMemo, useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expenses from "./components/Expenses/Expenses";
import { useGlobalContext } from "./context/GlobalContext";
import View from "./components/View/View";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false); // Check local storage for token on initial load

  const [active, setActive] = React.useState(1)

  const global = useGlobalContext()
  console.log(global)

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
    setIsAuthenticated(false);
  };
  
  // Check local storage for token on initial load and update isAuthenticated state
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token ? true : false);
  }, []);

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
 <MainLayout>
 {isAuthenticated && <Navigation active={active} setActive={setActive}/>} {/* Show navigation only when authenticated */}
 <main>
 <Routes>
 <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
 <Route path="/register" element={<Register />} />
 <Route path="/" element={isAuthenticated ? displayData() : <Navigate to="/login" />} />
 {/* Add routes for other components if needed, e.g., /income, /expenses */}
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
 background-size: cover;
 background-position: center;
 position: relative;
 
 main{
      flex: 1;
      background: rgba(252, 246, 249, 0.78);
      border: 2px solid #FFFFFF; /* Reduced from 3px */
      backdrop-filter: blur(4.5px);
      border-radius: 20px; /* Reduced from 32px */
      overflow: auto;
      overflow-x: hidden;
      font-size: 0.875rem; /* Ensure consistent smaller font size */
      
      &::-webkit-scrollbar{
      width: 0;
      }
    }
`;

export default App;
