import React, { useState, useEffect } from "react"

export const useTransactions = ({ data }) => {
  const normaliseData = data.transactions.map(transaction => {
    const category = data.categories.find(category => category.id === transaction.category)
    const merchant = data.merchants.find(merchant => merchant.id === transaction.merchant)

    return {
      ...transaction,
      category: category,
      merchant: merchant,
      date: new Date(transaction.date).toString(),
      amount: parseFloat(transaction.amount)
    }
  })
  const [filteredData, setFilteredData] = useState([])
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    const filterTransactions = () => {
      const team_member = normaliseData.filter(transaction => transaction.team_member.toLowerCase().includes(searchValue.toLowerCase()))
      const category = normaliseData.filter(transaction => transaction.category.name.toLowerCase().includes(searchValue.toLowerCase()))
      const budget = normaliseData.filter(transaction => transaction.budget.toLowerCase().includes(searchValue))
      const amount = normaliseData.filter(transaction => transaction.amount.toString().includes(searchValue))
      const gst = normaliseData.filter(transaction => transaction.gst.toString().includes(searchValue))
      const merchants = normaliseData.filter(transaction => transaction.merchant.name.toLowerCase().includes(searchValue.toLowerCase()))
      
      const filteredTransactions = [...team_member, ...category, ...budget, ...amount, ...gst, ...merchants]
  
      // Create a Set to keep track of unique transaction ids
      const uniqueIds = new Set();
  
      // Filter out duplicate transactions based on their id
      const uniqueTransactions = filteredTransactions.filter(transaction => {
        if (!uniqueIds.has(transaction.id)) {
          uniqueIds.add(transaction.id);
          return true;
        }
        return false;
      });

      return uniqueTransactions
    }

    if(searchValue) {
      setFilteredData(filterTransactions())
    } else {
      setFilteredData(normaliseData)
    }
  }, [searchValue])

  return { 
    filteredData,
    searchValue,
    setSearchValue
  }
}