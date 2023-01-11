import { Inter } from '@next/font/google'
import {FormEvent, useContext, useState} from "react";
import {AuthContext, AuthProvider} from "../context/AuthContext";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {signIn} = useContext(AuthContext)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const data = {
      email,
      password,
    }

    await signIn(data)
  }

  return (
    <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Entrar</button>
    </form>
  )
}
