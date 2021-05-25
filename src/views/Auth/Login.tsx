import React, { Component } from 'react';
import { Button, Card, CardContent, Grid, TextField } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { withAuth, withAuthProps} from '../../shared/Firebase/Auth/withAuth'

const styles = createStyles({
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

type LoginProps = WithStyles<typeof styles> & RouteComponentProps & withAuthProps

type LoginState = {
  form: {
    email: string | null;
    password: string | null;
  },
  error: {
    error: boolean,
    message: string
  }
}

class Login extends Component<LoginProps, LoginState>{
  state: LoginState = {
    form: {
      email: '',
      password: ''
    },
    error: {
      error: false,
      message: ''
    }
  }

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => (
      {
        form: {
          ...prevState.form,
          email: event.target.value
        }
      }
    ))
  }

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => (
      {
        form: {
          ...prevState.form,
          password: event.target.value
        }
      }
    ))
  }

  handleSubmit = () => {
    const { loginUser, history } = this.props
    const { email, password } = this.state.form;

    loginUser(email as string , password as string)
      .then(user => {
        history.push('/')
      })
      .catch(error => console.log('there was an error', error))
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
          <Grid container spacing={3}>
            { this.state.error.error && (
                <Grid item xs={12}>
                <Card className={classes.error}>
                  <CardContent>
                    {this.state.error.message}
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
                onChange={this.handleEmailChange}/
              >
            </Grid>
            <Grid item xs={12}>
            <TextField
            fullWidth
              id="standard-password-input"
              required
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={this.handlePasswordChange}
            />
            </Grid>
            <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" onClick={this.handleSubmit}>Login</Button>
          </Grid>
          </Grid>
          </CardContent>

        </Card>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(withAuth(Login)));