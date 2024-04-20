import { Input as ChakraInput, type InputProps } from '@chakra-ui/react'

export const Input = (props: InputProps) => {
  return <ChakraInput border="1px solid #ccc" {...props} />
}
