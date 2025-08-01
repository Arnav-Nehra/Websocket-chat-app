import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <div className=" w-full flex justify-center absolute bottom-0 py-4">
      <h2 className="flex text-center text-white text-lg gap-1">
        Made with&nbsp;
        <Heart className="text-red-400" /> &nbsp;by Arnav Nehra
      </h2>
    </div>
  );
}
