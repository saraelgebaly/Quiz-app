import { Loader } from "lucide-react";
import Button from "../../../Shared/Ui/Button";
import { DetailsInput } from "../../../Shared/Ui/Inputs";
import { DetailsModal } from "../../../Shared/Ui/Modals";
import { useStudentDetailsQuery } from "../../../Toolkit/Students/studentSlice";

interface IDetailsQuestionsProps {
  isOpenDetailsModal: boolean;
  closeDetailsModal: () => void;
  detailsItemId: string;
}

export const StudentDetailsModal = ({
  closeDetailsModal,
  isOpenDetailsModal,
  detailsItemId,
}: IDetailsQuestionsProps) => {
  const { data: studentDetails, status } =
    useStudentDetailsQuery(detailsItemId);

  return (
    <DetailsModal
      title="Student Details"
      {...{ isOpenDetailsModal, closeDetailsModal }}
    >
      {status === "fulfilled" ? (
        <>
          <DetailsInput
            label="Title"
            content={`${
              studentDetails?.first_name + " " + studentDetails?.last_name
            }`}
          />
          <DetailsInput
            className="mt-4"
            label="Email"
            content={`${studentDetails?.email}`}
          />

          <DetailsInput
            className="mt-4"
            label="Gruop"
            content={`${studentDetails?.group?.name}`}
          />
          <DetailsInput
            className="mt-4 "
            label="Status"
            content={`${studentDetails?.status}`}
          />

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
