import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Box } from './Box'
import { Flex } from './Flex'
import { Text } from './Text'
import { SaveButton } from './SaveButton'
import { NoPrint } from './NoPrint'

export const HEADER_HEIGHT = '41px'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <Header />
      <Box>{children}</Box>
    </Box>
  )
}

const Header = () => {
  return (
    <Box
      position="sticky"
      top="0"
      width="100%"
      sx={{ backdropFilter: 'blur(8px)' }}
      zIndex={1}
    >
      <NoPrint>
        <Flex
          width="100%"
          height="40px"
          lineHeight="40px"
          alignItems="center"
          borderBottom="1px solid #ccc"
        >
          <Link to="/dashboard">
            <Text marginX="8px" fontWeight="bold">
              週案くん
            </Text>
          </Link>
          <Flex flex={2}>
            <Link to="/dashboard">
              <Text paddingX="8px" _hover={{ background: '#ccc' }}>
                ダッシュボード
              </Text>
            </Link>
            <Link to="/settings">
              <Text paddingX="8px" _hover={{ background: '#ccc' }}>
                設定
              </Text>
            </Link>
            <Box marginLeft="auto">
              <SaveButton />
            </Box>
          </Flex>
        </Flex>
      </NoPrint>
    </Box>
  )
}
