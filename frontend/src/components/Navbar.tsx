import { Button } from "./ui/button";

export default function Navbar({ className }: { className: string }) {
  //  TODO: : check whether the user is signed in or not and reroute them
  //  TODO: : create a signin page and link the signin button to that
  //  TODO  : create a signup page and link the signup button to that

  return (
    <div className={` flex justify-between + ${className}`}>
      <div className="flex ml-8 gap-4 items-center">
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chat-message.png"
          alt="chat-message"
        />
        <h2 className="text-white text-2xl">ChatU</h2>
      </div>

      <div className="mr-8 gap-4 flex">
        <Button className="cursor-pointer hover:border-blue-300 hover:border-2  text-md rounded-xl">
          SignIn
        </Button>
        <Button className="border-gray-400 cursor-pointer border-1 hover:border-2 hover:border-blue-300 text-md rounded-xl">
          SignUp
        </Button>
      </div>
    </div>
  );
}
