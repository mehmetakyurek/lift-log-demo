import { ApolloClient, InMemoryCache, gql } from "@apollo/client"

export const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
});