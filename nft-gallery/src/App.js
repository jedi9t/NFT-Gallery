// src/App.js

import { useState } from 'react';
import { ethers } from 'ethers';

// 一个简化的ABI，只包含了我们需要的函数
// 完整的ABI可以从Etherscan上获取
const simplifiedAbi = [
  "function name() view returns (string)",
  "function tokenURI(uint256 tokenId) view returns (string)"
];

// 这是一个公共的Alchemy API Key，建议换成你自己的
const ALCHEMY_URL = process.env.REACT_APP_ALCHEMY_URL;;
// 默认展示的BAYC合约地址
const baycContractAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

function App() {
  const [nfts, setNfts] = useState([]);
  const [contractName, setContractName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchNFTs = async () => {
    setIsLoading(true);
    setNfts([]); // 清空之前的NFT
    try {
      // 1. 连接到以太坊网络
      // Old Code (v5)
      // const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL);
      // New Code (v6)
      const provider = new ethers.JsonRpcProvider(ALCHEMY_URL);

      // 2. 创建一个合约实例，用于后续交互
      const ALCHEMY_URL_BASE = "https://eth-mainnet.g.alchemy.com/v2/";
      // 2.1 从环境变量中读取你的Key
      const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_KEY;
      // 2.2 将它们安全地拼接成完整的URL
      const ALCHEMY_URL = `${ALCHEMY_URL_BASE}${ALCHEMY_API_KEY}`;


      const contract = new ethers.Contract(baycContractAddress, simplifiedAbi, provider);

      // 3. 读取合约名称
      const name = await contract.name();
      setContractName(name);

      let nftData = [];
      // 4. 循环读取前5个NFT的数据
      for (let i = 1; i <= 5; i++) {
        console.log(`正在读取第 ${i} 个NFT...`);
        // 读取该NFT的元数据URI。这是一个指向IPFS或HTTP服务器的链接。
        const tokenUri = await contract.tokenURI(i);
        
        // 由于IPFS链接可能无法直接访问，我们将其替换为公共网关
        // const metadataUrl = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
        const metadataUrl = tokenUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        

        // 5. 通过获取到的URI，请求真实的元数据（一个JSON文件）
        const metadataResponse = await fetch(metadataUrl);
        const metadata = await metadataResponse.json();

        // 6. 从元数据中提取图片链接和NFT名称
        nftData.push({
          id: i,
          name: metadata.name,
          // image: metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
          image: metadata.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
        });
      }
      setNfts(nftData);

    } catch (error) {
      console.error("获取NFT数据失败:", error);
      alert("获取NFT数据失败，请检查合约地址或网络连接。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>NFT Gallery</h1>
      <p>点击按钮，展示BAYC合约的前5个NFT</p>
      <button onClick={fetchNFTs} disabled={isLoading}>
        {isLoading ? '正在加载...' : '查询NFT'}
      </button>

      {contractName && <h2>{contractName}</h2>}

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {nfts.map(nft => (
          <div key={nft.id} style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '10px', padding: '10px', width: '200px' }}>
            <img src={nft.image} alt={nft.name} style={{ width: '100%', borderRadius: '4px' }}/>
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{nft.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;