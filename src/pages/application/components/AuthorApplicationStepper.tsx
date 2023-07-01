import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { authorFormData } from 'data/formFields';
import FormInput from 'components/FormInput';
import ArticleForm from 'pages/admin/articles/components/ArticleForm';
import { ArticleForm as ArticleFormType, CategorySelect } from 'utils/models';
import SubcategorySelector from 'pages/admin/components/SubcategorySelector';
import { AuthState } from 'store/authSlice';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

const steps = [...authorFormData.map((field) => field.label), 'Your first Article'];

export default function AuthorApplicationStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [selectedCategory, setSelectedCategory] = React.useState<CategorySelect | string>('');
  const [articleExapmle, setArticleExample] = React.useState<ArticleFormType | null>(null);
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const diyexperience = data.get('diyexperience') as string;
    const writingexperience = data.get('writingexperience') as string;
    const motivation = data.get('reason') as string;
    const article = articleExapmle;
    if (diyexperience.length && writingexperience.length && motivation.length && article) {
      console.log(diyexperience, writingexperience, motivation, article);
      //submit application to db here with all the data above
      //if successful, show thank you page and tell user to wait for approval email
    }
  };

  return (
    <>
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
      <React.Fragment>
        <>
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
                <Box key={idx} sx={{ display: idx === activeStep ? 'inline' : 'none' }}>
                  <FormInput
                    fieldIdx={idx}
                    label={field.label}
                    title={field.title}
                    name={field.name}
                    type={field.type}
                  />
                </Box>
              );
            })}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
        </>
      </React.Fragment>
    </>
  );
}
