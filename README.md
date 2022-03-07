# build-directory-tree

## Description

可以用来快速获取当前目录结构并生成结构树.
A javascript to build a directory tree.

## Usage

将 `index.js` 文件放到像生成目录结构的目录下，控制台 `node index.js` 即可生成，并会自动写入 `directoryTree.txt` 文件中。
```
node index.js
```
## Demo

当前仓库所生成的目录为

```
root
├─server
│ ├─config
│ ├─logs
│ ├─models
│ ├─public
│ ├─routes
│ │ └─index.js
│ └─app.js
├─web
│ └─index.html
├─directoryTree.txt
├─index.js
└─package.json
```
