import { useState } from 'react'
import { Input } from '../../../components/Form/Input'
import { Button } from '../../../components/Form/Button'
import { login } from '../../../libraries/login'
import { toast } from '../../../libraries/toast'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onClick = async () => {
    const { error } = await login({ email, password })

    if (!error) {
      toast({ title: 'ログインしました' })
    }
  }

  return (
    <>
      <h2>Login</h2>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onClick}>ログイン</Button>
    </>
  )
}
