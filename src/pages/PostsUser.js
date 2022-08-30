import React, {useEffect, useState} from "react";
import {useQuery, gql, useLazyQuery, useMutation} from "@apollo/client";
import {useParams} from "react-router";
import Post from "../components/Post";
import {Button, Form} from "react-bootstrap";

const FIND_POSTS_USER = gql`
    query findPostByUser($userId: Int!){
        allPostByUser(userId: $userId) {
            id
            title
            content
            user {
                name
                email
            }
        }
    }
`

const CREATE_POST_USER = gql`
    mutation addPostUserById($title: String, $content: String, $userId: Int) {
        addPostUserById(title: $title, content: $content, userId: $userId) {
            id
            title
            content
            user {
                email
            }
        }
    }
`

const DELETE_POST_USER = gql`
    mutation deletePost($id: Int) {
        deletePost(id: $id) {
            title
        }
    }
`

function PostsUser() {
    let { userId } = useParams();
    const [deletePostUse] = useMutation(DELETE_POST_USER, )
    const [addPostUser] = useMutation(CREATE_POST_USER, )
    const [findPostByUser, result] = useLazyQuery(FIND_POSTS_USER, {
        fetchPolicy: "no-cache"
    })
    const [postsUser, setPostUser] = useState(null)

    useEffect(() => {
        if (result.data){
            setPostUser(result.data.allPostByUser)
        }
    },[result])

    useEffect(() => {
        showPost(userId);
    },[userId])

    const showPost = userId => {
        findPostByUser({
            variables: { userId: parseInt(userId) },
        })
    }

    /*deleteUser({
        variables: {
            id: parseInt(user.id)
        }
    })*/

    const deletePost = (post) => {
        deletePostUse({
            variables: {
                id: parseInt(post.id)
            },
            onCompleted: () => {
                showPost(userId);
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target),
            formDataObj = Object.fromEntries(formData.entries())

        console.log(formDataObj);

        addPostUser(
            {
                variables: {
                    userId: parseInt(userId),
                    title: formDataObj.title,
                    content: formDataObj.content
                },
                onCompleted: () => {
                    showPost(parseInt(userId))
                },
            }
        )
    }

    return (
        <div>

            <Form onSubmit={onSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="Title" name={"title"} />
                    <Form.Text className="text-muted">
                        Title
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" placeholder="Content" name={"content"} />
                    <Form.Text className="text-muted">
                        Content
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                   Save
                </Button>&nbsp;

            </Form>
            <br />

           <Post posts={postsUser} deletePost={deletePost}></Post>
        </div>
    );
}

export default PostsUser;
