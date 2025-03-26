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
  --mount type=bind,source=/Users/harukikondo/git/BlockchainNodes/data/nethermind,target=/Users/harukikondo/git/BlockchainNodes/data/nethermind \
  nethermind/nethermind:latest-chiseled \
  -c sepolia \
  --data-dir /Users/harukikondo/git/BlockchainNodes/data/nethermind \
  --JsonRpc.Enabled true \
  --JsonRpc.Host 0.0.0.0 \
  --JsonRpc.Port 8545 \
  --JsonRpc.EnabledModules "eth,net,web3,personal" \
  --JsonRpc.JwtSecretFile=/Users/harukikondo/git/BlockchainNodes/data/nethermind/jwt.hex 
```

以下のようになればOK！

```bash
26 Mar 03:54:37 | Nethermind is starting up 
26 Mar 03:54:37 | Version: 1.31.6+4e68f8ee 
26 Mar 03:54:37 | Loading embedded plugins 
26 Mar 03:54:37 |   Found plugin type Nethermind.Consensus.AuRa.AuRaPlugin 
26 Mar 03:54:37 |   Found plugin type Nethermind.Consensus.Clique.CliquePlugin 
26 Mar 03:54:37 |   Found plugin type Nethermind.Consensus.Ethash.EthashPlugin 
26 Mar 03:54:37 |   Found plugin type Nethermind.Consensus.Ethash.NethDevPlugin 
26 Mar 03:54:37 |   Found plugin type Nethermind.Hive.HivePlugin 
26 Mar 03:54:37 |   Found plugin type Nethermind.UPnP.Plugin.UPnPPlugin 
26 Mar 03:54:37 | Loading 13 assemblies from /nethermind/plugins 
26 Mar 03:54:37 | Loading assembly Nethermind.ExternalSigner.Plugin 
26 Mar 03:54:37 |   Found plugin type Nethermind.ExternalSigner.Plugin 
26 Mar 03:54:37 | Loading assembly Nethermind.Init 
26 Mar 03:54:37 | Loading assembly Nethermind.Optimism 
26 Mar 03:54:37 |   Found plugin type Nethermind.Optimism 
26 Mar 03:54:37 | Loading assembly Nethermind.Merge.Plugin 
26 Mar 03:54:37 |   Found plugin type Nethermind.Merge.Plugin 
26 Mar 03:54:37 | Loading assembly Nethermind.Consensus.AuRa 
26 Mar 03:54:37 | Loading assembly Nethermind.JsonRpc.TraceStore 
26 Mar 03:54:37 |   Found plugin type Nethermind.JsonRpc.TraceStore 
26 Mar 03:54:37 | Loading assembly Nethermind.HealthChecks 
26 Mar 03:54:37 |   Found plugin type Nethermind.HealthChecks 
26 Mar 03:54:37 | Loading assembly Nethermind.Merge.AuRa 
26 Mar 03:54:37 |   Found plugin type Nethermind.Merge.AuRa 
26 Mar 03:54:37 | Loading assembly Nethermind.EthStats 
26 Mar 03:54:37 |   Found plugin type Nethermind.EthStats 
26 Mar 03:54:37 | Loading assembly Nethermind.Init.Snapshot 
26 Mar 03:54:37 |   Found plugin type Nethermind.Init.Snapshot 
26 Mar 03:54:37 | Loading assembly Nethermind.Api 
26 Mar 03:54:37 | Loading assembly Nethermind.Shutter 
26 Mar 03:54:37 |   Found plugin type Nethermind.Shutter 
26 Mar 03:54:37 | Loading assembly Nethermind.Taiko 
26 Mar 03:54:37 |   Found plugin type Nethermind.Taiko 
26 Mar 03:54:37 | Loading configuration from /nethermind/configs/mainnet.json 
26 Mar 03:54:37 | Configuration complete 
26 Mar 03:54:37 | RocksDB: v9.7.3 
26 Mar 03:54:37 | ChainSpecPath matched an embedded resource inside the binary. Loading chainspec from embedded resources instead of file! 
26 Mar 03:54:38 | Loading Ckzg trusted setup from file /nethermind/kzg_trusted_setup.txt 
26 Mar 03:54:38 | CPU:  (CT) 
26 Mar 03:54:38 | Using http://ipv4.icanhazip.com to get external ip 
26 Mar 03:54:38 | Setting up memory allowances 
26 Mar 03:54:38 |   Memory hint:         2048 MB 
26 Mar 03:54:38 |   General memory:        32 MB 
26 Mar 03:54:38 |   Peers memory:          50 MB 
26 Mar 03:54:38 |   Netty memory:         268 MB 
26 Mar 03:54:38 |   Mempool memory:        81 MB 
26 Mar 03:54:38 |   Fast blocks memory:   161 MB 
26 Mar 03:54:38 |   Trie memory:          290 MB 
26 Mar 03:54:38 |   DB memory:           1163 MB 
26 Mar 03:54:38 | Generating private key for the node (no node key in configuration) - stored in plain + key store for JSON RPC unlocking 
26 Mar 03:54:40 | Store this password for unlocking the node key for JSON RPC - this is not secure - this log message will be in your log files. Use only in DEV contexts. 
26 Mar 03:54:40 | Block tree initialized, last processed is 0, best queued is 0, best known is 0, lowest inserted header , lowest sync inserted block number  
26 Mar 03:54:40 | Initializing 16 plugins 
26 Mar 03:54:40 |   Clique by Nethermind 
26 Mar 03:54:40 |   Clique by Nethermind initialized in 0ms 
26 Mar 03:54:40 |   AuRa by Nethermind 
26 Mar 03:54:40 |   AuRa by Nethermind initialized in 0ms 
26 Mar 03:54:40 |   Ethash by Nethermind 
26 Mar 03:54:40 |   Ethash by Nethermind initialized in 4ms 
26 Mar 03:54:40 |   Optimism by Nethermind 
26 Mar 03:54:40 |   Optimism by Nethermind initialized in 0ms 
26 Mar 03:54:40 |   Taiko by Nethermind 
26 Mar 03:54:40 |   Taiko by Nethermind initialized in 0ms 
26 Mar 03:54:40 |   NethDev by Nethermind 
26 Mar 03:54:40 |   NethDev by Nethermind initialized in 0ms 
26 Mar 03:54:40 |   Shutter by Nethermind 
26 Mar 03:54:40 | Initializing Shutter plugin. 
26 Mar 03:54:40 |   Shutter by Nethermind initialized in 0ms 
26 Mar 03:54:40 |   AuRaMerge by Nethermind 
26 Mar 03:54:40 |   AuRaMerge by Nethermind initialized in 1ms 
26 Mar 03:54:40 |   Merge by Nethermind 
26 Mar 03:54:40 | Client started with TTD: 58750000000000000000000, TTD reached: True, Terminal Block Number , FinalTotalDifficulty: 58750003716598352816469 
26 Mar 03:54:40 |   Merge by Nethermind initialized in 26ms 
26 Mar 03:54:40 |   HealthChecks by Nethermind 
26 Mar 03:54:40 |   HealthChecks by Nethermind initialized in 4ms 
26 Mar 03:54:40 |   Hive by Nethermind 
26 Mar 03:54:40 |   Hive by Nethermind initialized in 1ms 
26 Mar 03:54:40 |   Clef signer by Nethermind 
26 Mar 03:54:40 |   Clef signer by Nethermind initialized in 1ms 
26 Mar 03:54:40 |   EthStats by Nethermind 
26 Mar 03:54:40 |   EthStats by Nethermind initialized in 1ms 
26 Mar 03:54:40 |   Snapshot by Nethermind 
26 Mar 03:54:40 |   Snapshot by Nethermind initialized in 0ms 
26 Mar 03:54:40 |   TraceStore by Nethermind 
26 Mar 03:54:40 |   TraceStore by Nethermind initialized in 0ms 
26 Mar 03:54:40 |   UPnP by Nethermind 
26 Mar 03:54:40 |   UPnP by Nethermind initialized in 0ms 
26 Mar 03:54:40 | No current state db key scheme. 
26 Mar 03:54:40 | Snap serving enabled, but PruningBoundary is less than 128. Setting to 128. 
26 Mar 03:54:41 | Persisting from root 0xd7f897...0f0544 in block 0 
26 Mar 03:54:41 | Persisting from root 0xd7f897...0f0544 in block 0 
26 Mar 03:54:41 | Now syncing nodes starting from root of block 0 
26 Mar 03:54:41 | Loaded 0 static nodes from file: /nethermind/Data/static-nodes.json 
26 Mar 03:54:41 | Waiting for Forkchoice message from Consensus Layer to set fresh pivot block [0s] 
26 Mar 03:54:41 | No block tree levels to review for fixes. All fine. 
26 Mar 03:54:41 | Numbers resolved, level = 0, header = 0, body = 0 
26 Mar 03:54:41 | Beacon Numbers resolved, level = 0, header = 0, body = 0 
26 Mar 03:54:41 | Loading fork choice info 
26 Mar 03:54:41 | Grafana / Prometheus metrics are disabled in configuration 
26 Mar 03:54:41 | System.Diagnostics.Metrics disabled 
26 Mar 03:54:41 | Starting Merge block producer & sealer 
26 Mar 03:54:42 | Connected to 3 bootnodes, 3 trusted/persisted nodes 
26 Mar 03:54:46 | Engine Module has been enabled 
26 Mar 03:54:46 | Starting Ethash block producer & sealer 
26 Mar 03:54:46 | Generating authentication secret... 
26 Mar 03:54:46 | The authentication secret hasn't been found in '/nethermind/keystore/jwt-secret'so it has been automatically created. 
26 Mar 03:54:46 | 
======================== Nethermind initialization completed ========================
This node    : enode://86c89d43a578411d803dbb6988f14caf8b7d0e05fc432cf7879e9ed6c54536d1e7dfb2b54a896e06949e827f782f2b12a99f5842323b82c9b60a0e16ab27fdfc@113.150.159.167:30303
RPC modules  : Eth, Net, Parity, Personal, Proof, Rpc, Subscribe, Trace, TxPool, Web3
Node address : 0xc5c5f63e0a2d079d276817d455bfd074c17afffd (do not use as an account)
Mem est tx   :     8 MB
Mem est DB   :   128 MB
JSON RPC     : http://127.0.0.1:8545 ; http://localhost:8551
Genesis hash : 0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3
External IP  : 113.150.159.167
Ethereum     : tcp://113.150.159.167:30303
Discovery    : udp://113.150.159.167:30303
Client id    : Nethermind/v1.31.6+4e68f8ee/linux-x64/dotnet9.0.3
Chainspec    : chainspec/foundation.json
Chain head   : 0
Chain ID     : Mainnet
===================================================================================== 
26 Mar 03:54:51 | Peers | with best block: 0 | all: 1 | | Active: None | Sleeping: All 
26 Mar 03:54:51 | Waiting for Forkchoice message from Consensus Layer to set fresh pivot block [10s] 
26 Mar 03:55:01 | Waiting for Forkchoice message from Consensus Layer to set fresh pivot block [20s] 
26 Mar 03:55:11 | Waiting for Forkchoice message from Consensus Layer to set fresh pivot block [30s] 
26 Mar 03:55:21 | Waiting for Forkchoice message from Consensus Layer to set fresh pivot block [40s] 
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
  -v /Users/harukikondo/git/BlockchainNodes/data/nethermind/jwt.hex:/jwt.hex \
  chainsafe/lodestar beacon \
  --network sepolia \
  --jwt-secret /jwt.hex \
  --eth1.providerUrls http://localhost:8545 \
  --checkpointSyncUrl https://beaconstate-sepolia.chainsafe.io
```

以下のようになればOK！

```bash

```