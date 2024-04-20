import { CLASS_TYPES, ClassConfig, TimetableDate } from '../../../types'
import { useTimetableStore } from '../../../stores/timetable'
import { SubjectSelect } from './SubjectSelect'
import { type ChangeEvent, useState } from 'react'
import { truthy } from '../../../utilities/truthy'
import { Checkbox } from '../../../components/Form/Checkbox'
import { Flex } from '../../../components/Layout/Flex'
import { Text } from '../../../components/Layout/Text'
import { Box } from '../../../components/Layout/Box'
import { Tag } from '../../../components/Form/Tag'
import { classTypeColorSelector } from '../../../utilities/classTypeColorSelector'
import { InputGroup } from '../../../components/Form/InputGroup'
import { InputRightAddon } from '../../../components/Form/InputRightAddon'
import { Button } from '../../../components/Form/Button'
import { isClass } from '../../../utilities/isClass'
import { Textarea } from '../../../components/Form/Textarea'

export const ClassItemEdit = ({
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
      <Box maxWidth="calc(100% / 3)" minWidth="80px" marginY="8px">
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
        <Box
          width="100%"
          minHeight="50px"
          border="1px solid #000"
          fontSize="12px"
          lineHeight="14px"
          whiteSpace="pre-wrap"
        >
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
            border="1px solid #ccc"
          />
          {isDivide && (
            <>
              <SubjectSelect
                value={classItem.subject[1] ?? ''}
                onChange={onChangeSecondSubject}
                size="md"
                marginY="8px"
                border="1px solid #ccc"
              />
              <SubjectSelect
                value={classItem.subject[2] ?? ''}
                onChange={onChangeThirdSubject}
                size="md"
                marginY="8px"
                border="1px solid #ccc"
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
        <Textarea
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          height="80px"
          borderRadius="0.375rem 0 0 0.375rem"
        />
        <InputRightAddon height="80px" padding="0">
          <Button
            onClick={onUpdateNote}
            height="80px"
            borderRadius="0 0.315rem 0.315rem 0"
          >
            反映
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Box>
  )
}
