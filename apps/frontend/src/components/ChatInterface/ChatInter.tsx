import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { useRef } from "react";
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
    console.log(response);
  }
}
export default function ChatBody() {
  const debouncedgetFriends = useDebounce(getFriends, 500);
  const token = localStorage.getItem("token") || "";
  const decoded: JWT = jwtDecode(token);
  const name = decoded.name;
  const searchRef = useRef<HTMLInputElement>(null);
  return (
    <div className=" border-white gap-4 grid grid-cols-2 text-white">
      <div className="border-2 white ml-2 mt-2">
        <div className="">{name}</div>
        <div className="mt-2">
          <Label htmlFor="search friends">Search Friends</Label>
          <Input
            type="text"
            placeholder="search friends"
            ref={searchRef}
            className="mt-2"
            onChange={async () => {
              debouncedgetFriends(searchRef, token);
            }}
          />
        </div>
      </div>
      <div className="mr-2 border-2 border-white">hello 2</div>
    </div>
  );
}
