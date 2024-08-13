import CookieServices from "../../../utils/Cookies"

const QuizzesCardSkeleton = () => {
  return <>

    <div className='flex items-center mt-4 border-2 rounded-lg '>

      <img className='w-[165px] h-[120px] hidden sm:block animate-pulse bg-gray-500 rounded-md' />

      {CookieServices.get("userInfo").role === "Instructor" ? <>  <div className='w-full p-3 '>
        <h3 className=' mb-2 rounded-md animate-pulse h-[15px] w-[120px] bg-gray-500'>{""}</h3>
        <div className="text-[#777] animate-pulse">
          <h6 className='h-[12px] w-[160px] bg-gray-500 rounded-md'>{""}</h6>
        </div>
        <div className='flex items-center justify-between mt-6'>
          <span className='h-[12px] w-[160px] bg-gray-500 rounded-md animate-pulse'>{''}</span>
          <h6 className='animate-pulse rounded-md mr-1 h-[10px] w-[40px] bg-gray-500 '>{""}</h6>
        </div>
      </div></> :
        <div className='flex items-center justify-between w-full p-3'>
          <div>
            <h3 className=' mb-2 rounded-md animate-pulse h-[15px] w-[120px] bg-gray-500'>{""}</h3>
            <div className="text-[#777] animate-pulse">
              <h6 className='h-[12px] w-[160px] bg-gray-500 rounded-md '>{""}</h6>
            </div>
            <span className='h-[12px] w-[160px] bg-gray-500 rounded-md animate-pulse'>{''}</span>
          </div>
          <h6 className='animate-pulse  mr-1 h-[40px] w-[80px] bg-gray-500 me-5 rounded-full '>{""}</h6>
        </div>}

    </div>
  </>
}

export default QuizzesCardSkeleton