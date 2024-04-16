import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Box } from './Box'
import { Flex } from './Flex'
import { Text } from './Text'
import { SaveButton } from './SaveButton'
import { NoPrint } from './NoPrint'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <Header />
      <Box marginX="8px">{children}</Box>
    </Box>
  )
}

const Header = () => {
  return (
    <NoPrint>
      <Flex
        position="sticky"
        top="0"
        width="100%"
        height="40px"
        lineHeight="40px"
        alignItems="center"
        borderBottom="0.5px solid #ccc"
        sx={{ backdropFilter: 'blur(8px)' }}
      >
        <Link to="/">
          <Text marginX="8px" fontWeight="bold">
            週案くん
          </Text>
        </Link>
        <Flex flex={2}>
          <Link to="/">
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
  )
}
