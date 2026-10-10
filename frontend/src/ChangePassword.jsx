import React, { useState ,useEffect} from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
 import { Button } from "@/components/ui/button"; 
 import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
   import { Label } from "@/components/ui/label"; 
   import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
function ChangePassword() {
      const navigate = useNavigate(); 
    useEffect(() => {

    const email = localStorage.getItem("email");

    const allowChangePassword =
      localStorage.getItem("allowChangePassword");

    if (!email || allowChangePassword !== "true") {
      navigate("/forgotpassword");
    }

  }, [navigate]);

  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [showPopup, setShowPopup] = useState(false); 
  const [message, setMessage] = useState("");
const handleSubmit = (e) => {
     e.preventDefault();
      if (password !== confirmPassword)
         { setMessage("Passwords do not match!"); setShowPopup(true); return; } 


    const email = localStorage.getItem("email");

  axios.post(
    `http://localhost:3000/user/change-password/${encodeURIComponent(email)}`,
    {
      newPassword: password,
      confirmPassword: confirmPassword
    }
  )
    .then((response) => {

      console.log(response);

      setMessage("Password changed successfully!");
      setShowPopup(true);

      setPassword("");
      setConfirmPassword("");

    })
    .catch((error) => {

      console.log("ERROR:", error);
      console.log("Response:", error.response);

      setMessage(
        error.response?.data?.message ||
        "Something went wrong!"
      );

      setShowPopup(true);
    });
};
  return (
    <>
    <form onSubmit={handleSubmit}>
         <div className="flex min-h-screen items-center justify-center p-4 bg-[#32a89d]">
             <Card className="w-full max-w-sm"> 
                <CardHeader> 
                    <CardTitle> Change Password </CardTitle>
                     <CardDescription> Enter your new password below </CardDescription> 
                     </CardHeader>
                      <CardContent> <div className="flex flex-col gap-6"> {/* New Password */} <div className="grid gap-2"> <Label htmlFor="password"> New Password </Label> <Input id="password" type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required /> </div> {/* Confirm Password */} <div className="grid gap-2"> <Label htmlFor="confirmPassword"> Confirm Password </Label> <Input id="confirmPassword" type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value) } required /> </div> </div> </CardContent>
                       <CardFooter> 
                        <Button type="submit" className="w-full" > Change Password </Button> 
                        </CardFooter> </Card> </div> </form>
                         {/* Popup */} 
                         <Dialog open={showPopup} onOpenChange={setShowPopup} > <DialogContent className="sm:max-w-md"> <DialogHeader> <DialogTitle> Change Password </DialogTitle> 
                         <DialogDescription> {message} </DialogDescription> 
                         </DialogHeader>
                          <Button onClick={() => { setShowPopup(false); if (message === "Password changed successfully!") { navigate("/login"); } }} className="w-full" > OK </Button> </DialogContent> </Dialog>
    </>
  )
}

export default ChangePassword
