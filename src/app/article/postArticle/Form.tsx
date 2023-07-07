import React, { useContext, useEffect, useRef, useState } from "react";
import TextEditor from "./textEditor/TextEditor";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  handlePostArticle,
  handleUpdateArticle,
} from "@/redux/slice/postArticleSlice";
import { storage } from "@/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/utils/firebase";
import {
  DocumentData,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Warning from "@/components/warning/Warning";
import { PiWarningFill } from "react-icons/pi";
import Link from "next/link";
import Button from "@/components/button/Button";

const postStatus = {
  PENDING: "Pending",
  SUCCESS: "Success",
  FAIL: "Fail",
};

const buttonClass = `w-fit h-fit bg-[#245953] text-white px-3 py-1
border-2 border-black rounded-2xl shadow-black shadow-[3px_3px]
hover:cursor-pointer hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none duration-100`;

const Form = ({ image }: { image: File | null }) => {
  const {
    user,
    // isLogin
  } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const tagRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const postArticle = useAppSelector((state) => state.postArticle.value);

  const handleTag = (action: string, tag?: string) => {
    if (action === "ADD") {
      if (tagRef.current === null || tagRef.current.value === "") return;
      const tagValue = tagRef.current.value.toLowerCase();
      if (postArticle.tags.includes(tagValue)) return;
      dispatch(
        handleUpdateArticle({
          action: "UPDATE_TAGS",
          value: tagValue,
        })
      );
    } else if (action === "DELETE" && tag) {
      dispatch(handleUpdateArticle({ action: "DELETE_TAG", value: tag }));
    }
  };

  const postArticleErrorMessage = () => {
    const contentMessage = "Content can't be empty.";
    const titleMessage = "Title can't be empty.";
    const imageMessage = "Cover image can't be empty.";
    const tagMessage = "Tag can't be empty.";
    const messages = [];

    if (postArticle.title === "") {
      messages.push(titleMessage);
    }

    if (!image) {
      messages.push(imageMessage);
    }
    if (postArticle.content === "" || postArticle.content === "<p></p>") {
      messages.push(contentMessage);
    }

    if (postArticle.tags.length === 0) {
      messages.push(tagMessage);
    }

    return (
      <ul className="flex flex-col gap-2">
        <PiWarningFill size={35} className="w-fit mx-auto" />
        {messages.map((m, i) => {
          return (
            <li
              key={i}
              className="list-disc text-[12px] sm:text-[16px] lg:text-[20px]"
            >
              {m}
            </li>
          );
        })}
      </ul>
    );
  };

  const compressImage = async (
    file: File,
    { quality = 1, type = file.type }
  ) => {
    const imageBitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(imageBitmap, 0, 0);

    // turn into Blob
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, type, quality)
    );

    if (!blob) return;
    // Turn Blob into File
    return new File([blob], file.name, {
      type: blob.type,
    });
  };

  const handleSubmitArticle = async () => {
    setIsProcessing(postStatus.PENDING);
    if (Object.values(postArticle).includes("") || !image) {
      setIsProcessing(postStatus.FAIL);
      setTimeout(() => {
        setIsProcessing(null);
      }, 3000);
      return;
    }
    if (image && user.id && user.name) {
      const file = image;

      // We'll store the files in this data transfer object
      const dataTransfer = new DataTransfer();

      if (!file.type.startsWith("image")) {
        // TODO: not an image
      }

      const compressedFile: any = await compressImage(file, {
        quality: 0.5,
        type: "image/jpeg",
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

      const articleRef = collection(db, "articles");
      await addDoc(articleRef, {
        createdAt: serverTimestamp(),
        authorName: user.name,
        authorUserId: user.id,
        title: postArticle.title,
        content: postArticle.content,
        category: postArticle.category,
        tags: postArticle.tags,
        image: imageUrl,
        userId: user.id,
        savedCount: 0,
        userName: user.name,
      });

      dispatch(handlePostArticle());
      setIsProcessing(postStatus.SUCCESS);

      for (let i = 0; i < postArticle.tags.length; i++) {
        const tagRef = collection(db, "tags");
        const q = query(tagRef, where("tagName", "==", postArticle.tags[i]));
        const result = await getDocs(q);
        let tag = "";
        result.forEach((doc: DocumentData) => {
          tag = doc.data().tagName;
        });

        if (tag) return;
        await addDoc(collection(db, "tags"), {
          tagName: postArticle.tags[i],
        });
      }
    }
  };

  useEffect(() => {
    if (tagRef.current) {
      tagRef.current.value = "";
    }
  }, [postArticle.tags]);
  return (
    <>
      <input
        required
        placeholder="Title..."
        className="outline-none w-full px-3 py-2 text-[25px] border-dashed border-2 border-[#245953] rounded-2xl focus:border-solid"
        value={postArticle.title}
        onChange={(e) =>
          dispatch(
            handleUpdateArticle({
              action: "UPDATE_INPUTS",
              key: "title",
              value: e.target.value,
            })
          )
        }
      />
      <div className="grow flex flex-col w-full ">
        <TextEditor />
      </div>

      <div className="flex items-center gap-2 p-2">
        <label htmlFor="category" className="font-medium">
          Category
        </label>
        <select
          required
          id="category"
          name="category"
          onChange={(e) => {
            dispatch(
              handleUpdateArticle({
                action: "UPDATE_INPUTS",
                key: "category",
                value: e.target.value,
              })
            );
          }}
          className={`border-2 border-black rounded-2xl shadow-black shadow-[3px_3px] bg-[#245953] outline-none
      hover:cursor-pointer hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none px-2 py-1 text-white`}
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="IOS">IOS</option>
          <option value="Android">Android</option>
          <option value="Others">Others</option>
        </select>
      </div>
      {postArticle.tags.length > 0 && (
        <div className="flex flex-wrap w-80% gap-1">
          {postArticle.tags.map((tag, index) => (
            <p
              key={index}
              className="w-fit px-2 py-1 bg-orange-300 border-2 border-black rounded-full "
            >
              {tag}
              <span
                className="ml-3 hover:cursor-pointer"
                onClick={() => handleTag("DELETE", tag)}
              >
                x
              </span>
            </p>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          type="text"
          ref={tagRef}
          placeholder="Add tag..."
          className="px-2 py-1 outline-none border-dashed border-2 border-[#245953] rounded-2xl focus:border-solid"
        />
        <button className={buttonClass} onClick={() => handleTag("ADD")}>
          Add Tag
        </button>
      </div>
      <button
        className={
          `bg-orange-300 text-black ml-auto mt-[20px] ${
            isProcessing && "hover:cursor-wait"
          }` + buttonClass
        }
        onClick={handleSubmitArticle}
      >
        {isProcessing === postStatus.PENDING ? "running..." : "送出"}
      </button>
      {isProcessing === postStatus.FAIL && (
        <Warning>{postArticleErrorMessage()}</Warning>
      )}
      {isProcessing === postStatus.SUCCESS && (
        <Warning time={0}>
          <div className="flex flex-col gap-3 items-center justify-center">
            <p>發文成功！</p>
            <Button customLayout="shadow-[3px_3px] px-2">
              <Link href="/" className="text-black">
                回首頁
              </Link>
            </Button>
          </div>
        </Warning>
      )}
    </>
  );
};

export default Form;