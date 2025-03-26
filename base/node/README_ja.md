Baseノード
Baseは、安全で低コスト、開発者向けのEthereumレイヤー2（L2）ネットワークであり、次の10億人のユーザーをオンチェーンに導くことを目的としています。Optimismのオープンソース「OP Stack」を基盤として構築されています。

このリポジトリには、Baseネットワーク上で独自のノードを運用するためのDockerビルド関連ファイルが含まれています。


ハードウェア要件
ノードを運用するために、以下のハードウェア構成を推奨します：

最新のマルチコアCPU（シングルコア性能が高いもの）

最低16GBのRAM（推奨は32GB）

ローカル接続のNVMe SSD

十分なストレージ容量（スナップショット復元を行う場合、以下の計算式を満たす必要があります）：

```scss
(2 * 現在のチェーンサイズ) + スナップショットサイズ + 20%の余裕
```

注意: Amazon Elastic Block Store（EBS）を使用する場合、ディスクの読み込み速度が十分に高速であることを確認してください。特に、Baseの初期同期時には、新しいブロックの追加速度に追従できる必要があります。**「io2 Block Express」**の利用を推奨します。


Discordで問い合わせ

Discordに参加し、サーバーメニュー → Linked Roles からGitHubアカウントを接続してください。

開発者向けサポートチャンネル：

#🛟|developer-support

#🛠｜node-operators

対応ネットワーク
Baseネットワーク	ステータス
テストネット (Sepolia)	✅
メインネット	✅
使用方法

事前準備

Ethereum L1のフルノードRPCを用意する（Baseのものではない）。

.env.* ファイルで OP_NODE_L1_ETH_RPC を設定する（docker-composeを使用する場合）。

自前でL1ノードを運用する場合、Baseを完全に同期させる前にL1ノードが同期済みである必要があります。

ネットワーク環境変数の設定

```sh
# メインネットの場合
export NETWORK_ENV=.env.mainnet

# テストネット（Sepolia）の場合
export NETWORK_ENV=.env.sepolia
```
ノードの起動

```sh
docker compose up --build
```

サポートされているクライアント

```sh
# 以下のクライアントを指定可能
CLIENT=supported_client docker compose up --build
```

- geth
- reth
- nethermind

ノードの動作確認

```sh
curl -d '{"id":0,"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false]}' \
  -H "Content-Type: application/json" http://localhost:8545
```

注意: 一部のL1ノード（例: Erigon）はストレージ証明の取得に対応していません。この場合、--l1.trustrpc を指定して op-node を起動することで回避できますが、信頼できるL1ノードプロバイダーでのみ実施してください。

データの永続化
デフォルトでは、データディレクトリは ${PROJECT_ROOT}/geth-data に保存されます。
環境変数 GETH_HOST_DATA_DIR を .env ファイルで設定することで変更できます。

スナップショットのロード
スナップショットを $GETH_HOST_DATA_DIR に展開すると復元できます。

単一コンテナでの実行（supervisord）
Docker Composeを使用せずに、単一のコンテナ でノードを実行したい場合、supervisord エントリーポイントを利用できます。
これは Kubernetes クラスター などで運用する際に便利です。

設定例:

```sh
docker run --env-file .env.sepolia \
  -e OP_NODE_L2_ENGINE_RPC=ws://localhost:8551 \
  -e OP_NODE_RPC_PORT=7545 \
  ghcr.io/base/node:latest
```

注意: マルチコンテナ環境を前提とした設定（OP_NODE_L2_ENGINE_RPC など）は適宜オーバーライドしてください。

スナップショット
最新のスナップショットは、Baseのドキュメントで提供されているURLから取得できます。

同期
同期速度はL1ノードに依存します。Baseチェーンの大部分はL1に提出されたデータから生成されるため、L1の同期状態が重要です。

同期状態の確認
以下のコマンドで、最新の同期ブロックとの差分を分単位で確認できます：

```sh
command -v jq &> /dev/null || { echo "jq is not installed" 1>&2 ; }
```

```sh
echo 最新同期ブロックとの差: \
$((($( date +%s )-\
$( curl -s -d '{"id":0,"jsonrpc":"2.0","method":"optimism_syncStatus"}' \
   -H "Content-Type: application/json" http://localhost:7545 |
   jq -r .result.unsafe_l2.timestamp))/60)) 分
```
 
免責事項
Base上での開発を歓迎します🔵！
しかし、このリポジトリに含まれる ノードソフトウェアやスマートコントラクト には、以下の点を理解した上で使用してください。

保証なし
このソフトウェアは "現状のまま" 提供 されており、一切の保証がありません。

市場価値の維持や資産の安全性は保証されません。

ハッキング・サイバー攻撃・盗難・損失による影響を防ぐ保証はありません。

法的制約
本ソフトウェアの利用は、適用される法規制の対象となる可能性があります。

マネーロンダリング防止法、テロ対策法、輸出規制、制裁規則 などの法的制限に従う必要があります。

この訳でわかりやすくなりましたか？ 😊