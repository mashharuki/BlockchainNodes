import { createPublicClient, formatEther, http } from 'viem'
import { sepolia } from 'viem/chains'

/**
 * ローカルのブロックチェーンノードを立ち上げてブロックナンバーを取得するサンプルスクリプト
 */
async function main() {
  // 立ち上げた環境に合わせて設定する。
  const rpcUrl = 'http://localhost:8545'

  // Sepoliaテストネットワークに接続するクライアントを作成
  const client = createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl) 
  })

  try {
    // chainIDを取得する。
    const chainID = client.chain.id.toString();
    // 現在のブロック番号を取得
    const blockNumber = await client.getBlockNumber()
    // ガス代も取得
    const gasPrice = await client.getGasPrice()
    
    console.log("チェーンID:", chainID);
    console.log('現在のブロック番号:', blockNumber);
    console.log('ガス代:', formatEther(gasPrice), 'ETH')
  } catch (error) {
    console.error('ブロック番号の取得中にエラーが発生しました:', error)
  }
}

main()