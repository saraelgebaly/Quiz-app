import Button from "../../Shared/Ui/Button";

interface IProps {
  questionNumber: number;
  questionsData: any;
  rightAnswers: number[];
  isLoading: boolean;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SubmitButton = ({
  questionNumber,
  questionsData,
  rightAnswers,
  isLoading,
  onButtonClick,
}: IProps) => {
  return (
    <>
      {questionNumber + 1 === questionsData?.data?.questions?.length &&
      !rightAnswers[questionNumber] ? (
        <div>
          <Button
            disabled={isLoading}
            onClick={(e) => onButtonClick(e)}
            className=" px-5 py-1 text-xl font-bold bg-green-700"
          >
            Submit
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default SubmitButton;
