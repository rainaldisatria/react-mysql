import React, { useState } from 'react';
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

  const [signUpFields, setSignUpFields] = useState({})
  const [errorTexts, setErrorTexts] = useState({});

  const isFirstNameErr = () => {
    if (signUpFields?.firstName?.length <= 5) {
      console.log(signUpFields.firstName.length);
      setErrorTexts(prevValue => ({ ...prevValue, firstName: 'Enter first names', }))
      return true;
    }
    return false;
  }

  //#region 
  const isLastNameErr = () => {
    if (signUpFields?.lastName?.length <= 5) {
      setErrorTexts(prevValue => ({ ...prevValue, lastName: 'Enter last names', }))
      return true;
    }
    return false;
  }

  const isUsernameErr = () => {
    if (signUpFields?.username.length <= 5) {
      setErrorTexts(prevValue => ({ ...prevValue, username: 'Choose a valid username', }))
      return true
    }
    return false;
  }

  const isPasswordErr = () => {
    if (signUpFields?.password.length <= 7) {
      setErrorTexts(prevValue => ({ ...prevValue, password: 'Use 8 characters or more for your password', }))
      return true;
    }

    return false;
  }

  const validate = () => {
    var isError = false;

    isError = isFirstNameErr();
    isError = isLastNameErr();
    isError = isUsernameErr(); 
    isError = isPasswordErr();

    return isError;
  }
  //#endregion

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const err = validate();

    if (!err) {
      console.log('sent');
      <Redirect to='/login' />
    }
    else {
      console.log('err');
    }
  }


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
                error={isFirstNameErr}
                helperText={errorTexts?.firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => handleInput(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={signUpFields?.lastName}
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
                error={signUpFields?.username}
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
                error={signUpFields?.password}
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