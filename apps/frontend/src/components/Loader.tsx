import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircle className="animate-spin w-10 h-10 text-green-400" />
    </div>
  );
}
