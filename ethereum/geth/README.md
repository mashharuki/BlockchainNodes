# geth

## JSON-RPC インターフェースの設定を追加する。

opensslで以下のコマンドを実行する。

```bash
openssl rand -hex 32 > ./data/jwt.hex
```

`jwt.hex` ファイルが生成されていればOK!

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
  -v /Users/harukikondo/git/BlockchainNodes/data/jwt.hex:/jwt.hex \
  -p 8545:8545 \
  -p 8551:8551 \
  -p 30303:30303 \
  ethereum/client-go \
  --syncmode snap \
  --cache=2048 \
  --authrpc.addr localhost \
  --authrpc.port 8551 \
  --authrpc.vhosts localhost \
  --sepolia \
  --http \
  --http.addr 0.0.0.0 \
  --http.port 8545 \
  --authrpc.jwtsecret /jwt.hex \
  --rpc.enabledeprecatedpersonal \
  --datadir ./data/geth \
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
2025-03-26 20:30:04 INFO [03-26|11:30:04.795] Starting Geth on Sepolia testnet...
2025-03-26 20:30:04 INFO [03-26|11:30:04.799] Maximum peer count                       ETH=50 total=50
2025-03-26 20:30:04 INFO [03-26|11:30:04.800] Smartcard socket not found, disabling    err="stat /run/pcscd/pcscd.comm: no such file or directory"
2025-03-26 20:30:04 WARN [03-26|11:30:04.800] Option --rpc.enabledeprecatedpersonal is deprecated. The 'personal' RPC namespace has been removed.
2025-03-26 20:30:04 WARN [03-26|11:30:04.827] Sanitizing cache to Go's GC limits       provided=2048 updated=1308
2025-03-26 20:30:04 INFO [03-26|11:30:04.829] Set global gas cap                       cap=50,000,000
2025-03-26 20:30:04 INFO [03-26|11:30:04.830] Initializing the KZG library             backend=gokzg
2025-03-26 20:30:04 INFO [03-26|11:30:04.865] Allocated trie memory caches             clean=196.00MiB dirty=327.00MiB
2025-03-26 20:30:04 INFO [03-26|11:30:04.866] Using pebble as the backing database
2025-03-26 20:30:04 INFO [03-26|11:30:04.866] Allocated cache and file handles         database=/root/.ethereum/sepolia/geth/chaindata cache=654.00MiB handles=524,288
2025-03-26 20:30:04 INFO [03-26|11:30:04.901] Opened ancient database                  database=/root/.ethereum/sepolia/geth/chaindata/ancient/chain readonly=false
2025-03-26 20:30:04 INFO [03-26|11:30:04.901] State scheme set to already existing     scheme=path
2025-03-26 20:30:04 INFO [03-26|11:30:04.902] Initialising Ethereum protocol           network=11,155,111 dbversion=9
2025-03-26 20:30:04 WARN [03-26|11:30:04.902] Sanitizing invalid node buffer size      provided=327.00MiB updated=256.00MiB
2025-03-26 20:30:04 INFO [03-26|11:30:04.902] Failed to load journal, discard it       err="journal not found"
2025-03-26 20:30:04 INFO [03-26|11:30:04.911] Opened ancient database                  database=/root/.ethereum/sepolia/geth/chaindata/ancient/state readonly=false
2025-03-26 20:30:04 INFO [03-26|11:30:04.911] Initialized path database                cache=196.00MiB buffer=256.00MiB history=90000
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] 
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] ---------------------------------------------------------------------------------------------------------------------------------------------------------
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] Chain ID:  11155111 (sepolia)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] Consensus: Beacon (proof-of-stake), merged from Ethash (proof-of-work)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] 
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] Pre-Merge hard forks (block based):
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Homestead:                   #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/homestead.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Tangerine Whistle (EIP 150): #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/tangerine-whistle.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Spurious Dragon/1 (EIP 155): #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/spurious-dragon.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Spurious Dragon/2 (EIP 158): #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/spurious-dragon.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Byzantium:                   #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/byzantium.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Constantinople:              #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/constantinople.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Petersburg:                  #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/petersburg.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Istanbul:                    #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/istanbul.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Muir Glacier:                #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/muir-glacier.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Berlin:                      #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/berlin.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - London:                      #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/london.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] 
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] Merge configured:
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Hard-fork specification:    https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Network known to be merged
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Total terminal difficulty:  17000000000000000
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Merge netsplit block:       #1735371 
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] 
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] Post-Merge hard forks (timestamp based):
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Shanghai:                    @1677557088 (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Cancun:                      @1706655072 (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)
2025-03-26 20:30:04 INFO [03-26|11:30:04.912]  - Prague:                      @1741159776
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] 
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] ---------------------------------------------------------------------------------------------------------------------------------------------------------
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] 
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] Loaded most recent local block           number=0 hash=25a5cc..3e6dd9 age=3y6mo1w
2025-03-26 20:30:04 WARN [03-26|11:30:04.912] Loaded snapshot journal                  diffs=missing
2025-03-26 20:30:04 INFO [03-26|11:30:04.912] Initialized transaction indexer          range="last 2350000 blocks"
2025-03-26 20:30:04 INFO [03-26|11:30:04.957] Enabled snap sync                        head=0 hash=25a5cc..3e6dd9
2025-03-26 20:30:04 INFO [03-26|11:30:04.957] Gasprice oracle is ignoring threshold set threshold=2
2025-03-26 20:30:04 WARN [03-26|11:30:04.958] Unclean shutdown detected                booted=2025-03-26T11:28:23+0000 age=1m41s
2025-03-26 20:30:04 WARN [03-26|11:30:04.958] Engine API enabled                       protocol=eth
2025-03-26 20:30:04 INFO [03-26|11:30:04.958] Starting peer-to-peer node               instance=Geth/v1.15.7-unstable-21d36f7c-20250325/linux-amd64/go1.24.1
2025-03-26 20:30:04 INFO [03-26|11:30:04.981] New local node record                    seq=1,742,988,503,915 id=81a4135d853a8e86 ip=127.0.0.1 udp=30303 tcp=30303
2025-03-26 20:30:04 INFO [03-26|11:30:04.983] Started P2P networking                   self=enode://d46ccfe9e224c1859a2a897175d3e2214a59edea8a7bd7565e5873db70b48e4c73f1f89fbba2c690063f98a6e22260037a1c6b1d9b5fca3f4c4414c3f0b6bacd@127.0.0.1:30303
2025-03-26 20:30:04 INFO [03-26|11:30:04.986] IPC endpoint opened                      url=/root/.ethereum/sepolia/geth.ipc
2025-03-26 20:30:04 INFO [03-26|11:30:04.987] Generated JWT secret                     path=jwt.hex
2025-03-26 20:30:04 INFO [03-26|11:30:04.992] WebSocket enabled                        url=ws://127.0.0.1:8551
2025-03-26 20:30:04 INFO [03-26|11:30:04.992] HTTP server started                      endpoint=127.0.0.1:8551 auth=true prefix= cors=localhost vhosts=localhost
2025-03-26 20:30:04 INFO [03-26|11:30:04.992] Started log indexer
2025-03-26 20:30:19 INFO [03-26|11:30:19.189] Looking for peers                        peercount=1 tried=15 static=0
2025-03-26 20:30:29 INFO [03-26|11:30:29.291] Looking for peers                        peercount=1 tried=33 static=0
2025-03-26 20:30:39 INFO [03-26|11:30:39.462] Looking for peers                        peercount=1 tried=25 static=0
2025-03-26 20:30:39 WARN [03-26|11:30:39.961] Post-merge network, but no beacon client seen. Please launch one to follow the chain!
2025-03-26 20:30:49 INFO [03-26|11:30:49.609] Looking for peers                        peercount=1 tried=17 static=0
```

## コンセンサスクライアントを立ち上げる

lodestarを使う場合は以下のようにDockerイメージをプルして実行する。

```bash
docker pull chainsafe/lodestar
```

ちゃんと取得できたか以下のコマンドで確認

```bash
docker images
```

```bash
REPOSITORY              TAG               IMAGE ID       CREATED      SIZE
chainsafe/lodestar      latest            803c6dd878f8   5 days ago   584MB
nethermind/nethermind   latest-chiseled   d23344a9cbc9   6 days ago   371MB
```

helpコマンドを実行してみる

```bash
docker run chainsafe/lodestar --help
```

以下のようにコマンドのオプションなどが表示されていればOK!

```bash
🌟 Lodestar: TypeScript Implementation of the Ethereum Consensus Beacon Chain.

 * Version: v1.28.1/d565aac
  * by ChainSafe Systems, 2018-2025

Commands:
  beacon       Run a beacon chain node
  validator    Run one or multiple validator clients
  lightclient  Run lightclient
  dev          Quickly bootstrap a beacon node and multiple validators. Use for
               development and testing
  bootnode     Run a discv5 bootnode. This will NOT perform any beacon node func
               tions, rather, it will run a discv5 service that allows nodes on
               the network to discover one another.

Options:
      --dataDir                             Lodestar root data directory[string]
      --network                             Name of the Ethereum Consensus chain
                                             network to join
  [string] [choices: "mainnet", "gnosis", "sepolia", "holesky", "hoodi", "chiado
                                        ", "ephemery", "dev"] [default: mainnet]
      --paramsFile                          Network configuration file  [string]
      --rcConfig                            RC file to supplement command line a
                                            rgs, accepted formats: .yml, .yaml,
                                            .json                       [string]
      --terminal-total-difficulty-override  Terminal PoW block TTD override
                                                                        [string]
      --terminal-block-hash-override        Terminal PoW block hash override
                                                                        [string]
      --terminal-block-hash-epoch-override  Terminal PoW block hash override act
                                            ivation epoch               [string]
  -h, --help                                Show help                  [boolean]
  -v, --version                             Show version number        [boolean]

📖 For more information, check the CLI reference:
  * https://chainsafe.github.io/lodestar/reference/cli

✍️ Give feedback and report issues on GitHub:
  * https://github.com/ChainSafe/lodestar
```

今回は sepoliaを選択する。 
同期用のエンドポイントのURLはネットワーク毎に異なるので注意！

```bash
docker run -d \
  -v /Users/harukikondo/git/BlockchainNodes/data/jwt.hex:/usr/app/jwt.hex \
  chainsafe/lodestar beacon \
  --network sepolia \
  --jwt-secret /usr/app/jwt.hex \
  --checkpointSyncUrl https://beaconstate-sepolia.chainsafe.io
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