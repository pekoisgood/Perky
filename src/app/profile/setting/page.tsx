"use client";

import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { PiFinnTheHumanFill } from "react-icons/pi";
import { BsPencilSquare } from "react-icons/bs";
import Save from "@/components/button/Save";
import { compressImage } from "@/utils/compressImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";

const Page = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isModifying, setIsModifying] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState(user.name);

  const inputClass = `outline-none grow px-2 w-[180px] ${
    isModifying
      ? "border-dashed border-2 border-[#245953] rounded-2xl focus:border-solid bg-white"
      : "border-none bg-transparent"
  }`;

  const handleSave = async () => {
    setIsModifying(false);
    const file = image;
    const userRef = doc(db, "users", user.id);

    if (file) {
      // We'll store the files in this data transfer object
      const dataTransfer = new DataTransfer();

      if (!file.type.startsWith("image")) {
        // TODO: not an image
      }

      const compressedFile: any = await compressImage(file, {
        quality: 0.5,
        type: "image/png",
      });
      dataTransfer.items.add(compressedFile);

      // TODO: store the file
      const compressedImage = dataTransfer.files[0];

      const storageRef = ref(storage, `${user.id}-${compressedImage.name}`);
      await uploadBytes(storageRef, compressedImage);
      const pathReference = ref(storage, `${user.id}-${compressedImage.name}`);

      const imageUrl = await getDownloadURL(pathReference).then(
        (downloadURL: string) => {
          return downloadURL;
        }
      );
      try {
        await updateDoc(userRef, {
          avatar: imageUrl,
        });

        setUser((prev: User) => {
          return {
            ...prev,
            avatar: imageUrl,
          };
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (name !== user.name || !name) {
      try {
        await updateDoc(userRef, {
          name: name,
        });

        setUser((prev: User) => {
          return {
            ...prev,
            name: name,
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUploadAvatar = () => {
    if (image) {
      return (
        <Image
          src={URL.createObjectURL(image)}
          alt="uploaded avatar"
          width={120}
          height={120}
          className={`rounded-full overflow-hidden object-cover h-full`}
        />
      );
    }

    if (user.avatar) {
      return (
        <Image
          src={user.avatar}
          alt="user avatar"
          width={120}
          height={120}
          className={`rounded-full overflow-hidden object-cover h-full w-full`}
        />
      );
    }

    return (
      <PiFinnTheHumanFill
        size={120}
        className={`flex items-center justify-center bg-white`}
      />
    );
  };

  return (
    <div className="w-full mt-[20px] overflow-y-scroll pb-[20px]">
      <div className="w-fit mx-auto relative mb-[30px]">
        <h1
          className={`bg-white/60 text-[28px] font-bold tracking-[4px] rounded-full px-5
      `}
        >
          Setting
        </h1>
        <BsPencilSquare
          size={25}
          className="absolute top-[50%] translate-y-[-50%] right-[-35px] cursor-pointer"
          onClick={() => setIsModifying((prev) => !prev)}
        />
      </div>

      <div className="flex flex-col items-center gap-5">
        <div
          className={`relative border-2 border-[#245953] rounded-full w-[120px] h-[120px] overflow-hidden
          ${isModifying ? "border-dashed" : " boder-solid"}
        `}
        >
          {getUploadAvatar()}
          <input
            type="file"
            accept="image/jpeg"
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
            className={`${
              isModifying ? "flex" : "hidden"
            } opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer`}
          />
        </div>
        {isModifying ? (
          <div className="py-1">
            <label>Name: </label>
            <input
              value={name}
              className={inputClass}
              onChange={(e) => {
                isModifying && setName(e.target.value);
              }}
            />
          </div>
        ) : (
          <>
            {/* {user.avatar !== "" ? (
              <Image
                src={user.avatar}
                alt="user avatar"
                width={120}
                height={120}
                className={`border-black border-2 rounded-full overflow-hidden h-[120px] object-cover`}
              />
            ) : (
              <PiFinnTheHumanFill
                size={120}
                className={`flex items-center justify-center bg-white rounded-full border-black border-[1px]`}
              />
            )} */}
            <p>Name: {user.name}</p>
          </>
        )}
        <p className={`${isModifying && "cursor-not-allowed"}`}>
          Email: {user.email}
        </p>
        {isModifying && (
          <div className="flex gap-5">
            <button
              onClick={() => setIsModifying(false)}
              className="text-[12px] px-2 py-1 shadow-md rounded-lg h-[36px]"
            >
              Cancel
            </button>
            <Save handleOnClick={() => handleSave()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
