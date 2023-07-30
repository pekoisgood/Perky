const skeletonAnimation =
  "bg-gradient-to-r from-[#eee] via-[#d6d6d6] to-[#eee] bg-[length:400%_400%] animate-skeleton";

const textClass = `w-full rounded-lg shadow-[-2px_2px] shadow-[#0000003b] ${skeletonAnimation}`;

const TrendingArticleSkeleton = () => {
  return (
    <>
      <div className="relative flex flex-col sm:flex-row flex-wrap md:justify-between h-[92%] gap-[10px] max-w-[1280px] w-full mx-auto sm:[&>*:nth-child(2)]:border-none z-100 px-[20px]">
        <div className="flex flex-col sm:flex-row gap-[20px] w-full h-[70%] mt-auto border-b-[1px] border-[#d1d5db] pb-[30px]">
          <div
            className={`w-full sm:min-w-[60%] h-[250px] sm:h-full rounded-xl shadow-[-10px_10px] shadow-[#0000003b] mt-[10px] lg:mt-0 ${skeletonAnimation}`}
          />
          <div className="flex flex-col gap-[10px] w-full">
            <p
              className={`w-[80px] rounded-full h-[30px] shadow-[-3px_3px] shadow-[#0000003b] ${skeletonAnimation}`}
            />
            <p
              className={`w-full rounded-xl h-[40px] shadow-[-2px_2px] shadow-[#0000003b] ${skeletonAnimation}`}
            />
            <p
              className={`w-full rounded-xl h-[40px] shadow-[-2px_2px] shadow-[#0000003b] ${skeletonAnimation}`}
            />
            <p
              className={`w-full rounded-xl h-[40px] shadow-[-2px_2px] shadow-[#0000003b] ${skeletonAnimation}`}
            />
            <p
              className={`w-[40px] rounded-lg h-[20px] shadow-[-2px_2px] shadow-[#0000003b] ${skeletonAnimation}`}
            />
            <p className={`rounded-md ${textClass} w-full mt-auto h-[17px]`} />
            <p className={`rounded-md ${textClass} w-full h-[17px]`} />
          </div>
        </div>
        {new Array(4).fill("").map((_, index) => {
          return (
            <div
              key={index}
              className="flex  gap-[10px] w-full sm:w-[23%] h-[23%] md:h-[18%] border-b-[1px] sm:border-b-0 sm:border-l-[1px] border-[#d1d5db] sm:pl-[14px]"
            >
              <div className="flex basis-full lg:basis-1/2 sm:flex-col gap-3">
                <p
                  className={`w-[80px] rounded-full h-[30px] shadow-[-3px_3px] shadow-[#0000003b] ${skeletonAnimation}`}
                />
                <div className="flex w-full items-start flex-col pb-[10px] sm:pb-0 gap-[10px] h-full">
                  <p className={`${textClass} h-[20px]`} />
                  <p className={`${textClass} h-[20px]`} />
                  <p className={`${textClass} hidden sm:block h-[20px]`} />
                  <p className={`${textClass} hidden sm:block h-[20px]`} />
                </div>
              </div>
              <div
                className={`h-full basis-1/2 rounded-xl ml-auto hidden lg:block shadow-[#0000003b] shadow-[-3px_3px] ${skeletonAnimation}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TrendingArticleSkeleton;
