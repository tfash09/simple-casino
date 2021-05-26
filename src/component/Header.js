import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import {AccountCircle, BrandingWatermark, AttachMoney} from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }, 
}));

export default function Header({balance, user, handleLogin, handleLogout}) {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfile = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <BrandingWatermark />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            TestB Casino
          </Typography>
          <Chip label={balance} variant="outlined" icon={<AttachMoney />} style={{backgroundColor: 'white', color: 'green', marginRight: '5px'}} />
          {user !== '' ? (
            <div>
                {user}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openProfile}
                onClose={handleClose}
              >
                <MenuItem onClick={ () => {handleLogout(); handleClose();} }>Logout</MenuItem>
              </Menu>
            </div>
          ) : 
            <Button variant="contained" color="primary" style={{ backgroundColor: 'green' }} onClick={handleModalOpen}>
                Login
            </Button>
          }
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleModalClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
          <Button onClick={() => {handleLogin(name); handleModalClose() }} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}