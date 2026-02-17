import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { BlockchainViewer } from "./pages/BlockchainViewer"
import { Settings } from "./pages/Settings";
import { CreateTransaction } from "./pages/CreateTransaction";
import { PendingTransactions } from "./pages/PendingTransactions";
import { WalletDetails } from "./pages/WalletDetails";

function App() {

  return (
    <BrowserRouter>
      <nav className='bg-gray-800 p-4 text-white flex justify-between items-center'>
        <Link to="/" className="font-bold text-xl">SavjeeCoin</Link>

        <div>
          <Link to="/settings">
            <button className="font-bold outline-2 cursor-pointer p-3 rounded hover:bg-white hover:text-gray-500">
              Settings
            </button>
          </Link>
          <Link to="/new/transaction">
            <button className="ml-4 font-bold outline-2 cursor-pointer p-3 rounded hover:bg-white hover:text-gray-500">
              Create Transaction
            </button>
          </Link>
          <Link to="/new/transaction/pending">
            <button className="ml-4 font-bold outline-2 cursor-pointer p-3 rounded hover:bg-white hover:text-gray-500">
              Pending Transactions
            </button>
          </Link>
        </div>
      </nav>

      <main className="px-10 pt-4">
        <Routes>
          <Route path="/" element={<BlockchainViewer />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/new/transaction" element={<CreateTransaction />} />
          <Route path="/new/transaction/pending" element={<PendingTransactions />} />
          <Route path="/wallet/:walletAddress" element={<WalletDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App
