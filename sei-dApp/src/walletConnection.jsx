import { http, createConfig, WagmiProvider, useConnect, useAccount, useBalance, useSendTransaction} from 'wagmi'
import { seiTestnet } from 'wagmi/chains'
import { injected} from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient ()
export const config = createConfig({
  chains: [seiTestnet],
  connectors: [
    injected()
  ],
  transports: {
    [seiTestnet.id]: http(),

  },
})


function WalletConnection() {

  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client = {queryClient}>
      <WalletConnector/>
      <EthSend>
      </EthSend>
      <MyAddress/>
    </QueryClientProvider>
    </WagmiProvider>
  )
}

function EthSend () {
  const {data : hash, sendTransaction} = useSendTransaction();

  function sendSei () {
    sendTransaction ({
      to: document.getElementById("address").value,
      value: "100000000000000000"
  })
}
  return (
    <div>
      <input id="address" type="text" placeholder='Address'/>
      <button onClick={sendSei}> 0.1 Sei</button>
      <br />
      {hash}
    </div>
  )
}
function MyAddress () {
  const {address} = useAccount();
  const balance = useBalance({address});
  console.log(balance)
  return <div>
    {address}
    <br />
    {balance?.data?.formatted}
    
  </div>
}
function WalletConnector () {
  const {connectors, connect} = useConnect()

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}
export default WalletConnection;
