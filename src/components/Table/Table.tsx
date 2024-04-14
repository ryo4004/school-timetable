import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td as ChakraTd,
  type TableCellProps,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const Td = (props: TableCellProps) => {
  return <ChakraTd minWidth="90px" padding="0" {...props} />
}

export { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer }
