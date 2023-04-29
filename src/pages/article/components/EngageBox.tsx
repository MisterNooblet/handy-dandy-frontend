import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { FcLike } from 'react-icons/fc';
import { AiFillStar } from 'react-icons/ai';
import { ArticleResponse } from 'utils/models';
import { updateUserData } from 'utils/apiAuth';
import { AuthState, updateUser } from 'store/authSlice';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setUpvotes } from 'utils/apiData';

const EngageBox = ({
  article,
  setArticle,
}: {
  article: ArticleResponse | null;
  setArticle: React.Dispatch<React.SetStateAction<ArticleResponse | null>>;
}) => {
  const [faved, setFaved] = useState<boolean>(false);
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  const dispatch = useDispatch();

  const handleEngage = async (type: string) => {
    if (type === 'favourite') {
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
    } else if (type === 'upvote') {
      if (upvoted && user && article) {
        const newUpvotes = article.upvotes.filter((upvote) => upvote !== user.id);
        try {
          await setUpvotes({ userId: user.id, articleId: article.id });
          setArticle({ ...article, upvotes: newUpvotes });
          setUpvoted(!upvoted);
        } catch (error) {
          console.log(error);
        }
      } else if (!upvoted && user && article) {
        const newUpvotes = [...article.upvotes, user.id];

        try {
          await setUpvotes({ userId: user.id, articleId: article.id });
          setArticle({ ...article, upvotes: newUpvotes });
          setUpvoted(!upvoted);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    const checkFavs = () => {
      if (user && article) {
        const fav = user.favourites.find((fav) => fav === article.id);
        if (fav) {
          setFaved(true);
        }
        const upvoted = article.upvotes.find((upvote) => upvote === user.id);
        if (upvoted) {
          setUpvoted(true);
        }
      }
    };
    checkFavs();
  }, [article, user]);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: '0',
        bottom: { lg: '', xs: '0' },
        display: 'flex',
        justifyContent: 'right',
        zIndex: '5',
      }}
    >
      <Box
        onClick={() => {
          handleEngage('upvote');
        }}
        title="Upvote"
        sx={{
          transition: 'all ease-in-out 0.5s',
          opacity: !upvoted ? '0.5' : '1',
          position: 'relative',
          ':after': {
            content: `"${article?.upvotes ? article?.upvotes.length : ''}"`,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
          },
        }}
      >
        <FcLike fontSize={'40px'} cursor="pointer" />
      </Box>
      <Box
        title="Add to favourites"
        sx={{ transition: 'all ease-in-out 0.5s', color: !faved ? 'grey' : 'secondary.main' }}
      >
        <AiFillStar
          fontSize={'40px'}
          cursor="pointer"
          onClick={() => {
            handleEngage('favourite');
          }}
        />
      </Box>
    </Box>
  );
};

export default EngageBox;
