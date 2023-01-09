import { ApolloProvider } from '@apollo/client/react'
import { client } from './_apollo'
import Login from '../components/Login'
import { useEffect, useState } from 'react'
import Log from '../components/Log'


const Home = () => {
  const [userId, setUserId] = useState('')
  useEffect(() => { setUserId(sessionStorage.getItem("userId") ?? "") }, [])
  useEffect(() => {
    if (userId.length > 0)
      sessionStorage.setItem("userId", userId)
  }, [userId])
  return (
    <ApolloProvider client={client}>
      {userId.length === 0 ? <Login onAuth={id => setUserId(id)} /> : <Log userId={userId} />}
    </ApolloProvider>
  )
}
export default Home;