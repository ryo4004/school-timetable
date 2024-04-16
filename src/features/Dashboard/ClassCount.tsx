import { Box } from '../../components/Layout/Box'
import { Chip } from '../../components/Layout/Chip'
import { Flex } from '../../components/Layout/Flex'
import { Text } from '../../components/Layout/Text'
import { useConfigStore } from '../../stores/configs'
import { useTimetableStore } from '../../stores/timetable'
import { ClassConfig, Timetable } from '../../types'

export const ClassCount = () => {
  const { config } = useConfigStore()
  const { timetables } = useTimetableStore()

  const countTable = config.subjects.reduce(
    (acc, current) => {
      return { ...acc, [current]: 0 }
    },
    {} as Record<string, number>,
  )

  const counts = timetables.reduce((acc, timetable) => {
    return countClassesEachDate(acc, timetable, config.classes)
  }, countTable)

  return (
    <Box>
      <Text as="h3" marginTop="16px">
        授業数カウント
      </Text>
      {config.subjects.map((subject) => {
        return (
          <Flex key={subject} padding="8px 8px 8px 0" alignItems="center">
            <Text minWidth="50px">{subject}</Text>
            <Text width="50px" textAlign="right" fontWeight="bold">
              {formatCountNumber(counts[subject])}
            </Text>
            <DecimalValue count={counts[subject]} />
          </Flex>
        )
      })}
    </Box>
  )
}

const formatCountNumber = (count: number) => {
  return Math.floor(count)
}

const DecimalValue = ({ count }: { count: number }) => {
  const decimalValue = Math.trunc((count - Math.trunc(count)) * 1000)
  switch (decimalValue) {
    case 333: {
      return <Chip label="1 / 3" borderColor="#0288d1" color="#0288d1" />
    }
    case 500: {
      return <Chip label="1 / 2" borderColor="#2e7d32" color="#2e7d32" />
    }
    case 666: {
      return <Chip label="2 / 3" borderColor="#ed6c02" color="#ed6c02" />
    }
    default: {
      return null
    }
  }
}

const countClassesEachDate = (
  accumulator: Record<string, number>,
  timetable: Timetable,
  classConfigs: ClassConfig[],
) => {
  return timetable.list.reduce((dateAccumulator, timetableDate) => {
    const classesList = classConfigs.map((classConfig) => {
      const target = timetableDate.classes[classConfig.id]
      return target?.subject ?? []
    })

    const countup = classesList.reduce((accumulator, classes) => {
      if (classes.length === 1) {
        return {
          ...accumulator,
          [classes[0]]: accumulator[classes[0]] + 1,
        }
      } else if (classes.length > 1) {
        const updatedAccumulator = classes.reduce((accum, currentClass) => {
          const add = 1 / classes.length

          return {
            ...accum,
            [currentClass]: accum[currentClass] + add,
          }
        }, accumulator)
        return updatedAccumulator
      }
      return accumulator
    }, dateAccumulator)

    return countup
  }, accumulator)
}
