import React, { Component } from 'react';
import Details from './Details/Details';
import { LinearProgress } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { Switch, Route, withRouter, RouteComponentProps} from 'react-router-dom'
import { withFirestore, withFirestoreProps } from '../../shared/Firebase/Firestore/withFirestore'
import { withStorage, withStorageProps } from '../../shared/Firebase/Storage/withStorage';
import { InvoiceData } from '../../shared/Firebase/Firestore/interfaces/InvoiceData';

const styles = createStyles({
  root: {
    marginTop: '32px',
    marginBottom: '24px'
  },
  loading: {
    margin: 'auto',
    width: '95%'
  }
})

type InvoiceDetailsProps = RouteComponentProps &  WithStyles<typeof styles> & withFirestoreProps & withStorageProps

type InvoiceDetailsState = {
  isLoading: boolean
  redirect: boolean
  invoiceData: InvoiceData;
  pdfUrl: string;
}

class InvoiceDetails extends Component<InvoiceDetailsProps, InvoiceDetailsState> {
  state: InvoiceDetailsState = {
    isLoading: false,
    redirect: false,
    invoiceData: {} as InvoiceData,
    pdfUrl: ""
  }

  async componentDidMount() {
    this.setState({isLoading: true})
    const { location, getInvoice, getPdfUrl } = this.props
    const id = location.pathname.split('/')[2]

    try {
      const invoiceData = await getInvoice(id)
      const pdfUrl = await getPdfUrl(invoiceData.pdfId) as string

      this.setState({
        isLoading: false,
        invoiceData: invoiceData,
        pdfUrl: pdfUrl
      })
    } catch(err) {
      this.setState(
        {
          redirect: true,
          isLoading: false
        })
    }
  }

  render () {
    const { match, classes } = this.props
    
    let content = <LinearProgress className={classes.loading}/>
    if (!this.state.isLoading && !this.state.redirect) {
      content = (
        <Switch>
          <Route path={`${match.path}/:invoiceId`}><Details invoiceData={this.state.invoiceData} pdfUrl={this.state.pdfUrl}/></Route>
        </Switch>
      )
    }

    if (this.state.redirect) {
      content = <h1> 404: Page not found :(</h1>
    }

    return (
      <div className={classes.root}>
        {content}
      </div>
      )
    }  
  }

export default withStyles(styles)(withRouter(withFirestore(withStorage(InvoiceDetails))));