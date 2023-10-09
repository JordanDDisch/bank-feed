import React from 'react';
import App from './App';
import "@testing-library/jest-dom"
import { cleanup, waitFor, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import categoriesData from './data/categories.json';
import merchantsData from './data/merchants.json';
import transactionsData from './data/transactions.json';

const renderApp = ({
  categories = categoriesData,
  merchants = merchantsData,
  transactions = transactionsData
} = {}) => render(
  <App
    categories={categories}
    merchants={merchants}
    transactions={transactions}
  />
);

it('should show title', () => {
  renderApp();
  
  screen.getByRole("heading", { name: "Transactions" });
});

describe("status", () => {
  it("should show transaction status when it is complete", () => {
    const completeTransaction = transactionsData.find(({ status }) => status === "complete");
    renderApp({ transactions: [completeTransaction] });
  
    expect(screen.getByText("complete"))
  });
  
  it("should show transaction status when it is incomplete", () => {
    const incompleteTransaction = transactionsData.find(({ status }) => status === "incomplete");
    renderApp({ transactions: [incompleteTransaction] });
  
    expect(screen.getByText("incomplete"))
  });
});

describe("filtering", () => {
  afterAll(() => {
      cleanup();
  });
  test("should show search for transaction based on Merchant Name", async () => {
    renderApp();
  
    expect(screen.getByPlaceholderText("Search"))

    userEvent.type(screen.getByPlaceholderText("Search"), "Woolworths")

    await waitFor(() => {
      expect(screen.queryByText("Google")).not.toBeInTheDocument()
    })

    expect(await screen.findAllByTestId("transactionRow")).toHaveLength(20)
  });
})
