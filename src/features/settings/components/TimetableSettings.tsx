import { WEEKDAYS, Weekday, getWeekNumber } from '../../../utilities/getWeekDay'
import { SubjectSelect } from '../../Timetable/components/SubjectSelect'
import { useConfigStore } from '../../../stores/configs'
import { Text } from '../../../components/Layout/Text'
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '../../../components/Table/Table'
import { Flex } from '../../../components/Layout/Flex'
import { Box } from '../../../components/Layout/Box'

export const TimetableSettings = () => {
  const { config } = useConfigStore()

  return (
    <Box marginX="8px">
      <Text as="h3" marginTop="16px">
        時間割の設定
      </Text>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th></Th>
              {WEEKDAYS.map((weekday) => (
                <Th key={weekday} textAlign="center">
                  <Text paddingY="8px">{weekday}</Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {config.classes.map((classItem) => (
              <Tr key={classItem.id}>
                <Th minWidth="20px">
                  <Flex alignItems="center" justifyContent="center">
                    <Text fontSize="16px" paddingX="8px">
                      {classItem.name}
                    </Text>
                  </Flex>
                </Th>
                {WEEKDAYS.map((weekday) => {
                  return (
                    <Td key={weekday}>
                      <ClassItem weekday={weekday} classId={classItem.id} />
                    </Td>
                  )
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

const ClassItem = ({
  weekday,
  classId,
}: {
  weekday: Weekday
  classId: string
}) => {
  const { config, updateSchedule } = useConfigStore()

  const weekNumber = getWeekNumber(weekday)

  const scheduledSubject = config.schedule[weekNumber][classId]

  const onUpdate = (selectedSubject: string) => {
    const newScheduleTable = {
      ...config.schedule[weekNumber],
      [classId]: selectedSubject,
    }

    updateSchedule(weekNumber, newScheduleTable)
  }

  return (
    <SubjectSelect
      value={scheduledSubject}
      onChange={(e) => onUpdate(e.target.value)}
    />
  )
}
