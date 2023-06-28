import Video from "./Video";
import Side from "./Side";

const Page = () => {
  return (
    <div className="flex flex-col border-rose-500 border-[1px] h-[1px] min-h-[calc(100vh-50px)] pt-[10px]">
      <h1 className="w-fit mx-auto text-[20px] mb-[10px]">讀書會</h1>
      <div className="flex w-full grow bg-slate-200">
        <div className="w-[70%]">
          <Video />
        </div>
        <div className="w-[30%] border-2 border-yellow-600">
          <Side />
        </div>
      </div>
    </div>
  );
};

export default Page;
