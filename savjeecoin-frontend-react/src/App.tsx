import { BlockchainViewer } from "./pages/BlockchainViewer"

function App() {

  return (
    <>
      <nav className='bg-gray-800 p-4'>
        <a href="/" className="text-white font-bold">SavjeeCoin</a>
      </nav>

      <main className="px-10">
        <h1 className="text-2xl font-bold mb-4">Blocks on chain</h1>
        <p className="mb-6">Each card represents a block on the chain. Click on a block to see the transactions stored inside.</p>

      <BlockchainViewer />
      </main>
    </>
  )
}

export default App
