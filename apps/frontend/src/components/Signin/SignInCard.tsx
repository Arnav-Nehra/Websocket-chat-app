import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import Loader from "../Loader";
import { useRef, useState } from "react";
import { Label } from "../ui/label";
import axios from "axios";
export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col place-items-center mt-40 justify-center">
      <Card className="w-full max-w-sm mt-4 bg-black">
        <div className="flex gap-4 items-center justify-center">
          <img
            className=""
            width={50}
            height={50}
            src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chat-message.png"
          />
          <h2 className="text-2xl text-white">ChatU</h2>
        </div>{" "}
        <CardHeader className="text-white"></CardHeader>
        <CardContent className="text-white">
          <form>
            <div className="flex flex-col gap-8">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  ref={emailRef}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="mt-2"
                />
              </div>
              <div className="grid gap-2 mt-2">
                <div className="flex items-center">
                  <Label>Password</Label>
                </div>
                <Input
                  ref={passwordRef}
                  className="mt-2"
                  id="password"
                  type="password"
                  required
                />
                <a
                  href="#"
                  className="mt-2 text-left inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);
                const response = await axios.post(
                  "http://localhost:3000/signin",
                  {
                    username: emailRef.current?.value || "",
                    password: passwordRef.current?.value || "",
                  },
                );
                localStorage.setItem("token", response.data);
                setLoading(false);
              } catch (err) {
                setLoading(false);
                console.log(err);
              }
            }}
            className="gap-4 bg-gray-800 hover:bg-gray-700 w-full "
            type="submit"
          >
            Login
            {loading ? <Loader /> : ""}
          </Button>
          <h2 className="text-white text-md mt-4">
            Don't have an account ?&nbsp;
            <Link
              to={"/signup"}
              className="text-white  cursor-pointer underline-offset-4 hover:underline"
            >
              SignUp
            </Link>
          </h2>
        </CardFooter>
      </Card>
    </div>
  );
}
