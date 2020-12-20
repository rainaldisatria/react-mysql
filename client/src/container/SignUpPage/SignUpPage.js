import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import ServerAPI from '../../Axios/ServerAPI';
import { Redirect } from 'react-router-dom';
import sendNotification from '../../components/Notification/Notification'
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpPage() {
  const classes = useStyles();
  const history = useHistory();

  const [signUpFields, setSignUpFields] = useState({})
  const [errorTexts, setErrorTexts] = useState({});

  const validate = () => {
    var isError = false;

    if (signUpFields?.firstName?.length <= 0) {
      setErrorTexts(prevValue => ({ ...prevValue, firstName: 'Enter first names', }))
      isError = true;
    } else {
      setErrorTexts(prevValue => ({ ...prevValue, firstName: '', }))
    }

    if (signUpFields?.lastName?.length <= 0) {
      setErrorTexts(prevValue => ({ ...prevValue, lastName: 'Enter last names' }));
      isError = true;
    }
    else {
      setErrorTexts(prevValue => ({ ...prevValue, lastName: '' }));
    }

    if (signUpFields?.username?.length < 2) {
      setErrorTexts(prevValue => ({ ...prevValue, username: 'Username must be atleast 2 characters long' }));
      isError = true;
    }
    else {
      setErrorTexts(prevValue => ({ ...prevValue, username: '' }));
    }

    if (signUpFields?.password?.length < 8) {
      setErrorTexts(prevValue => ({ ...prevValue, password: 'Password must be atleast 8 characters long' }));
      isError = true;
    }
    else {
      setErrorTexts(prevValue => ({ ...prevValue, password: '' }));
    }

    return isError;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const err = validate();

    if (!err) {
      ServerAPI.signup(signUpFields).then((response) => {
        console.log('redicrected');
        history.push('/login');
      });
    }
    else {
      sendNotification('Please fill all the input fields', 'error', 2)
    }
  }

  useEffect(() => {
    validate();
  }, [signUpFields])

  const handleInput = (event) => {
    const { name, value } = event.target;
    setSignUpFields(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmitHandler(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errorTexts?.firstName}
                helperText={errorTexts?.firstName}
                onChange={(e) => handleInput(e)}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errorTexts?.lastName}
                helperText={errorTexts?.lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => handleInput(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errorTexts?.username}
                helperText={errorTexts?.username}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => handleInput(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errorTexts?.password}
                helperText={errorTexts?.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handleInput(e)}
              />
            </Grid>
          </Grid>
          <Button
            required
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              onSubmitHandler(e);
            }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}