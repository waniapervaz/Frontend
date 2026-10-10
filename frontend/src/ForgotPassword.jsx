
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
function ForgotPassword() {
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
          setLoading(true);
        axios.post("http://localhost:3000/user/forgot-password", {

            email: email
        })
            .then((response) => {
                console.log(response);
  localStorage.setItem("email", email);
                setMessage("OTP send Successfully! ");
                setShowPopup(true);

                // Clear inputs
                setEmail('');

            })
            .catch((error) => {
                console.log("ERROR:", error);
                console.log("Response:", error.response);
                console.log("Message:", error.message);

                setMessage(
                    error.response?.data?.message || error.message
                );
                setShowPopup(true);
            })
            .finally(() => {
                setLoading(false);
            });
        ;
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex min-h-screen items-center justify-center p-4  bg-[#32a89d]">

                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>Fogot Password</CardTitle>
                            <CardDescription>
                                Enter your email below to send otp
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
                            </div>

                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? "Sending OTP..." : "Send OTP"}
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
                    <DialogHeader> <DialogTitle> Forgot -password </DialogTitle>
                        <DialogDescription> {message} </DialogDescription>
                    </DialogHeader>
                    <Button onClick={() => { setShowPopup(false); if (message === "OTP send Successfully! ") { navigate("/verifyotp"); } }} > OK </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ForgotPassword
