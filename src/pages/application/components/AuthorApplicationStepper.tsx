import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { authorFormData } from 'data/formFields';
import ArticleForm from 'pages/admin/articles/components/ArticleForm';
import { ArticleForm as ArticleFormType, CategorySelect } from 'utils/models';
import SubcategorySelector from 'pages/admin/components/SubcategorySelector';
import { AuthState } from 'store/authSlice';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from 'components/FormInput';
import { submitAuthorApplication } from 'utils/apiData';
import { setAlertOpen, setLoading, setMessage } from 'store/uiSlice';

const steps = ['Personal Information', 'Your first Article'];

export default function AuthorApplicationStepper({
  setThankYou,
}: {
  setThankYou: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [selectedCategory, setSelectedCategory] = React.useState<CategorySelect | string>('');
  const [articleExapmle, setArticleExample] = React.useState<ArticleFormType | null>(null);
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;

  const dispatch = useDispatch();

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const diyexperience = data.get('diyexperience') as string;
    const writingexperience = data.get('writingexperience') as string;
    const motivation = data.get('reason') as string;
    const image = articleExapmle?.image;
    const article = { ...articleExapmle, image: '' };
    if (diyexperience.length && writingexperience.length && motivation.length && article && user && image) {
      const application = {
        image,
        diyexperience,
        writingexperience,
        motivation,
        article,
        user: user.id,
      };
      try {
        dispatch(setLoading(true));
        await submitAuthorApplication(application);
        dispatch(setLoading(false));
        dispatch(setMessage({ type: 'success', message: 'Application submitted successfully', code: 200 }));
        dispatch(setAlertOpen(true));
        setThankYou(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: activeStep === steps.length - 1 ? 'inline' : 'none' }}>
          <Typography sx={{ mt: 2, mb: 1 }}>Select Category to write into</Typography>
          <SubcategorySelector
            target="subcategories"
            query="type=articles"
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          {typeof selectedCategory !== 'string' && (
            <ArticleForm target={selectedCategory} isApplication={true} setData={setArticleExample} />
          )}
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          {authorFormData.map((field, idx) => {
            return (
              <Box key={idx} sx={{ display: activeStep < steps.length - 1 ? 'inline' : 'none' }}>
                <FormInput {...field} fieldIdx={idx} />
              </Box>
            );
          })}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifySelf: 'end' }}>
            <Button type="button" color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              sx={{ display: activeStep < steps.length - 1 ? 'inline' : 'none' }}
              type="button"
              onClick={handleNext}
            >
              Next
            </Button>
            <Button
              disabled={!articleExapmle}
              sx={{ display: activeStep === steps.length - 1 ? 'inline' : 'none' }}
              type="submit"
            >
              Submit Application
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
