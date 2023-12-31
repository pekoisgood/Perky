import React, { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";

import { User, CreateBookClub } from "@/utils/types/types";
import { db } from "@/utils/firebase/firebase";

type Props = {
  bookClub: CreateBookClub;
  setBookClub: React.Dispatch<React.SetStateAction<CreateBookClub>>;
  setShowInvationError: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search = ({ bookClub, setBookClub, setShowInvationError }: Props) => {
  const [isSearching, setIsSearching] = useState<boolean | null>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const handleAddGuest = (id: string, name: string, email: string) => {
    setIsSearching(false);
    setSearchName("");
    if (bookClub.guest.find((guest) => guest.id === id)) {
      setShowInvationError(true);
      return;
    }
    setBookClub((prev) => {
      return { ...prev, guest: [...prev.guest, { name, id, email }] };
    });
    return;
  };

  useEffect(() => {
    const getUser = async () => {
      const ref = collection(db, "users");
      const result = await getDocs(ref);
      const allUsers: User[] = [];
      result.forEach((doc) => {
        allUsers.push({
          name: doc.data().name,
          email: doc.data().email,
          id: doc.id,
          avatar: doc.data().avatar ?? "",
        });
        setUsers(allUsers);
      });
    };

    getUser();
  }, []);

  return (
    <div className="relative">
      <input
        type="text"
        value={searchName}
        placeholder="User Name..."
        className="w-full outline-none px-3 py-2 border-dashed border-2 border-[#245953] rounded-2xl focus:border-solid"
        onClick={() => {
          setIsSearching(true);
          setShowInvationError(false);
        }}
        onChange={(e) => setSearchName(e.target.value)}
      />
      {isSearching && searchName !== "" && (
        <div className="flex flex-col gap-2 absolute top-[44px] left-0 w-full h-fit bg-slate-100/90 rounded-lg p-4 max-h-[200px] overflow-scroll">
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchName.toLowerCase())
            )
            .map((user) => {
              return (
                <p
                  key={user.id}
                  onClick={() => handleAddGuest(user.id, user.name, user.email)}
                  className=" text-slate-800 hover:cursor-pointer"
                >
                  {user.name}
                </p>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Search;
