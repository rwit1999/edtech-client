import { useAddAdminMutation, useDeleteUserMutation, useGetAllUsersQuery } from '@/redux/features/user/userApi';
import React, { FC, useEffect, useState } from 'react';
import { FaTrash, FaUserPlus } from 'react-icons/fa';
import { format } from 'timeago.js';
import toast from 'react-hot-toast';

type Props = {
    isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
    const { isLoading, data, error, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
    const [open, setOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [active, setActive] = useState(false);
    const [deleteUser, { isSuccess }] = useDeleteUserMutation({});
    const [addAdmin, { isSuccess: isAddSuccess }] = useAddAdminMutation();
    const [userId, setUserId] = useState("");
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
    let users;

    if (isTeam) {
        const newData = data?.users.filter((item: any) => item.role === 'admin');
        users = newData?.map((item: any, index: number) => ({
            id: index + 1,
            _id: item._id,
            name: item.name,
            email: item.email,
            purchased: item.purchased,
            role: item.role,
            created: format(item.createdAt),
        })) || [];
    } else {
        users = data?.users?.map((item: any, index: number) => ({
            id: index + 1,
            _id: item._id,
            name: item.name,
            email: item.email,
            purchased: item.purchased,
            role: item.role,
            created: format(item.createdAt),
        })) || [];
    }

    const handleEdit = (id: number) => {
        // Handle edit logic here
    };

    const handleDelete = async () => {
        try {
            await deleteUser(userId);
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const handleAddUser = async () => {
        try {
            await addAdmin({name:newUser.name,email:newUser.email,password:newUser.password});
            setNewUser({ name: "", email: "", password: "" });
            setAddOpen(false);
        } catch (error) {
            console.error("Failed to add user:", error);
        }
    };

    const closeModal = () => {
        setOpen(false);
    };

    const closeAddModal = () => {
        setAddOpen(false);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("User deleted");
            refetch();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isAddSuccess) {
            toast.success("New member added");
            refetch();
        }
    }, [isAddSuccess]);

    return (
        <div className={`overflow-x-auto ${!isTeam ? "mt-20" : "mt-1"}`}>
            {isTeam && (
                <div className="mt-24 flex justify-center">
                    <button
                        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setAddOpen(true)}
                    >
                        <FaUserPlus className="inline mr-2" /> Add Team Member
                    </button>
                </div>
            )}
            <div className="mt-4">
                <table className="min-w-full bg-white dark:bg-gray-900">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-center">ID</th>
                            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-center">User name</th>
                            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-center">User email</th>
                            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-center">Role</th>
                            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-center">Created</th>
                            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user.id}>
                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-center">{user.id}</td>
                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-center">{user.name}</td>
                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-center">{user.email}</td>
                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-center">{user.role}</td>
                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-center">{user.created}</td>
                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-center">
                                    <div className="flex justify-center space-x-4">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => { setOpen(true); setUserId(user._id); }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {open && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <FaTrash className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">Delete User</h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        onClick={() => { handleDelete(); closeModal(); }}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Delete
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {addOpen && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <FaUserPlus className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">Add Team Member</h3>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    value={newUser.name}
                                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    value={newUser.email}
                                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                                    className="w-full mt-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    value={newUser.password}
                                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                                    className="w-full mt-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        onClick={() => { handleAddUser(); closeAddModal(); }}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Add
                                    </button>
                                    <button
                                        onClick={closeAddModal}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;
