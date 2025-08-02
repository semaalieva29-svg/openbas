import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Collapse
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Search,
  FilterList
} from '@mui/icons-material';
import { clinicalGuidelines } from '../data/clinicalGuidelines';
import { ClinicalGuideline } from '../types/clinical';

export const GuidelinesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGuideline, setSelectedGuideline] = useState<ClinicalGuideline | null>(null);
  const [expandedGuideline, setExpandedGuideline] = useState<string | null>(null);

  const categories = Array.from(new Set(clinicalGuidelines.map(g => g.category)));

  const filteredGuidelines = clinicalGuidelines.filter(guideline => {
    const matchesSearch = guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guideline.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || guideline.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGuidelineClick = (guideline: ClinicalGuideline) => {
    setSelectedGuideline(guideline);
  };

  const handleCloseDialog = () => {
    setSelectedGuideline(null);
  };

  const toggleExpanded = (id: string) => {
    setExpandedGuideline(expandedGuideline === id ? null : id);
  };

  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case 'A': return 'success';
      case 'B': return 'primary';
      case 'C': return 'warning';
      case 'D': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Клинические рекомендации
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Актуальные клинические рекомендации по эндокринологии, утвержденные Минздравом РФ
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Поиск рекомендаций"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                value={selectedCategory}
                label="Категория"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">Все категории</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredGuidelines.map((guideline) => (
          <Grid item xs={12} key={guideline.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                      {guideline.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {guideline.description}
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Chip 
                        label={guideline.category} 
                        size="small" 
                        color="primary" 
                      />
                      <Chip 
                        label={`Уровень доказательности: ${guideline.evidenceLevel}`}
                        size="small"
                        color={getEvidenceLevelColor(guideline.evidenceLevel) as any}
                      />
                      <Chip 
                        label={`Обновлено: ${new Date(guideline.lastUpdated).toLocaleDateString('ru-RU')}`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  <IconButton onClick={() => toggleExpanded(guideline.id)}>
                    {expandedGuideline === guideline.id ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
                
                <Collapse in={expandedGuideline === guideline.id}>
                  <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="body2" component="pre" sx={{ 
                      whiteSpace: 'pre-wrap', 
                      fontFamily: 'inherit',
                      backgroundColor: 'grey.50',
                      p: 2,
                      borderRadius: 1
                    }}>
                      {guideline.content}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button 
                        variant="contained" 
                        onClick={() => handleGuidelineClick(guideline)}
                        size="small"
                      >
                        Подробнее
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
        open={!!selectedGuideline} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedGuideline && (
          <>
            <DialogTitle>
              {selectedGuideline.title}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Chip 
                  label={selectedGuideline.category} 
                  color="primary" 
                  sx={{ mr: 1 }}
                />
                <Chip 
                  label={`Уровень доказательности: ${selectedGuideline.evidenceLevel}`}
                  color={getEvidenceLevelColor(selectedGuideline.evidenceLevel) as any}
                  sx={{ mr: 1 }}
                />
                <Chip 
                  label={`Источник: ${selectedGuideline.source}`}
                  variant="outlined"
                />
              </Box>
              <Typography variant="body1" paragraph>
                {selectedGuideline.description}
              </Typography>
              <Typography variant="body2" component="pre" sx={{ 
                whiteSpace: 'pre-wrap', 
                fontFamily: 'inherit',
                backgroundColor: 'grey.50',
                p: 2,
                borderRadius: 1
              }}>
                {selectedGuideline.content}
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