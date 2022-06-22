import { useState } from "react"

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    const handleEntrar = () => {
        console.log(email, password)
    }

    return (
        <div>
            <form>
                <label>
                    <span>Email</span>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <span>Senha</span>
                    <input type="password" value={password} onChange={e => setpassword(e.target.value)} />
                </label>

                <button type="button" onClick={handleEntrar}>
                    Entrar
                </button>
            </form>
        </div>
    )
}