import { AnimatePresence, motion } from "framer-motion";
import { Eye, FilePenLine, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { RightAnswers } from "../../../Shared/TypeOfRightAnswers/RightAnswers";
import Button from "../../../Shared/Ui/Button";
import Pagination from "../../../Shared/Ui/Pagination";
import { useAllQuestionsQuery } from "../../../Toolkit/Questions/questionSlice";
import {
  CreateQuestionModal,
  DeleteQuestionModal,
  DetailsQuestionModal,
  EditQuestionModal,
} from "./QuestionModals";
import { IQuestions } from "../../../Interfaces/QuestionInterface";


function Questions() {
  /* Get All Questions */
  const { data: allQuestions, isLoading } = useAllQuestionsQuery(0);

  /* Create Question */
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  /* Delete Question */

  const [deleteItemId, setDeleteItem] = useState("");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const openModalDelete = (_id: string) => {
    setIsOpenDeleteModal(true);
    setDeleteItem(_id);
  };
  const closeModalDelete = () => {
    setIsOpenDeleteModal(false);
  };

  /* Edit Question */
  const [editItemId, setEditItem] = useState("");
  const [rightAnswer, setRightAnswer] = useState<typeof RightAnswers>("A");
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const closeModalEdit = () => {
    setIsOpenEditModal(false);
    setEditItem("");
    setRightAnswer("A");
  };

  const openModalEdit = (_id: string, answer: typeof RightAnswers) => {
    setIsOpenEditModal(true);
    setEditItem(_id);
    setRightAnswer(answer);
  };

  /* Question Details */

  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [detailsItemId, setDetailsItem] = useState("");
  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
    setDetailsItem("")};

  const openDetailsModal = (_id: string) => {
    setIsOpenDetailsModal(true);
    setDetailsItem(_id);
  };

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };
  const questionsPerPage = 7;
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = allQuestions?.slice(startIndex, endIndex);
  return (
    <>
      <CreateQuestionModal {...{ closeModal, isOpen }} />

      <DeleteQuestionModal
        {...{ deleteItemId, isOpenDeleteModal, closeModalDelete }}
      />
      <EditQuestionModal
        {...{ rightAnswer, isOpenEditModal, closeModalEdit, editItemId }}
      />
        <DetailsQuestionModal
        {...{ detailsItemId, isOpenDetailsModal, closeDetailsModal }}
      />
        <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md">
          {isLoading ? (
            <div className="flex items-center font-semibold">
              <h6 className="rounded-full h-[35px] w-[145px] bg-gray-500 animate-pulse"></h6>
            </div>
          ) : (
            <div className="flex items-center justify-between font-semibold">
              <Button
                type="button"
                onClick={openModal}
                variant={"outline"}
                rounded={"full"}
                className="gap-2 text-left group "
              >
                Add New Question
                <Plus
                  className="p-1 text-white transition bg-black rounded-full group-hover:bg-white group-hover:text-black duration-0"
                  size={19}
                  strokeWidth={5}
                />{" "}
                <span></span>{" "}
              </Button>
            </div>
          )}

          <table className="w-full mt-2 border-separate rounded-md border-slate-400">
            <thead className="text-white ">
              {isLoading ? (
                <tr>
                  <th className="px-2 py-2 bg-black rounded-s-md ">
                    <span className="inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                      {""}
                    </span>
                  </th>
                  <th className="hidden px-2 py-2 bg-black lg:table-cell">
                    <span className="inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md ">
                      {""}
                    </span>
                  </th>
                  <th className="hidden px-2 py-2 bg-black md:table-cell">
                    <span className="inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                      {""}
                    </span>
                  </th>
                  <th className="hidden px-2 py-2 bg-black md:table-cell">
                    <span className="inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                      {""}
                    </span>
                  </th>
                  <th className="px-2 py-2 bg-black ">
                    <span className="inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                      {""}
                    </span>
                  </th>
                  <th className="px-2 py-2 bg-black rounded-e-md">
                    <span className="inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                      {""}
                    </span>
                  </th>
                </tr>
              ) : (
                <tr>
                  <th className="px-2 py-2 font-semibold bg-black rounded-s-md">
                    TITLE
                  </th>
                  <th className="hidden px-2 py-2 font-semibold bg-black lg:table-cell">
                    DESCRIPTION
                  </th>
                  <th className="hidden px-2 py-2 font-semibold bg-black md:table-cell">
                    RIGHT ANSWER
                  </th>
                  <th className="hidden px-2 py-2 font-semibold bg-black md:table-cell">
                    DIFFICULTY
                  </th>
                  <th className="hidden px-2 py-2 font-semibold bg-black md:table-cell">
                    TYPE
                  </th>
                  <th className="px-2 py-2 font-semibold bg-black rounded-e-md">
                    ACTIONS
                  </th>
                </tr>
              )}
            </thead>
            <tbody className="text-center text-gray-500 divide-y">
              {isLoading
                ? Array.from({ length: 5 }, (_, idx) => (
                    <tr
                      key={idx}
                      className="bg-white dark:border-gray-700 hover:bg-blue-200"
                    >
                      <td className="py-3 border whitespace-nowrap border-slate-300 ">
                        <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md"></span>
                      </td>
                      <td className="hidden py-3 border lg:table-cell border-slate-300">
                        <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md "></span>
                      </td>
                      <td className="hidden py-3 border md:table-cell border-slate-300">
                        <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md"></span>
                      </td>
                      <td className="hidden py-3 border md:table-cell border-slate-300">
                        <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md"></span>
                      </td>
                      <td className="py-3 border border-slate-300">
                        <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md"></span>
                      </td>
                      <td className="py-3 border border-slate-300">
                        <div className="flex items-center justify-around">
                          <span className="animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 " />{" "}
                          <span className=" animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 " />{" "}
                          <span className=" animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 " />{" "}
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
              <AnimatePresence initial={false}>
                {currentQuestions?.map(
                  ({
                    title,
                    description,
                    answer,
                    difficulty,
                    type,
                    _id,
                  }: IQuestions) => (
                    <motion.tr
                      key={_id}
                      initial={{ x: "-100%" }}
                      animate={{ x: 0 }}
                      exit={{ y: -50, x: "100%" }}
                      transition={{ ease: "easeInOut" }}
                      layout
                      className="bg-white dark:border-gray-700 hover:bg-blue-200"
                    >
                      <td
                        title={title}
                        className="py-3 font-medium truncate border whitespace-nowrap border-slate-300 text-balance max-w-60"
                      >
                        {title}
                      </td>
                      <td
                        title={description}
                        className="hidden py-3 font-medium truncate border lg:table-cell whitespace-nowrap border-slate-300 max-w-60"
                      >
                        {description}
                      </td>
                      <td className="hidden py-3 font-medium truncate border md:table-cell whitespace-nowrap border-slate-300">
                        {answer}
                      </td>
                      <td className="hidden py-3 font-medium truncate border md:table-cell whitespace-nowrap border-slate-300">
                        {difficulty}
                      </td>
                      <td className="hidden py-3 font-medium truncate border md:table-cell whitespace-nowrap border-slate-300">
                        {type}
                      </td>
                      <td className="p-1 py-3 font-medium truncate border whitespace-nowrap border-slate-300 md:p-3">
                        <div className="flex items-center justify-around gap-1">
                          <Eye
                            size={22}
                            onClick={() => openDetailsModal(_id)}
                            className="cursor-pointer"
                            color="green"
                          />
                          <FilePenLine
                            size={22}
                            onClick={() => openModalEdit(_id, answer)}
                            className="cursor-pointer"
                            color="gold"
                          />
                          <Trash2
                            size={22}
                            onClick={() => openModalDelete(_id)}
                            className="cursor-pointer"
                            color="red"
                          />
                        </div>
                      </td>
                    </motion.tr>
                  )
                )}
              </AnimatePresence>
            </tbody>
          </table>
          {!isLoading && (
            <Pagination
              members={allQuestions}
              count={questionsPerPage}
              {...{ currentPage, handlePageChange }}
            />
          )}
        </div>
    </>
  );
}

export default Questions;
