# 02. Types of TS   

## 변수에서의 사용 
▫ number, string, boolean   
``` ts
let a : number = 1;
let b : string = 'i1'
let c : boolean = true
```

▫ 각각의 array  
``` ts
let a : number[] = [1, 2];
let b : string[] = ['i1', "1"]
let c : boolean[] = [true]
```

<br>

**콜론(:) + 타입**  

<br>

▫ optional     

``` ts
// ⭕
const player : {
    name: string,
    age?: number
} = {
    name: "nico"
}
```
> 물음표를 붙이지 않으면 age를 찾지 못해 error 발생    

![image](https://user-images.githubusercontent.com/93974908/220344184-e56ecc38-b4d6-42f8-a435-fec23a12b259.png)

<br>

``` ts
// ❌
if (player.age < 10) {
    ...
}
```
player.age 가 undefined 일 수도 있다고 경고를 띄움      
``` ts
// ⭕ 
if (player.age  && player.age < 10) {
    ...
}
```
먼저 player.age 가 있는지 확인하는 절차 필요    


<br>

``` ts
// ❌
const player : {
    name: string,
    age?: number
} = {
    name: "nico"
}

const playerLynn : {
    name: string,
    age?: number
} = {
    name: 'lynn',
    age: 12
}
``` 
> 중복적인 코드     
Alias(별칭) 타입 생성 O     

``` ts
// ⭕ 
type Player = {
    name: string,
    age?: number
}

const player : Player = {
    name: "nico"
}

const playerLynn : Player = {
    name: 'lynn',
    age: 12
}
```
> 첫글자는 대문자로     
많은 타입을 재사용할 수 있음    

<br><br>

## 함수에서의 사용

``` ts
// ❌
type Player = {
    name: string,
    age?: number
}

function playerMaker(name:string){
    return {
        name
    }
}

const nico = playerMaker("nico")
nico.age = 12
``` 
platerMaker는 string인 name이라는 요소만 있는 object를 return하고 있기 때문에 age를 정의할 수 없음      
➡ 만약 Player 타입을 반환하고 싶다면?
``` ts
// ⭕
type Player = {
    name: string,
    age?: number
}

function playerMaker(name:string) : Player {
    return {
        name
    }
}

const nico = playerMaker("nico")
nico.age = 12
```

▫ 화살표 함수   
``` ts
type Player = {
    name: string,
    age?: number
}

const playerMaker = (name:string) : Player => ({name})

const nico = playerMaker("nico")
nico.age = 12
```

<br>

▫ readonly  
해당 변수를 수정하려고 하면 TS 에러     
``` ts
type Player = {
    readonly name: string,
    age?: number
}
```

``` ts
// ❌ 
const numbers: readonly number[] = [1, 2, 3, 4]
numbers.push(1)
```
``` ts
// ⭕
const numbers: number[] = [1, 2, 3, 4]
numbers.push(1)
```
filter, map 등 배열을 바꾸지 않는 함수는 사용 가능  
불변성을 지킴       

<br>

▫ Tuple     
array를 생성    
최소한의 길이를 가져야 함       
특정 위치에 특정 타입이 있어야 함       
``` ts
const player: [string, number, boolean] = ["nico", 12, false]
```

readonly와 함께 사용 가능   
``` ts
const player: readonly [string, number, boolean] = ["nico", 12, false]
``` 

<br>

▫ undefined     
▫ null  
``` ts
let a : undefined = undefined
let b : null = null
```

<br>

▫ any   
비어있는 값을 쓰면 기본값이 any가 됨      
![image](https://user-images.githubusercontent.com/93974908/220369702-943d57f4-d42b-49b1-af87-cffd4cdfebba.png)     
타입스크립트로부터 빠져나오고 싶을 때 쓰는 방법     
(타입스크립트의 보호장치를 잃음)          
아무 타입이나 될 수 있음        
``` ts
// ⭕ 별로 좋지 않을 코드지만 any를 사용하면 허용됨
const a : any[] = [1, 2, 3, 4]
const b : any = true

a + b
```
<br>

▫ unknown       
변수의 타입을 미리 알지 못할 때 사용    
어떤 작업을 하려면 이 변수의 타입을 먼저 확인해야 함    

``` ts
let a : unknown;

if (typeof a == 'number') {
    let b = a + 1
}
if (typeof a == 'string') {
    let b = a.toUpperCase();
}
```

<br>

▫ void      
아무것도 return 하지 않는 함수를 대상으로 사용   
![image](https://user-images.githubusercontent.com/93974908/220377520-bf727825-eeeb-4710-8a3d-25d7d0c0a118.png)     
보통 따로 지정해줄 필요 X (타입스크립트가 자동으로 인식)    

<br>

▫ never     
함수가 절대 return 하지 않을 때 발생    
ex) 함수에서 exception이 발생할 때      
``` ts
function hello(): never {
    throw new Error("xxx")
}
```
타입이 두가지 일 수도 있는 상황에 발생      
![image](https://user-images.githubusercontent.com/93974908/220378556-294f30c7-d044-4341-9a21-930ddd8c0af4.png)
사용 가능한 두 타입에 대한 확인이 이미 이루어졌기 때문에 마지막 else문의 name의 타입은 never    
즉, 절대 실행되지 않아야 함     



