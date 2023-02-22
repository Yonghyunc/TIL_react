# 02. Smart Contract

## Smart Contract 란?
▫ 1990년대에 Nick Szabo가 소개한 개념     
▫ 디지털 형식으로 명시된 서약들의 집합      
▫ 결코 스마트하지 않은 단순 컴퓨터 프로그램     
▫ 법적 맥락 없음    
▫ 다소 잘못된 용어임에 불구하고 자리잡음   

<br>

⭐ 블록체인 ➡ 불변의 저장소       
⭐ Smart Contract ➡ 불변의 컴퓨터 프로그래밍     
- 컴퓨터 프로그램
- 불변 : 한 번 배포되면 변경 불가
- 결정적 : 실행한 결과가 모두 같음
- EVM 위에서 동작
- 탈중앙화된 World Cooomputer : 동일한 상태를 유지

<br>

▫ Smart Contract를 작성하는 언어
- Solidity
- LLL
- Viper
- Assembly

<br>

### Smart Contract 배포와 호출  
![image](https://user-images.githubusercontent.com/93974908/220231452-e57753da-ccd5-4656-bcce-1c5cc1113900.png)

▫ 사용자가 contract를 보내면 EVM이 서명 -> 바이트코드 실행 -> 트랜잭션 전파   
▫ 트랜잭션이 블록에 담기고 불변의 코드가 됨   

▫ 모든 이더리움 지갑에는 주소가 존재  
▫ 당연히 컨트랙트 배포 시에도 주소가 존재     
▫ 컨트랙트가 전세계 이더리움 네트워크에 배포가 되게 되면, 컨트랙트 주소와 인터페이스를 통해 스마트 컨트랙트 프로그램 로직 실행 O

> 기억해야 할 용어  
>
> Bytecode      
> ABI (Application Binary Interface)        
> CA (Contract Address)     

<br><br>

## 실습환경 준비    
### Remix IDE   
별도의 개발 환경 설정 없이 스카트 컨트랙트를 작성, 배포, 호출       

<br>

## Smart Contract 배포
### 1️⃣ 배포할 컨트랙트 준비      
solidity 확장자명 => .sol       



### 2️⃣ 컴파일
![image](https://user-images.githubusercontent.com/93974908/220487763-e51e4cdc-185e-4244-8062-902eb6259c5a.png)


**SOLIDITY COMPILER**   
▫ 배포 가능한 컨트랙트 생성     
▫ ABI, Bytecode 생성    

![image](https://user-images.githubusercontent.com/93974908/220488076-5d4c33fe-18ce-486d-8c56-3b4702dc88ea.png)

▫ 이후 컨트랙트를 호출하고 싶다면 ABI를 알고 있어야 함    

### 3️⃣ 배포
**DEPLOY & RUN TRANSACTIONS**   
▫ environment, account 선택     

▫ 머신 내에서 테스트 (브라우저 기반 가상 환경)   
![image](https://user-images.githubusercontent.com/93974908/220488648-df7b5a06-f797-47c7-bcbc-71ae7204ea72.png)

▫ 배포 트랜잭션 결과        
![image](https://user-images.githubusercontent.com/93974908/220488844-2a541276-8ec9-43dc-a5e0-1bddaf9977a2.png)

▫ 배포된 컨트랙트 주소  
![image](https://user-images.githubusercontent.com/93974908/220488976-31b979e8-dc52-4976-a52d-39c7ea1804c7.png)

<br><br>

---

## Smart Contract 호출  
1. 호출
2. Deployed Contract 삭제
3. CA로 컨트랙트 접근
4. 호출

<br>

### 1️⃣ 호출 
① 호출 가능한 함수 확인   
▫ Deployed Contracts 열기     
![image](https://user-images.githubusercontent.com/93974908/220492352-f5afe05b-a1ed-4845-a99f-231b8d2c8cae.png)

② retrive   
== get  
▫ retrive 버튼 클릭     
▫ 초기값 0, CALL 생성  
▫ 단순하게 저장된 데이터를 불러올 때는 가스를 쓰지 않음   

③ store
== set  
▫ uint 타입의 매개변수 입력 -> store 버튼 클릭  
▫ 값을 변경하는 것은 가스가 사용됨 (transaction cost 만큼)     

<br>

### 2️⃣ Deployed Contract 삭제
▫ 컨트랙트 주소 (CA) 복사   

▫ Deployed Contracts 삭제   

<br>

### 3️⃣ CA로 컨트랙트 접근

▫ 복사한 CA 붙여넣기 -> At Address 버튼 클릭  

▫ Deployed Contracts 결과 확인  

![image](https://user-images.githubusercontent.com/93974908/220493854-55e41f37-3d5b-4f50-bafc-1879dbd68462.png)
