import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import Loader from "../Loader";
export default function SignUp() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="place-items-center mt-40 justify-center">
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="mt-2"
                  />
                </div>
                <div className="grid gap-2 mt-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    className="mt-2"
                    id="password"
                    type="password"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              disabled={loading}
              className="bg-gray-800 hover:bg-gray-700 w-full "
              type="submit"
              onClick={() => {
                //   TODO  : add signup logic here
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
              }}
            >
              Create Account
              {loading ? <Loader /> : ""}
            </Button>
            <h2 className="text-white text-md mt-4">
              Already have an account ?&nbsp;
              <Link
                to={"/signin"}
                className="text-white  cursor-pointer underline-offset-4 hover:underline"
              >
                SignIn
              </Link>
            </h2>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
