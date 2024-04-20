import { supabase } from './supabase'

export const register = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}
