import { useForm } from "react-hook-form";
import Button from "../../../Shared/Ui/Button";
import { Input } from "../../../Shared/Ui/Inputs";
import { DeleteModal, EditModal } from "../../../Shared/Ui/Modals";
import {
  useDeleteQuizMutation,
  useEditQuizMutation,
} from "../../../Toolkit/Quizes/quizSlice";
import { useNavigate } from "react-router-dom";
import { IEditQuiz } from "../../../Interfaces/QuizInterface";
import { FieldValidation, renderErrors } from "../../../utils/Validation";

interface IDeleteQuizProps {
  isOpenDeleteModal: boolean;
  closeModalDelete: () => void;
  deleteItemId: string;
}

export const DeleteQuizModal = ({
  isOpenDeleteModal,
  closeModalDelete,
  deleteItemId,
}: IDeleteQuizProps) => {
  const { handleSubmit: handleSubmitDelete } = useForm();
  const navigate = useNavigate();
  const [submitDeleteQuiz, { isLoading: deleteLoading }] =
    useDeleteQuizMutation();

  const handleDeleteQuiz = async () => {
    const response = await submitDeleteQuiz(deleteItemId);
    if (
      "data" in response &&
      response.data?.message === "Record deleted successfully"
    ) {
      closeModalDelete();
      navigate("/dashboard/quizes");
    }
  };

  return (
    <>
      <DeleteModal {...{ isOpenDeleteModal, closeModalDelete }}>
        <form onSubmit={handleSubmitDelete(handleDeleteQuiz)}>
          <span className="text-xl font-extrabold">Confirm Delete</span>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this Quiz ?
          </p>
          <div className="flex justify-between mt-4">
            <Button onClick={closeModalDelete} rounded={"lg"} type="button">
              Cancel
            </Button>
            <Button
              isLoading={deleteLoading}
              rounded={"lg"}
              type="submit"
              variant={"destructive"}
            >
              Delete
            </Button>
          </div>
        </form>
      </DeleteModal>
    </>
  );
};

interface IEditQuizProps {
  isOpenEditModal: boolean;
  closeModalEdit: () => void;
  refetch: () => void;
  editItemId: string;
  quizTitle: string;
}

export const EditQuizModal = ({
  isOpenEditModal,
  closeModalEdit,
  editItemId,
  quizTitle,
  refetch,
}: IEditQuizProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IEditQuiz>();
  const [submitEditQuiz, { isLoading: editLoading }] = useEditQuizMutation();

  const handleEditQuiz = async (data: IEditQuiz) => {
    const response = await submitEditQuiz({ ...data, editItemId });
    if (
      "data" in response &&
      response.data?.message === "Record updated successfully"
    ) {
      refetch();
      closeModalEdit();
    }
  };

  return (
    <>
      <EditModal
        title="Update Quiz Title"
        {...{ isOpenEditModal, closeModalEdit }}
      >
        <form onSubmit={handleSubmit(handleEditQuiz)} className="mt-4">
          <Input
            label="Title"
            {...register("title", FieldValidation)}
            defaultValue={quizTitle}
          />
          {renderErrors(errors?.title?.message)}
          <div className="flex justify-center">
            <Button
              isLoading={editLoading}
              rounded={"lg"}
              variant={"ghost"}
              className="mt-4"
            >
              Edit Quiz
            </Button>
          </div>
        </form>
      </EditModal>
    </>
  );
};
