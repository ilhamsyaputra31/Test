import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Components/ThemeContext'; // Import ThemeContext

const Table = ({ data, setData }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // Gunakan theme dari ThemeContext
    const [search, setSearch] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [newItem, setNewItem] = useState({ id: '', name: '' });

    useEffect(() => {
        const parsed = queryString.parse(location.search);
        if (parsed.search) setSearch(parsed.search);
    }, [location.search]);

    useEffect(() => {
        const query = queryString.stringify({ search });
        navigate({ search: query });
    }, [search, navigate]);

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAdd = () => {
        if (newItem.name) {
            const updatedData = [
                ...data,
                { ...newItem, id: data.length ? data[data.length - 1].id + 1 : 1 }
            ];
            setData(updatedData);
            localStorage.setItem('data', JSON.stringify(updatedData));
            setNewItem({ id: '', name: '' });
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setNewItem({ id: item.id, name: item.name });
    };

    const handleUpdate = () => {
        const updatedData = data.map(item => (item.id === editingItem.id ? newItem : item));
        setData(updatedData);
        localStorage.setItem('data', JSON.stringify(updatedData));
        setEditingItem(null);
        setNewItem({ id: '', name: '' });
    };

    const handleDelete = (id) => {
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        localStorage.setItem('data', JSON.stringify(updatedData));
    };

    return (
        <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <input
                type="text"
                placeholder="Search..."
                className="mb-4 w-full sm:w-auto p-2 border border-gray-300 rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Add / Edit Item</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    <input
                        type="text"
                        placeholder="Name"
                        className="p-2 border border-gray-300 rounded mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    {editingItem ? (
                        <button
                            onClick={handleUpdate}
                            className="p-2 bg-blue-500 text-white rounded w-full sm:w-auto"
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            onClick={handleAdd}
                            className="p-2 bg-green-500 text-white rounded w-full sm:w-auto"
                        >
                            Add
                        </button>
                    )}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className={`min-w-full ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} border rounded`}>
                    <thead>
                        <tr>
                            <th className="p-2 border-b">ID</th>
                            <th className="p-2 border-b">Name</th>
                            <th className="p-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item.id}>
                                    <td className="p-2 border-b">{item.id}</td>
                                    <td className="p-2 border-b">{item.name}</td>
                                    <td className="p-2 border-b">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="p-1 bg-yellow-500 text-white rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-1 bg-red-500 text-white rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="p-2 text-center">No results found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [data, setData] = useState([]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const storedData = localStorage.getItem('data');
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            setData([
                { id: 1, name: 'Agus' },
                { id: 2, name: 'Budi' },
                { id: 3, name: 'Amir' }
            ]);
        }
    }, []);

    return (
        <div className={`w-full px-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <Navbar />
            <div className="container mx-auto px-4">
                <div className="text-center overflow-x-auto">
                    <Table data={data} setData={setData} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
