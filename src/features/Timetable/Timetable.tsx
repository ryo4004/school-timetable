import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useTimetableStore } from '../../stores/timetable'
import { DateTime } from 'luxon'
import { getWeekDay } from '../../utilities/getWeekDay'
import { TimetableDate } from '../../types'
import { useConfigStore } from '../../stores/configs'
import { TimetableEdit } from './TimetableEdit'
import { Box } from '../../components/Layout/Box'
import { Text } from '../../components/Layout/Text'
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '../../components/Table/Table'
import { Flex } from '../../components/Layout/Flex'
import { NoPrint } from '../../components/Layout/NoPrint'

export const Timetable = () => {
  const { key } = useParams<{ key: string }>()
  const { timetables } = useTimetableStore()
  const { config } = useConfigStore()

  const startDate = DateTime.fromFormat(key!, 'yyyyMMdd').toFormat('yyyy-MM-dd')

  const weekTimetable =
    useMemo(() => {
      return timetables.find((week) => week.firstDate === startDate)
    }, [timetables, startDate]) ?? null

  const weekIndex = useMemo(() => {
    return timetables.findIndex((week) => week.firstDate === startDate)
  }, [timetables, startDate])

  if (!weekTimetable) {
    return <Navigate to="/" />
  }

  return (
    <Box>
      <NoPrint>
        <Text as="h2">週案{weekIndex + 1}の編集</Text>
      </NoPrint>
      <TableContainer>
        <Table width="100%" sx={{ tableLayout: 'auto' }}>
          <Thead>
            <Tr>
              <Td colSpan={2} minWidth="auto" textAlign="center">
                <Text padding="8px" fontSize="24px" fontWeight="bold">
                  週案（{weekIndex + 1}週）
                </Text>
              </Td>
              <Td>
                <Text padding="2px" textAlign="center">
                  今週の目標{weekTimetable.note}
                </Text>
              </Td>
            </Tr>
            <Tr>
              <Th></Th>
              {weekTimetable.list.map((timetable) => {
                const dateTime = DateTime.fromISO(timetable.date)
                return (
                  <Th key={timetable.date} textAlign="center">
                    <Text fontSize="16px" padding="8px">
                      {dateTime.toFormat('M/d')}({getWeekDay(dateTime)})
                    </Text>
                  </Th>
                )
              })}
            </Tr>
          </Thead>
          <Tbody>
            {config.classes.map((classItem) => {
              return (
                <Tr key={classItem.id}>
                  <Th>
                    <Flex alignItems="center" justifyContent="center">
                      <Text fontSize="16px" paddingX="8px">
                        {classItem.name}
                      </Text>
                    </Flex>
                  </Th>
                  {weekTimetable.list.map((date) => {
                    return (
                      <ClassItem
                        key={date.date}
                        timetableDate={date}
                        classId={classItem.id}
                      />
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <TimetableEdit weekTimetable={weekTimetable} weekIndex={weekIndex} />
    </Box>
  )
}

const ClassItem = ({
  timetableDate,
  classId,
}: {
  timetableDate: TimetableDate
  classId: string
}) => {
  const classItem = timetableDate.classes[classId]

  return (
    <Td>
      <Flex
        width="100%"
        justifyContent="space-around"
        borderBottom="1px solid #000"
        fontSize="14px"
      >
        {classItem.subject.length === 0 && <Text>-</Text>}
        {classItem.subject.length !== 0 &&
          classItem.subject.map((subject, index) => (
            <Text key={index}>{subject}</Text>
          ))}
      </Flex>
      <Box width="100%" height="50px" fontSize="12px">
        {classItem.note}
      </Box>
    </Td>
  )
}
