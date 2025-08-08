import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";

interface JWT extends JwtPayload {
  name: string;
}
export default function ChatNav() {
  //  TODO  :  1. user avatar
  //  2 . user name
  //
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JWT = jwtDecode(token);

      const username = decoded.name;
      setUser(username);
    }
  }, []);

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center ml-6 gap-4">
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chat-message.png"
          alt="chat-message"
        />

        <div className="text-white text-3xl">ChatU</div>
      </div>

      <div className="flex mr-16 bg-black">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                className="w-12 p-1 rounded-full"
                src="https://github.com/shadcn.png"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Welcome {user}</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
