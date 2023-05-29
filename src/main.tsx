import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';
import { store } from './redux/store.tsx'
// import { GET_CURRENT_USER_REPOSITORIES } from './API/GetCurrentUserRepositories.ts';
import { Provider } from 'react-redux'

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });
const token = process.env.VITE_TOKEN
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });
  
  return forward(operation);
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
)
