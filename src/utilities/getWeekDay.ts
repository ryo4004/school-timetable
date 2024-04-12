import type { DateTime } from 'luxon'

export const getWeekDay = (dateTime: DateTime) => {
  return ['月', '火', '水', '木', '金', '土', '日'][
    Number(dateTime.toFormat('c')) - 1
  ]
}
