import React, { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { useNavigate, Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
function Login() {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/user/login", {

      email: email,
      password: password
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem("username", response.data.username);

        setMessage("Login Successfully! ");
        setShowPopup(true);

        // Clear inputs
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.log("ERROR:", error);
        console.log("Response:", error.response);
        console.log("Message:", error.message);

        setMessage(
          error.response?.data?.message || error.message
        );
        setShowPopup(true);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex min-h-screen items-center justify-center p-4  bg-[#32a89d]">

          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              {/* <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction> */}
            </CardHeader>
            <CardContent>

              <div className="flex flex-col gap-6">

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} type="password" required />
                </div>
              </div>

            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
              {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
            </CardFooter>
          </Card>
        </div>
      </form>
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader> <DialogTitle> Signup </DialogTitle>
            <DialogDescription> {message} </DialogDescription>
          </DialogHeader>
        <Button
  onClick={() => {
    setShowPopup(false);

    if (message === "Login Successfully! ") {
      navigate("/");
    }
  }}
  className="w-full"
>
  OK
</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Login
