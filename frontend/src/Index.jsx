
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {Navigate,useNavigate} from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Index() {
  const username = localStorage.getItem("username");
  const [showPopup, setShowPopup] = useState(false);
const [message, setMessage] = useState("");
    // Agar user login nahi hai
    const navigate=useNavigate();
    if (!username) {
      return <Navigate to="/login" replace />;
    }
    const handleLogout = () => {
      localStorage.removeItem("username");
      setMessage("SLogout Susscfully");
  setShowPopup(true);
      window.location.href = "/login";}
  return (
  <>
      <div>
        <h1>Welcome, {username}!</h1>
      </div>

<Button onClick={handleLogout}>
Logout
</Button>
<Dialog open={showPopup} onOpenChange={setShowPopup}>
       <DialogContent className="sm:max-w-md">
         <DialogHeader> <DialogTitle> Logout </DialogTitle> 
         <DialogDescription> {message} </DialogDescription> 
         </DialogHeader>
          <Button onClick={() => {setShowPopup(false); navigate("/login")}} className="w-full" > OK </Button> 
          </DialogContent> 
          </Dialog>
</>
    );
 
}


export default Index;
