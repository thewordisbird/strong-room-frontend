import React, { Component } from 'react';
import Firebase from '../../hoc/Firebase';
import { withFirebase } from '../../hoc/Firebase/context';
import 'firebase';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableFooter } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import InvoiceData from '../../shared/InvoiceData'

type ResultProps = RouteComponentProps & {
  queryParams: {
    vendor?: string;
    startDate?: Date;
    endDate?: Date;
  }
  firebase: Firebase;
}

type ResultState = {
  results: InvoiceData[],
  pagination: {
    page: number;
    rowsPerPage: number;
  }
}

class Results extends Component<ResultProps, ResultState> {
  state: ResultState= {
    results: [],
    pagination: {
      page: 0,
      rowsPerPage: 25
    }
  }  

  componentDidMount = () => {
    // Return all results (use pagination to limit)
    console.log('[Results, componentDidMount]')
    this.props.firebase.getInvoiceData(this.props.queryParams, this.state.pagination)
      .then(invoicedata => {
        const results = invoicedata.map(result => {
          const resultData = result.data() as InvoiceData
          resultData.id = result.id
          return resultData
        })
        this.setState({results: results})  
      })
  }

  componentDidUpdate = (prevProps: ResultProps, prevState: ResultState) => {
    // Update results with query restrictions from form (use pagination to limit)
    console.log('[Results, componentDidUpdate]')
    if (prevProps.queryParams !== this.props.queryParams || prevState.pagination !== this.state.pagination) {
      this.props.firebase.getInvoiceData(this.props.queryParams, this.state.pagination)
      .then(invoicedata => {
        const results = invoicedata.map(result => {
          const resultData = result.data() as InvoiceData
          resultData.id = result.id
          return resultData
        })
        this.setState({results: results})  
      })
    }
  }

  handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log('changepage', newPage)
    this.setState(prevState => (
      {
      ...prevState,
      pagination: {
        ...prevState.pagination,
        page: newPage
      }
      }
    ))
  };
  
  handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    this.setState(prevState => (
      {
        ...prevState,
        pagination: {
          ...prevState.pagination,
            rowsPerPage: parseInt(event.target.value, 10),
          page: 0
        }
      }
    ))
  };

  handleViewDetails = (id: string | undefined) => {
    this.props.history.push(`/details/${id}`)
  }
  render () {
    const rowData = this.state.results.map(result => {
      return {
        id: result['id'],
        vendor: result['Vendor'],
        check: result['Check'],
        invoiceDate: result['invoiceDate']
      }
    })
    return (
      <TableContainer component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell size="small">Details</TableCell>
            <TableCell align="left">Vendor</TableCell>
            <TableCell align="left">Check Number</TableCell>
            <TableCell align="left">Invoice Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row"><Button variant="contained" onClick={()=>this.handleViewDetails(row.id)}>View Details</Button></TableCell>
              <TableCell align="left">{row.vendor}</TableCell>
              <TableCell align="left">{row.check}</TableCell>
              <TableCell align="left">{row.invoiceDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rowData.length}
              rowsPerPage={this.state.pagination.rowsPerPage}
              page={this.state.pagination.page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              // ActionsComponent={}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
      )
  }
}

export default withRouter(withFirebase(Results));