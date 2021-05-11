import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TableFooter, TablePagination, withStyles } from '@material-ui/core';
import React, {useState} from 'react';
import { InvoiceData } from '../../../shared/Firebase/firebase';

type SearchResultsProps = {
  loading: boolean;
  invoices: InvoiceData[];
}

type SearchResultsState = {
  page: number;
  rowsPerPage: number;
}

const SearchResults: React.FC<SearchResultsProps> = (props) => {
  const { loading, invoices } = props;

  const [pagination, setPagination] = useState<SearchResultsState>({
    page: 0,
    rowsPerPage: 25
  })

  const onSelect = (id: string | undefined) => {

  }

  const onChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPagination(prevState => (
      {
      ...prevState,
        page: newPage
      }
    ))
  };
  
  const onChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPagination(prevState => (
      {
        ...prevState,
          rowsPerPage: parseInt(event.target.value, 10),
          page: 0
        }
    ))
  };
  
  const getRowData = () => {
    const startIndex = pagination.page === 0 ? 0 : pagination.page * pagination.rowsPerPage + 1
    const endIndex = startIndex + pagination.rowsPerPage + 1 < invoices.length ? startIndex + pagination.rowsPerPage + 1: invoices.length
    console.log(startIndex, endIndex)
    return invoices.slice(startIndex, endIndex).map(invoice => (
      {
        id: invoice['id'],
        vendor: invoice['Vendor'],
        check: invoice['Check'],
        invoiceDate: invoice['invoiceDate']
      }
    ))
  }

  const rowData = getRowData();

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
            <TableCell component="th" scope="row"><Button variant="contained" onClick={()=>onSelect(row.id)}>View Details</Button></TableCell>
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
            count={invoices.length}
            rowsPerPage={pagination.rowsPerPage}
            page={pagination.page}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            // ActionsComponent={}
          />
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>
    )
}

export default SearchResults;