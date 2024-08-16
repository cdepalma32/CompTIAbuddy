// wraps the App with Apollo & providers
  // manages the consistent layout (header, footer)
  // provides a space 'outlet' for route-based content
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

// Imports components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// changed the 
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-wrapper"> {/* a container for the whole layout */}
        <Header />
        <main className="main-content"> {/* a class for the content area where 'Outlet' is used */}
          <Outlet />
        </main> 
        <Footer />
      </div>
    </ApolloProvider>
  );
}


export default App;
