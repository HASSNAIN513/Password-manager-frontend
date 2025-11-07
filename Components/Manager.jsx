import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [formarray, setformarray] = useState([])
    const [icon, seticon] = useState("/visibility.svg")
    const [show, setshow] = useState(false)

    const getdata = async () => {
        let r = await fetch("https://password-manager-backend-five.vercel.app/passwords")
        let res = await r.json()
        setformarray(res)
    }

    useEffect(() => {
        getdata()
    }, [])

    const handlecopy = (e) => {
        navigator.clipboard.writeText(e)
        toast('Copied to clipboard successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handledelete = async (id) => {
        let c = confirm("Are you sure you want to delete this password?")
        if (c) {
            let arr = formarray.filter(item => item.id !== id)
            setformarray(arr)
            let r = await fetch("https://password-manager-backend-five.vercel.app/passwords", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id }),
            });
            toast('Password deleted successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const handleedit = async (id) => {
        let n = formarray.filter(item => item.id === id)
        setform(n,[object ,Object],)
        let arr = formarray.filter(item => item.id !== id)
        setformarray(arr)
        let r = await fetch("https://password-manager-backend-five.vercel.app/passwords", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        });
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const showpassword = () => {
        if (icon.includes("/visibility.svg")) {
            seticon("/hide.svg")
        }
        else {
            seticon("/visibility.svg")
        }
        setshow(prev => !prev)
    }

    const saveform = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setformarray([...formarray, { ...form, id: uuidv4() }])
            let r = await fetch("https://password-manager-backend-five.vercel.app/passwords", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...form, id: uuidv4() }),
            });
            setform({ site: "", username: "", password: "" })
            toast('Password saved successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast('Minimum length: 3 characters required!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12'>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    className="mt-16"
                />

                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3'>
                        <span className='text-green-600'>&lt;</span>
                        <span className='text-gray-800'>Pass</span>
                        <span className='text-green-600'>OP/&gt;</span>
                    </h1>
                    <p className='text-gray-600 text-lg sm:text-xl'>Your secure password manager</p>
                </div>

                {/* Input Form Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-100">
                    <div className="space-y-6">
                        {/* Website URL Input */}
                        <div className='w-full'>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                            <input 
                                className='w-full bg-gray-50 focus:bg-white text-gray-800 border-2 border-gray-200 focus:border-green-500 rounded-xl text-base p-3 outline-none transition-all duration-200 hover:border-green-300' 
                                placeholder='https://example.com' 
                                type="text" 
                                value={form.site} 
                                name="site" 
                                onChange={handlechange} 
                                id="site" 
                            />
                        </div>

                        {/* Username and Password Row */}
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                            {/* Username Input */}
                            <div className='lg:col-span-2'>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                <input 
                                    className='w-full bg-gray-50 focus:bg-white text-gray-800 border-2 border-gray-200 focus:border-green-500 rounded-xl text-base p-3 outline-none transition-all duration-200 hover:border-green-300' 
                                    placeholder='Enter username or email' 
                                    type="text" 
                                    name="username" 
                                    value={form.username} 
                                    onChange={handlechange} 
                                    id="username" 
                                />
                            </div>

                            {/* Password Input */}
                            <div className='relative'>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input 
                                        className='w-full bg-gray-50 focus:bg-white text-gray-800 border-2 border-gray-200 focus:border-green-500 rounded-xl text-base p-3 pr-12 outline-none transition-all duration-200 hover:border-green-300' 
                                        placeholder='Enter password' 
                                        type={show ? "text" : "password"} 
                                        name="password" 
                                        id="password" 
                                        onChange={handlechange} 
                                        value={form.password} 
                                    />
                                    <button 
                                        type="button"
                                        onClick={showpassword} 
                                        className='absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200'
                                    >
                                        <img className='w-5 h-5' src={icon} alt="Toggle password visibility" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-center pt-4">
                            <button 
                                onClick={saveform} 
                                className='bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
                            >
                                <img src="/save.svg" alt="" className="w-5 h-5" />
                                <span>Save Password</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Passwords Table Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="p-6 sm:p-8">
                        <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-gray-800'>Your Passwords</h2>
                        
                        {formarray.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-lg">No passwords saved yet</p>
                                <p className="text-sm mt-2">Add your first password above</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto -mx-6 sm:-mx-8">
                                <div className="inline-block min-w-full px-3 sm:px-8">
                                    <table className="min-w-full">
                                        <thead className='bg-green-600 text-white'>
                                            <tr>
                                                <th className='px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider'>Site</th>
                                                <th className='px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider hidden sm:table-cell'>Username</th>
                                                <th className='px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider hidden md:table-cell'>Password</th>
                                                <th className='px-4 py-4 text-center text-sm font-semibold uppercase tracking-wider'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className='divide-y divide-gray-200'>
                                            {formarray.map(item => {
                                                return (
                                                    <tr key={item.id} className='hover:bg-gray-50 transition-colors duration-150'>
                                                        {/* Site Column */}
                                                        <td className='px-4 py-4'>
                                                            <div className='flex items-center gap-2'>
                                                                <a 
                                                                    href={item.site} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className='text-blue-600 hover:text-blue-800 underline truncate max-w-[200px] sm:max-w-[300px]'
                                                                    title={item.site}
                                                                >
                                                                    {item.site}
                                                                </a>
                                                                <button 
                                                                    onClick={() => handlecopy(item.site)} 
                                                                    className="p-1 hover:bg-gray-200 rounded transition-colors duration-150"
                                                                    title="Copy site URL"
                                                                >
                                                                    <img src="/copy.svg" alt="Copy" className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                            {/* Mobile: Show username and password below site */}
                                                            <div className="sm:hidden mt-2 space-y-1">
                                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                    <span className="font-medium">User:</span>
                                                                    <span className="truncate max-w-[120px]">{item.username}</span>
                                                                    <button 
                                                                        onClick={() => handlecopy(item.username)} 
                                                                        className="p-1 hover:bg-gray-200 rounded"
                                                                    >
                                                                        <img src="/copy.svg" alt="Copy" className="w-3 h-3" />
                                                                    </button>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-sm text-gray-600 md:hidden">
                                                                    <span className="font-medium">Pass:</span>
                                                                    <span>{"•".repeat(Math.min(item.password.length, 8))}</span>
                                                                    <button 
                                                                        onClick={() => handlecopy(item.password)} 
                                                                        className="p-1 hover:bg-gray-200 rounded"
                                                                    >
                                                                        <img src="/copy.svg" alt="Copy" className="w-3 h-3" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Username Column - Hidden on mobile */}
                                                        <td className='px-4 py-4 hidden sm:table-cell'>
                                                            <div className='flex items-center gap-2'>
                                                                <span className='truncate max-w-[150px] lg:max-w-[200px]' title={item.username}>
                                                                    {item.username}
                                                                </span>
                                                                <button 
                                                                    onClick={() => handlecopy(item.username)} 
                                                                    className="p-1 hover:bg-gray-200 rounded transition-colors duration-150"
                                                                    title="Copy username"
                                                                >
                                                                    <img src="/copy.svg" alt="Copy" className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>

                                                        {/* Password Column - Hidden on mobile and tablet */}
                                                        <td className='px-4 py-4 hidden md:table-cell'>
                                                            <div className='flex items-center gap-2'>
                                                                <span className='font-mono text-gray-600'>
                                                                    {"•".repeat(Math.min(item.password.length, 12))}
                                                                </span>
                                                                <button 
                                                                    onClick={() => handlecopy(item.password)} 
                                                                    className="p-1 hover:bg-gray-200 rounded transition-colors duration-150"
                                                                    title="Copy password"
                                                                >
                                                                    <img src="/copy.svg" alt="Copy" className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>

                                                        {/* Actions Column */}
                                                        <td className='px-4 py-4'>
                                                            <div className='flex gap-2 justify-center'>
                                                                <button 
                                                                    onClick={() => handleedit(item.id)} 
                                                                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-150"
                                                                    title="Edit password"
                                                                >
                                                                    <img src="/edit.svg" alt="Edit" className="w-4 h-4" />
                                                                </button>
                                                                <button 
                                                                    onClick={() => handledelete(item.id)} 
                                                                    className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-150"
                                                                    title="Delete password"
                                                                >
                                                                    <img src="/delete.svg" alt="Delete" className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manager