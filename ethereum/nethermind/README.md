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
docker run -it nethermind/nethermind:latest-chiseled
```
