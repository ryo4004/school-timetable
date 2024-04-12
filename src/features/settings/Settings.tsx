import { useTimetableStore } from '../../stores/timetable'

export const Settings = () => {
  const { config, createTimetable } = useTimetableStore()

  return (
    <>
      <h2>settings</h2>
      {config.classes.map((classItem, index) => (
        <div key={classItem.id}>
          {index}: {classItem.name}
        </div>
      ))}
      <button onClick={() => createTimetable()}>作成</button>
    </>
  )
}
