# build-directory-tree

## Description

可以用来快速获取当前目录结构并生成结构树.
A javascript to build a directory tree.

## Usage

将 `index.js` 文件放到像生成目录结构的目录下，控制台 `node index.js` 即可生成，并会自动写入 `directoryTree.txt` 文件中。
```
node index.js
```
同时，终端控制台会显示执行进度、目录结构及文件数量统计
```
folder: 7
file: 6
txt 格式文件: 1 份
js 格式文件: 3 份
json 格式文件: 1 份
html 格式文件: 1 份
The directory tree was built successfully!! 
Total time: 5.58ms
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
