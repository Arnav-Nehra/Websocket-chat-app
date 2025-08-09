import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { useRef, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
interface JWT extends JwtPayload {
  name: string;
}

async function getFriends(
  searchRef: React.RefObject<HTMLInputElement | null>,
  token: string,
) {
  if (searchRef.current?.value) {
    const user = searchRef.current?.value;
    const response = await axios.post(
      "http://localhost:3000/search",
      {},
      {
        params: { username: user },
        headers: { authorization: token },
      },
    );
    return response.data;
  } else {
    return [];
  }
}

interface User {
  email: string;
  name: string;
}

export default function ChatBody() {
  const token = localStorage.getItem("token") || "";
  const decoded: JWT = jwtDecode(token);
  const name = decoded.name;
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const debouncedgetFriends = useDebounce(getFriends, 500);
  async function HandleSearch() {
    const query = searchRef;
    const results = await debouncedgetFriends(query, token);
    setSearchResults(results);
  }

  return (
    <div className=" border-white gap-4 grid grid-cols-2 text-white">
      <div className="border-2 white ml-2 mt-4">
        <div className="text-2xl">{name}</div>
        <div className="mt-4 ">
          <Label htmlFor="search friends" className="text-xl">
            Search Friends
          </Label>
          <Input
            type="text"
            placeholder="search friends"
            ref={searchRef}
            className="mt-2"
            onInput={HandleSearch}
          ></Input>
          <div className="mt-4 space-y-2">
            {searchResults.map((user) => (
              <div
                key={user.name}
                className="p-2 bg-slate-700 text-2xl text-white rounded"
              >
                {user.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
