# 05. First DApp
Web3를 이용하여 이더리움과 상호작용하기

<br>

## DApp - Decentralized Application
▫ 탈중앙화된 P2P 네트워크 상에 백엔드 로직이 구동되는 응용프로그램  
- 블록체인 상의 스마트 컨트랙트가 기존의 중앙화된 서버에 의해 서비스를 제공하는 시스템 대체 

▫ 좀 더 좁은 의미에서 DApp은 사용자 인터페이스를 통해 블록체인의 스마트 컨트랙트를 호출함으로써 동작하는 응용프로그램   

▫ DApp = Frontend + Smart Contracts on Blockchain

<br><br>

## DApp 구성 요소

1️⃣ 스마트 컨트랙트   
▫ 서비스 로직이 구현된 이더리움 네트워크에 배포된 바이트코드    

2️⃣ 사용자 인터페이스     
▫ DApp의 사용자 인터페이스  
▫ 주로 HTML, CSS, JavaScript 등 프론트엔드 기술로 구현  

3️⃣ Web3 API for JavaScript   
▫ 이더리움 스마트 컨트랙트와 JavaScript 코드 간의 상호작용 지원     
▫ web3.0은 넓은 의미로 모든 정보가 분산, 분권화된 차세대 네트워크를 일컬음 
- 소규모 회사에 정보가 집중되어 있는 web2.0과 대조  

<br><br>

## web3.js
▫ 이더리움 네트워크와 상호작용할 수 있게 하는 JavaScript 라이브러리 모음        

![image](https://user-images.githubusercontent.com/93974908/220698489-fbcd8c8a-e354-4031-a554-c3fce27d7995.png)

<br><br>

## First DApp 구현
1_Storage.sol의 DApp 제작

### 컨트랙트 배포
![image](https://user-images.githubusercontent.com/93974908/220802395-ddcfef68-e055-4d50-a80b-873887f7c282.png)

▫ 1_Storage.sol 컨트랙트 컴파일 & 배포     
> Injected Provider에서 배포    

![image](https://user-images.githubusercontent.com/93974908/220802669-268a884e-0981-4e3e-b502-96e9bf0c04f9.png)

![image](https://user-images.githubusercontent.com/93974908/220802892-3dd9a840-d72d-4e8c-b3cf-fc7e9103cc2b.png)

### 간단한 화면 제작 
▫ 컨트랙트와 상호 작용할 간단한 화면 구현 (html)        
▫ web3.js 사용하기  
- html 파일에 cdn 추가
- 별도의 JS 파일 생성   

### web3 객체 생성 
▫ 화면이 로드될 때 web3 객체 생성   
▫ MetaMask에서 Ropsten 네트워크의 RPC URL을 확인하여 변수로 생성    
``` js
window.addEventListener("load", () => {
  if (typeof web3 !== "undefined") {
    window.web3 = new Web3(web3.currentProvider)
    alert('web3 injected')
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider(ROPSTEN_URL))
  }
  startApp();
});
```

### 계정 정보 생성
▫ 컨트랙트 호출에 사용할 계정 정보 세팅     
- 계정의 개인키를 변수로 생성
- 개인키로부터 계정을 생성해주는 web3 API를 활용하여 주소를 얻어냄  
``` js
sender = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
web3.eth.accounts.wallet.add(sender);
web3.eth.defalutAccount = sender.address;
senderAddress = web3.eth.defalutAccount;
```

### retrieve() 호출
▫ 비용이 소요되지 않는 호출, call   
```js
contract.methods.retrieve().call({from: address}).then(console.log);
```
- 함수이름 : retrieve
- from (recommended) : 보내는 주소
- gasPrice (optional)
- gas (optional)

### store() 호출
▫ 트랜잭션을 생성하는, send 
``` js
contract.methods.store(value)
.send({
    from: address,
    gas: gasLimit,
    gasPrice: gasPrice
}).then(console.log);
```
- 함수 이름 (파라미터)
- from (required) : 보내는 주소
- gasPrice (optional)
- gas (optional)
- value (optional)




▫ 
▫ 
▫ 
▫ 