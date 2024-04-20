import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useTimetableStore } from '../../../stores/timetable'
import { DateTime } from 'luxon'
import { getWeekDay, isSaturday, isSunday } from '../../../utilities/getWeekDay'
import { ClassConfig, TimetableDate } from '../../../types'
import { useConfigStore } from '../../../stores/configs'
import { TimetableEdit } from './TimetableEdit'
import { Box } from '../../../components/Layout/Box'
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
import { isClass } from '../../../utilities/isClass'

export const MainTimetable = () => {
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
    return <Navigate to="/dashboard" />
  }

  return (
    <Box>
      <TableContainer marginX="8px">
        <Flex alignItems="center">
          <Text padding="8px" fontSize="24px" fontWeight="bold">
            週案（{weekIndex + 1}週）
          </Text>
          <Text padding="2px" textAlign="center">
            今週の目標
          </Text>
          <Text
            marginLeft="8px"
            fontSize="12px"
            lineHeight="14px"
            whiteSpace="pre-wrap"
          >
            {weekTimetable.note}
          </Text>
        </Flex>
        <Table width="100%" sx={{ tableLayout: 'auto' }}>
          <Thead>
            <Tr>
              <Th></Th>
              {weekTimetable.list.map((timetable) => {
                if (!weekTimetable.showSaturday && isSaturday(timetable.date)) {
                  return null
                }

                if (!weekTimetable.showSunday && isSunday(timetable.date)) {
                  return null
                }

                const dateTime = DateTime.fromISO(timetable.date)

                return (
                  <Th key={timetable.date} textAlign="center">
                    <Text fontSize="16px" padding="8px">
                      <a href={`#${dateTime.toFormat('M/d')}`}>
                        {dateTime.toFormat('M/d')}({getWeekDay(dateTime)})
                      </a>
                    </Text>
                  </Th>
                )
              })}
            </Tr>
          </Thead>
          <Tbody>
            {config.classes.map((classConfig) => {
              return (
                <Tr key={classConfig.id}>
                  <Th>
                    <Flex alignItems="center" justifyContent="center">
                      <Text fontSize="16px" paddingX="8px">
                        {classConfig.name}
                      </Text>
                    </Flex>
                  </Th>
                  {weekTimetable.list.map((dateTimetable) => {
                    if (
                      !weekTimetable.showSaturday &&
                      isSaturday(dateTimetable.date)
                    ) {
                      return null
                    }

                    if (
                      !weekTimetable.showSunday &&
                      isSunday(dateTimetable.date)
                    ) {
                      return null
                    }

                    return (
                      <ClassItem
                        key={dateTimetable.date}
                        dateTimetable={dateTimetable}
                        classConfig={classConfig}
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
  dateTimetable,
  classConfig,
}: {
  dateTimetable: TimetableDate
  classConfig: ClassConfig
}) => {
  const classItem = dateTimetable.classes[classConfig.id]

  return (
    <Td>
      {isClass(classConfig.type) && (
        <Flex
          width="100%"
          justifyContent="space-around"
          borderBottom="1px solid #000"
          fontSize="14px"
        >
          {/* eslint-disable-next-line no-irregular-whitespace */}
          {classItem.subject.length === 0 && <Text>　</Text>}
          {classItem.subject.length !== 0 &&
            classItem.subject.map((subject, index) => (
              <Text key={index}>{subject}</Text>
            ))}
        </Flex>
      )}
      <Box
        width="100%"
        minHeight="50px"
        paddingX="2px"
        fontSize="12px"
        lineHeight="14px"
        whiteSpace="pre-wrap"
      >
        {classItem.note}
      </Box>
    </Td>
  )
}
