import {
  Select as ChakraSelect,
  type SelectProps as ChakraSelectProps,
} from '@chakra-ui/react'

export const Select = (props: ChakraSelectProps) => {
  return <ChakraSelect border="1px solid #ccc" icon={<></>} {...props} />
}

export type SelectProps = ChakraSelectProps
