import {
  Select as ChakraSelect,
  type SelectProps as ChakraSelectProps,
} from '@chakra-ui/react'

export const Select = (props: ChakraSelectProps) => {
  return <ChakraSelect {...props} />
}

export type SelectProps = ChakraSelectProps
