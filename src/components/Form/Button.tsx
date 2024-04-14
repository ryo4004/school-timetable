import {
  Button as ChakraButton,
  IconButton as ChakraIconButton,
  type ButtonProps,
  type IconButtonProps,
} from '@chakra-ui/react'

export const Button = (props: ButtonProps) => {
  return <ChakraButton {...props} />
}

export const IconButton = (props: IconButtonProps) => {
  return <ChakraIconButton {...props} />
}
