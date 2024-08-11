import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Components/Auth/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'user' && password === 'pass') {
            login();
            localStorage.setItem('username', username);
            navigate('/dashboard');
        } else {
            setError('Username atau password salah');
        }
    };


    return (
        <>
            <div className='flex justify-center items-center min-h-screen px-4'>
                <div className='w-full max-w-md'>
                    <h1 className='text-4xl sm:text-6xl md:text-8xl font-bold text-[#2C3D8F] text-center'>Login</h1>
                    <div className="my-4 mt-10 rounded-xl" style={{ border: '2px solid #5A81FA' }}>
                        <div className="flex bg-[#fbfcff] rounded-xl overflow-hidden">
                            <input
                                type="text"
                                placeholder="Username"
                                className="py-2 px-4 w-full focus:outline-none bg-[#ffffff] rounded-xl"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="my-4 rounded-xl" style={{ border: '2px solid #5A81FA' }}>
                        <div className="flex bg-[#ffffff] rounded-xl overflow-hidden">
                            <input
                                type="password"
                                placeholder="Password"
                                className="py-2 px-4 w-full focus:outline-none bg-[#fafcff] rounded-xl"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <h1 className='text-right text-sm sm:text-base'>Forget Password?</h1>
                    <button
                        className='bg-[#2C3D8F] w-full sm:w-100 rounded-xl my-4 mx-auto py-2 text-white block font-bold mt-10'
                        onClick={handleLogin}
                    >
                        <p>Login</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;
