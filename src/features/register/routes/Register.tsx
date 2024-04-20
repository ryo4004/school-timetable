import { useState } from 'react'
import { Button } from '../../../components/Form/Button'
import { Input } from '../../../components/Form/Input'
import { register } from '../../../libraries/register'
import { toast } from '../../../libraries/toast'

export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onClick = async () => {
    const { error } = await register({ email, password })

    if (!error) {
      toast({ title: '登録しました' })
    }
  }

  return (
    <>
      <h2>Register</h2>
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
      <Button onClick={onClick}>登録</Button>
    </>
  )
}
