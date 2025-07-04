import { 
  Drawer,
  List, 
  ListItem,
  ListItemText,
  Divider,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';

const BurgerMenu = ({ 
  isOpen, 
  onClose,
  user,
  onSignOut
}) => {
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/orders', label: 'Orders' },
    { path: '/prime', label: 'Prime' },
    { path: '/test', label: 'Test' },
    user 
      ? { 
          label: 'Sign Out', 
          action: onSignOut 
        }
      : { 
          path: '/login', 
          label: 'Sign In' 
        }
  ];

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      PaperProps={{ sx: { width: 280 } }}
    >
      <Box sx={{ p: 2 }}>
        <ListItemText 
          primary={user ? user.email : 'Guest'} 
          secondary={user ? 'Your Account' : 'Sign in for better experience'}
          sx={{ mb: 2 }}
        />
        <Divider />
        
        <List>
          {menuItems.map((item, index) => (
            <ListItem 
              button 
              key={index}
              component={item.path ? Link : 'div'}
              to={item.path}
              onClick={item.action || onClose}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default BurgerMenu;