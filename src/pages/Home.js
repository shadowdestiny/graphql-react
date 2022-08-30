import React, {useState} from "react";
import {useQuery, useMutation, gql} from "@apollo/client";
import Users from "../components/Users";
import {useNavigate} from "react-router";
import {Button, Form} from "react-bootstrap";

const ALL_USERS = gql`
    query {
        allUsers {
            id
            name
            email
        }
    }
`

const ADD_USER = gql`
    mutation createUser($name: String!, $email: String!) {
        addUser(name: $name, email: $email) {
            id
            name
            email
        }
    }
`

const UPDATE_USER = gql`
    mutation editUser($name: String!, $email: String!) {
        updateUser(name: $name, email: $email) {
            id
            name
            email
        }
    }
`

const DELETE_USER = gql`
    mutation deleteUser($id: Int) {
        deleteUser(id: $id) {
            id
            name
            email
        }
    }
`

function Home() {
    const {data, error, loading} = useQuery(ALL_USERS)
    const [createUser] = useMutation(ADD_USER, {refetchQueries: [{query: ALL_USERS}]})
    const [modifyUser] = useMutation(UPDATE_USER, {refetchQueries: [{query: ALL_USERS}]})
    const [deleteUser] = useMutation(DELETE_USER, {refetchQueries: [{query: ALL_USERS}]})

    const [isEdit, setEdit] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate();
    if (error) return <span style={'color: red'}>{error}</span>

    const clickUser = (user) => {
        // https://v5.reactrouter.com/web/api/Redirect
        navigate(`/posts/${user.id}/user`)
    }

    const setDataEdit = (user) => {
        setEdit(user.id)
        setName(user.name)
        setEmail(user.email)
        setEdit(true)
    }

    const deleteUserCall = (user) => {
        deleteUser({
            variables: {
                id: parseInt(user.id)
            }
        })
    }

    const onEdit = () => {
        setEdit(false)
    }

    const textButton = () => {
        return isEdit ? "Update" : "Save"
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target),
            formDataObj = Object.fromEntries(formData.entries())

        if (isEdit) {
            modifyUser(
                {
                    variables: {
                        name: formDataObj.name,
                        email: email
                    }
                })
        } else {
            createUser(
                {
                    variables: {
                        name: formDataObj.name,
                        email: formDataObj.email
                    }
                })
        }
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name={"name"} value={name} onChange={(e) => setName(e.target.value)}/>
                    <Form.Text className="text-muted">
                        Name user
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name={"email"} value={email} onChange={(e) => setEmail(e.target.value)} disabled={ isEdit }/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {textButton()}
                </Button>&nbsp;

                {isEdit ? <Button variant="danger" type="button" onClick={() => {
                    onEdit()
                }}>
                    Cancel edit
                </Button> : <></>}

            </Form>

            <div className={"mt-2"}>
                {loading ? <li>Loading...</li> : (
                    <Users users={data?.allUsers} clickUser={clickUser} editUser={setDataEdit} deleteUser={deleteUserCall}></Users>) }
            </div>
        </div>
    );
}

export default Home;
