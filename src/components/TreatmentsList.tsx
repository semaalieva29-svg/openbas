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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  IconButton,
  Collapse,
  Alert
} from '@mui/material';
import {
  Search,
  ExpandMore,
  ExpandLess,
  Medication,
  Warning,
  Info,
  CheckCircle
} from '@mui/icons-material';
import { treatments } from '../data/treatments';
import { Treatment } from '../types/clinical';

export const TreatmentsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [expandedTreatment, setExpandedTreatment] = useState<string | null>(null);

  const filteredTreatments = treatments.filter(treatment =>
    treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    treatment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTreatmentClick = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
  };

  const handleCloseDialog = () => {
    setSelectedTreatment(null);
  };

  const toggleExpanded = (id: string) => {
    setExpandedTreatment(expandedTreatment === id ? null : id);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Схемы лечения
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Современные протоколы терапии в эндокринологии с дозировками, противопоказаниями и мониторингом
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Поиск препаратов"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredTreatments.map((treatment) => (
          <Grid item xs={12} key={treatment.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                      {treatment.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {treatment.description}
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
                      <Chip 
                        label={`Дозировка: ${treatment.dosage}`}
                        color="primary"
                        size="small"
                      />
                      <IconButton 
                        size="small" 
                        onClick={() => toggleExpanded(treatment.id)}
                      >
                        {expandedTreatment === treatment.id ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                
                <Collapse in={expandedTreatment === treatment.id}>
                  <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, bgcolor: 'error.50' }}>
                          <Typography variant="h6" color="error" gutterBottom>
                            Противопоказания
                          </Typography>
                          <List dense>
                            {treatment.contraindications.map((contra, index) => (
                              <ListItem key={index}>
                                <ListItemIcon>
                                  <Warning color="error" />
                                </ListItemIcon>
                                <ListItemText primary={contra} />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, bgcolor: 'warning.50' }}>
                          <Typography variant="h6" color="warning.main" gutterBottom>
                            Побочные эффекты
                          </Typography>
                          <List dense>
                            {treatment.sideEffects.map((effect, index) => (
                              <ListItem key={index}>
                                <ListItemIcon>
                                  <Info color="warning" />
                                </ListItemIcon>
                                <ListItemText primary={effect} />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, bgcolor: 'success.50' }}>
                          <Typography variant="h6" color="success.main" gutterBottom>
                            Мониторинг
                          </Typography>
                          <List dense>
                            {treatment.monitoring.map((monitor, index) => (
                              <ListItem key={index}>
                                <ListItemIcon>
                                  <CheckCircle color="success" />
                                </ListItemIcon>
                                <ListItemText primary={monitor} />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 2 }}>
                      <Button 
                        variant="contained" 
                        onClick={() => handleTreatmentClick(treatment)}
                        size="small"
                        startIcon={<Medication />}
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

      <Dialog 
        open={!!selectedTreatment} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedTreatment && (
          <>
            <DialogTitle>
              {selectedTreatment.name}
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedTreatment.description}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Chip 
                  label={`Дозировка: ${selectedTreatment.dosage}`}
                  color="primary"
                  sx={{ mr: 1 }}
                />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Alert severity="error" sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Противопоказания
                    </Typography>
                    <List dense>
                      {selectedTreatment.contraindications.map((contra, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={contra} />
                        </ListItem>
                      ))}
                    </List>
                  </Alert>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Побочные эффекты
                    </Typography>
                    <List dense>
                      {selectedTreatment.sideEffects.map((effect, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={effect} />
                        </ListItem>
                      ))}
                    </List>
                  </Alert>
                </Grid>
              </Grid>

              <Alert severity="success">
                <Typography variant="h6" gutterBottom>
                  Мониторинг
                </Typography>
                <List dense>
                  {selectedTreatment.monitoring.map((monitor, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={monitor} />
                    </ListItem>
                  ))}
                </List>
              </Alert>
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