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
import { Add as AddIcon } from '@mui/icons-material';

export const PatientsList: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Пациенты
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Управление базой данных пациентов (функция в разработке)
      </Typography>

      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Модуль управления пациентами
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          В данной версии приложения модуль управления пациентами находится в разработке.
          Здесь будет возможность вести базу данных пациентов, их диагнозов и схем лечения.
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          disabled
        >
          Добавить пациента
        </Button>
      </Paper>
    </Box>
  );
};