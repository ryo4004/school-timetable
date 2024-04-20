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
      <LoadButton />
      <Link to="/dashboard">ダッシュボードへ</Link>
      <Text as="h2">使い方</Text>
    </Box>
  )
}
