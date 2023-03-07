# DApp (탈중앙화 애플리케이션) 

▫ openzepplin 설치  
```
$ npm i @openzeppelin/contracts
```

▫ remix IDE 설치   
```
npm install -g @remix-project/remixd
```

▫ remix IDE 실행    
```
remixd -s . --remix-ide https://remix.ethereum.org
```

animalTokenId : NFT의 유일한 값을 증명  


solidity에서 랜덤 뽑기  
``` sol
uint256 animalType = uint256(keccak256(abi.ncodePacked(block.timestamp, msg.sender, animalTokenId))) % 5 + 1;
```

https://chakra-ui.com/getting-started/cra-guide