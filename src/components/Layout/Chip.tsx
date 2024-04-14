import { Box } from './Box'
import { type BoxProps } from '@chakra-ui/react'

export const Chip = ({ label, ...props }: { label: string } & BoxProps) => {
  return (
    <Box
      marginLeft="8px"
      paddingX="12px"
      border="1px solid #bdbdbd"
      borderRadius="16px"
      fontSize="0.8125rem"
      {...props}
    >
      {label}
    </Box>
  )
}
