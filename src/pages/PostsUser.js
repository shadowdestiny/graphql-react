import React, {useEffect, useState} from "react";
import {useQuery, gql, useLazyQuery} from "@apollo/client";
import {useParams} from "react-router";
import Post from "../components/Post";

const FIND_POSTS_USER = gql`
    query findPostByUser($userId: Int!){
        allPostByUser(userId: $userId) {
            id
            title
            user {
                name
                email
            }
        }
    }
`

function PostsUser() {
    let { userId } = useParams();
    const [findPostByUser, result] = useLazyQuery(FIND_POSTS_USER)
    const [postsUser, setPostUser] = useState(null)

    useEffect(() =>{
        if (result.data){
            setPostUser(result.data.allPostByUser)
        }
    },[result])

    useEffect(() => {
        showPost(userId);
    },[userId])

    const showPost = userId => {
        findPostByUser({
            variables: { userId: parseInt(userId) }
        })
    }

    // if (error) return <span style={'color: red'}>{error}</span>

    return (
        <div>
           {false ? <li>Loading...</li> : (<Post posts={postsUser} deletePost={() => {}}></Post>)}
        </div>
    );
}

export default PostsUser;
