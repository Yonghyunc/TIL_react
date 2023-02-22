# 01. Blockchain Basic

1. 블록체인 분류
2. 이더리움 네트워크
3. Ropsten 실습 환경 준비
4. Ropsten 테스트넷 실습


<br><br>

---

## 1) 블록체인 분류

### 1️⃣ 퍼블릭 (public)     
▫ 누구나 네트워크에 참여    
▫ Bitcoin, Ethereum, Zcash, Litecoin, ...  
> 이더리움 : 가장 대중화된 네트워크    

<br>

### 2️⃣ 프라이빗 (private)
▫ 하나의 조직 혹은 기관이 관장하는 네트워크, 승인된 주체만 자료를 읽고, 지정 노드만 거래를 승인     
▫ Quorum, MultiChain, Lroha, Monax, ...

<br>

### 3️⃣ 컨소시엄 (consortium)
▫ 이해 관계자 간에 컨소시엄을 구성하여 네트워크를 구성, 네트워크 참여자에 의해 접근 허용        
▫ Hyperledger Fabric, Tendermint, R3 Corda, Private Technologies, ... 

<br><br>

## 이더리움 네트워크   
### 메인넷 
▫ 거래소에서 직접 사고 팔 수 있는 이더리움을 거래하고, 그 위에서 스마트 콘텍트 등 다양한 개발 O

### 테스트넷
▫ 메인넷에 가는 것이 준비되지 않았을 때 간단한 테스트 

> 메인넷에서 거래하는 코인과 테스트넷에서 거래되는 코인은 가치가 매우 다름!     
> 혼동 X

<br>



▫ 이더리움은 프로토콜만 맞으면 어떤 클라이언트를 선택해도 거래 가능     

> **클라이언트란?**     
> 네트워크에 노드로 참여하여, RPC(Remote Procedure Call) 요청을 수신하고, 결과를 반환하는 EndPoint 소프트웨어

<br>

### 프라이빗 네트워크     
▫ 누구나 공개된 Client SW로 프라이빗 네트워크를 구축 가능       
▫ besu는 엔터프라이즈 환경에 맞게 개량된 Hyperledger의 ethereum 프로젝트      

<br><br>

---

## 2) Ropsten 실습 환경 준비
1. MetaMask 설치
2. 계정 생성
3. 네트워크 연결
4. 테스트 이더 받기

<br>

### 1️⃣ MetaMask 설치
크롬 브라우저에서 설치

⭐ **MetaMask 지갑**    
블록체인 네트워크를 사용할 수 이도록 계정의 개인키를 관리하는 프로그램  
> 개인키로 사인(sign)하여 트랜잭션을 보냄   

디지털 시그니처 : 내가 아닌 다른 사람이 나인척을 하지 못하게 해야 함 ->  개인키 발급

개인키 : 256bit의 무작위 숫자 -> 64자리의 Hex값으로 인코딩 (매우 큰 숫자)   
⬇   
개인키로부터 공개키가 생성됨    
타원곡선전자서명 알고리즘을 사용하여 공개키 생성    
개인키와 공개키는 한 쌍으로 아주 강력하게 연결되어 있음     
⬇       
Keccak-256 hashing      
⬇   
계정 주소       
0x로 시작하며 20byte 정도

[Metamask 다운로드](https://metamask.io/download/)

### 2️⃣ 계정 생성
1. 비밀번호 생성
2. 니모닉(Mnemonic) 구문 생성 및 구문 백업 확인
    - 순서가 매우 중요!


![image](https://user-images.githubusercontent.com/93974908/219992800-e311db54-9989-440b-b7e3-9eeb4001e24d.png)

### 3️⃣ 네트워크 변경
Ropsten 대신 Sepolia

### 4️⃣ 테스트 이더 받기
▫ Faucet (수도꼭지)     
- 테스트넷 환경을 사용할 수 있도록 가치없는 통화를 무료로 제공하는 자금원     
- rETH 또는 ROP로 표기하기도 함   

faucet 요청 ➡ [Sepolia PoW Faucet](https://sepolia-faucet.pk910.de/)      


<br><br>

---

## Ropsten 테스트넷 실습

### 1️⃣ MetaMask에서 트랜잭션 보내기
1. 받을 계정 준비
2. send 클릭
3. confirm 후 트랜잭션 생성 확인
4. 보내기 완료
가스 : 수수료 개념  
가스비 조정 가능 (이더리움 관리자가 비싼 것부터 처리)

### 2️⃣ MetaMask Provider 이용하기
▫ **프로바이더**란?     
클라이언트를 통해 이더리움 네트워크에 접근할 수 있도록 제공된 Javascript 객체  

[MetaMask Provider](https://docs.metamask.io/guide/ethereum-provider.html) 

콘솔 확인       
1. Ethereum     
![image](https://user-images.githubusercontent.com/93974908/220072372-e8f5e354-c429-4c0e-8ca7-4a8e08b51f3f.png)

2. 연결 상태 확인       
![image](https://user-images.githubusercontent.com/93974908/220072501-a002e7f9-9481-47b6-af58-5f4b23aec6ef.png)

3. 계정 활성화      
![image](https://user-images.githubusercontent.com/93974908/220073036-2b317cf5-8a0c-4737-a1ef-14e9415fff4b.png)

4. 활성화된(선택된) 계정 확인   
![image](https://user-images.githubusercontent.com/93974908/220073342-6017e3c0-3faa-4087-9b6f-13974210e4a6.png)

5. Ethereum Provider로 RPC API 보내기   
- RPC : Remote Procedure Call   
- 현재 네트워크에 블록이 몇 개 쌓여있냐
![image](https://user-images.githubusercontent.com/93974908/220073943-5fd1f966-dc62-4ad0-9e11-947947ab0d2a.png)


<br><br> 

---

### 과제 1 : 소유 계정의 잔액 조회
▫ 이더리움의 단위인 Wei와 Ether의 관계 파악     

Ether : 이러리움에서 사용하는 암호화폐      
Wei : 이더의 가장 작은 단위     
웨이는 기본적으로 인식할 수 없을 정도의 작은 디지털 단위로서, 기술적인 경우나 코드 작성에만 사용됨      

▫ RPC API 요청     
``` js
ethereum.request({
    method: 'eth_getBalance',
    params: ["지갑아이디"]
}).then(result => console.log(result))
```


<br>

### 과제 2 : RPC API를 통해 데이터를 포함한 트랜잭션 보내기

> 링크가 안 들어가져...!