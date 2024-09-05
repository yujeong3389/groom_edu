import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ShoppingCart } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import { cartItemVar } from '../cache';
import { Link } from 'react-router-dom';

interface Props{
    children:React.ReactNode;
};

const Header = ({children}:Props) => {

    const cartItems=useReactiveVar(cartItemVar);//값이 변경될 때 마다 리랜더링 됨
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
                </Typography>
                {children}
                <Link to='/cart'>
                <IconButton>
                    <Badge badgeContent={cartItems.length} color="secondary">
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
                </Link>
                <Button color="inherit">Login</Button>
            </Toolbar>
            </AppBar>
        </Box>
    </div>
    );
};

export default Header;