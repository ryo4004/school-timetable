import { Link } from 'react-router-dom'
import { Box } from '../../components/Layout/Box'
import { Text } from '../../components/Layout/Text'
import { LoadButton } from '../dashboard/components/LoadButton'

export const Home = () => {
  return (
    <Box marginX="8px">
      <Text as="h1" fontSize="24px" fontWeight="bold">
        週案くん
      </Text>
      <Text as="h2" marginTop="16px" fontSize="16px" fontWeight="bold">
        保存したデータを読み込む
      </Text>
      <LoadButton />
      <Text marginTop="16px" fontSize="16px" fontWeight="bold">
        新しく開始する
      </Text>
      <Link to="/dashboard">
        <Text
          border="1px solid #ccc"
          display="inline-block"
          padding="2px 8px"
          borderRadius="0.375rem"
          _hover={{ background: '#0000000a' }}
        >
          ダッシュボードへ
        </Text>
      </Link>
      <Text as="h2" marginTop="16px" fontSize="16px" fontWeight="bold">
        使い方
      </Text>
    </Box>
  )
}
