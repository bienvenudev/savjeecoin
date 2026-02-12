import { useState } from 'react';
import { BlockView } from '../components/BlockView';
import { TransactionsTable } from '../components/TransactionsTable';
import { blockchainService } from '../services/blockchainService';

export function BlockchainViewer() {
  const [selectedBlock, setSelectedBlock] = useState(blockchainService.blockchainInstance.chain[0]);

  function showTransactionsForBlock(block: any) { setSelectedBlock(block); }

  return (
    <div>

      {
        // does this initialize a blockchainservice instance? why when i refresh the page, the block hash changes?
        blockchainService.blockchainInstance.chain.map(block => // why not this 'blockchainInstance.chain' instead of '.getBlocks()'?
          <BlockView key={block.hash} block={block} onClick={() => {
            showTransactionsForBlock(block);
          }} />


        )}

      {selectedBlock && (
        <div className='mt-8'>
          <h2 className="text-3xl font-bold mt-12 mb-4">Transactions inside block {selectedBlock.hash.substring(0, 8)}</h2>
          <TransactionsTable transactions={selectedBlock.transactions} />
        </div>
      )}
    </div>
  );
}