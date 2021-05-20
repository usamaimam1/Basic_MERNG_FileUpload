import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import UploadForm from './UploadForm';
const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache()
})
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <UploadForm>

        </UploadForm>
      </div>
    </ApolloProvider>
  );
}

export default App;
