import React from "react";
import Image from "next/image";
const buttonClass = `w-fit h-fit bg-[#245953] text-white px-3 py-1
border-2 border-black rounded-2xl shadow-black shadow-[3px_3px]
hover:cursor-pointer hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none duration-100`;

const CoverImage = ({
  image,
  setImage,
}: {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  return (
    <>
      <div className="flex">
        <label className={buttonClass + " mr-3"}>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
          />
          Add Cover
        </label>
        {image && (
          <Image
            alt=""
            src={URL.createObjectURL(image)}
            width={200}
            height={200}
            className="object-cover h-full rounded-[10px]"
          />
        )}
      </div>
    </>
  );
};

export default CoverImage;
