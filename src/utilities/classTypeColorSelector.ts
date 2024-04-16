import type { ClassTypeKeys } from '../types'

export const classTypeColorSelector = (classType: ClassTypeKeys) => {
  switch (classType) {
    case 'class': {
      return 'orange'
    }
    case 'break': {
      return 'teal'
    }
    case 'lunch': {
      return 'cyan'
    }
    default: {
      return 'gray'
    }
  }
}
