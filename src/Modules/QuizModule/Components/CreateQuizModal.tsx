import { useForm } from "react-hook-form";
import { useGetGroupsQuery } from "../../../Toolkit/Groups/groupSlice";
import {
  useCreateQuizMutation,
  useJoinQuizMutation,
} from "../../../Toolkit/Quizes/quizSlice";
import { AddModal, InfoModal, JoinTaskModal } from "../../../Shared/Ui/Modals";
import { Loader, SaveAll } from "lucide-react";
import {
  difficulty,
  duration,
  questions_number,
  type,
} from "../../../Shared/SelectOptions/SelectOptions";
import {
  DateInput,
  Input,
  SelectInput,
  Textarea,
} from "../../../Shared/Ui/Inputs";
import Button from "../../../Shared/Ui/Button";
import { useRef } from "react";
import { toast } from "react-toastify";
import CookieServices from "../../../utils/Cookies";
import { useNavigate } from "react-router-dom";
import { ICreateQuiz, IJoinQuiz } from "../../../Interfaces/QuizInterface";



interface IAddQuizzesProps {
  isOpen: boolean;
  openInfoModal: (code: string) => void;
  closeModal: () => void;
}
const renderErrors = (errors: string | undefined) => {
  return errors ? (
    <span className="text-red-600 block mb-1">{errors}</span>
  ) : null;
};
const required = "This Field is required";
const FieldValidation = {
  required,
};
export const CreateQuizModal = ({
  closeModal,
  isOpen,
  openInfoModal,
}: IAddQuizzesProps) => {
  //Get Groups List
  const { isLoading: groupsLoading, data: groupsList } = useGetGroupsQuery(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateQuiz>();
  const [submitCreateQuiz, { isLoading: createLoading }] =
    useCreateQuizMutation();
  const handleCreateQuiz = async (data: ICreateQuiz) => {
    const response = await submitCreateQuiz(data);

    if (
      "data" in response &&
      response.data?.message === "Record created successfully"
    ) {
      const { code } = response?.data?.data;
      reset();
      closeModal();
      openInfoModal(code);
    }
  };

  return (
    <>
      <AddModal title="Set up a new quiz" {...{ isOpen, closeModal }}>
        {groupsLoading && (
          <div className="flex items-center justify-center">
            <Loader className="animate-spin" size={100} color="#C5D86D" />
          </div>
        )}
        {!groupsLoading && (
          <form onSubmit={handleSubmit(handleCreateQuiz)}>
            <Input {...register("title", FieldValidation)} label="Title" />
            {renderErrors(errors?.title?.message)}
            <div className="flex flex-col items-center justify-between sm:flex-row sm:space-x-5 ">
              <div className="w-full">
                <SelectInput
                  label="Duration"
                  {...register("duration", FieldValidation)}
                  list={duration}
                />
                {renderErrors(errors?.duration?.message)}
              </div>
              <div className="w-full">
                <SelectInput
                  label="Questions_number"
                  {...register("questions_number", FieldValidation)}
                  list={questions_number}
                />
                {renderErrors(errors?.questions_number?.message)}
              </div>
              <div className="w-full">
                <SelectInput
                  label="Score_per_question"
                  {...register("score_per_question", FieldValidation)}
                  list={questions_number}
                />
                {renderErrors(errors?.score_per_question?.message)}
              </div>
            </div>

            <Textarea
              label="Description"
              {...register("description", FieldValidation)}
            />
            {renderErrors(errors?.description?.message)}
            <DateInput
              label="Schedule"
              {...register("schadule", FieldValidation)}
            />
            {renderErrors(errors?.schadule?.message)}
            <div className="flex flex-col items-center justify-between sm:flex-row sm:space-x-5">
              <div className="w-full">
                <SelectInput
                  label="level"
                  {...register("difficulty", FieldValidation)}
                  list={difficulty}
                />
                {renderErrors(errors?.difficulty?.message)}
              </div>
              <div className="w-full">
                <SelectInput
                  label="Category"
                  {...register("type", FieldValidation)}
                  list={type}
                />
                {renderErrors(errors?.type?.message)}
              </div>
              <div className="w-full">
                <div
                  className={` mt-4 flex flex-1 border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}
                >
                  <label
                    htmlFor="group"
                    className="flex items-center justify-center p-2 font-semibold  min-w-20"
                  >
                    Group
                  </label>
                  <select
                    id="group"
                    {...register("group", FieldValidation)}
                    className="px-2 rounded-r-md outline-none flex-1 border-none text-center  bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  >
                    {groupsList?.map(({ _id, name }: any) => (
                      <option key={_id} value={_id} className="text-black">
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                {renderErrors(errors?.group?.message)}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                isLoading={createLoading}
                rounded={"lg"}
                className="gap-2 mt-4"
                variant={"ghost"}
              >
                Create Quiz
              </Button>
            </div>
          </form>
        )}
      </AddModal>
    </>
  );
};

interface IInfoQuizProps {
  isOpenInfoModal: boolean;
  closeInfoModal: () => void;
  quizCode: string;
}
export const InfoQuizModal = ({
  isOpenInfoModal,
  closeInfoModal,
  quizCode,
}: IInfoQuizProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);

  const handleCopy = () => {
    if (textRef.current) {
      const textToCopy = textRef?.current?.textContent;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        toast.success(`Copy Code ${textToCopy}`);
        closeInfoModal();
      }
    }
  };
  return (
    <>
      <InfoModal
        {...{ closeInfoModal, isOpenInfoModal }}
        title="Quiz was successfully created"
      >
        <div
          className={`w-full flex border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}
        >
          <label
            htmlFor="Info"
            className="flex justify-center p-2 font-semibold  min-w-20"
          >
            Code
          </label>
          <p
            ref={textRef}
            id="Info"
            className=" pl-3 text-black  outline-none flex-1 border-none  bg-transparent py-1.5 placeholder:text-gray-400  caret-mainColor "
          >
            {quizCode}
          </p>
          <span className="flex items-center pl-3 text-white me-3 cursor-pointer ">
            <SaveAll onClick={handleCopy} color="black" />
          </span>
        </div>
      </InfoModal>
    </>
  );
};
interface IJoinQuizProps {
  isOpenJoinQuizModal: boolean;
  closeJoinQuizModal: () => void;
}

export const JoinQuizModal = ({
  isOpenJoinQuizModal,
  closeJoinQuizModal,
}: IJoinQuizProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinQuiz>();
  const [submitJoinQuiz, { isLoading }] = useJoinQuizMutation();
  const handleJoinQuiz = async (data: IJoinQuiz) => {
    const response = await submitJoinQuiz(data);

    if (
      "data" in response &&
      response.data?.message === "Student joined successfully"
    ) {
      CookieServices.get("userInfo").role === "Student"
        ? navigate(`/dashboard/exam-questions/${response?.data?.data?.quiz}`)
        : null;
    }
  };

  return (
    <>
      <JoinTaskModal {...{ closeJoinQuizModal, isOpenJoinQuizModal }}>
        <form className="w-full" onSubmit={handleSubmit(handleJoinQuiz)}>
          <Input
            label="Code"
            {...register("code", FieldValidation)}
            className="w-full"
          />
          {errors.code && (
            <p className="text-[#ff0000]">{errors.code.message}</p>
          )}{" "}
          <div className="flex justify-center">
            <Button
              isLoading={isLoading}
              rounded={"lg"}
              type="submit"
              className="gap-2 mt-2"
              variant={"ghost"}
            >
              Join Quiz
            </Button>
          </div>
        </form>
      </JoinTaskModal>
    </>
  );
};
interface IQuizResultProps {
  isOpenInfoModal: boolean;
  closeInfoModal: () => void;
  score: number[];
}

export const QuizResultModal = ({
  isOpenInfoModal,
  closeInfoModal,
  score,
}: IQuizResultProps) => {
  return (
    <>
      <InfoModal
        {...{ closeInfoModal, isOpenInfoModal }}
        title=" Congratulations"
      >
        <div className={`w-full flex justify-center items-center`}>
          <p className="text-lg font-bold ">
            your Score is
            <span className="text-lg text-green-500 ">
              {score[0]} / {score[1] * score[2]}
            </span>
          </p>
        </div>
        <p className="flex items-center justify-center text-black">
          {" "}
          Question with {score[2]} points
        </p>
      </InfoModal>
    </>
  );
};
