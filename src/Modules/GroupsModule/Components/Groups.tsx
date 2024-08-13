import { Edit, Plus, Trash } from "lucide-react";
import { useState } from "react";

import Button from "../../../Shared/Ui/Button";
import { useGetGroupsQuery } from "../../../Toolkit/Groups/groupSlice";
import {
  useGetAllStudentsWithoutGroupQuery,
  useGetStudentsQuery,
} from "../../../Toolkit/Students/studentSlice";
import { AddGroupModal, DeleteGroupModal, EditGroupModal } from "./GroupModals";
import GroupsSkeleton from "./GroupsSkeleton";
import {  IGroupsList } from "../../../Interfaces/GroupInterface";

function Groups() {
  //Add Group
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };
  // Get Groups list
  const { data: groups, isLoading: groupData } = useGetGroupsQuery(0);
  // Get Students Data
  const { data: allStudents } = useGetStudentsQuery(0);
  const { data: studentsData } = useGetAllStudentsWithoutGroupQuery(0);
  // Delete Group

  const [deleteItemId, setDeleteItem] = useState("");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const openModalDelete = (_id: string) => {
    setIsOpenDeleteModal(true);
    setDeleteItem(_id);
  };
  const closeModalDelete = () => {
    setIsOpenDeleteModal(false);
    setDeleteItem("");
  };

  //Update Group
  const [editItemId, setEditItem] = useState("");
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const closeModalEdit = () => {
    setIsOpenEditModal(false);
    setEditItem("");
  };
  const [loadingData, setLoadingData] = useState(false);
  const openModalEdit = async (_id: string) => {
    setIsOpenEditModal(true);
    setLoadingData(true);
    setLoadingData(false);
    setEditItem(_id);
  };

  return (
    <>
      <AddGroupModal {...{ isOpen, closeModal, studentsData }} />
      <DeleteGroupModal
        {...{ closeModalDelete, isOpenDeleteModal, deleteItemId }}
      />
      <EditGroupModal
        {...{
          loadingData,
          isOpenEditModal,
          closeModalEdit,
          allStudents,
          editItemId,
        }}
      />

      <div className="p-3 border-2 rounded-md ">
        {groupData ? (
          <div className="flex items-center font-semibold justify-end">
            <h6 className="rounded-full h-[35px] w-[145px] bg-gray-500 animate-pulse"></h6>
            {""}{" "}
          </div>
        ) : (
          <div className="flex justify-end my-2">
            <Button
              type="button"
              onClick={openModal}
              variant={"outline"}
              rounded={"full"}
              className="gap-2 text-left group "
            >
              Add Group
              <Plus
                className="p-1 text-white transition bg-black rounded-full group-hover:bg-white group-hover:text-black duration-0"
                size={19}
                strokeWidth={5}
              />
            </Button>
          </div>
        )}
        {groupData && (
          <h1 className="mb-2 rounded-md animate-pulse bg-gray-500 h-[16px] w-[160px]">
            {""}
          </h1>
        )}
        {groupData &&
          Array.from({ length: 2 }, (_, idx) => <GroupsSkeleton key={idx} />)}

        {!groupData && (
          <>
            <h1 className="text-2xl font-semibold">Groups list</h1>
            <div className="mt-5 flex flex-wrap gap-5">
              {groups?.map((group: IGroupsList) => (
                <div
                  key={group._id}
                  className="flex items-center justify-between p-5 border-2 rounded-md w-full md:w-[48%] mb-6 md:mb-0"
                >
                  <div className="flex flex-col">
                    <h3 className="mb-1 text-xl">Group: {group.name}</h3>
                    <p className="text-mainColor">
                      No of students: {group.max_students}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="mr-4" title="Edit">
                      <Edit
                        onClick={() => openModalEdit(group._id)}
                        className="text-yellow-400 hover:fill-yellow-700"
                      />
                    </button>
                    <button
                      className="mr-4"
                      title="Delete"
                      onClick={() => openModalDelete(group._id)}
                    >
                      <Trash className="text-red-600  hover:fill-red-700" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Groups;
