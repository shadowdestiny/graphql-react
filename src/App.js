// import logo from './logo.svg';
import './App.css';
import {GuestRouter} from "./router/GuestRouter";
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, ApolloProvider, gql, HttpLink, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4001'
    })
})

function App() {
  return (
      <ApolloProvider client={client}>
          <BrowserRouter>
              <GuestRouter/>
          </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
