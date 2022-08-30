import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";

function Post({posts: postsUser, deletePost}) {

    if (!postsUser) return null;

    return (
        <ul className={"list-group list-group-flush"}>
            {
                postsUser.map(post => <li key={post.id} className={"list-group-item"} >
                    {post.title} {post.content}
                    <Button className={"float-end"} variant="danger" onClick={()=>{deletePost(post)}}>x</Button>
                </li>)
            }
        </ul>
    );
}

export default Post;
