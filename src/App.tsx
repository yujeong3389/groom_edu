import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blueGrey, green, pink, purple } from '@mui/material/colors';
import Header from './components/Header';
import { Paper, Switch as MaterialSwitch, ThemeOptions, Container } from '@mui/material';
import Products from './pages/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';

function App() {
  const [isDark,setIsDark]=useState(false);
  const [themeOption,setThemeOption]=useState<ThemeOptions>({ //mui에서 themeOptions 타입 사용
    palette: {
      mode:"light", //Mui 버전5 이상에서는 type대신 mode로 이름 바뀜
      primary: {
        main: blueGrey[500],
      },
      secondary: {
        main: pink[500],
      },
      
    },
  });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDark(event.target.checked);
        setThemeOption(prev=>({ //prev는 setThemeOption이 호출될 때의 현재 themeOption 상태
          ...prev,
          palette:{
            ...prev.palette, //prev.palette를 가져오지 않으면 페이지가 마운트 될 때만 내가 palette에 정한 blueGrey색상이 적용되고,
            // 그 이후부터 light모드 시 원래 기본 색상이 적용된다.
            mode:event.target.checked?"dark":"light",
          }
        }))
    };
    console.log(isDark);

    const theme = createTheme(themeOption);

  return (
    <ThemeProvider theme={theme}>
        
        
        <Router>
        <Header>
          <MaterialSwitch
            checked={isDark}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Header>
        <Container>
          <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
          </Container>
        </Router>
        
    </ThemeProvider>
  );
}

export default App;
