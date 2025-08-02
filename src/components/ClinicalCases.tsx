import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { Assessment as AssessmentIcon } from '@mui/icons-material';

export const ClinicalCases: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Клинические случаи
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Примеры из практики с разбором клинических случаев (функция в разработке)
      </Typography>

      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Модуль клинических случаев
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          В данной версии приложения модуль клинических случаев находится в разработке.
          Здесь будут представлены интересные случаи из практики с подробным разбором
          диагностики, лечения и ведения пациентов.
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AssessmentIcon />}
          disabled
        >
          Добавить клинический случай
        </Button>
      </Paper>
    </Box>
  );
};