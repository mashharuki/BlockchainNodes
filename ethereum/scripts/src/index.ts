import { createPublicClient, http } from 'viem'
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
    // 現在のブロック番号を取得
    const blockNumber = await client.getBlockNumber()
    
    console.log('現在のブロック番号:', blockNumber)
  } catch (error) {
    console.error('ブロック番号の取得中にエラーが発生しました:', error)
  }
}

main()