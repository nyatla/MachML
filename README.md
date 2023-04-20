# MachML
手書きのhtmlをマッハで多言語化するためのスクリプトです。

拡張タグでコンテンツに直接翻訳文章を併記することができます。

```
<!DOCTYPE html>
<html>
	<head>
        <script src="../src/machml.min.tile.js"></script>
	</head>
	<body>
        <ml-text
            en="This is English"
            ja="日本語です"
            ja-kyoto="京都どすえ"
        ></ml-text>
 	</body>
</html>
```

ブロック要素を書くこともできます。
```
<!DOCTYPE html>
<html>
	<head>
        <script src="../src/machml.min.tile.js"></script>
	</head>
	<body>
        <ml-block >
            <p data-lang="en"><i>Hello World</i></p>
            <p data-lang="ja">こんにちは<b>世界</b></p>
        </ml-block>
 	</body>
</html>
```
## 記述式

MachMLには文章併記のための２つの拡張タグがあります。

### ml-text

ロケールごとの文字列を併記するためのタグです。属性にロケール名、値に表示する文章を書きます。
```
<ml-text
    en="This is English"
    ja="日本語です"
    ja-kyoto="京都どすえ"
></ml-text>
```
最初に定義した属性がデフォルト値になります。指定したロケールが存在しない場合、デフォルト値を表示します。

### ml-block

ロケールごとのHTMLを併記するためのタグです。直下のタグのうち、data-lang属性を持つタグの中からロケール名に一致する要素だけを表示します。
```
<ml-block >
    <p data-lang="en"><i>Hello World</i></p>
    <p data-lang="ja">こんにちは<b>世界</b></p>
</ml-block>
```
最初に定義した属性がデフォルト値になります。指定したロケールが存在しない場合、デフォルト値を表示します。



## API
このスクリプトは自動で言語とロケールをブラウザの環境変数から判定しますが、手動で言語を切り替えたい場合は、MachMLオブジェクトを使います。

次のコードは、表示言語を'en'に切り替えます。

```
MachML.setLocale('en')
```

## 言語の選択ボタン

簡易的な言語選択ボタンを表示するには、ml-selectタグを使います。
```
<ml-select langs="en ja-jp ja-kyoto"></ml-select>
```
langs属性に選択肢を設定します。




## 言語とロケールの選択ルール

併記した文章の選択ルールは、完全一致→言語一致の順で判定されます。

例えば現在のロケールがja_jpの場合、まずja-jpが探索され、次にjaが探索されます。
何もなければ、一番初めに定義した文章が使われます。

APIやタグで指定するロケールのデリミタは、'-'を使ってください。



## 動的書き換え
動的書き換えは推奨していません。
特にinnerHTMLを使ったml-blockの操作は想定外の動作を引き起こす可能性があります。



# セットアップ

Githubからコピペしてください。

machml.min.jsは圧縮したJSファイルです。

machml.min.tile.jsはコピペしやすく四角くカットしたJSファイルです。


## machml.minの生成.js

```
$npm install uglify-js -g
$uglifyjs machml.js --compress --mangle -o machml.min.js
```
## machml.min.tile.jsの生成

頑張って120文字位で改行