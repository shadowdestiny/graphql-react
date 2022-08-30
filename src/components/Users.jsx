import React from "react";
import {Button, Table} from "react-bootstrap";

function Users({users, clickUser, editUser, deleteUser}) {
    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map(user =>
                    <tr key={user.id} >
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Button variant="secondary" onClick={() => {editUser(user)}}>Edit</Button>&nbsp;
                            <Button variant="danger" onClick={() => {deleteUser(user)}}>Delete</Button>&nbsp;
                            <Button variant="light" onClick={() => {clickUser(user)}}>Posts</Button>
                        </td>
                    </tr>)
            }
            </tbody>
        </Table>
    );
}

export default Users;
