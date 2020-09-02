import React , {useState, useEffect} from 'react';
import './App.css';
import Logo from './img/ig_logo.png';
import Post from './Post';
import { db, auth } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //User has logged in...
        console.log(authUser);
        setUser(authUser);

      } else {
        //user has logged out...
        setUser(null);
      }
    })

    return () => {
      //perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))
  }

  return (
    <div className="app">

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img src={Logo} className="app_headerImage" alt=""/>
            </center>

            <Input placeholder="username" type="text" value={username} 
            onChange={(e) => setUsername(e.target.value)}/>
            
            <Input placeholder="email" type="text" value={email} 
            onChange={(e) => setEmail(e.target.value)}/>

            <Input placeholder="password" type="password" value={password} 
            onChange={(e) => setPassword(e.target.value)}/>

            <Button type="submit" onClick={signUp}>SignUp</Button>

          </form>          
        </div>
      </Modal>
      
      <div className="app_header">
        <img src={Logo} className="app_headerImage" alt=""/>
      </div>

      {user ? 
        <Button onClick={() => auth.signOut()}> Logout </Button> :
        <Button onClick={() => setOpen(true)}> SignUp </Button> 
      }

      <h1>Instagram Clone with React</h1>   
      
      {/* Header   */}

      {posts.map(post => (
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))}

     </div>
  );
}

export default App;
