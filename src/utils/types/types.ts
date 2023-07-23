import { SetStateAction } from "react";
import Error from "next/error";

import { Timestamp } from "firebase/firestore";

type ArticleComment = {
  comment: string;
  createdAt: Timestamp;
  userName: string;
  userId: string;
  userAvatar: string;
};

type User = {
  email: string;
  id: string;
  name: string;
  avatar: string;
};

type LoginUserInput = {
  email: string;
  password: string;
};

interface CustomError extends Error {
  code: string;
}

type Message = {
  user: string;
  text: string;
  room: string;
  createdAt: Timestamp;
  id: string;
  userId: string;
  avatar: string;
};

type BookClubIdAndName = {
  name: string;
  roomId: string;
};

type BookClubInfo = {
  id: string;
  roomId: string;
  name: string;
  time: Timestamp;
  createdAt: Timestamp;
};

type Note = {
  id: string;
  note: string;
};

type CreateBookClub = {
  title: string;
  date: string;
  hour: string;
  minute: string;
  guest: Guest[];
};

type Guest = {
  name: string;
  id: string;
  avatar?: string;
};

type SavedArticle = {
  title: string;
  id: string;
  authorName: string;
  content: string;
  image: string;
  category: string;
};

type SearchOutput = {
  id: string;
  name: string;
};

type Tag = {
  id: string;
  name: string;
};

type PresenterId = null | string;

type Participant = {
  displayName: string;
  id: string;
  micOn: boolean;
  local: boolean;
  mode: string;
  quality: string;
  webcamOn: boolean;
};

type Auth = {
  isLogin: boolean | null;
  logIn: () => void;
  logOut: () => void;
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
  setIsLogin: React.Dispatch<SetStateAction<boolean | null>>;
};

type postArticle = {
  title: string;
  content: string;
  category: string;
  tags: string[];
};

type Article = {
  id: string;
  authorName: string;
  category: string;
  authorUserId: string;
  content: string;
  createdAt: Timestamp;
  tags: string[];
  title: string;
  image: string;
  starCounts?: number;
};

type AuthRedux = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  isLogin: boolean | null;
};

export type {
  ArticleComment,
  User,
  LoginUserInput,
  CustomError,
  Message,
  BookClubIdAndName,
  BookClubInfo,
  Note,
  CreateBookClub,
  Guest,
  SavedArticle,
  Tag,
  SearchOutput,
  PresenterId,
  Participant,
  Auth,
  postArticle,
  Article,
  AuthRedux,
};
