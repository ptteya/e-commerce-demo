const UserRow = ({ user, onToggleRole }) => {
    return (
        <tr key={user._id}>
            <td data-label="Id">{user._id}</td>
            <td data-label="Email">{user.email}</td>
            <td data-label="Username">{user.username}</td>
            <td data-label="Role">{user.role}</td>
            <td data-label="Action">
                <button onClick={() => onToggleRole(user._id, user.role)} className="promote">
                    {user.role === 'user' ? 'Promote' : 'Demote'}
                </button>
            </td>
        </tr>
    );
};

export default UserRow;