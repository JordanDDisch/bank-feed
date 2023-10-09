import React from "react"
import TransactionsRow from "../../components/TransactionRow/index"
import { useTransactions } from "./hooks/index"
import styled from 'styled-components'

const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const TranasctionHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border-bottom: 1px solid;
  padding: 1rem 0;
`

const TransactionColumn = styled.div`
  display: flex;
  flex: 1;
  gap: 1rem;
`

const Transactions = ({ data }) => {
  const { filteredData, searchValue, setSearchValue } = useTransactions({data})

  return (
    <TransactionsContainer>
      <div>
        <label>Search </label>
        <input placeholder="Search" value={searchValue} onChange={(input) => setSearchValue(input.target.value)} />
      </div>
      <TranasctionHeader>
        <TransactionColumn>Status</TransactionColumn>
        <TransactionColumn>Date</TransactionColumn>
        <TransactionColumn>Merchant Name</TransactionColumn>
        <TransactionColumn>Team Member</TransactionColumn>
        <TransactionColumn>Category</TransactionColumn>
        <TransactionColumn>Amount</TransactionColumn>
        <TransactionColumn>GST</TransactionColumn>
        <TransactionColumn>Budget</TransactionColumn>
        <TransactionColumn>Receipt</TransactionColumn>
        <TransactionColumn>Billable</TransactionColumn>
      </TranasctionHeader>
      {filteredData.length > 0 && filteredData.map(transaction => <TransactionsRow 
        key={transaction.id}
        transaction={transaction} 
        categories={data.categories}
      />)}
    </TransactionsContainer>
  )
}

export default Transactions