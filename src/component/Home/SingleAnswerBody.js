import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import questionImage from '../../assets/images/question.png';
import wrong from '../../assets/images/wrong.png';
import rightTick from '../../assets/images/rightTick.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    border: '1px solid #75efff',
    borderRadius: '5px',
    overflow: 'hidden',
    backgroundColor: '#101c31',
    color: 'white',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  summary: {
    backgroundColor: 'rgba(117, 239, 255, 0.2)',
    color: '#white',
  },
  details: {
    backgroundColor: '#101c31',
  },
}));

const SingleAnswerBody = ({ answer, results }) => {
  const { title, code, options, id, description } = answer || {};
  const classes = useStyles();
  //result filter
  const thisItemResult = results.filter((resItem) => resItem.questionId === id);
  const { options: resultOptions } = thisItemResult[0] || {};
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-5">
        <img className="w-10" src={questionImage} alt="question" />
        <h1 className="text-2xl font-thin">{title}</h1>
      </div>
      <div className="code bg-black/40 rounded-md p-5">
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {options.map((item, ind) => {
          return (
            <div
              className={`flex gap-5 items-center cursor-pointer rounded-md `}
              key={ind}
            >
              <div
                className={`border border-brand px-5 p-2 rounded-md w-full flex gap-5 justify-between items-center ${
                  resultOptions[ind]?.selected === true ? 'bg-brand/30' : null
                }`}
              >
                <pre className="whitespace-pre-wrap h-full">{item.value}</pre>
                <img
                  className="w-5"
                  src={item.correct ? rightTick : wrong}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
      {description && (
        <Accordion className={classes.root}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.summary}
          >
            <Typography className={classes.heading}>
              <h1 className="text-xl">Description</h1>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <pre className="whitespace-pre-wrap h-full">{description}</pre>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
};

export default SingleAnswerBody;
