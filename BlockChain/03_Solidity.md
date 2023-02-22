# 03. Solidity  
<br>

## 솔리디티 컨트랙트 기본 구조

### 솔리디티 소스 파일 레이아웃
![image](https://user-images.githubusercontent.com/93974908/220638425-2bf0fed8-47f5-4aab-a77d-69b7f2e62d2c.png)

▫ 컨트랙트의 범위   
```
contract 키워드 + contract 이름 {

}
```

▫ 상태 변수 (State Variable)    
- 블록체인(contract storage)에 값이 저장되는 변수
- 상태 변수의 접근 제어자(Visibility) 지정 가능
  - external, public, private
- 기본형, 구조체, 배열 등 다양한 자료형 존재

▫ 함수 (Function)   
- 컨트랙트 단위 기능
- 매개변수, 제어자, 반환값 지정 가능
- 함수 내부에서 상태 변수의 값을 변경하고 읽을 수 있음  

<br><br>

### 자료형
▫ 기본형 (Prinitives)   

> 1_Primitives.sol을 Remix에 추가하여 컴파일, 배포

- 논리형  
  - bool: true / false  
- 정수형
  - uint: unsigned integer
  - ing: signed integer
  - 8 ~256 bit를 표현할 수 있으며, uint는 uint256과 같음
- 주소형
  - address: 이더리움의 주소 
- 바이트형
  - bytes# or byte[]: 데이터를 바이트로 표현    

![image](https://user-images.githubusercontent.com/93974908/220644028-c8ea05ad-0224-4f2e-b380-75a026993107.png)

<br>

### 접근 제어자 (Visibility)

![image](https://user-images.githubusercontent.com/93974908/220645208-e7daaad3-01ff-4551-bc7c-41b7b6f7e18b.png)

> 2_Visibility.sol을 Remix에 추가하여 컴파일, 배포  
> Remix 상에 나타나는 접근 가능한 버튼과 호출 시 반환 값을 확인     
▫ 2개의 컴포넌트로 구성     
▫ child가 parent를 상속받음     

![image](https://user-images.githubusercontent.com/93974908/220646905-c3d8c487-8b64-425b-973a-113bb99b99ba.png)
![image](https://user-images.githubusercontent.com/93974908/220647028-56625f65-5484-4925-a9e1-19aedb728332.png)

<br>

### 자주 쓰는 자료형
▫ 배열 (Array)  
> 3_Array.sol을 Remix에 추가하여 컴파일, 배포 

- 고정 길이와 유동적 길이를 갖는 배열을 선언하는 법
- 배열형 자료구조를 다루는 방법
  - index에 접근하기
  - push pop delete
- 함수 내에서 로컬 변수로 배열을 사용하기 위해서는 고정 길이로 선언해야 함

![image](https://user-images.githubusercontent.com/93974908/220667830-f88f908e-844b-45fc-9b01-323a8e1e9a96.png)

<br>

▫ 매핑 (Mapping)
> 4_Mapping.sol을 Remix에 추가하여 컴파일, 배포 

- 매핑형 선언 방법
- 접근, 추가, 삭제 방법
- 매핑에 저장된 key의 목록을 얻을 수 있는 방법을 제공하지 않음
  - 즉, key의 리스트를 가지고 있어야만 접근 가능

`Mapping(기준 키 -> 값)`    
`mapping(address => uint) public addrToUint;`

![image](https://user-images.githubusercontent.com/93974908/220667960-eff746c7-ca40-4032-ba60-2831776b4191.png)

delete -> 값을 지우는 것이 아닌 초기화하는 것   

<br>

### 사용자 선언 자료형

▫ Struct    
> 5_Struct.sol을 Remix에 추가하여 컴파일, 배포 

- 여러 자료형을 하나의 관점으로 묶어서 관리하고자 할 때 선언
    ```
    struct Todo {
        string text;
        bool completed;
    }
    ```
- 구조체의 Array, Mapping 값으로 지정 가능
- 구조체 생성, 접근, 변경 방법
- 함수 안에서 struct 상태 변수를 참조하는 방법

![image](https://user-images.githubusercontent.com/93974908/220669021-c3a249e7-5057-43e2-8a39-79206e8e4682.png)

<br>

### 함수

> 6_Function.sol을 Remix에 추가하여 컴파일, 배포 

- 함수 선언 방법
- 매개변수 유무, 반환 값 유무
- view, pure 함수의 특징
- 2개 이상의 값을 반환하도록 선언하는 방법

![image](https://user-images.githubusercontent.com/93974908/220670629-b8cc020c-7498-4804-9b50-712d340fbfe6.png)

▫ view : 가스가 없어도 해당 함수를 호출할 수 있음   
▫ pure : 상태 변수가 필요없는 순수 함수     

▫ view, pure 등을 쓰지 않고 함수를 쓰면 warning     

<br>

### 제어문
▫ 조건문 If-Else    
> 7_ControlFlow.sol을 Remix에 추가하여 컴파일, 배포 

```sol
function foo(uint x) public pure returns (uint) {
    if (x < 10) {
        return 0;
    } else if (x < 20) {
        return 1;
    } else {
        return 2;
    }
}
```

``` sol
function ternary(uint _x) public pure returns (uint) {
    return _x < 10 ? 1 : 2;
}
```
<br>

▫ 반복문 for / while    
``` sol
function loop1() public pure {
    for (uint i = 0; i < 10; i++) {
        if (i == 3) {
            continue;
        }
        if (i == 5) {
            break;
        }
    }
}
```
``` sol
function loop2() public pure {
    uint i;
    while (i < 10) {
        i++;
    }
}
```    
가스 개념을 통해 무한 루프에서 빠져나옴     
탈출 조건, 무한 루프를 꼭 확인하자!! 그렇지 않으면 가스를 낭비할 수 있음...

<br>

### 화폐단위
▫ wei   
▫ gwei : 10 ** 9 wei    
▫ ether : 10 ** 18 wei  


