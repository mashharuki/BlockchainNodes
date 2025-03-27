# Nethermindによるブロックチェーンノード立ち上げメモ

## dockerイメージの取得

```bash
docker pull nethermind/nethermind:latest-chiseled
```

ちゃんと取得できたか以下のコマンドで確認

```bash
docker images
```

```bash
REPOSITORY              TAG               IMAGE ID       CREATED      SIZE
nethermind/nethermind   latest-chiseled   d23344a9cbc9   6 days ago   371MB
```

## Dcokerコンテナの起動(シンプル)

```bash
docker run -it nethermind/nethermind:latest-chiseled -c sepolia
```

ボリュームのマウント場所を明示的に指定する場合は以下で実行する。

```bash
docker run -it \
  -p 8545:8545 \
  -p 8551:8551 \
  -p 30303:30303 \
  --mount type=bind,source="$(pwd)/data/nethermind",target="$(pwd)/data/nethermind" \
  nethermind/nethermind:latest-chiseled \
  -c sepolia \
  --data-dir "$(pwd)/data/nethermind" \
  --JsonRpc.Enabled true \
  --JsonRpc.Host 0.0.0.0 \
  --JsonRpc.Port 8545 \
  --JsonRpc.EngineHost 0.0.0.0 \
  --JsonRpc.EnginePort 8551 \
  --JsonRpc.EnabledModules "eth,net,web3,personal" \
  --JsonRpc.JwtSecretFile="$(pwd)/data/nethermind/jwt.hex"
```

以下のようになればOK！

```bash

```

## (オプション)SON-RPC インターフェースの設定を追加する。

自分で `jwt.hex` を用意したい場合は以下のコマンドを実行する。  
※ nethermindの実行クライアントを実行した時に自動的に生成される。

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
docker run -it \
  -p 9000:9000 \
  -p 9596:9596 \
  -p 443:443 \
  -v "$(pwd)/data/nethermind/jwt.hex:/jwt.hex" \
  chainsafe/lodestar beacon \
  --network sepolia \
  --jwt-secret /jwt.hex \
  --execution.urls http://localhost:8551 \
  --eth1.providerUrls http://localhost:8551 \
  --checkpointSyncUrl https://beaconstate-sepolia.chainsafe.io
```

以下のようになればOK！

```bash

```