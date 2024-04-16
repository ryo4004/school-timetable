import { Box } from '../../components/Layout/Box'
import { Text } from '../../components/Layout/Text'
import { ClassesSettings } from './ClassesSettings'
import { SubjectSettings } from './SubjectSettings'
import { TimetableSettings } from './TimetableSettings'

export const Settings = () => {
  return (
    <Box>
      <Text
        as="h2"
        marginX="8px"
        marginY="16px"
        fontWeight="bold"
        fontSize="20px"
      >
        設定
      </Text>
      <TimetableSettings />
      <SubjectSettings />
      <ClassesSettings />
    </Box>
  )
}
