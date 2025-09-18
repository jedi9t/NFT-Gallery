# NFT-Gallery
构建一个简单的NFT展示DApp (NFT Gallery)


# 技术栈与预备知识
## 预备知识:

基础的 HTML, CSS, JavaScript 知识。

对 React 有初步了解（知道组件和状态即可）。

电脑上已安装 Node.js 和 npm (或 yarn)。

浏览器安装了 MetaMask 钱包（本项目中仅用于提供网络连接，不涉及交易）。

## 核心技术栈:

React: 用于构建前端用户界面。

Ethers.js: 用于连接以太坊和与智能合约交互的JavaScript库。

Alchemy: 我们将用它作为节点服务商，为我们的dApp提供稳定可靠的区块链访问。

# 实践步骤 (Step-by-Step Guide)
## 步骤 A: 环境搭建
1. 创建React项目: 打开你的终端（命令行工具），输入以下命令来创建一个新的React项目。
`bash
npx create-react-app nft-gallery
cd nft-gallery
`

2. 安装Ethers.js: 进入项目目录后，安装我们需要的核心库。
   `
    npm install ethers
   `
## 步骤 B: 获取Alchemy API[https://www.alchemy.com/]密钥
访问 Alchemy 官网并注册一个免费账户。

登录后，在Dashboard（仪表盘）点击 “+ CREATE APP”。

Chain 选择 Ethereum，Network 选择 Mainnet。

创建成功后，点击 “VIEW KEY”，复制你的 HTTPS 地址。它看起来像 https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY。请妥善保管。
