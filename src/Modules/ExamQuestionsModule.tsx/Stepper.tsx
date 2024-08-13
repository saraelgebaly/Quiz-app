import { Fragment } from 'react/jsx-runtime'
import { SetURLSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface IProps {
  questionsData: {
    data: {
      questions: {
        _id: string;
      }[];
    };
  };
  answeredQuestions: string[];
  setSearchParams: SetURLSearchParams
  clearSelectedValue: () => void
  selectedAnswersCount: number
  allAnswers: {
    answers: {
      question: string;
      answer: string;
      uncertain: false;
    }[];
  }
}

const Stepper = ({ questionsData, answeredQuestions, clearSelectedValue, setSearchParams, selectedAnswersCount, allAnswers }: IProps) => {

  const move = (index: number) => {
    setSearchParams({ "question-number": String(index) });
    clearSelectedValue()
  }

  const [uncertainIndexes, setUncertainIndexes] = useState<number[]>([]);

  useEffect(() => {
    const uncertainIndices = questionsData.data.questions.reduce((indices: number[], { _id }: any, index: number) => {
      const answerIndex = allAnswers.answers.findIndex((answer: any) => answer.question === _id);
      if (answerIndex !== -1 && allAnswers.answers[answerIndex].uncertain) {
        indices.push(index);
      }
      return indices;
    }, []);

    setUncertainIndexes(uncertainIndices);
  }, [allAnswers, questionsData]);

  return (

    <div className="px-2 py-4 sm:mx-4  ">
      <div className='flex items-center  relative w-full  m-auto '>
        {questionsData?.data?.questions?.map(({ _id }: any, index: number) =>
          <Fragment key={_id} >
            <div className={`relative flex flex-col items-center text-teal-600 `}>
              <button type='button' onClick={() => move(index)} className={`rounded-full stepper  transition duration-500 ease-in sm:border-4 border-2 ${answeredQuestions?.includes(_id) ? 'bg-green-400 text-white' : ''}
                  ${uncertainIndexes.includes(index) ? 'border-yellow-400' : 'border-gray'} xl:size-12 lg:size-10 sm:size-8 size-5 flex items-center justify-center py-3`}>{index + 1}</button>
            </div>
            <div className={`flex-auto border-t-2 ease-in ${index === questionsData?.data?.questions?.length - 1 ? 'hidden' : 'border-gray'}  `}>{/* Display line */}</div>
          </Fragment>
        )}
        <span className='ms-5 size-12 bg-blue-600 rounded-full  justify-center items-center text-white hidden sm:flex '>{selectedAnswersCount} / {questionsData?.data?.questions?.length}</span>
      </div>
    </div>
  );
};

export default Stepper