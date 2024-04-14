export const replaceElements = <T>(
  array: T[], // 入れ替える配列
  targetIndex: number, // 入れ替えたいindex
  sourceIndex: number, // 入れ替え対象のindex
) => {
  return array.reduce((acc, current, currentIndex, originalArray) => {
    return [
      ...acc,
      currentIndex === targetIndex
        ? originalArray[sourceIndex]
        : currentIndex === sourceIndex
          ? originalArray[targetIndex]
          : current,
    ]
  }, [] as T[])
}
