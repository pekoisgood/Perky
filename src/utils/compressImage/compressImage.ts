import { storage } from "@/utils/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const compressImage = async (file: File, { quality = 1, type = file.type }) => {
  const imageBitmap = await createImageBitmap(file);

  const canvas = document.createElement("canvas");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(imageBitmap, 0, 0);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, type, quality)
  );

  if (!blob) return;
  return new File([blob], file.name, {
    type: blob.type,
  });
};

const getDownloadURLFromFireStore = async (image: File, id: string) => {
  const file = image;
  const dataTransfer = new DataTransfer();

  if (!file.type.startsWith("image")) {
    return;
  }

  const compressedFile: File | undefined = await compressImage(file, {
    quality: 0.3,
    type: "image/jpeg",
  });
  if (!compressedFile) return;
  dataTransfer.items.add(compressedFile);

  const compressedImage = dataTransfer.files[0];

  const storageRef = ref(storage, `${id}-${compressedImage.name}`);
  await uploadBytes(storageRef, compressedImage);
  const pathReference = ref(storage, `${id}-${compressedImage.name}`);

  const imageUrl = await getDownloadURL(pathReference).then(
    (downloadURL: string) => {
      return downloadURL;
    }
  );
  return imageUrl;
};

export { getDownloadURLFromFireStore };
