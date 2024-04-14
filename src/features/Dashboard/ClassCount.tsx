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
    <>
      {config.subjects.map((subject) => {
        return (
          <div key={subject}>
            {subject}: {counts[subject]}
          </div>
        )
      })}
    </>
  )
}

const countClassesEachDate = (
  accumulator: Record<string, number>,
  timetable: Timetable,
  classConfigs: ClassConfig[],
) => {
  return timetable.list.reduce((dateAccumulator, timetableDate) => {
    const classesList = classConfigs.map((classConfig) => {
      const target = timetableDate.classes[classConfig.id]
      return target.subject
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
