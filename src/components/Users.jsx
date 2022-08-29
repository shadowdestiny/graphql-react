import React, {useEffect, useState} from "react";

function Users({users}) {
    return (
        <>
            {users.map(user => <li>{user.email} {user.name}</li>)}
        </>
    );
}

export default Users;
