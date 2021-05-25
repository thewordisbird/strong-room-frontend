import React, {Component} from 'react';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { TableContainer, LinearProgress, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TableFooter, TablePagination } from '@material-ui/core';

import { InvoiceData } from '../../../shared/Firebase/Firestore/interfaces/InvoiceData';

type SearchResultsProps = RouteComponentProps & {
  loading: boolean;
  invoices: InvoiceData[];
}

type SearchResultsState = {
  page: number;
  rowsPerPage: number;
}

class SearchResults extends Component<SearchResultsProps, SearchResultsState> {
  state: SearchResultsState = {
    page: 0,
    rowsPerPage: 25
  }

  onSelect = (id: string | undefined) => {
    console.log(id)
    this.props.history.push(`/details/${id}`)
  }

  onChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    this.setState({page: newPage})
  };
  
  onChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log('rows per page - in', event.target.value)
    const rowsPerPage = event.target.value === "-1" ? this.props.invoices.length : parseInt(event.target.value, 10)
    console.log('rows per page - out', rowsPerPage)
    this.setState(
      {
        rowsPerPage: rowsPerPage,
        page: 0
      }
    )
  };
  
  getRowData = () => {
    const invoiceCount = this.props.invoices.length
    const startIndex = this.state.page === 0 ? 0 : this.state.page * this.state.rowsPerPage + 1
    const endIndex = startIndex + this.state.rowsPerPage + 1 < invoiceCount ? startIndex + this.state.rowsPerPage + 1: invoiceCount
    console.log(startIndex, endIndex)
    return this.props.invoices.slice(startIndex, endIndex).map(invoice => (
      {
        id: invoice['id'],
        vendor: invoice['Vendor'],
        check: invoice['Check'],
        invoiceDate: invoice['invoiceDate'],
        invoiceAmount: invoice['Invoice Amount']
      }
    ))
  }
  
  render () {
    const { loading, invoices } = this.props;
    let content = <LinearProgress />

    if (!loading) {
      const rowData = this.getRowData();
      console.log(rowData)
      content = (
        <TableContainer component={Paper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell size="small">Details</TableCell>
              <TableCell align="left">Vendor</TableCell>
              <TableCell align="left">Invoice Amount</TableCell>
              <TableCell align="left">Invoice Date</TableCell>
              <TableCell align="left">Check Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row"><Button variant="contained" onClick={()=>this.onSelect(row.id)}>View Details</Button></TableCell>
                <TableCell align="left">{row.vendor}</TableCell>
                <TableCell align="left">${row.invoiceAmount}</TableCell>
                <TableCell align="left">{row.invoiceDate}</TableCell>
                <TableCell align="left">{row.check}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={invoices.length}
                rowsPerPage={this.state.rowsPerPage > 25 ? -1 : this.state.rowsPerPage}
                page={this.state.page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={this.onChangePage}
                onChangeRowsPerPage={this.onChangeRowsPerPage}
                // ActionsComponent={}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      )
    }

    return <div>{content}</div>
  }
}

export default withRouter(SearchResults);