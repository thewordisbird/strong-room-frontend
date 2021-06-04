import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Switch, Route, useLocation, useRouteMatch,
} from 'react-router-dom';
import Details from './Details/Details';
import { InvoiceData } from '../../shared/Firebase/Firestore/interfaces/InvoiceData';
import { useFirestore } from '../../shared/Firebase/Firestore/FirestoreProvider';
import { useStorage } from '../../shared/Firebase/Storage/useStorage';

const useStyles = makeStyles({
  root: {
    marginTop: '32px',
    marginBottom: '24px',
  },
  loading: {
    margin: 'auto',
    width: '95%',
  },
});

function InvoiceDetails(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceData: {} as InvoiceData,
    pdfUrl: '',
  });

  const classes = useStyles();
  const match = useRouteMatch();
  const location = useLocation();

  const { getInvoice } = useFirestore();
  const { getPdfUrl } = useStorage();

  useEffect(() => {
    setLoading(true);
    const id = location.pathname.split('/')[2];

    async function getInvoiceData(invoiceId: string): Promise<void> {
      try {
        const invoice = getInvoice(invoiceId) as InvoiceData;
        const pdfUrl = await getPdfUrl(invoice.pdfId) as string;
        setInvoiceData({ invoiceData: invoice, pdfUrl });
      } catch (err) {
        setRedirect(true);
      } finally {
        setLoading(false);
      }
    }

    getInvoiceData(id);
  }, [getInvoice, getPdfUrl, location]);

  let content = <LinearProgress className={classes.loading} />;

  if (!loading && !redirect) {
    content = (
      <Switch>
        <Route
          path={`${match.path}/:invoiceId`}
        >
          <Details
            invoiceData={invoiceData.invoiceData}
            pdfUrl={invoiceData.pdfUrl}
          />
        </Route>
      </Switch>
    );
  }

  if (redirect) {
    content = <h1> 404: Page not found :(</h1>;
  }

  return (
    <div className={classes.root}>
      {content}
    </div>
  );
}

export default InvoiceDetails;
