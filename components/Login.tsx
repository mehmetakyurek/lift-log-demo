import { FC, useCallback, useState } from "react";
import { client } from "../pages/_apollo";
import { gql } from "@apollo/client"
import Image from "next/image";


const Login: FC<{ onAuth: (id: string) => void }> = (props) => {
    const [notFound, setNotfound] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [userName, setUserName] = useState("");
    const [pwd, setPwd] = useState("");
    const [loading, setLoading] = useState(false);

    const login = useCallback(() => {
        setNotfound(false);
        setUserExists(false);
        setLoading(true);
        client.query({
            query: gql`{
                login(name: "${userName}", pwd: "${pwd}")
            }`}).then(res => {
                if (res.data.login) props.onAuth(res.data.login)
                else setNotfound(true);
                setLoading(false);
            })
    }, [userName, pwd, setLoading]);

    const signup = useCallback(() => {
        setNotfound(false);
        setUserExists(false);
        setLoading(true);
        client.mutate({
            mutation: gql`
            mutation signup($username: String!, $pwd: String!) {
                addUser(name: $username, pwd: $pwd) {
                    code
                    userId
                }
            }`, variables: { username: userName, pwd }
        }).then(res => {
            if (res.data.addUser.code === 201) props.onAuth(res.data.addUser.userId);
            else if (res.data.addUser.code === 400) setUserExists(true);
            setLoading(false);
        })
    }, [userName, pwd, setLoading])

    return <div className="login flex items-center justify-center h-full bg-primary font-nunito">
        <div className="flex items-center justify-center flex-col bg-secondary gap-4 px-14 py-24 rounded relative text-text" onKeyUp={e => { if (e.key === "Enter") login() }}>
            {loading &&
                <div className="bg-secondary/90 absolute w-full h-full z-10 bg-loading flex place-content-center">
                    <Image
                        src="/loading.svg"
                        alt='Loading'
                        width={100}
                        height={100}
                    />
                </div>
            }
            <div className="absolute top-4 text-lg">Log Lift Demo</div>
            {userExists && <span className="text-[red]">User already exists</span>}
            {notFound && <span className="text-[red]">User not found</span>}
            <input className="bg-primary rounded px-4 py-1 text-text outline-none" placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} />
            <input className="bg-primary rounded px-4 py-1 text-text outline-none" placeholder="Password" type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
            <div className="flex gap-2 ">
                <button className="bg-primary rounded px-4 py-1 text-text outline-none" onClick={signup}>Signup</button>
                <button className="bg-primary rounded px-4 py-1 text-text outline-none" onClick={login}>Login</button>
            </div>

        </div>
    </div >
}
export default Login;