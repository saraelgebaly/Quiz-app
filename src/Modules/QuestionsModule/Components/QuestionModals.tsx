import { useForm } from "react-hook-form";
import Button from "../../../Shared/Ui/Button";
import {
  DetailsInput,
  Input,
  SelectInput,
  Textarea,
} from "../../../Shared/Ui/Inputs";
import {
  AddModal,
  DeleteModal,
  DetailsModal,
  EditModal,
} from "../../../Shared/Ui/Modals";
import {
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useEditQuestionMutation,
  useQuestionDetailsQuery,
} from "../../../Toolkit/Questions/questionSlice";
import { RightAnswers } from "../../../Shared/TypeOfRightAnswers/RightAnswers";
import {
  Answers,
  difficulty,
  type,
} from "../../../Shared/SelectOptions/SelectOptions";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import {
  ICreateQuestions,
  IEditQuestion,
} from "../../../Interfaces/QuestionInterface";
import { FieldValidation, renderErrors } from "../../../utils/Validation";

interface IAddQuestionsProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const CreateQuestionModal = ({
  closeModal,
  isOpen,
}: IAddQuestionsProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateQuestions>();
  const [submitCreateQuestion, { isLoading: createLoading }] =
    useCreateQuestionMutation();

  const handleCreateQuestion = async (values: ICreateQuestions) => {
    const response = await submitCreateQuestion(values);
    console.log(response);

    if (
      "data" in response &&
      response.data?.message === "Record created successfully"
    ) {
      reset();
      closeModal();
    }
  };

  return (
    <AddModal title="Set up a new Question" {...{ isOpen, closeModal }}>
      <form onSubmit={handleSubmit(handleCreateQuestion)}>
        <Input label="Title" {...register("title", FieldValidation)} />
        {renderErrors(errors?.title?.message)}
        <Textarea
          label="Description"
          {...register("description", FieldValidation)}
        />
        {renderErrors(errors?.description?.message)}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="w-full ">
            <Input label="A" {...register("options.A", FieldValidation)} />
            {renderErrors(errors?.options?.A?.message)}
          </div>
          <div className="w-full ">
            <Input label="B" {...register("options.B", FieldValidation)} />
            {renderErrors(errors?.options?.B?.message)}
          </div>
          <div className="w-full ">
            <Input label="C" {...register("options.C", FieldValidation)} />
            {renderErrors(errors?.options?.C?.message)}
          </div>
          <div className="w-full ">
            <Input label="D" {...register("options.D", FieldValidation)} />
            {renderErrors(errors?.options?.D?.message)}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between sm:flex-row sm:gap-4">
          <div className="w-full ">
            <SelectInput
              label="Answers"
              list={Answers}
              {...register("answer", FieldValidation)}
            />
            {renderErrors(errors?.answer?.message)}
          </div>
          <div className="w-full ">
            <SelectInput
              label="Difficulty"
              list={difficulty}
              {...register("difficulty", FieldValidation)}
            />
            {renderErrors(errors?.difficulty?.message)}
          </div>
          <div className="w-full ">
            <SelectInput
              label="Type"
              list={type}
              {...register("type", FieldValidation)}
            />
            {renderErrors(errors?.type?.message)}
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            isLoading={createLoading}
            rounded={"lg"}
            className="gap-2 mt-4"
            variant={"ghost"}
          >
            Create Question
          </Button>
        </div>
      </form>
    </AddModal>
  );
};
interface IDeleteQuestionProps {
  isOpenDeleteModal: boolean;
  closeModalDelete: () => void;
  deleteItemId: string;
}

export const DeleteQuestionModal = ({
  isOpenDeleteModal,
  closeModalDelete,
  deleteItemId,
}: IDeleteQuestionProps) => {
  const [submitDeleteQuestion, { isLoading: deleteLoading }] =
    useDeleteQuestionMutation();

  const handleDeleteQuestion = async () => {
    const response = await submitDeleteQuestion(deleteItemId);
    if (
      "data" in response &&
      response.data?.message === "Record deleted successfully"
    ) {
      closeModalDelete();
    }
  };

  return (
    <DeleteModal {...{ isOpenDeleteModal, closeModalDelete }}>
      <span className="text-xl font-extrabold">Confirm Delete</span>
      <p className="text-sm text-gray-600">
        Are you sure you want to delete this Question ?
      </p>
      <div className="flex justify-between mt-4">
        <Button onClick={closeModalDelete} rounded={"lg"} type="button">
          Cancel
        </Button>
        <Button
          onClick={handleDeleteQuestion}
          isLoading={deleteLoading}
          rounded={"lg"}
          type="button"
          variant={"destructive"}
        >
          Delete
        </Button>
      </div>
    </DeleteModal>
  );
};

interface IEditQuestionProps {
  isOpenEditModal: boolean;
  closeModalEdit: () => void;
  editItemId: string;
  rightAnswer: typeof RightAnswers;
}

export const EditQuestionModal = ({
  isOpenEditModal,
  closeModalEdit,
  editItemId,
  rightAnswer,
}: IEditQuestionProps) => {
  const [submitEditQuestion, { isLoading: editLoading }] =
    useEditQuestionMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditQuestion>();
  const handleEditQuestion = async (values: IEditQuestion) => {
    const response = await submitEditQuestion({ ...values, editItemId });
    if (
      "data" in response &&
      response.data?.message === "Record updated successfully"
    ) {
      closeModalEdit();
    }
  };
  useEffect(() => {
    setValue("answer", rightAnswer);
  }, [rightAnswer]);

  return (
    <EditModal
      title="Update Question Title"
      {...{ isOpenEditModal, closeModalEdit }}
    >
      <form onSubmit={handleSubmit(handleEditQuestion)}>
        <SelectInput
          label="Answer"
          list={Answers}
          {...register("answer", FieldValidation)}
        />
        {renderErrors(errors?.answer?.message)}

        <div className="flex justify-center">
          <Button
            isLoading={editLoading}
            rounded={"lg"}
            variant={"ghost"}
            className="mt-4"
          >
            Edit Question
          </Button>
        </div>
      </form>
    </EditModal>
  );
};
interface IDetailsQuestionsProps {
  isOpenDetailsModal: boolean;
  closeDetailsModal: () => void;
  detailsItemId: string;
}

export const DetailsQuestionModal = ({
  closeDetailsModal,
  isOpenDetailsModal,
  detailsItemId,
}: IDetailsQuestionsProps) => {
  const { data: questionDetails, status } =
    useQuestionDetailsQuery(detailsItemId);

  return (
    <DetailsModal
      title="Question Details"
      {...{ isOpenDetailsModal, closeDetailsModal }}
    >
      {status === "fulfilled" ? (
        <>
          <DetailsInput label="Title" content={`${questionDetails?.title}`} />
          <DetailsInput
            className="mt-4"
            label="Description"
            content={`${questionDetails?.description}`}
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="w-full">
              <DetailsInput
                label="A"
                content={`${questionDetails?.options?.A}`}
              />
            </div>
            <div className="w-full">
              <DetailsInput
                label="B"
                content={`${questionDetails?.options?.B}`}
              />
            </div>
            <div className="w-full">
              <DetailsInput
                label="C"
                content={`${questionDetails?.options?.C}`}
              />
            </div>
            <div className="w-full">
              <DetailsInput
                label="D"
                content={`${questionDetails?.options?.D}`}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 mt-4 sm:flex-row sm:gap-4 ">
            <div className="w-full">
              <DetailsInput
                label="answer"
                content={`${questionDetails?.answer}`}
              />
            </div>
            <div className="w-full">
              <DetailsInput label="type" content={`${questionDetails?.type}`} />
            </div>
            <div className="w-full">
              <DetailsInput
                label="difficulty"
                content={`${questionDetails?.difficulty}`}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={closeDetailsModal}
              rounded={"lg"}
              className="gap-2 mt-4"
              variant={"ghost"}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" size={100} color="#C5D86D" />
        </div>
      )}
    </DetailsModal>
  );
};
