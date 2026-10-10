import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from './api/axios';
import { styles } from './style';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/register', formData);
            if (response.data.success) {
                toast.success('Registration successful! Please check your email to verify.');
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Create Account</h2>
                <form onSubmit={handleRegister} style={styles.form}>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={styles.input}/>
                    <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={styles.input}/>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input}/>
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p style={styles.text}>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;