import React, { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
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
function Signup() {
      const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
const [message, setMessage] = useState("");

   const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/user/register", {
      username:username,
      email: email,
      password: password
    })
    .then((response) => {
      console.log(response);
      // alert("User Registered Successfully!");
      localStorage.setItem("username", response.data.username);

  setMessage("Signup Successfully! Check you mail for verification befor Login");
  setShowPopup(true);

      // Clear inputs
      setEmail('');
      setPassword('');
    })
    .catch((error) => {
      console.log("ERROR:", error);
      console.log("Response:", error.response);
      console.log("Message:", error.message);

      // alert(error.response?.data?.message || error.message);
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
        <CardTitle>Register to your account</CardTitle>
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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                 value={username}
                  onChange={(e) => setUsername(e.target.value)}
                placeholder="mehak@786"
                required
              />
            </div>
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
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <Input id="password"  value={password}
                  onChange={(e) => setPassword(e.target.value)} type="password" required />
            </div>
          </div>
       
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Signup
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
          <Button onClick={() => setShowPopup(false)} className="w-full" > OK </Button> 
          </DialogContent> 
          </Dialog>
  </>
  )
}

export default Signup
