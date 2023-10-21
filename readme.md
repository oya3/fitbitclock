# ソース取得

``` shell
$ git clone https://github.com/oya3/fitbitclock
```


# 開発環境準備

``` shell
$ cd fitbitclock
$ npm i
```

# 開発環境で実行

``` shell
# 実行すると chrome 起動されるのでブラウザでfitbitアカウント認証しておく
$ npx fitbit
# 1度目は以下の内容が表示される場合があるため２度実行する
Failed to read auth token from keychain: [object Object]
# ２度目はgoogle-chromeでfitbit認証画面が表示される
$ npx fitbitNo login information, starting login...
Logged in as kazunori oya <kazunori.oya3@gmail.com>
fitbit$
# ビルド＆インストール
fitbit> bi
```

