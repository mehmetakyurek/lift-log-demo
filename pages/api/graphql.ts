import { createSchema, createYoga } from 'graphql-yoga'
import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from "../../lib"
import typeDefs from '../../lib/typedefs'
import resolvers from '../../lib/resolvers'

export const config = {
    api: {
        // Disable body parsing (required for file uploads)
        bodyParser: false
    }
}

const schema = createSchema<{ req: NextApiRequest, res: NextApiResponse }>({
    typeDefs,
    resolvers
})

export default createYoga<{
    req: NextApiRequest
    res: NextApiResponse
}>({
    schema,
    graphqlEndpoint: '/api/graphql'
})