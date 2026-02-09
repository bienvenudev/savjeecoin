import { BlockView } from '../components/BlockView';
import { blockchainService } from '../services/blockchainService';

export function BlockchainViewer() {
  return (
    <div>

      {
        blockchainService.blockchainInstance.chain.map(block =>
          <BlockView key={block.hash} block={block} />
        )
      }
    </div>
  );
}