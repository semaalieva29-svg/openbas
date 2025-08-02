import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse
} from '@mui/material';
import {
  Search,
  ExpandMore,
  ExpandLess,
  Science
} from '@mui/icons-material';
import { labTests } from '../data/labTests';
import { LabTest } from '../types/clinical';

export const LabTestsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [expandedTest, setExpandedTest] = useState<string | null>(null);

  const filteredTests = labTests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTestClick = (test: LabTest) => {
    setSelectedTest(test);
  };

  const handleCloseDialog = () => {
    setSelectedTest(null);
  };

  const toggleExpanded = (id: string) => {
    setExpandedTest(expandedTest === id ? null : id);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Лабораторные исследования
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Справочник лабораторных показателей в эндокринологии с нормальными значениями и интерпретацией
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Поиск лабораторных тестов"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredTests.map((test) => (
          <Grid item xs={12} key={test.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                      {test.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {test.description}
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
                      <Chip 
                        label={`Норма: ${test.normalRange} ${test.units}`}
                        color="primary"
                        size="small"
                      />
                      <IconButton 
                        size="small" 
                        onClick={() => toggleExpanded(test.id)}
                      >
                        {expandedTest === test.id ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                
                <Collapse in={expandedTest === test.id}>
                  <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="body2" component="pre" sx={{ 
                      whiteSpace: 'pre-wrap', 
                      fontFamily: 'inherit',
                      backgroundColor: 'grey.50',
                      p: 2,
                      borderRadius: 1
                    }}>
                      {test.interpretation}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button 
                        variant="contained" 
                        onClick={() => handleTestClick(test)}
                        size="small"
                        startIcon={<Science />}
                      >
                        Подробная информация
                      </Button>
                    </Box>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Сводная таблица
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название теста</TableCell>
                <TableCell>Нормальные значения</TableCell>
                <TableCell>Единицы</TableCell>
                <TableCell>Описание</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{test.normalRange}</TableCell>
                  <TableCell>{test.units}</TableCell>
                  <TableCell>{test.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog 
        open={!!selectedTest} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedTest && (
          <>
            <DialogTitle>
              {selectedTest.name}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Chip 
                  label={`Норма: ${selectedTest.normalRange} ${selectedTest.units}`}
                  color="primary"
                  sx={{ mr: 1 }}
                />
              </Box>
              <Typography variant="body1" paragraph>
                {selectedTest.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Интерпретация результатов:
              </Typography>
              <Typography variant="body2" component="pre" sx={{ 
                whiteSpace: 'pre-wrap', 
                fontFamily: 'inherit',
                backgroundColor: 'grey.50',
                p: 2,
                borderRadius: 1
              }}>
                {selectedTest.interpretation}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Закрыть</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};