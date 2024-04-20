import { createStandaloneToast } from '@chakra-ui/react'

const { ToastContainer, toast } = createStandaloneToast({
  defaultOptions: {
    position: 'top',
    isClosable: true,
    duration: 3000,
  },
})

export { ToastContainer, toast }
