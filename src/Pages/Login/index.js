import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import API from '../../RemoteAPI/API';
import { withRouter } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';

function Copyright() {
  return (
    <>
      <Typography variant="body1" color="textSecondary" align="center">
       demo account: 
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        username: admin <br /> password: password
      </Typography>
      <br />
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function SignInSide({ formState, handleFormInput, handleFormSubmit, authError, handleClose }) {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={handleFormInput}
              value={formState.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleFormInput}
              value={formState.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" name="remember" color="primary" checked={formState.remember} onChange={handleFormInput}/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <Snackbar 
        open={Boolean(authError)}
        message={authError?.message}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
      />
    </Grid>
  );
}

function SigninContainer({ history }) {
  const [formState, setFormState] = useState({ username: '', password: '', remember: false });
  const [authError, setAuthError] = useState(null);

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      await API.signin(formState.username, formState.password, formState.remember);
      history.push('/admin')
    } catch (e) {
      setAuthError({ message: e.response.data.message })
      setFormState({...formState, password: '' })
    }
  }

  function handleFormInput(e) {
    if (e.target.name === 'remember') {
      return setFormState({ ...formState, [e.target.name]: e.target.checked });
    }
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleClose() {
    setAuthError(null);
  }

  return (
    <SignInSide { ...{formState, handleFormInput, handleFormSubmit, authError, handleClose} } />
  )
}

export default withRouter(SigninContainer);
