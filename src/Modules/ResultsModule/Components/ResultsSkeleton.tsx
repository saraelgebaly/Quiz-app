import CookieServices from '../../../utils/Cookies';


function ResultsSkeleton() {
  return (
<>
<li  className="table-row">
                <div className="col col-1" data-label="Title"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></div>
                <div className="col col-2" data-label="Number of Questions"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></div>
                <div className="col col-3" data-label="Difficulty"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></div>
                <div className="col col-4" data-label="Type"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></div>
                <div className="col col-5" data-label="Closed At"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></div>
                {CookieServices.get('userInfo').userInfo === "Student" ? null :
                 <div className="col col-6" data-label="Details"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></div>
                 } 
              </li>
</>  )
}

export default ResultsSkeleton