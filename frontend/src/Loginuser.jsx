// import React, { useState } from 'react'
// import Axios from 'axios'
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// function Loginuser() {
//       const [email, setEmail] = useState('');
//       const [password, setPassword] = useState('');
//        const handleSubmit = (e) => {
//     e.preventDefault();
//     setloading(true)

//     Axios.post("http://localhost:3000/user/login", {
   
//       email: email,
//       password: password
//     })
//     .then((response) => {
//       console.log(response);
//       alert("User Login Successfully!");

//       // Clear inputs
    
//       setEmail('');
//       setPassword('');
//     })
//     .catch((error) => {
//       console.log("ERROR:", error);
//       console.log("Response:", error.response);
//       console.log("Message:", error.message);

//       alert(error.response?.data?.message || error.message);
//     }).finally(() => {
//       setloading(false) // Request complete
//     });
    
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-[#889852]">
//      <Card className="w-full max-w-sm">
//          <CardHeader>
//            <CardTitle>Login to your account</CardTitle>
//            <CardDescription>
//              Enter your email below to login to your account
//            </CardDescription>
//            {/* <CardAction>
//              <Button variant="link">Sign Up</Button>
//            </CardAction> */}
//          </CardHeader>
//          <CardContent>
          
//              <div className="flex flex-col gap-6">
               
//                <div className="grid gap-2">
//                  <Label htmlFor="email">Email</Label>
//                  <Input
//                    id="email"
//                    type="email"
//                      value={email}
//                      onChange={(e) => setEmail(e.target.value)}
//                    placeholder="m@example.com"
//                    required
//                  />
//                </div>
//                <div className="grid gap-2">
//                  <div className="flex items-center">
//                    <Label htmlFor="password">Password</Label>
//                    {/* <a
//                      href="#"
//                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                    >
//                      Forgot your password?
//                    </a> */}
//                  </div>
//                  <Input id="password"   value={password}
//                      onChange={(e) => setPassword(e.target.value)} type="password" required />
//                </div>
//              </div>
          
//          </CardContent>
//          <CardFooter className="flex-col gap-2">
//           <Button type="submit" disabled={loading} className="w-full">
//                  {loading ? "Registering..." : "Signup"}
//                </Button>
//            {/* <Button variant="outline" className="w-full">
//              Login with Google
//            </Button> */}
//          </CardFooter>
//        </Card></div>
//        </form>
//   )
// }

// export default Loginuser
