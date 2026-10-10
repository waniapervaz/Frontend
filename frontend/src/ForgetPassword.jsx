import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api/axios'; // Updated path
import { styles } from './style'; // Added styles import
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter OTP & New Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Step 1: Send OTP to email
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/forgot-password', { email });
            if (res.data.success) {
                toast.success('OTP sent to your email');
                setStep(2);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP and Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/verify-otp-reset', { email, otp, newPassword });
            if (res.data.success) {
                toast.success('Password reset successfully!');
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Password reset failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>{step === 1 ? 'Forgot Password' : 'Reset Password'}</h2>
                
                {step === 1 ? (
                    <form onSubmit={handleSendOtp} style={styles.form}>
                        <input type="email" placeholder="Enter your registered email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input}/>
                        <button type="submit" style={styles.button} disabled={loading}>
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} style={styles.form}>
                        <input type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required style={styles.input}/>
                        <input type="password" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required style={styles.input}/>
                        <button type="submit" style={styles.button} disabled={loading}>
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;