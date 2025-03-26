# Base

## Base のノードの立ち上げ方

`node` ディレクトリ配下で以下のコマンドを実行していく。

環境変数を設定する。

```bash
cp .env.example .env
```

メインネットかテストネットを設定する。

```txt
# For mainnet:
export NETWORK_ENV=.env.mainnet
# For testnet:
export NETWORK_ENV=.env.sepolia
```

ネットワークの設定が終わったら環境変数で 2 つ値を設定し直す。

```txt
# [required] replace with your preferred L1 (Ethereum, not Base) node RPC URL:
OP_NODE_L1_ETH_RPC=<ここにL1のRPCエンドポイントURLを設定する>
```

その設定が完了したら docker compose でコンテナ群を立ち上げる

```bash
docker compose up --build
```

## 立ち上がったら試すコマンド

```bash
curl -d '{"id":0,"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false]}' \
  -H "Content-Type: application/json" http://localhost:8545
```

以下のようになれば OK!

```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": {
    "baseFeePerGas": "0x3b9aca00",
    "difficulty": "0x0",
    "extraData": "0x424544524f434b",
    "gasLimit": "0x17d7840",
    "gasUsed": "0x0",
    "hash": "0x0dcc9e089e30b90ddfc55be9a37dd15bc551aeee999d2e2b51414c54eaf934e4",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0x4200000000000000000000000000000000000011",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000",
    "number": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x209",
    "stateRoot": "0x907f339ca16b3e45a89a7f4cc29d4430c8d4178d73b370ec9180e04a0dd7fcf3",
    "timestamp": "0x65135ee0",
    "transactions": [],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": []
  }
}
```
