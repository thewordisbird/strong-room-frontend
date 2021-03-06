import React, { useState } from 'react';
import {
  Button, Card, CardContent, Grid, TextField,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../shared/Firebase/Auth/AuthProvider';

const useStyles = makeStyles({
  root: {
    marginTop: '32px',
    marginBottom: '24px',
  },
  card: {
    margin: '12px auto',
    width: '400px',
  },
  error: {
    background: 'salmon',
  },
});

function Login(): JSX.Element {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const classes = useStyles();
  const history = useHistory();

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setForm((prevState) => (
      {
        ...prevState,
        email: event.target.value,
      }
    ));
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setForm((prevState) => (
      {
        ...prevState,
        password: event.target.value,
      }
    ));
  }

  function handleSubmit(): void {
    login(form.email as string, form.password as string)
      .then(() => {
        history.push('/');
      })
      .catch((_error) => {
        setError(_error);
      });
  }

  return (
    // TODO: Create sub components to handle display
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={3}>
            {error && (
            <Grid item xs={12}>
              <Card className={classes.error}>
                <CardContent>
                  {error}
                </CardContent>
              </Card>
            </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="standard-required"
                label="Email"
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="standard-password-input"
                required
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
