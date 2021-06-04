import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
  TableContainer,
  LinearProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableFooter,
  TablePagination,
} from '@material-ui/core';

import {
  InvoiceData,
} from '../../../shared/Firebase/Firestore/interfaces/InvoiceData';

type SearchResultsProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  loading: boolean;
  invoices: InvoiceData[];
}

function SearchResults(props: SearchResultsProps): JSX.Element {
  const { loading, invoices } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const history = useHistory();

  function handleSelect(id: string | undefined): void {
    history.push(`/details/${id}`);
  }

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,
  ): void {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    const displayRowCount = event.target.value === '-1'
      ? invoices.length
      : parseInt(event.target.value, 10);
    setPage(0);
    setRowsPerPage(displayRowCount);
  }

  function getRowData(): {
    id: string | undefined;
    vendor: string;
    check: string;
    invoiceDate: string;
    invoiceAmount: string;
}[] {
    const invoiceCount = invoices.length;
    const startIndex = page === 0 ? 0 : page * rowsPerPage + 1;
    const endIndex = startIndex + rowsPerPage + 1 < invoiceCount
      ? startIndex + rowsPerPage + 1
      : invoiceCount;
    return props.invoices.slice(startIndex, endIndex).map((invoice) => (
      {
        id: invoice.id,
        vendor: invoice.Vendor,
        check: invoice.Check,
        invoiceDate: invoice.invoiceDate,
        invoiceAmount: invoice['Invoice Amount'],
      }
    ));
  }

  let content = <LinearProgress />;

  if (!loading) {
    const rowData = getRowData();
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
                <TableCell
                  component="th"
                  scope="row"
                >
                  <Button
                    variant="contained"
                    onClick={() => handleSelect(row.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
                <TableCell align="left">{row.vendor}</TableCell>
                <TableCell align="left">
                  $
                  {row.invoiceAmount}
                </TableCell>
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
                rowsPerPage={rowsPerPage > 25 ? -1 : rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }

  return <div>{content}</div>;
}

export default SearchResults;
