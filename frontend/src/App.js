import React from 'react';
import AssessmentForm from './components/AssessmentForm';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AssessmentForm />
    </ThemeProvider>
  );
}

export default App;
