import { BlockchainViewer } from "./pages/BlockchainViewer"

function App() {

  return (
    <>
      <nav className='bg-gray-800 p-4'>
        <a href="/" className="text-white font-bold">SavjeeCoin</a>
      </nav>

      <main className="px-10 pt-4">
        <BlockchainViewer />
      </main>
    </>
  )
}

export default App
