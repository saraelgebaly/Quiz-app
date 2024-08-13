import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Shared/Ui/Button";
import { GroupInput } from "../../../Shared/Ui/Inputs";
import { AddModal, DeleteModal, EditModal } from "../../../Shared/Ui/Modals";
import {
  useAddGroupMutation,
  useDeleteGroupMutation,
  useGetGroupByIdQuery,
  useUpdateGroupMutation,
} from "../../../Toolkit/Groups/groupSlice";
import { IGroups } from "../../../Interfaces/GroupInterface";
import { FieldValidation, renderErrors } from "../../../utils/Validation";

interface IAddGroupProps {
  studentsData: string[]
  isOpen: boolean
  closeModal: () => void
}

export const AddGroupModal = ({
  studentsData,
  closeModal,
  isOpen,
}: IAddGroupProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IGroups>();
  const [submitCreateGroup, { isLoading: createLoading }] =
    useAddGroupMutation();
  const handleCreateGroup = async (data: IGroups) => {
    const response = await submitCreateGroup(data);
    if (
      "data" in response &&
      response.data?.message === "Record created successfully"
    ) {
      reset();
      closeModal();
    }
  };

  return (
    <>
      <AddModal title="Set up a new Group" {...{ isOpen, closeModal }}>
        <form onSubmit={handleSubmit(handleCreateGroup)}>
          <GroupInput
            className="mt-5"
            {...register("name", FieldValidation)}
            label="Group Name"
          />
          {renderErrors(errors?.name?.message)}
          <div
            className={` mt-7 flex flex-col border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1  `}
          >
            <label
              htmlFor={"select"}
              className="flex justify-center p-2 font-semibold  min-w-20"
            >
              List Students
            </label>

            <select
              id={"select"}
              {...register("students", FieldValidation)}
              multiple
              className="px-2 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"
            >
              {studentsData?.map(({ _id, first_name, last_name }: any) => (
                <option key={_id} value={_id} className="text-black">
                  {first_name + " " + last_name}
                </option>
              ))}
            </select>
          </div>
          {renderErrors(errors?.students?.message)}

          <div className="flex justify-center">
            <Button
              isLoading={createLoading}
              rounded={"lg"}
              className="gap-2 mt-4"
              variant={"ghost"}
            >
              Create Group
            </Button>
          </div>
        </form>
      </AddModal>
    </>
  );
};
interface IDeleteGroupProps {
  isOpenDeleteModal: boolean;
  closeModalDelete: () => void;
  deleteItemId: string;
}

export const DeleteGroupModal = ({
  isOpenDeleteModal,
  closeModalDelete,
  deleteItemId,
}: IDeleteGroupProps) => {
  const [submitDeleteGroup, { isLoading: deleteLoading }] =
    useDeleteGroupMutation();
  const handleDeleteGroup = async () => {
    const response = await submitDeleteGroup(deleteItemId);
    if (
      "data" in response &&
      response.data?.message === "Record deleted successfully"
    ) {
      closeModalDelete();
    }
  };

  return (
    <>
      <DeleteModal {...{ isOpenDeleteModal, closeModalDelete }}>
        <span className="text-xl font-extrabold">Confirm Delete</span>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this Group ?
        </p>
        <div className="flex justify-between mt-4">
          <Button
            onClick={handleDeleteGroup}
            isLoading={deleteLoading}
            rounded={"lg"}
            type="button"
            variant={"destructive"}
          >
            Delete
          </Button>
          <Button onClick={closeModalDelete} rounded={"lg"} type="button">
            Cancel
          </Button>
        </div>
      </DeleteModal>
    </>
  );
};

interface IEditGroupProps {
  isOpenEditModal: boolean;
  closeModalEdit: () => void;
  editItemId: string;

  allStudents: [];
  loadingData: boolean;
}

export const EditGroupModal = ({
  loadingData,
  isOpenEditModal,
  closeModalEdit,
  editItemId,
  allStudents,
}: IEditGroupProps) => {
  const [submitEditGroup, { isLoading: editLoading }] =
    useUpdateGroupMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IGroups>();
  const handleEditGroup = async (data:IGroups) => {
    const response = await submitEditGroup({ data, groupId: editItemId });
    if (
      "data" in response &&
      response.data?.message === "Record updated successfully"
    ) {
      closeModalEdit();
    }
  };
  const { data: groupById } = useGetGroupByIdQuery(editItemId);

  useEffect(() => {
    setValue("name", groupById?.name);
    setValue(
      "students",
      groupById?.students?.map(({ _id }: any) => {
        return _id;
      })
    );
  }, [groupById?.name]);

  return (
    <>
      <EditModal title="Update Group" {...{ isOpenEditModal, closeModalEdit }}>
        {!loadingData && (
          <form onSubmit={handleSubmit(handleEditGroup)}>
            <GroupInput
              className="mt-5"
              {...register("name", FieldValidation)}
              label="Group Name"
            />
         {renderErrors(errors?.name?.message)}
            <div
              className={` mt-7 flex flex-col border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}
            >
              <label
                htmlFor={"select"}
                className="flex justify-center p-2 font-semibold  min-w-20"
              >
                List Students
              </label>

              <select
                id={"select"}
                {...register("students", FieldValidation)}
                multiple
                className="px-2 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"
              >
                {allStudents?.map(({ _id, first_name, last_name }: any) => (
                  <option key={_id} value={_id} className="text-black">
                    {first_name + " " + last_name}
                  </option>
                ))}
              </select>
            </div>
            {renderErrors(errors?.students?.message)}

            <div className="flex justify-center">
              <Button
                isLoading={editLoading}
                rounded={"lg"}
                className="gap-2 mt-4"
                variant={"ghost"}
              >
                Edit Group
              </Button>
            </div>
          </form>
        )}
      </EditModal>
    </>
  );
};
