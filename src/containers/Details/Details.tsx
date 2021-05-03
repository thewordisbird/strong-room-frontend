import React, { Component } from 'react';
import { Switch, Route, withRouter, RouteComponentProps} from 'react-router-dom'
import InvoiceDetails from '../../components/InvoiceDetails/InvoiceDetails';
import Firebase from '../../hoc/Firebase';
import { withFirebase } from '../../hoc/Firebase/context';
import InvoiceData from '../../shared/InvoiceData';
type DetailsProps = RouteComponentProps & {
  firebase: Firebase;
}

type DetailsState = {
  invoiceData: InvoiceData;
  pdfUrl: string;
}

class Details extends Component<DetailsProps, DetailsState> {
  state: DetailsState = {
    invoiceData: {} as InvoiceData,
    pdfUrl: ""
  }

  async componentDidMount() {
    const { location, firebase } = this.props
    const id = location.pathname.split('/')[2]

    const invoiceData = await firebase.getInvoice(id)
    const pdfUrl = await firebase.getPdfUrl(invoiceData.pdfId)
    
    this.setState({
      invoiceData: invoiceData,
      pdfUrl: pdfUrl
    })
  }

  
  render () {
    const { match } = this.props

    return (
      <Switch>
      <Route path={`${match.path}/:invoiceId`}><InvoiceDetails invoiceData={this.state.invoiceData} pdfUrl={this.state.pdfUrl}/></Route>
      <Route path={match.path}>No Invoice Selected</Route>
      </Switch>
    ) 
}
}

export default withRouter(withFirebase(Details));