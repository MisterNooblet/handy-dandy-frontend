import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { CardProps } from './CardBox';

const DefaultCards = ({ array }: { array: CardProps[] }) => {
  return (
    <>
      {array.map((card) => (
        <Grid item key={card.title} xs={12} sm={6} md={4} m={3}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardMedia
              component="div"
              sx={{
                background: `url('${card.image}')  center/cover no-repeat`,
                objectFit: 'scale-down',
                width: '100%',
                height: '150px',
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {card.title}
              </Typography>
              <Typography>{card.description}</Typography>
            </CardContent>
            <CardActions>
              <Link to={`${card.title.toLowerCase()}`}>
                <Button size="small">View</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default DefaultCards;
