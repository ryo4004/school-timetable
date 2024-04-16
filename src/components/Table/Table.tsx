import {
  Table as ChakraTable,
  type TableProps,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th as ChakraTh,
  Td as ChakraTd,
  type TableCellProps,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const Table = (props: TableProps) => {
  return <ChakraTable border="1px solid #000" {...props} />
}

const Th = (props: TableCellProps) => {
  return (
    <ChakraTh
      padding="0"
      border="1px solid #000"
      fontWeight="bold"
      textTransform="none"
      {...props}
    />
  )
}

const Td = (props: TableCellProps) => {
  return <ChakraTd padding="0" border="1px solid #000" {...props} />
}

export { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer }
