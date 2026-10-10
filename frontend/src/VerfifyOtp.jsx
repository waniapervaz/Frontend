
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function VerifyOTP() {

  const [otp, setOtp] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get email saved from ForgotPassword page
    const email = localStorage.getItem("email");

    if (!email) {
      setMessage("Email not found. Please try again.");
      setShowPopup(true);
      return;
    }

    axios.post(`http://localhost:3000/user/verify-otp/${encodeURIComponent(email)}`, {
      otp: otp
    })
      .then((response) => {

        console.log(response);
localStorage.setItem("allowChangePassword", "true");
        setMessage("OTP verified successfully!");
        setShowPopup(true);

        setOtp("");

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

        <div className="flex min-h-screen items-center justify-center p-4 bg-[#32a89d]">

          <Card className="w-full max-w-sm">

            <CardHeader>

              <CardTitle>Verify OTP</CardTitle>

              <CardDescription>
                Enter the OTP sent to your email
              </CardDescription>

            </CardHeader>

            <CardContent>

              <div className="flex flex-col gap-6">

                <div className="grid gap-2">

                  <Label htmlFor="otp">
                    OTP
                  </Label>

                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6 digit OTP"
                    maxLength="8"
                    required
                  />

                </div>

              </div>

            </CardContent>

            <CardFooter className="flex-col gap-2">

              <Button
                type="submit"
                className="w-full"
              >
                Verify OTP
              </Button>

            </CardFooter>

          </Card>

        </div>

      </form>


      {/* Popup */}

      <Dialog
        open={showPopup}
        onOpenChange={setShowPopup}
      >

        <DialogContent className="sm:max-w-md">

          <DialogHeader>

            <DialogTitle>
              Verify OTP
            </DialogTitle>

            <DialogDescription>
              {message}
            </DialogDescription>

          </DialogHeader>

          <Button
            onClick={() => {

              setShowPopup(false);

              if (message === "OTP verified successfully!") {
                navigate("/changepassword");
              }

            }}
            className="w-full"
          >
            OK
          </Button>

        </DialogContent>

      </Dialog>

    </>
  );
}

export default VerifyOTP;
