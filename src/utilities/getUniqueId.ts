import { v4 as uuidv4 } from 'uuid'

export const getUniqueId = () => {
  return uuidv4().split('-')[0]
}
