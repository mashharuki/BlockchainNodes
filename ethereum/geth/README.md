# geth

## Dockerを使って動かす方法

以下のDocerHubにあるコンテナイメージを使う

https://hub.docker.com/r/ethereum/client-go/

コンテナイメージをpullしてくる。

```bash
docker pull ethereum/client-go
```

以下のコマンドでちゃんととってこれているか確認する。

```bash
docker images | grep ethereum/client-go
```

以下のコマンドで sepolia用のノードを立ち上げてみる。

コンテナ名やマウントするボリュームの設定、ポート番号等を設定する。

この例では sepoliaのノードを立ち上げている。

```bash
docker run -d --name ethereum-node \
  -v /Users/harukikondo/git/BlockchainNodes/data:/root \
  -p 8545:8545 \
  -p 30303:30303 \
  ethereum/client-go \
  --syncmode snap \
  --cache=2048 \
  --sepolia \
  --http \
  --http.addr "0.0.0.0" \
  --http.port 8545 \
  --http.api "eth,net,web3" \
  --http.corsdomain "*"
```

以下のコマンドでコンテナが起動しているかチェックする

```bash
docker ps
```

正常に処理されていれば、 `ethereum-node` という名前のコンテナが起動されているはず。

```bash
CONTAINER ID   IMAGE                COMMAND            CREATED          STATUS          PORTS                                                                   NAMES
ba78b9e6b1d9   ethereum/client-go   "geth --sepolia"   28 seconds ago   Up 27 seconds   0.0.0.0:8545->8545/tcp, 0.0.0.0:30303->30303/tcp, 8546/tcp, 30303/udp   ethereum-node
```

コンテナの起動ログを確認して ちゃんと sepolia ネットワークとして起動していればOK!!

```bash
2025-03-26 12:51:27 INFO [03-26|03:51:27.879] Starting Geth on Sepolia testnet...
2025-03-26 12:51:27 INFO [03-26|03:51:27.880] Maximum peer count                       ETH=50 total=50
2025-03-26 12:51:27 INFO [03-26|03:51:27.882] Smartcard socket not found, disabling    err="stat /run/pcscd/pcscd.comm: no such file or directory"
2025-03-26 12:51:27 WARN [03-26|03:51:27.889] Sanitizing cache to Go's GC limits       provided=2048 updated=1308
2025-03-26 12:51:27 INFO [03-26|03:51:27.890] Set global gas cap                       cap=50,000,000
2025-03-26 12:51:27 INFO [03-26|03:51:27.890] Initializing the KZG library             backend=gokzg
2025-03-26 12:51:27 INFO [03-26|03:51:27.996] Allocated trie memory caches             clean=196.00MiB dirty=327.00MiB
2025-03-26 12:51:27 INFO [03-26|03:51:27.997] Defaulting to pebble as the backing database
2025-03-26 12:51:27 INFO [03-26|03:51:27.997] Allocated cache and file handles         database=/root/.ethereum/sepolia/geth/chaindata cache=654.00MiB handles=524,288
2025-03-26 12:51:28 INFO [03-26|03:51:28.066] Opened ancient database                  database=/root/.ethereum/sepolia/geth/chaindata/ancient/chain readonly=false
2025-03-26 12:51:28 INFO [03-26|03:51:28.066] State schema set to default              scheme=path
2025-03-26 12:51:28 ERROR[03-26|03:51:28.066] Head block is not reachable
2025-03-26 12:51:28 INFO [03-26|03:51:28.068] Initialising Ethereum protocol           network=11,155,111 dbversion=<nil>
2025-03-26 12:51:28 WARN [03-26|03:51:28.068] Sanitizing invalid node buffer size      provided=327.00MiB updated=256.00MiB
2025-03-26 12:51:28 INFO [03-26|03:51:28.138] Opened ancient database                  database=/root/.ethereum/sepolia/geth/chaindata/ancient/state readonly=false
2025-03-26 12:51:28 INFO [03-26|03:51:28.138] Initialized path database                cache=196.00MiB buffer=256.00MiB history=90000
2025-03-26 12:51:28 INFO [03-26|03:51:28.138] Writing custom genesis block
2025-03-26 12:51:28 INFO [03-26|03:51:28.149] 
2025-03-26 12:51:28 INFO [03-26|03:51:28.149] ---------------------------------------------------------------------------------------------------------------------------------------------------------
2025-03-26 12:51:28 INFO [03-26|03:51:28.149] Chain ID:  11155111 (sepolia)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149] Consensus: Beacon (proof-of-stake), merged from Ethash (proof-of-work)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149] 
2025-03-26 12:51:28 INFO [03-26|03:51:28.149] Pre-Merge hard forks (block based):
2025-03-26 12:51:28 INFO [03-26|03:51:28.149]  - Homestead:                   #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/homestead.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149]  - Tangerine Whistle (EIP 150): #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/tangerine-whistle.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149]  - Spurious Dragon/1 (EIP 155): #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/spurious-dragon.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149]  - Spurious Dragon/2 (EIP 158): #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/spurious-dragon.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149]  - Byzantium:                   #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/byzantium.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149]  - Constantinople:              #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/constantinople.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149]  - Petersburg:                  #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/petersburg.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149]  - Istanbul:                    #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/istanbul.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149]  - Muir Glacier:                #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/muir-glacier.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149]  - Berlin:                      #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/berlin.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149]  - London:                      #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/london.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.149] 
2025-03-26 12:51:28 INFO [03-26|03:51:28.149] Merge configured:
2025-03-26 12:51:28 INFO [03-26|03:51:28.150]  - Hard-fork specification:    https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md
2025-03-26 12:51:28 INFO [03-26|03:51:28.150]  - Network known to be merged
2025-03-26 12:51:28 INFO [03-26|03:51:28.150]  - Total terminal difficulty:  17000000000000000
2025-03-26 12:51:28 INFO [03-26|03:51:28.150]  - Merge netsplit block:       #1735371 
2025-03-26 12:51:28 INFO [03-26|03:51:28.150] 
2025-03-26 12:51:28 INFO [03-26|03:51:28.150] Post-Merge hard forks (timestamp based):
2025-03-26 12:51:28 INFO [03-26|03:51:28.150]  - Shanghai:                    @1677557088 (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.150]  - Cancun:                      @1706655072 (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)
2025-03-26 12:51:28 INFO [03-26|03:51:28.150]  - Prague:                      @1741159776
2025-03-26 12:51:28 INFO [03-26|03:51:28.150] 
2025-03-26 12:51:28 INFO [03-26|03:51:28.150] ---------------------------------------------------------------------------------------------------------------------------------------------------------
2025-03-26 12:51:28 INFO [03-26|03:51:28.150] 
2025-03-26 12:51:28 INFO [03-26|03:51:28.150] Loaded most recent local block           number=0 hash=25a5cc..3e6dd9 age=3y6mo1w
2025-03-26 12:51:28 WARN [03-26|03:51:28.150] Failed to load snapshot                  err="missing or corrupted snapshot"
2025-03-26 12:51:28 INFO [03-26|03:51:28.150] Rebuilding state snapshot
2025-03-26 12:51:28 INFO [03-26|03:51:28.151] Initialized transaction indexer          range="last 2350000 blocks"
2025-03-26 12:51:28 INFO [03-26|03:51:28.151] Resuming state snapshot generation       root=5eb6e3..a3f494 accounts=0 slots=0 storage=0.00B dangling=0 elapsed="177.558µs"
2025-03-26 12:51:28 INFO [03-26|03:51:28.151] Generated state snapshot                 accounts=15 slots=0 storage=722.00B dangling=0 elapsed="369.912µs"
2025-03-26 12:51:28 INFO [03-26|03:51:28.231] Enabled snap sync                        head=0 hash=25a5cc..3e6dd9
2025-03-26 12:51:28 INFO [03-26|03:51:28.235] Gasprice oracle is ignoring threshold set threshold=2
2025-03-26 12:51:28 WARN [03-26|03:51:28.235] Engine API enabled                       protocol=eth
2025-03-26 12:51:28 INFO [03-26|03:51:28.235] Starting peer-to-peer node               instance=Geth/v1.15.7-unstable-21d36f7c-20250325/linux-amd64/go1.24.1
2025-03-26 12:51:28 INFO [03-26|03:51:28.255] New local node record                    seq=1,742,961,088,254 id=b0693a8c76aa5fb2 ip=127.0.0.1 udp=30303 tcp=30303
2025-03-26 12:51:28 INFO [03-26|03:51:28.256] Started P2P networking                   self=enode://f44b9c176452db63578303b08248548e749d7e0f4607b8928f1248792de87360459e11cece9631499711e90745363705889bdf57bc65fab579b3d0c9b0c0cb21@127.0.0.1:30303
2025-03-26 12:51:28 INFO [03-26|03:51:28.258] IPC endpoint opened                      url=/root/.ethereum/sepolia/geth.ipc
2025-03-26 12:51:28 INFO [03-26|03:51:28.259] Generated JWT secret                     path=/root/.ethereum/sepolia/geth/jwtsecret
2025-03-26 12:51:28 INFO [03-26|03:51:28.259] HTTP server started                      endpoint=[::]:8545 auth=false prefix= cors=* vhosts=localhost
2025-03-26 12:51:28 INFO [03-26|03:51:28.260] WebSocket enabled                        url=ws://127.0.0.1:8551
2025-03-26 12:51:28 INFO [03-26|03:51:28.260] HTTP server started                      endpoint=127.0.0.1:8551 auth=true  prefix= cors=localhost vhosts=localhost
2025-03-26 12:51:28 INFO [03-26|03:51:28.261] Started log indexer
2025-03-26 12:51:38 INFO [03-26|03:51:38.665] Looking for peers                        peercount=0 tried=33 static=0
2025-03-26 12:51:48 INFO [03-26|03:51:48.760] Looking for peers                        peercount=0 tried=59 static=0
2025-03-26 12:51:58 INFO [03-26|03:51:58.919] Looking for peers                        peercount=1 tried=45 static=0
```

同期までに時間がかかるが、ちゃんとブロックチェーンにアクセスできるか確認するためのスクリプトを実行してみる。

`scripts` フォルダに移動して依存関係をインストールする。

```bash
bun install
```

そして以下のコマンドを実行

```bash
bun dev
```

以下のようにブロックナンバーが出力されればOK!

```bash
現在のブロック番号: 0n
```

スクリプトの中身は以下！

```ts
import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'

/**
 * ローカルのブロックチェーンノードを立ち上げてブロックナンバーを取得するサンプルスクリプト
 */
async function getBlockNumber() {
  // Sepoliaテストネットワークに接続するクライアントを作成
  const client = createPublicClient({
    chain: sepolia,
    transport: http('http://localhost:8545') // ローカルノードのアドレスに合わせて調整してください
  })

  try {
    // 現在のブロック番号を取得
    const blockNumber = await client.getBlockNumber()
    
    console.log('現在のブロック番号:', blockNumber)
  } catch (error) {
    console.error('ブロック番号の取得中にエラーが発生しました:', error)
  }
}

// スクリプトを実行
getBlockNumber()
```