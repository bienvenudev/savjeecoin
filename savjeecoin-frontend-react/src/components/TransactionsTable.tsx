
export function TransactionsTable({ transactions }: any) {
  return (
    transactions?.length === 0 ? <p>This block has no transactions</p> : (
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Timestamp</th>
              <th>Valid?</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((tx: any, index: number) => (<tr key={index}> <td>{index}</td> <td>{tx.fromAddress}</td> <td>{tx.toAddress}</td> <td>{tx.amount}</td> <td>{tx.timestamp}</td> <td>{tx.isValid() ? '✓' : '✗'}</td> </tr>))}
          </tbody>
        </table>
      </div>
    ));
}

