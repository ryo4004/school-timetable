import {
  Alert as ChakraAlert,
  AlertIcon as ChakraAlertIcon,
  type AlertProps,
} from '@chakra-ui/react'

export const Alert = (props: AlertProps) => {
  return <ChakraAlert {...props} />
}

export const AlertIcon = () => <ChakraAlertIcon />
