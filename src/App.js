// import logo from './logo.svg';
import './App.css';
import {GuestRouter} from "./router/GuestRouter";
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.css';
import './custom.scss';
import NavBarComponent from "./components/NavBarComponent";
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: process.env.REACT_APP_PATH_GRAPHQL_ENV
    })
})

function App() {
  return (
      <ApolloProvider client={client}>
          <NavBarComponent></NavBarComponent>
          <br />
          <BrowserRouter>
              <div className={"container"}>
                  <GuestRouter/>
              </div>
          </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
