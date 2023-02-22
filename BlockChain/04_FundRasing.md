# 04. FundRaising   

## FundRaising   
특정 사람에게 모금을 해서 기부를 하는 프로세스  

### 개발 환경 : Remix IDE

### 기능 설명
▫ 일회성으로 동작하는 모금 컨트랙트 

▫ 일정 기간 동안만 이더를 지불하여 모금에 참여할 수 있음

▫ 1) 모금, 2) 현재 모금액 확인, 3) 모금액 수령 기능을 제공함

<br>

### 파일명 : FundRaising.sol  

<br>

### 기본 컨트랙트 레이아웃 작성   
▫ 라이선스 명시     
▫ version pragma 명시       
▫ contract 선언     

``` 
// SPDX-License-Identifire: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract FundRaising {

    constructor () { }
    
}
```
<br>

### 생성자 선언   
▫ 컨트랙트가 배포될 때 호출되는 특수 함수   

```
contract FundRaising {
    uint public fundRaisingCloses;      // 모금 종료 시각
    address public beneficiary;         // 모금 수령자

    constructor (uint _duration, address _beneficiary) {
        fundRaisingCloses = block.timestamp + _duration;
        beneficiary = _beneficiary;
    }
}
```
▫ 생성자 매개변수 추가 및 상태 변수에 저장
- 컨트랙트 배포 시 모금 기간과 모금액 수령자를 지정하도록 변경 
- uint duration : 몇 초 동안 모금이 유효한지 의미
  - 3600 = 1시간  

▫ 정수형 연산자 '+'
▫ 현재 타임스탬프 +duration을 fundRaisingCloses의 값으로 지정 
  - block.timestamp - 현재 블록의 유닉스 타임스탬프 값

<br>

### 상태 변수 추가
▫ 최소 모금액 지정  
- 최소 모금액 기준 0.01 ether   
- 이더리움 기본 단위 wei    
- 1e16 == 0.01 ether == 10 ** 16    

```
uint public constant MINIMUM_AMOUNT = 1e16;
```

<br>

### 함수 signiture 선언
1. 모금 - fund
2. 현재 모금액 - currentCollection
3. 모금액 수령 - withdraw

<br>

#### 1️⃣ fund()    
1. 0.01 ether 이상으로 모금에 참여 가능
2. 지정된 모금 시간 이내에만 참여 가능
3. 모금이 완료되면 모금자를 저장

▫ 이더를 받을 수 있는 **payable** 함수
- payable : 함수 호출 시 꼭 ether를 넣어서 보내~
- msg.value : 트랜잭션에 얼마를 보냈는지 알 수 있는 전역변수

▫ 조건문 => 전송한 이더가 최소 금액 조건을 만족하는지 && 모금 유효 시간인지 판별    

``` 
function fund() public payable {
    if(msg.value >= MINIMUM_AMOUNT) {
        if(block.timestamp < fundRaisingCloses) {

        }
    }
}
```

▫ 유효성 체크 함수 
- require(판별문, "에러 메시지");
- 판별문이 true가 아닌 경우 "에러 메시지" 출력 후 함수 바로 종료
> 사전에 확인하기 때문에 가스비 낭비를 막을 수 있음 

```
function fund() public payable {
    require(msg.value >= MINIMUM_AMOUNT, "MINIMUN AMOUNT: 0.01 ether");
    require(block.timestamp < fundRaisingCloses, "FUND RAISING CLOSED");
}
```

▫ 주소형 address 
- 이더리움 주소를 저장할 수 있는 자료형
- 초기값은 0x0

▫ msg.sender : 메시지 송신자를 알 수 있는 전역 변수     
```
address funder = msg.sender;
```

▫ 자료형의 배열 
- uint[4] fixedArray;
- uint[] dynamicArray;
- push(): 배열의 가장 뒤에 요소 추가
  
```
address[] funders;

function fund() public payable {
    require(msg.value >= MINIMUM_AMOUNT, "MINIMUN AMOUNT: 0.01 ether");
    require(block.timestamp < fundRaisingCloses, "FUND RAISING CLOSED");

    address funder = msg.sender;
    funders.push(funder)
}
```

<br>

#### 2️⃣ currentCollection()
1. 현재까지 모금된 금액을 누구나 확인할 수 있음 

▫ 수의 반환값 선언
- returns (type)

▫ 함수의 반환문 작성
- address(this).balance
- return address(this).balance

▫ view
- 상태 변수에 변화를 가하지 않고 읽기만 하는 함수   

``` 
function currentCollection() public view
returns(uint256){
    return address(this).balance;
}
```

<br>

#### 3️⃣ withdraw()
1. 지정된 수령자만 호출 가능
2. 모금 종료 이후에만 호출 가능
3. 수령자에게 컨트랙트가 보유한 이더를 송금

▫ 이더 전송이 일어나는 payable 함수  

▫ 유효성 체크   
``` 
function withdraw() public payable{
    require(msg.sender == beneficiary);
    require(block.timestamp > fundRaisingCloses);
}
```

▫ 함수 modifier 작성    
- modifier_ 뒤의 키워드를 쓸 때마다 호출됨
- _ : 다시 함수로 돌아간다는 의미
- 조건을 좀 더 앞단에서 제어 가능
> 가스 낭비 사전에 방지     
> require 재사용 가능   
```
modifier_onlyBeneficiary() {
    require(msg.sender == beneficiary);
    _;
}
function withdraw() public payable
onlyBeneficiary {
    require(block.timestamp > fundRaisingCloses)
}
```

▫ address의 멤버 : balance, transfer    
- 컨트랙트가 보유한 이더 : `<address>.balance`
- 요청 주소에게 컨트랙트 보유 이더 송금 : `<address payable>.transfer(uint256 amount)`
