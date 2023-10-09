import React, { useState } from "react"
import styled from 'styled-components'

const Transaction = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`

const TransactionColumn = styled.div`
  flex: 1;
`

const Categories = ({ categories, transaction }) => <select defaultValue={transaction.category.id}>
  {categories.map((category) => <option 
      key={category.id}
      defaultValue={category.id === transaction.category.id} 
      value={category.id}
    >
      {category.name}
    </option>
  )}
  </select>

const TransactionsRow = ({ transaction, categories }) => {
  const [isbillable, setIsBillable] = useState(transaction.billable)

  return <Transaction key={transaction.id} data-testid="transactionRow">
    <TransactionColumn>{transaction.status}</TransactionColumn>
    <TransactionColumn>{transaction.date}</TransactionColumn>
    <TransactionColumn>{transaction.merchant.name}</TransactionColumn>
    <TransactionColumn>{transaction.team_member}</TransactionColumn>
    <TransactionColumn>
      <Categories categories={categories} transaction={transaction} />
    </TransactionColumn>
    <TransactionColumn>{transaction.amount}</TransactionColumn>
    <TransactionColumn>{transaction.gst}</TransactionColumn>
    <TransactionColumn>{transaction.budget}</TransactionColumn>
    <TransactionColumn>
      <input type="checkbox" checked={transaction.receipt} disabled={true} />
    </TransactionColumn>
    <TransactionColumn>
      <input type="checkbox" checked={isbillable} onChange={() => setIsBillable(!isbillable)} />
    </TransactionColumn>
  </Transaction>
}

export default TransactionsRow