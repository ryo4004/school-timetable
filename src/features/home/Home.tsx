import { Link } from 'react-router-dom'
import { Box } from '../../components/Layout/Box'
import { Text } from '../../components/Layout/Text'
import { LoadButton } from './components/LoadButton'
import {
  ListItem,
  OrderedList,
  UnorderedList,
} from '../../components/Layout/List'

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
      <Text as="h2" marginTop="24px" fontSize="16px" fontWeight="bold">
        このアプリでできること
      </Text>
      <UnorderedList>
        <ListItem>週ごとの週案のテンプレートの作成</ListItem>
        <ListItem>時数(授業数)カウント</ListItem>
      </UnorderedList>
      <Text as="h2" marginTop="16px" fontSize="16px" fontWeight="bold">
        使い方
      </Text>
      <OrderedList>
        <ListItem>
          設定ページで基本情報を設定する
          <UnorderedList>
            <ListItem>教科の設定</ListItem>
            <ListItem>授業の設定</ListItem>
            <ListItem>時間割の設定</ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          ダッシュボードの「新しい週案ページを作成」から1週分の週案テンプレートを作成する
        </ListItem>
        <ListItem>作成した週案を開き、詳細を書き込む</ListItem>
        <ListItem>印刷など</ListItem>
      </OrderedList>
    </Box>
  )
}
