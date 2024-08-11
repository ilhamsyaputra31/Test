import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Components/Auth/AuthContext';
import { ThemeContext } from '../Components/ThemeContext';

const Navbar = () => {
    const [username, setUsername] = useState('');
    const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
    const [newUsername, setNewUsername] = useState(''); // State to handle new username input
    const { logout } = useContext(AuthContext);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        logout();
        localStorage.removeItem('username');
        navigate('/login');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleEditClick = () => {
        setNewUsername(username);
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        if (newUsername.trim()) {
            setUsername(newUsername);
            localStorage.setItem('username', newUsername);
        }
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <nav className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} transition-colors duration-300`}>
            <div className='flex justify-between items-center h-24 max-w-[1200px] mx-auto px-4'>
                <h1 className='w-full text-3xl font-bold'>CRUD</h1>

                <div className="flex items-center space-x-6">
                    {/* Toggle Dark Mode */}
                    <div className="flex items-center space-x-6">
                        <button onClick={toggleDarkMode}>
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>

                    {/* Dropdown Trigger */}
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="ml-8 font-semibold focus:outline-none">
                            {username}
                            <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 z-50`}>
                                {isEditing ? (
                                    <div className="p-2">
                                        <input
                                            type="text"
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                        <div className="mt-2 flex space-x-2">
                                            <button onClick={handleSaveClick} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
                                            <button onClick={handleCancelClick} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-2">
                                        <button onClick={handleEditClick} className="w-full text-left">Edit Name</button>
                                        <button onClick={handleLogout} className="w-full text-left">Logout</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
