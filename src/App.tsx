import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { GuidelinesList } from './components/GuidelinesList';
import { PatientsList } from './components/PatientsList';
import { LabTestsList } from './components/LabTestsList';
import { TreatmentsList } from './components/TreatmentsList';
import { ClinicalCases } from './components/ClinicalCases';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/guidelines" element={<GuidelinesList />} />
            <Route path="/patients" element={<PatientsList />} />
            <Route path="/lab-tests" element={<LabTestsList />} />
            <Route path="/treatments" element={<TreatmentsList />} />
            <Route path="/cases" element={<ClinicalCases />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;