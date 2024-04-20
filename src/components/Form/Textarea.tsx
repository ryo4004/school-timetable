import {
  Textarea as ChakraTextarea,
  type TextareaProps,
} from '@chakra-ui/react'

export const Textarea = (props: TextareaProps) => {
  return <ChakraTextarea border="1px solid #ccc" {...props} />
}
