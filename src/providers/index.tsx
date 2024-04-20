import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from '../libraries/toast'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider>
      <ToastContainer />
      <BrowserRouter>{children}</BrowserRouter>
    </ChakraProvider>
  )
}
