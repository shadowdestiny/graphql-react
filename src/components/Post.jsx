import React, {useEffect, useState} from "react";

function Users({posts: postsUser, deletePost}) {

    if (!postsUser) return null;

    return (
        <ul className={"list-group list-group-flush"}>
            {
                postsUser.map(post => <li key={post.id} className={"list-group-item"} onClick={()=>{deletePost(post)}}>
                    {post.title}
                </li>)
            }
        </ul>
    );
}

export default Users;
