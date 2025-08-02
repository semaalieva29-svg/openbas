import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar
} from '@mui/material';
import {
  TrendingUp,
  People,
  Book,
  Science,
  Medication,
  Assessment
} from '@mui/icons-material';

export const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Клинические рекомендации', value: '5', icon: <Book />, color: '#1976d2' },
    { title: 'Пациенты', value: '0', icon: <People />, color: '#388e3c' },
    { title: 'Лабораторные тесты', value: '12', icon: <Science />, color: '#f57c00' },
    { title: 'Схемы лечения', value: '8', icon: <Medication />, color: '#7b1fa2' },
    { title: 'Клинические случаи', value: '0', icon: <Assessment />, color: '#d32f2f' },
  ];

  const recentGuidelines = [
    'Сахарный диабет 2 типа у взрослых',
    'Сахарный диабет 1 типа у взрослых',
    'Заболевания щитовидной железы',
    'Остеопороз',
    'Ожирение'
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать в справочник клинической эндокринологии
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Современный справочник для врачей-эндокринологов с актуальными клиническими рекомендациями РФ
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={2.4} key={stat.title}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Последние клинические рекомендации
            </Typography>
            <List>
              {recentGuidelines.map((guideline, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={guideline}
                    secondary={`Обновлено: ${new Date().toLocaleDateString('ru-RU')}`}
                  />
                  <Chip label="Актуально" color="success" size="small" />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Быстрый доступ
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Поиск клинических рекомендаций"
                  secondary="Найти рекомендации по заболеванию"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Лабораторные исследования"
                  secondary="Нормальные значения и интерпретация"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Схемы лечения"
                  secondary="Современные протоколы терапии"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Клинические случаи"
                  secondary="Примеры из практики"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            О приложении
          </Typography>
          <Typography variant="body1" paragraph>
            Данное приложение содержит актуальные клинические рекомендации по эндокринологии, 
            утвержденные Министерством здравоохранения РФ. Все рекомендации основаны на 
            доказательной медицине и регулярно обновляются.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Источник: Минздрав РФ, Российская ассоциация эндокринологов
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};