import { WEEKDAYS, Weekday, getWeekNumber } from '../../utilities/getWeekDay'
import { SubjectSelect } from '../Timetable/SubjectSelect'
import { useConfigStore } from '../../stores/configs'
import { Text } from '../../components/Layout/Text'
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from '../../components/Table/Table'

export const TimetableSettings = () => {
  const { config } = useConfigStore()

  return (
    <>
      <Text as="h3" marginTop="16px">
        時間割の設定
      </Text>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Td minWidth="auto"></Td>
              {WEEKDAYS.map((weekday) => (
                <Td key={weekday} textAlign="center">
                  <Text paddingY="8px">{weekday}</Text>
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {config.classes.map((classItem) => (
              <Tr key={classItem.id}>
                <Td minWidth="20px">{classItem.name}</Td>
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
    </>
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
