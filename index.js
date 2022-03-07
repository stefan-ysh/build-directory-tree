// 递归目录树（只能用同步，用异步会出现后面的文件比前面的文件先输出，顺序会乱。）
// 默认按照ASCII码的顺序，例如js里面的sort()函数。

// 先写一层的情况
// 抽象递归参数
// 找到突破点（避免死循环）
// 自己调自己，某种情况（肯定会存在的）不调用

const fs = require("fs");
const path = require("path");
let str = "";
let result = {
  folder: 0,
  file: 0,
};
console.time("Total time");
// 清除写入文件内容
whriteInTxt("");

// 根目录
console.log("root");
appendToTxt("root");

// 获取当前有没有传入目标路径
var target = path.join(__dirname, process.argv[2] || "./");

function changstrs(str) {
  let ss = "";

  for (var s = 0; s < str.length; s++) {
    let item = str[s];

    if (item != "/" && item != "@" && item != ":") {
      ss += item;
    }
  }

  /* str.forEach((item,index)=>{
        if((item!="/" &&  item!="@") && item!=":"){
            ss+=item;
        }
    })
    */
  return ss;
}

function load(target, depth) {
  // depth  0 = ''
  // depth  1 = '│ '
  // depth  2 = '│ │ '
  var prefix = new Array(depth + 1).join("│ "); // join()函数的妙用
  //console.log("target",target);
  //console.log("target",depth);

  let ssf = changstrs(target);
  if (ssf.indexOf("node_modules") != -1) {
    //如果是 node_modules 下的 npm 包，则不进行遍历
    return false;
  }

  //  读取一个目录的内容，返回一个不包括 '.' 和 '..' 的文件名的数组。
  var dirInfos = fs.readdirSync(target);

  // 文件夹数组
  var dirs = [];
  // 文件数组
  var files = [];

  // 遍历文件夹信息
  dirInfos.forEach((info) => {
    // 返回一个 fs.Stats 实例
    var stats = fs.statSync(path.join(target, info));
    if (stats.isFile()) {
      files.push(info);
      // 核心包 path 模块的extname()
      if (result[path.extname(info)]) {
        result[path.extname(info)] += 1;
      } else {
        result[path.extname(info)] = 0;
        result[path.extname(info)] += 1;
      }
    } else {
      dirs.push(info);
    }
  });
  // 遍历文件夹
  dirs.forEach((dir) => {
    console.log(`${prefix}├─${dir}`); // node_modules
    str += `${prefix}├─${dir}\n`;
    appendToTxt(`${prefix}├─${dir}`);
    // 当前是一个目录 需要深入进去
    result.folder += 1;
    load(path.join(target, dir), depth + 1);
  });

  var count = files.length - 1; // 此处必须-1与下面的count--想对应
  // 遍历文件
  files.forEach((file) => {
    var temp = count-- ? "├" : "└"; // 三元运算符的妙用
    console.log(`${prefix}${temp}─${file}`);
    appendToTxt(`${prefix}${temp}─${file}`);
    result.file += 1;
  });
}

load(target, 0);
// 无级分类

//同步的写入
// fs.writeFileSync("./directoryTree.txt",str);
//同步的追加，采用同步追加，避免目录结构错乱
// fs.appendFileSync("./directoryTree.txt",str);
// fs.wirteFile有三个参数
// 1,第一个参数是要写入的文件路径
// 2,第二个参数是要写入得内容
// 3,第三个参数是可选参数,表示要写入的文件编码格式,一般就不写,默认就行
// 4,第四个参数是个回调函数  只有一个参数error,来判断是否写入成功
//如果在使用fs.writeFIle时,要写入文件不存在,则直接写入,如果存在,则会覆盖原内容

function appendToTxt(text) {
  fs.appendFileSync("./directoryTree.txt", `${text}\n`, (error) => {
    if (error) return console.log("写入文件失败,原因是" + error.message);
    console.log("写入成功");
  });
}

function whriteInTxt(text) {
  fs.writeFileSync("./directoryTree.txt", `${text}`, (error) => {
    if (error) return console.log("写入文件失败,原因是" + error.message);
    console.log("写入成功");
  });
}

// 控制台打印信息及统计
// console.table([result]);

for (let item in result) {
  if (["folder", "file"].indexOf(item) > -1) {
    console.log("\x1B[36m%s\x1B[0m", `${item}: ${result[item]}`);
  } else {
    console.log(
      "\x1B[36m%s\x1B[0m",
      `${item.substring(1)} 格式文件: ${result[item]} 份`
    );
  }
}
console.log(
  "\x1B[36m%s\x1B[0m",
  "The directory tree was built successfully!! "
);
console.timeEnd("Total time");
