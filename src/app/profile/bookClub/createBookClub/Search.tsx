import React, { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";

import { User, CreateBookClub } from "@/utils/types/types";
import { db } from "@/utils/firebase/firebase";

type Props = {
  bookClub: CreateBookClub;
  setBookClub: React.Dispatch<React.SetStateAction<CreateBookClub>>;
  setShowInvitationError: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search = ({ bookClub, setBookClub, setShowInvitationError }: Props) => {
  const [isSearching, setIsSearching] = useState<boolean | null>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const handleAddGuest = (id: string, name: string, email: string) => {
    setIsSearching(false);
    setSearchName("");
    if (bookClub.guest.find((guest) => guest.id === id)) {
      setShowInvitationError(true);
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
        className="w-full rounded-2xl border-2 border-dashed border-[#245953] px-3 py-2 outline-none focus:border-solid"
        onClick={() => {
          setIsSearching(true);
          setShowInvitationError(false);
        }}
        onChange={(e) => setSearchName(e.target.value)}
      />
      {isSearching && searchName !== "" && (
        <div className="absolute left-0 top-[44px] flex h-fit max-h-[200px] w-full flex-col gap-2 overflow-scroll rounded-lg bg-slate-100/90 p-4">
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchName.toLowerCase()),
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
