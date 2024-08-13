import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NoData from '../../../assets/images/No-Data.jpg';
import { IParticipants } from '../../../Interfaces/ResultInterface';



function ResultsDetails() {
    const location = useLocation();
    const data = location?.state;
    const [Loading, setLoading] = useState(false);
    
    useEffect(() => {
      if (data) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    }, [data]);
  return (
  <>
      <div className="rounded-lg border  p-6 shadow-md w-fit mx-auto">
        <h2 className="text-lg font-semibold mb-4">Results</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-800 text-white border">Title</th>
                <th className="px-4 py-2 bg-gray-800 text-white border">Score</th>
                <th className="px-4 py-2 bg-gray-800 text-white border">Average</th>
                <th className="px-4 py-2 bg-gray-800 text-white border">Time submitted</th>
              </tr>
            </thead>
            <tbody>
              {Loading ? (
                Array.from({ length: 7 }, (_, idx) => (
                  <tr key={idx} className="even:bg-gray-100 odd:bg-white">
                    <td className="px-4 py-2 border"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
                    <td className="px-4 py-2 border"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
                    <td className="px-4 py-2 border"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
                    <td className="px-4 py-2 border"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
                  </tr>
                ))
              ) : data?.participants?.length > 0 ? (
                data.participants.map(({ score, started_at }: IParticipants, idx: number) => (
                  <tr key={idx} className="even:bg-gray-100 odd:bg-white">
                    <td className="px-4 py-2 border">{data?.quiz?.title}</td>
                    <td className="px-4 py-2 border">{score}</td>
                    <td className="px-4 py-2 border">{data.participants.length}</td>
                    <td className="px-4 py-2 border">{moment(started_at).format("HH:mm A")}</td>
                  </tr>
                ))
              ) : (
                <div className='flex flex-col items-center justify-center gap-3'>
                  <img src={NoData} className='max-w-full w-1/2 h-auto' alt="NoData" />
                  <p className='text-xl  font-nunito text-red-500 font-bold'>No Students Joined Exam</p>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
  </>
  )
}

export default ResultsDetails