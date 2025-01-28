'use client'
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import { AccountCircle, Logout, ManageAccounts, PostAdd } from '@mui/icons-material';
import { useThemeContext } from './ThemeContextProvider';
import { LightMode, DarkMode } from '@mui/icons-material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Link from 'next/link';

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isDarkMode, toggleTheme } = useThemeContext();
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar>
        {/* Left Side: Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}
        >
          <AlternateEmailIcon/>
          FB Replica
        </Typography>

        {/* Right Side: Menu Items */}
        <Link href="/posts" style={{ color: "inherit" }}>
          <Button startIcon={<ManageAccounts />} sx={{ marginRight: 2, color: 'white' }}>
            Posts
          </Button>
        </Link>
        <IconButton onClick={toggleTheme} color="inherit">
          {isDarkMode ? <LightMode /> : <DarkMode />}
        </IconButton>

        {/* Profile Dropdown */}
        <Tooltip title="Profile">
          <IconButton onClick={handleMenuClick} size="small" sx={{ ml: 2 }}>
            <Avatar alt="John Doe" src="/profile.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          PaperProps={{
            elevation: 4,
            sx: {
              overflow: "visible",
              mt: 1.5,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ManageAccounts fontSize="small" />
            </ListItemIcon>
            Manage Account
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;