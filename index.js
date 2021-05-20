const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const express = require('express');
const path = require('path')
const fs = require('fs');
const { start } = require('repl');
const typeDefs = gql`
  type File {
    url:String!
  }

  type Query {
    hello:String!
  }

  type Mutation {
    uploadFile(file: Upload!): File!
  }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World!',
    },
    Mutation: {
        uploadFile: async (parent, { file }) => {
            const { createReadStream, filename, mimetype, encoding } = await file
            const stream = createReadStream();
            const pathname = path.join(__dirname, `/public/images/${filename}`)
            console.log(stream, pathname);
            await stream.pipe(fs.createWriteStream(pathname))

            return {
                url: `http://localhost:4000/public/images/${filename}`
            }
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const app = express()
server.applyMiddleware({ app })
app.use(express.static('public'))
app.use(cors());
app.listen({ port: 4000 }, () => {
    console.log('Server Started At 4000')
})