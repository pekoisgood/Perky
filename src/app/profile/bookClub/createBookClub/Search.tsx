import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type User = {
  name: string;
  userId: string;
  email: string;
};

type CreateBookClub = {
  title: string;
  date: string;
  hour: string;
  minute: string;
  guest: string[];
};

type Props = {
  bookClub: CreateBookClub;
  setBookClub: React.Dispatch<React.SetStateAction<CreateBookClub>>;
  setShowInvationError: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search = ({ bookClub, setBookClub, setShowInvationError }: Props) => {
  const [isSearching, setIsSearching] = useState<boolean | null>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const handleAddGuest = (id: string) => {
    setIsSearching(false);
    setSearchName("");
    if (bookClub.guest.find((userId: string) => userId === id)) {
      setShowInvationError(true);
      return;
    }
    setBookClub((prev) => {
      return { ...prev, guest: [...prev.guest, id] };
    });
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
          userId: doc.id,
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
        placeholder="User Name..."
        className="w-full outline-none px-3 py-2 border-dashed border-2 border-[#245953] rounded-2xl focus:border-solid"
        onClick={() => {
          setIsSearching(true);
          setShowInvationError(false);
        }}
        // onBlur={() => setIsSearching(false)}
        onChange={(e) => setSearchName(e.target.value)}
      />
      {isSearching === true && searchName !== "" && (
        <div className="flex flex-col gap-2 absolute top-[44px] left-0 w-full h-fit bg-slate-100/90 rounded-lg p-4 max-h-[200px] overflow-scroll">
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchName.toLowerCase())
            )
            .map((user) => {
              return (
                <p
                  key={user.userId}
                  onClick={() => handleAddGuest(user.name + `(${user.email})`)}
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
