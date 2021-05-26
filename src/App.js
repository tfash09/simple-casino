import React, {useEffect} from 'react';
import Header from './component/Header';
import Footer from './component/Footer'
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { tableIcons } from './Icons';
import MaterialTable from "material-table";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '15ch',
    },
  },
}));

function App() {
  const [open, setOpen] = React.useState(false);
  const [balance, setBalance] = React.useState(99.99);
  const [user, setUser] = React.useState('');
  const [slot1, setSlot1] = React.useState('');
  const [slot2, setSlot2] = React.useState('');
  const [slot3, setSlot3] = React.useState('');
  const [games, setGames] = React.useState([]);

  useEffect(()=>{
    const user = localStorage.getItem('user');
    const balance = localStorage.getItem('balance');
    user && setUser(JSON.parse(user)); 
    balance && setBalance(JSON.parse(balance)); 
  },[])
    
  useEffect(()=>{    
    localStorage.setItem('user',JSON.stringify(user))    
    localStorage.setItem('balance',JSON.stringify(balance))    
  })

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const classes = useStyles();

  const handlePlayGame = (fake) => {
    let Slot1, Slot2, Slot3;
    if(fake){
      Slot1 = 7;
      Slot2 = 7;
      Slot3 = 7;
    }else{
      Slot1 = getRandomNumber();
      Slot2 = getRandomNumber();
      Slot3 = getRandomNumber();
    }
    setSlot1(Slot1);
    setSlot2(Slot2);
    setSlot3(Slot3);  
    const win = calculateWin(Slot1, Slot2, Slot3);
    setBalance(balance - 1 + win);
    if(win > 0){
      NotificationManager.success(`Congratulations you just won $${win}`);
    }else{
      NotificationManager.warning(`Try again, next might be your shot`);
    }
    let currentDate = new Date().toLocaleString().replace(',','');
    setGames([...games, {slot1: Slot1, slot2: Slot2, slot3: Slot3, dates: currentDate}])
  }

  const calculateWin = (x, y, z) => {
    if (x == y && y == z) {
      return x === 7 ? 10 : 5.0;
    }
  
    if (x == y || y == z || z == x) {
      return 0.5;
    }
  
    return 0;
  }

  const handleLogin = (name) => {
    if(name === "" || name === null){
      alert('Name is Required');
    }else{
      setUser(name);
      localStorage.setItem('user',JSON.stringify(name))    
    }
  }

  const handleLogout = () => {
    setUser('');
    setBalance(99.99);
  }

  const getRandomNumber = (min=1, max=9) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <div style={{display: 'flex', minHeight: '100vh', flexDirection: 'column'}}>
      <Header 
        balance={balance}
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
        <div className="content"> 
          <Button 
              variant="contained" 
              color="primary" 
              style={{ float: 'right' }}  
              onClick={() => { setSlot1(''); setSlot2(''); setSlot3(''); handleModalOpen();  }}
            >
            Start Game
          </Button><br />
          <MaterialTable
            style={{ marginTop: '30px' }}  
            icons={tableIcons}
            title="Previous Games"
            columns={[
              {
                title: 'ID',
                filtering: false,
                render: rowData => rowData.tableData.id + 1
              },
              {
                title: 'Slot 1',
                field: 'slot1',
                sorting: false
              },
              {
                title: 'Slot 2',
                field: 'slot2',
                sorting: false
              },
              {
                title: 'Slot 3',
                field: 'slot3',
                sorting: false
              },
              {
                title: 'Date',
                field: 'dates',
                render: (rowData) => new Date(rowData.dates).toDateString(),
              },
            ]}
            data={games}
            options={{
              actionsColumnIndex: -1,
              exportButton: false,
              filtering: false,
              paging: false,
              search: false,
            }}
          />
        </div>
      <Footer />
      <Dialog open={open} onClose={handleModalClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Play Game</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="slot1" value={slot1} type="number" min="0" disabled  label="Slot 1" variant="outlined" />
            <TextField id="slot2" value={slot2} type="number" min="0" disabled label="Slot 2" variant="outlined" />
            <TextField id="slot3" value={slot3} type="number" min="0" disabled label="Slot 3" variant="outlined" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlePlayGame(false)} color="primary" variant="contained">
            Play Game
          </Button>
          <Button onClick={() => handlePlayGame(true)} color="primary" variant="contained">
            Fake Game
          </Button>
          <Button onClick={handleModalClose} color="primary" variant="contained">
            Close Game
          </Button>
        </DialogActions>
      </Dialog>
      <NotificationContainer />

    </div>
  );
}

export default App;
