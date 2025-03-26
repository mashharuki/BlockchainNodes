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
  --authrpc.addr localhost \
  --authrpc.port 8551 \
  --authrpc.vhosts localhost \
  --authrpc.jwtsecret ./data/jwt.hex \
  --rpc.enabledeprecatedpersonal \
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

```

## JSON-RPC インターフェースの設定を追加する。

opensslで以下のコマンドを実行する。

`ethereum` フォルダ配下で実行すること

```bash
openssl rand -hex 32 > config/jwt.hex
```

`jwt.hex` ファイルが生成されていればOK!

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
docker run chainsafe/lodestar beacon \
  --network sepolia \
  --jwt-secret config/jwt.hex \
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