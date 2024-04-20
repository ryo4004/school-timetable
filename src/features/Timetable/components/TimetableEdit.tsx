import { DateTime } from 'luxon'
import {
  CLASS_TYPES,
  ClassConfig,
  Timetable,
  TimetableDate,
} from '../../../types'
import { getWeekDay, isSaturday, isSunday } from '../../../utilities/getWeekDay'
import { useConfigStore } from '../../../stores/configs'
import { useTimetableStore } from '../../../stores/timetable'
import { SubjectSelect } from './SubjectSelect'
import { type ChangeEvent, useState } from 'react'
import { truthy } from '../../../utilities/truthy'
import { Input } from '../../../components/Form/Input'
import { Checkbox } from '../../../components/Form/Checkbox'
import { Flex } from '../../../components/Layout/Flex'
import { Text } from '../../../components/Layout/Text'
import { Box } from '../../../components/Layout/Box'
import { Tag } from '../../../components/Form/Tag'
import { classTypeColorSelector } from '../../../utilities/classTypeColorSelector'
import { InputGroup } from '../../../components/Form/InputGroup'
import { InputRightAddon } from '../../../components/Form/InputRightAddon'
import { Button } from '../../../components/Form/Button'
import { NoPrint } from '../../../components/Layout/NoPrint'
import { HEADER_HEIGHT } from '../../../components/Layout/Layout'
import { ChevronUpIcon } from '@chakra-ui/icons'
import { isClass } from '../../../utilities/isClass'

export const TimetableEdit = ({
  weekTimetable,
  weekIndex,
}: {
  weekTimetable: Timetable
  weekIndex: number
}) => {
  const { config } = useConfigStore()

  return (
    <NoPrint>
      <WeekNote weekIndex={weekIndex} weekTimetable={weekTimetable} />
      <ShowSaturday weekIndex={weekIndex} weekTimetable={weekTimetable} />
      <ShowSunday weekIndex={weekIndex} weekTimetable={weekTimetable} />
      {weekTimetable.list.map((timetable) => {
        if (!weekTimetable.showSaturday && isSaturday(timetable.date)) {
          return null
        }

        if (!weekTimetable.showSunday && isSunday(timetable.date)) {
          return null
        }

        const dateTime = DateTime.fromISO(timetable.date)
        return (
          <Box
            key={timetable.date}
            marginTop="16px"
            id={dateTime.toFormat('M/d')}
          >
            <Flex
              position="sticky"
              top={HEADER_HEIGHT}
              width="100%"
              padding="8px"
              background="#eee"
              textAlign="center"
              zIndex={1}
              onClick={() => window.scrollTo({ top: 0 })}
              cursor="pointer"
            >
              <Text>
                {dateTime.toFormat('M/d')}({getWeekDay(dateTime)})
              </Text>
              <Box marginLeft="auto">
                <ChevronUpIcon boxSize={5} />
              </Box>
            </Flex>
            {config.classes.map((classConfig) => {
              return (
                <ClassItem
                  key={classConfig.id}
                  weekIndex={weekIndex}
                  timetableDate={timetable}
                  classConfig={classConfig}
                />
              )
            })}
          </Box>
        )
      })}
    </NoPrint>
  )
}

const WeekNote = ({
  weekTimetable,
  weekIndex,
}: {
  weekTimetable: Timetable
  weekIndex: number
}) => {
  const { updateTimetableNote } = useTimetableStore()

  const [note, setNote] = useState(weekTimetable.note)

  const update = () => {
    updateTimetableNote(weekIndex, note)
  }

  return (
    <Box margin="8px">
      <Text>今週の目標</Text>
      <InputGroup marginY="8px">
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          borderRadius="0.375rem 0 0 0.375rem"
        />
        <InputRightAddon padding="0">
          <Button onClick={update} borderRadius="0 0.315rem 0.315rem 0">
            反映
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Box>
  )
}

const ShowSaturday = ({
  weekTimetable,
  weekIndex,
}: {
  weekTimetable: Timetable
  weekIndex: number
}) => {
  const { updateTimetableShowSaturday } = useTimetableStore()

  return (
    <Box margin="8px">
      <Checkbox
        isChecked={weekTimetable.showSaturday}
        onChange={(e) =>
          updateTimetableShowSaturday(weekIndex, e.target.checked)
        }
      >
        土曜日を表示する
      </Checkbox>
    </Box>
  )
}

const ShowSunday = ({
  weekTimetable,
  weekIndex,
}: {
  weekTimetable: Timetable
  weekIndex: number
}) => {
  const { updateTimetableShowSunday } = useTimetableStore()

  return (
    <Box margin="8px">
      <Checkbox
        isChecked={weekTimetable.showSunday}
        onChange={(e) => updateTimetableShowSunday(weekIndex, e.target.checked)}
      >
        日曜日を表示する
      </Checkbox>
    </Box>
  )
}

const ClassItem = ({
  weekIndex,
  timetableDate,
  classConfig,
}: {
  weekIndex: number
  timetableDate: TimetableDate
  classConfig: ClassConfig
}) => {
  const { timetables, updateTimetables } = useTimetableStore()

  const classItem = timetableDate.classes[classConfig.id]

  const [isDivide, setIsDivide] = useState(classItem.subject.length > 1)
  const [noteInput, setNoteInput] = useState(classItem.note)

  const onUpdateTimetables = (
    weekIndex: number,
    newTimetableDate: TimetableDate,
  ) => {
    const newTimetables = timetables.map((timetable, index) => {
      if (index === weekIndex) {
        return {
          ...timetable,
          list: timetable.list.map((week) => {
            if (week.date === timetableDate.date) {
              return newTimetableDate
            }

            return week
          }),
        }
      }
      return timetable
    })

    updateTimetables(newTimetables)
  }

  const onUpdateSubject = (selectedSubjects: string[]) => {
    const newTimetableDate = {
      ...timetableDate,
      classes: {
        ...timetableDate.classes,
        [classConfig.id]: {
          ...classItem,
          subject: selectedSubjects,
        },
      },
    }

    onUpdateTimetables(weekIndex, newTimetableDate)
  }

  const onUpdateNote = () => {
    const newTimetableDate = {
      ...timetableDate,
      classes: {
        ...timetableDate.classes,
        [classConfig.id]: {
          ...classItem,
          note: noteInput,
        },
      },
    }

    onUpdateTimetables(weekIndex, newTimetableDate)
  }

  const onChangeFirstSubject = (e: ChangeEvent<HTMLSelectElement>) => {
    onUpdateSubject(
      [e.target.value, classItem.subject[1], classItem.subject[2]].filter(
        truthy,
      ),
    )
  }

  const onChangeSecondSubject = (e: ChangeEvent<HTMLSelectElement>) => {
    onUpdateSubject(
      [classItem.subject[0], e.target.value, classItem.subject[2]].filter(
        truthy,
      ),
    )
  }

  const onChangeThirdSubject = (e: ChangeEvent<HTMLSelectElement>) => {
    onUpdateSubject(
      [classItem.subject[0], classItem.subject[1], e.target.value].filter(
        truthy,
      ),
    )
  }

  return (
    <Box
      margin="8px"
      padding="8px"
      border="1px solid #ccc"
      borderRadius="0.375rem"
      boxShadow="base"
    >
      <Box paddingY="8px">
        <Tag
          variant="outline"
          colorScheme={classTypeColorSelector(classConfig.type)}
          size="md"
        >
          {CLASS_TYPES[classConfig.type]}
        </Tag>
        <Tag
          marginLeft="8px"
          variant="outline"
          colorScheme={classTypeColorSelector(classConfig.type)}
          size="md"
        >
          {classConfig.name ? classConfig.name : '-'}
        </Tag>
      </Box>
      <Box maxWidth="calc(100% / 7)" minWidth="80px" marginY="8px">
        <Text fontSize="11px">プレビュー</Text>
        {isClass(classConfig.type) && (
          <Flex
            justifyContent="space-around"
            border="1px solid #000"
            borderBottom="0"
            fontSize="14px"
          >
            {/* eslint-disable-next-line no-irregular-whitespace */}
            {classItem.subject.length === 0 && <Text>　</Text>}
            {classItem.subject.map((subject, index) => (
              <Text key={index} whiteSpace="nowrap">
                {subject}
              </Text>
            ))}
          </Flex>
        )}
        <Box width="100%" height="50px" border="1px solid #000" fontSize="12px">
          {classItem.note}
        </Box>
      </Box>
      {isClass(classConfig.type) && (
        <Box>
          <SubjectSelect
            value={classItem.subject[0] ?? ''}
            onChange={onChangeFirstSubject}
            size="md"
            marginY="8px"
          />
          {isDivide && (
            <>
              <SubjectSelect
                value={classItem.subject[1] ?? ''}
                onChange={onChangeSecondSubject}
                size="md"
                marginY="8px"
              />
              <SubjectSelect
                value={classItem.subject[2] ?? ''}
                onChange={onChangeThirdSubject}
                size="md"
                marginY="8px"
              />
            </>
          )}
          <Checkbox
            isChecked={isDivide}
            onChange={(e) => {
              if (!e.target.checked) {
                onUpdateSubject([classItem.subject[0]].filter(truthy))
              }
              setIsDivide(e.target.checked)
            }}
          >
            分割
          </Checkbox>
        </Box>
      )}
      <InputGroup marginY="8px">
        <Input
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          borderRadius="0.375rem 0 0 0.375rem"
        />
        <InputRightAddon padding="0">
          <Button onClick={onUpdateNote} borderRadius="0 0.315rem 0.315rem 0">
            反映
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Box>
  )
}
