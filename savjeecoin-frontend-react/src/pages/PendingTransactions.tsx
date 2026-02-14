import { TransactionsTable } from "../components/TransactionsTable";
import { blockchainService } from '../services/blockchainService';
import { useState } from "react";
import { Link } from "react-router-dom";


export function PendingTransactions() {
  const [pending, setPending] = useState(blockchainService.getPendingTransactions());

  function handleMine() {
    blockchainService.mineTransactions();
    setPending(blockchainService.getPendingTransactions())
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-12">Pending Transactions</h1>

      <TransactionsTable transactions={pending} />

      {blockchainService.getPendingTransactions().length > 0 &&
        <Link to={'/'}>
          <button className='mt-8 font-bold outline-2 bg-blue-500 text-white cursor-pointer p-3 rounded hover:bg-blue-600 active:bg-blue-700' onClick={handleMine}>Start mining</button>
        </Link>
      }

    </>
  )
}
