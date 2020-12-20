import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import ServerAPI from '../../Axios/ServerAPI';
import sendNotification from '../../components/Notification/Notification';
import { useHistory } from 'react-router-dom';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogInPage() {
  const classes = useStyles();
  const history = useHistory();

  const [fields, setFields] = useState({});
  const [errorFields, setErrorFields] = useState({});

  const onSubmitHandler = event => {
    event.preventDefault();

    ServerAPI.login(fields?.username, fields?.password).then(response => {
      const data = response.data;
      if (data.length > 0) {
        history.push('/');
      }
      else {
        sendNotification('Username or password is incorrect', 'error', 2);
        setErrorFields({ username: ' ', password: ' ' });
      }
    });
  }

  const onChangeHandler = event => {
    const { name, value } = event.target;

    setFields(prevValue => ({ ...prevValue, [name]: value }));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmitHandler(e)}>
          <TextField
            error={!!errorFields.username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e) => onChangeHandler(e)}
          />
          <TextField
            error={!!errorFields.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => onChangeHandler(e)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => onSubmitHandler(e)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/signup' >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='signup'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
