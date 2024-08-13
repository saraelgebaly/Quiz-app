
const StudentCartSkeleton = () => {
    return <>
  
      <div className=' border-2 flex items-center mt-4 rounded-lg'>
  
        <img className='w-[90px] h-[70px] animate-pulse bg-gray-500 rounded-md' />
  
        <div className='p-2 w-full flex justify-between items-center '>
          <div>
            <h6 className=' mb-2 rounded-md animate-pulse h-[15px] w-[120px] bg-gray-500'>{""}</h6>
            <div className="text-[#777] animate-pulse">
              <h6 className='h-[12px] w-[160px] bg-gray-500 rounded-md'>{""}</h6>
            </div>
          </div>
          <h6 className='animate-pulse rounded-full mr-1 h-[20px] w-[20px] bg-gray-500 '>{""}</h6>
  
        </div>
  
      </div>
    </>
  }
  
  export default StudentCartSkeleton