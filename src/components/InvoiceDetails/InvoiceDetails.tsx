import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import InvoiceData from '../../shared/InvoiceData';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Firebase from '../../hoc/Firebase';
import { withFirebase } from '../../hoc/Firebase/context';

type InvoiceDetailsProps = {
  invoiceData: InvoiceData;
  pdfUrl: string
  firebase: Firebase
}

const InvoiceDetails = (props: InvoiceDetailsProps) => {
  const {invoiceData, pdfUrl } = props
  
  return (
    <div>
      <h2>{invoiceData["Vendor"]} | Invoice #: {invoiceData["Invoice Num"]} |<a href={`${pdfUrl}`}><PictureAsPdfIcon /></a></h2>
      <hr />
      <Grid container className="" spacing={2}>
        <Grid item xs={12} sm={6}>
          <span className="">Invoice Date:</span> {invoiceData["invoiceDate"]}
        </Grid>
        <Grid item xs={12} sm={6}>
          <span className="">Invoice Amount:</span> {invoiceData["Invoice Amount"]}
        </Grid>
      </Grid>
      <hr />
      <Grid container className="" spacing={2}>
        <Grid item xs={12} sm={6}>
          <span className="">Payment Date:</span> {invoiceData["Date Paid"]}
        </Grid>
        <Grid item xs={12} sm={6}>
          <span className="">Payment Amount:</span> {invoiceData[" Payment Amount"]}
        </Grid>
        <Grid item xs={12} sm={6}>
          <span className="">Payment Id:</span> {invoiceData[" Pay TransactionId"]}
        </Grid>
        <Grid item xs={12} sm={6}>
          <span className="">Check Number:</span> {invoiceData["Check"]}
        </Grid>
        <Grid item xs={12}>
          <span className="">Check Stub Note:</span> {invoiceData["checkStubNote"]}
        </Grid>
        <Grid item xs={12}>
          <span className="">Internal Note:</span> {invoiceData["internalNote"]}
        </Grid>
      </Grid>
    </div>
    )
}

  


export default withFirebase(InvoiceDetails);