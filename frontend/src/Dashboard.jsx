import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from './style'; // Added styles import
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accesstoken');
        const user = localStorage.getItem('username');
        
        if (!token) {
            navigate('/login');
        } else {
            setUsername(user);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <div style={{...styles.card, textAlign: 'center'}}>
                <h2>Welcome, {username}!</h2>
                <p style={{ margin: '20px 0', color: '#666' }}>You are successfully logged into your dashboard.</p>
                <button onClick={handleLogout} style={{...styles.button, backgroundColor: '#dc3545'}}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;