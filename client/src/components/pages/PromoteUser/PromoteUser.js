import { useContext, useEffect, useState } from 'react';
import * as userService from 'services/userService';
import UserRow from './UserRow';
import './PromoteUser.css';
import { AuthContext } from 'contexts/AuthContext';

const PromoteUser = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const filterUsers = (allUsers) => {
        return allUsers.filter(({ username }) => username !== 'admin' && username !== user.username);
    };

    useEffect(() => {
        userService.getAll()
            .then(result => setUsers(filterUsers(result.data)))
            .catch((error) => console.error('Error fetching users:', error.message));
    }, []);

    const toggleUserRole = async (userId, userRole) => {
        try {
            const result = await userService.toggleUserRole(userId, userRole);
            setUsers(oldUsers =>
                oldUsers.map(user => user._id === userId ? result.data : user)
            );
        } catch (error) {
            console.error('Error updating user role:', error.message);
        }
    };

    return (
        <div className="items-container">
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="user-list">
                    {users.map(user => (
                        <UserRow
                            key={user._id}
                            user={user}
                            onToggleRole={toggleUserRole}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PromoteUser;