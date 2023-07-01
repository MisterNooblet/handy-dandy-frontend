/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import FormInput from 'components/FormInput';
import React, { useState } from 'react';
import { ArticleForm as ArticleData, ArticlePreview, CategorySelect, Item } from 'utils/models';
import FileUpload from 'components/FileUpload';
import HTMLEditor from './HTMLEditor';
import RequirementManager from './RequirementManager';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { AuthState } from 'store/authSlice';
import { createArticle } from 'utils/apiData';
import { difficulties } from 'data/constants';
import ArticlePreviewModal from 'pages/article/ArticlePreviewModal';
import img from 'assets/handyDandy.png';
import { UiState, setAlertOpen, setMessage } from 'store/uiSlice';
import { useDispatch } from 'react-redux';

const ArticleForm = ({
  target,
  isApplication,
  setData,
}: {
  target: CategorySelect;
  isApplication?: boolean;
  setData?: React.Dispatch<React.SetStateAction<ArticleData | null>>;
}) => {
  const [value, setValue] = useState(
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero veritatis totam temporibus vero molestiae, esse, quibusdam, sapiente aperiam saepe nulla doloremque nihil aspernatur unde maiores quaerat quos illo aut cumque perferendis sequi! Earum adipisci unde quaerat, dolore neque ab nobis distinctio odit sit officia. Excepturi maxime earum, nemo dolorum impedit soluta et est quasi? Magni corporis hic aliquid sed quos, impedit placeat recusandae ducimus ea, fuga sint consequuntur debitis neque dolore necessitatibus dolor veritatis pariatur? Officiis eos nobis soluta itaque, dolor, est eum, tempora culpa optio rerum laudantium perspiciatis maxime temporibus hic? Architecto reiciendis officia excepturi voluptate. Ex porro tempore assumenda hic dicta blanditiis quis placeat pariatur, autem veritatis culpa animi itaque qui repellendus repellat mollitia ipsa, quo, unde sit quam dignissimos! Numquam voluptatibus voluptatem eveniet quod et modi omnis unde culpa cum dolorum odio facere recusandae dolores quia debitis deserunt, blanditiis, assumenda natus minima ducimus. Temporibus nihil asperiores iure sequi aspernatur id molestiae dolorem maxime. Odio ullam quaerat commodi placeat optio ducimus, amet voluptatibus ipsam pariatur nesciunt culpa consequatur beatae eligendi quo maiores error non nostrum nulla natus itaque animi autem. Cum aliquid cupiditate vel facere obcaecati quasi laboriosam commodi laborum perspiciatis magnam nobis, animi, deleniti vero fugit eos unde fuga nemo dignissimos minima. Quos minima cum delectus numquam id ut sapiente neque accusamus reiciendis quo. Ratione quod corporis id culpa dicta labore est modi accusamus repellendus voluptatum nam, tempora vel, recusandae corrupti dignissimos harum nemo minima molestiae sequi aperiam. Vero, ducimus quaerat ex reprehenderit quos architecto cumque iure nobis, cupiditate repellat accusamus voluptatum illo amet exercitationem ipsam? Necessitatibus eaque perspiciatis nisi, suscipit dolore, amet delectus consequuntur doloremque voluptates iure perferendis cumque, veniam quam earum atque minus ab labore sequi! Tempora repellat non modi deserunt, neque quae quos ea dolor eos mollitia illum necessitatibus officiis officia error atque nesciunt.'
  );

  const [file, setFile] = useState<File | undefined>(undefined);
  const [neededTools, setNeededTools] = useState<Item[]>([]);
  const [neededMaterials, setNeededMaterials] = useState<Item[]>([]);
  const [ArticlePreview, setArticlePreview] = useState<ArticlePreview | null>(null);
  const [open, setOpen] = React.useState(false);
  const [artilcleTitle, setArticleTitle] = useState<string>('');
  const [articleSummary, setArticleSummary] = useState<string>('');
  const [articleDifficulty, setArticleDifficulty] = useState<number>(0);

  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const summary = data.get('summary') as string;
    const title = data.get('title') as string;
    const difficulty = data.get('difficulty') as string;
    const image = file;
    const tools = neededTools.map((tool) => tool.id);
    const materials = neededMaterials.map((material) => material.id);
    if (title?.length > 0 && image && value.length > 0 && user?.id && summary?.length > 0 && Number(difficulty) > 0) {
      const payload: ArticleData = {
        title: title,
        image: image,
        articleBody: value,
        author: user?.id,
        difficulty: Number(difficulty),
        toolbox: {
          tools: tools,
          materials: materials,
        },
        summary: summary,
        parentDoc: target.id,
      };
      if (!isApplication) {
        await createArticle(payload);
        dispatch(
          setMessage({
            message: user.role === 'admin' ? 'Article saved' : 'Article Saved and pending approval',
            severity: 'success',
            code: 400,
          })
        );
        dispatch(setAlertOpen(true));
      } else if (setData && isApplication) {
        setData(payload);
        dispatch(setMessage({ message: 'Article saved succesfully', severity: 'success', code: 400 }));
        dispatch(setAlertOpen(true));
      }
    } else {
      dispatch(setMessage({ message: 'Please fill out all fields', severity: 'warning', code: 400 }));
      dispatch(setAlertOpen(true));
    }

    // handle form submission here
  };

  const handlePreview = async () => {
    const payload: ArticlePreview = {
      id: 'preview',
      upvotes: [],
      updatedAt: '',
      createdAt: '',
      title: artilcleTitle
        ? artilcleTitle
        : 'This is an example title for the article. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, fuga?',
      image: file ? URL.createObjectURL(file) : img,
      articleBody: value,
      author: user ? user.id : '222',
      difficulty: articleDifficulty ? Number(articleDifficulty) : 1,
      toolbox: {
        tools: neededTools,
        materials: neededMaterials,
      },
      summary: articleSummary
        ? articleSummary
        : 'This is a placeholder summary for the article. It will be replaced with the actual summary when you write one.. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, expedita? Sapiente facere inventore quaerat ex rem nam amet voluptates, sequi maiores nesciunt excepturi tenetur, cum nisi facilis suscipit! Voluptas atque repellendus aliquid explicabo totam soluta quia rem velit dolorem minima?',
      parentDoc: { title: target.title },
    };
    setArticlePreview(payload);
    setOpen(true);
  };

  return (
    <>
      <Box
        component={'form'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          background: '#f0f0f0f0',
          boxShadow: 4,
          borderRadius: 2,
          padding: 2,
          mt: 2,
          mb: 2,
        }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
          <FormInput
            name={'title'}
            label={'Article Title'}
            type="text"
            title="Article Title"
            fieldIdx={1}
            setState={setArticleTitle}
          />

          <Box>
            <Typography variant="h6">Article Image</Typography>
            <FileUpload setFileState={setFile} />
          </Box>
          <Box>
            <Typography variant="h6">Select Difficulty</Typography>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Article Difficulty</InputLabel>
                <Select
                  value={articleDifficulty}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="difficulty"
                  label="Difficulty"
                  onChange={(e) => setArticleDifficulty(Number(e.target.value))}
                >
                  <MenuItem value={'0'}>Select Difficulty</MenuItem>
                  {difficulties?.map((difficulty, idx) => (
                    <MenuItem key={idx} value={idx + 1}>
                      {difficulty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <HTMLEditor setValue={setValue} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around' }}>
          <RequirementManager target="tools" setNeededTools={setNeededTools} setNeededMaterials={setNeededMaterials} />
          <RequirementManager
            target="materials"
            setNeededTools={setNeededTools}
            setNeededMaterials={setNeededMaterials}
          />
        </Box>
        <TextField
          id="outlined-multiline-static"
          label="Article Summary"
          title="Provide a short Summary of the Article"
          multiline
          rows={4}
          placeholder="Provide a short Summary of the Article"
          name="summary"
          onChange={(e) => setArticleSummary(e.target.value)}
          value={articleSummary}
        />
        <Button type="button" variant="contained" onClick={handlePreview}>
          Preview Article
        </Button>
        <Button type="submit" variant="contained">
          {isApplication ? 'Save Article' : 'Submit Article'}
        </Button>
      </Box>
      {ArticlePreview && <ArticlePreviewModal article={ArticlePreview} open={open} setOpen={setOpen} />}
    </>
  );
};

export default ArticleForm;
