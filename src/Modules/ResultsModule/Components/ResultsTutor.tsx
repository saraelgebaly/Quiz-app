import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Shared/Ui/Button';
import Pagination from '../../../Shared/Ui/Pagination';
import { useQuizzesResultsQuery } from '../../../Toolkit/Results/resultsSlice';
import CookieServices from '../../../utils/Cookies';
import ResultsSkeleton from './ResultsSkeleton';
import { IResultsResponse } from '../../../Interfaces/ResultInterface';

function ResultsTutor() {

    // Get QuizzesResults 
  const { isLoading, data: quizzesResults } = useQuizzesResultsQuery(0);

//Pagination 
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };
  const ResultsPerPage = 5;
  const startIndex = currentPage * ResultsPerPage;
  const endIndex = startIndex + ResultsPerPage;
  const currentResults = quizzesResults?.slice(startIndex, endIndex);

//Navigate To ResultsDetails  
  const navigate = useNavigate();

  const handleResultDetails = (data: IResultsResponse) => {
    navigate('/dashboard/results/results-details', { state: data });
  };
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 className="font-semibold text-xl mb-4">Completed Quizzes</h2>
      <div className="categories-body">
        <ul className="responsive-table-categories">
          <li className="table-header">
            <div className="col col-1">Title</div>
            <div className="col col-2">Number of Questions</div>
            <div className="col col-3">Difficulty</div>
            <div className="col col-4">Type</div>
            <div className="col col-5">Closed At</div>
            {CookieServices.get('userInfo').role === "Student" ? null : 
            <div className="col col-6">Details</div>
            }
          </li>
        </ul>

        {isLoading ? (
          <ul className="responsive-table-categories">
            {Array.from({ length: 5}, (_, idx) => (
              <ResultsSkeleton key={idx}/>
            ))}
          </ul>
        ) : (
          <ul className="responsive-table-categories">
            {currentResults?.map(({ quiz, participants }: IResultsResponse) => (
              <li key={quiz?._id} className="table-row">
                <div className="col col-1" data-label="Title">{quiz?.title}</div>
                <div className="col col-2" data-label="Number of Questions">{quiz?.questions_number}</div>
                <div className="col col-3" data-label="Difficulty">{quiz?.difficulty}</div>
                <div className="col col-4" data-label="Type">{quiz?.type}</div>
                <div className="col col-5" data-label="Closed At">{moment(quiz?.closed_at).format("DD / MM / YYYY")}</div>
                {CookieServices.get('userInfo').role === "Student" ? null : (
                  <div className="col col-6" data-label="Details">
                    <Button onClick={() => handleResultDetails({ quiz, participants })} variant={"secondary"} size={"sm"} rounded={"full"}>View</Button>
                  </div>
                 )} 
              </li>
            ))}
          </ul>
        )}
      </div>
      {!isLoading && <Pagination members={quizzesResults} count={ResultsPerPage} {...{ currentPage, handlePageChange }} />}

    </div>
  )
}

export default ResultsTutor