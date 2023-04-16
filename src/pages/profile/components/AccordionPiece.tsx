import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

const AccordionPiece = ({
  title,
  value,
  summary,
}: {
  title: string;
  value: string | undefined;
  summary: JSX.Element;
}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      {' '}
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography sx={{ width: '33%', flexShrink: 0 }}>{title}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{value}</Typography>
        </AccordionSummary>
        <AccordionDetails>{summary}</AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionPiece;
