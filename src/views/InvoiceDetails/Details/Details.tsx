import React from 'react';

import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { Grid, Typography, Card, CardContent } from '@material-ui/core';
import { InvoiceData } from '../../../shared/Firebase/firebase';

const styles = createStyles({
  root: {
    marginTop: '32px',
    marginBottom: '24px'
  },
  icon: {
    fontSize: 20,
    marginBottom: '-6px',
    cursor: "pointer",
    color: 'gray',
    '&:hover': {
      color: 'black'
    }
  },
  card: {
    margin: "12px 0"
  },
  title: {
    fontSize: 14,
  },
  fieldName: {
    fontWeight: 'bold'
  }
})

type InvoiceDetailsProps = WithStyles<typeof styles> & {
  invoiceData: InvoiceData;
  pdfUrl: string;
}

const Details = (props: InvoiceDetailsProps) => {
  const {invoiceData, pdfUrl, classes } = props

  const handleDownloadPdf = () => {
    window.location.href = pdfUrl
  }

  return (<div className={classes.root}>
    <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Invoice Info: <PictureAsPdfIcon className={classes.icon} onClick={handleDownloadPdf}/>
            </Typography>
            <Grid container className="" spacing={2}>
            <Grid item xs={12} sm={6}>
                <span className={classes.fieldName}>Vendor Name:</span> {invoiceData["Vendor"]}
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.fieldName}>Invoice Number:</span> {invoiceData["Invoice Num"]}
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.fieldName}>Invoice Date:</span> {invoiceData["invoiceDate"]}
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.fieldName}>Invoice Amount:</span> {invoiceData["Invoice Amount"]}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className={classes.card}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Payment Info:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <span className={classes.fieldName}>Payment Date:</span> {invoiceData["Date Paid"]}
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className="">Payment Amount:</span> {invoiceData[" Payment Amount"]}
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.fieldName}>Payment Id:</span> {invoiceData[" Pay TransactionId"]}
              </Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.fieldName}>Check Number:</span> {invoiceData["Check"]}
              </Grid>
              <Grid item xs={12}>
                <span className={classes.fieldName}>Check Stub Note:</span> {invoiceData["checkStubNote"]}
              </Grid>
              <Grid item xs={12}>
                <span className={classes.fieldName}>Internal Note:</span> {invoiceData["internalNote"]}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </div>
    )
}

export default withStyles(styles)(Details);