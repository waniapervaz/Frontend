import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from './api/axios'; // Updated path
import { styles } from './style'; // Added styles import
import toast from 'react-hot-toast';

const Verification = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('Verifying your email...');
    const navigate = useNavigate();
    const hasVerified = useRef(false); // React 18 strict mode double-call prevention

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setStatus('Invalid verification link');
            return;
        }

        if (hasVerified.current) return;
        hasVerified.current = true;

        const verifyToken = async () => {
            try {
                const response = await api.get('/verification', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.success) {
                    toast.success('Email verified successfully!');
                    setStatus('Email verified successfully! Redirecting to login...');
                    setTimeout(() => navigate('/login'), 3000);
                }
            } catch (error) {
                const msg = error.response?.data?.message || 'Verification failed';
                toast.error(msg);
                setStatus(msg);
            }
        };

        verifyToken();
    }, [searchParams, navigate]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Email Verification</h2>
                <p style={{ marginTop: '20px', fontSize: '16px' }}>{status}</p>
            </div>
        </div>
    );
};

export default Verification;