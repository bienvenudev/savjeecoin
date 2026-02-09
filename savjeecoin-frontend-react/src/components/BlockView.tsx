interface Props {
  block: any;
}

export function BlockView({ block }: Props) {

  return (
    <div className="rounded-lg border border-gray-300 w-[18rem] inline-block mr-4">
      <div className="p-4">
        <h5 className="text-lg font-semibold">
          Block {block.hash.substring(0, 8)}
          {block.previousHash === '0' && <small className="text-gray-500 text-sm ml-2">(Genesis block)</small>}
        </h5>
      </div>

      <ul className="divide-y divide-gray-300">
        <li className="p-4">
          <span className="font-medium">Hash</span>
          <div className="text-gray-600 truncate mt-2">
            <small style={{ color: '#' + block.hash.substring(0, 6) }}>{block.hash}</small>
          </div>

          <span className="font-medium block mt-4">Hash of previous block</span>
          <div className="text-gray-600 truncate mt-2">
            <small style={{ color: '#' + block.previousHash.substring(0, 6) }}>{block.previousHash}</small>
          </div>
        </li>

        <li className="p-4">
          <span className="font-medium">Nonce</span>
          <div className="text-gray-600 truncate mt-2">
            <small>{block.nonce}</small>
          </div>
        </li>

        <li className="p-4">
          <span className="font-medium">Timestamp</span>
          <div className="text-gray-600 truncate mt-2">
            <small>{block.timestamp}</small>
          </div>
        </li>
      </ul>
    </div>
  )

  {/* <div className="p-4">
    {!block.transactions?.length && <span className="text-blue-600 cursor-pointer">Block has no transactions</span>}
    {block.transactions?.length > 0 && <span className="text-blue-600 cursor-pointer">Contains {block.transactions.length} transactions</span>}
  </div> */}
}