import React, {  useState } from 'react';
import { Button, Card, CardContent, Grid, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'; 
import { useAuth } from '../../shared/Firebase/Auth/useAuth';

const useStyles = makeStyles({
  root: {
    marginTop: '32px',
    marginBottom: '24px'
  },
  card: {
    margin: "12px auto",
    width: "400px"
  },
  error: {
    background: 'salmon'
  }
})

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState<string | null>(null)

  const { loginUser } = useAuth();

  const classes = useStyles()
  const history = useHistory();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => (
      {
        ...prevState,
        email: event.target.value
      }
    ))
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => (
      {
        ...prevState,
        password: event.target.value
      }
    ))
  }

  const handleSubmit = () => {
    loginUser(form.email as string , form.password as string)
      .then(() => {
        history.push('/')
      })
      .catch(error => {
        setError(error)
      })
  }

  return (
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
            )
          }
          
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
        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>Login</Button>
        </Grid>
        </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login;