import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { AiFillStar } from 'react-icons/ai';
import { ArticleResponse } from 'utils/models';
import formatDate from 'utils/formatDate';
import { AuthState, updateUser } from 'store/authSlice';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from 'utils/apiAuth';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import DifficultyBox from 'components/DifficultyBox';

export default function ArticleCard({ article }: { article: ArticleResponse }) {
  const [faved, setFaved] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  const dispatch = useDispatch();
  console.log(article);
  const handleEngage = async () => {
    if (faved && user) {
      const newFavs = user.favourites.filter((fav) => fav !== article?.id);
      const updatedUser = await updateUserData({ favourites: newFavs });
      dispatch(updateUser(updatedUser));
    } else if (!faved && user && article) {
      const newFavs = [...user.favourites, article.id];
      const updatedUser = await updateUserData({ favourites: newFavs });
      dispatch(updateUser(updatedUser));
    }
    setFaved(!faved);
  };

  useEffect(() => {
    if (user?.favourites.includes(article.id)) {
      setFaved(true);
    } else {
      setFaved(false);
    }
  }, [user, article]);

  return (
    <Card sx={{ width: 345 }}>
      <Link to={`/library/articles/c/${article.parentDoc.parentDoc}/items/${article.parentDoc.id}/item/${article.id}`}>
        <CardHeader
          sx={{ minHeight: '120px' }}
          avatar={
            <Avatar
              alt={article.author ? article.author.fullName : undefined}
              src={article.author.pfp && article.author.pfp}
            />
          }
          title={
            <>
              <Typography fontSize={16}>{article.title}</Typography>
              <Typography fontSize={11} color="text.primary">
                {' '}
                {article.parentDoc.title}
              </Typography>
            </>
          }
          subheader={formatDate(article.createdAt)}
          subheaderTypographyProps={{ color: '#CF7500' }}
        />
        <CardMedia
          component="img"
          height="194px"
          sx={{ maxHeight: '194px !important' }}
          image={article.image}
          alt={article.title}
        />
        <CardContent sx={{ minHeight: '112px', overflow: 'hidden' }}>
          <Typography variant="body2" color="text.secondary">
            {article.summary.length > 150 ? article.summary.substring(0, 150) + '...' : article.summary}
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link
          to={`/library/articles/c/${article.parentDoc.parentDoc}/items/${article.parentDoc.id}/item/${article.id}`}
        >
          <Button>Read more</Button>
        </Link>
        <DifficultyBox difficulty={article.difficulty} />
        <IconButton
          title="Add to favorites"
          onClick={handleEngage}
          sx={{ color: faved ? '#ff9302' : 'gray' }}
          aria-label="Add to favorites"
        >
          <AiFillStar />
        </IconButton>
      </CardActions>
    </Card>
  );
}
