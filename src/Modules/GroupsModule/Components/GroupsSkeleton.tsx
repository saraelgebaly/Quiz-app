
function GroupsSkeleton() {
  return (
    <>
    
        <div className="inline-flex items-center justify-between p-5 gap-3 rounded-md w-full md:w-[48%] mb-6 md:mb-0">
          {" "}
          <div className="flex justify-between p-5 gap-5 ">
            <div className="flex flex-col ">
              <h3 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md"></h3>
              <p className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md"></p>
            </div>
            <div className="flex space-x-3">
              <span className="animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500"></span>
              <span className="animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500"></span>
            </div>
          </div>
        </div>
    </>
  );
}

export default GroupsSkeleton;
