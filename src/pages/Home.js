import React, {useEffect, useState} from "react";
import {useQuery, gql} from "@apollo/client";
import Users from "../components/Users";

const ALL_USERS = gql`
    query {
        allUsers {
            name
            email
        }
    }
`

function Home() {
    const {data, error, loading} = useQuery(ALL_USERS)
    if (error) return <span style={'color: red'}>{error}</span>

    return (
        <div>
            {loading ? <li>Loading...</li> : (<Users users={data?.allUsers}></Users>)}
        </div>
    );
}

export default Home;
