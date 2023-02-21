# 03. Functions
[Call Signatures](#call-signatures)     
[Overloading](#overloading)     
[Polymorphism](#polymorphism-다형성)    


<br><br>

---

## Call Signatures
▫ 일반적인 TS 함수    
``` ts
function add(a:number, b:number) {
    return a + b
}
// 화살표 함수
const add = (a:number, b:number) => a + b
```
<br>

**Call Signatures**     
▫ 함수 위에 마우스를 올렸을 때 보게 되는 것   
▫ 함수를 어떻게 호출해야 하는 지 알려줌   
▫ 함수의 반환타입을 알려줌    

``` ts
type Add = (a:number, b:number) => number

const add: Add = (a, b) => a + b
```

▫ 함수를 구현하기 전, 타입을 만들 수 있고 함수가 어떻게 작동하는지 서술해둘 수 있음   

<br><br>

---

## Overloading
▫ 외부 패키지나 라이브러리는 오버로딩을 많이 사용함   

▫ 오버로딩은 함수가 서로 다른 여러 개의 Call Signatures를 가지고 있을 때 발생

``` ts
// ❌ 
type Add = {
    (a:number, b:number) : number
    (a:number, b:string) : number
}

const add: Add = (a, b) => a + b
```
> Operator '+' cannot be applied to types 'number' and 'string | number'.

``` ts
// ⭕ 하지만 매우 나쁜 함수 (오버로딩의 핵심만 보자)
type Add = {
    (a:number, b:number) : number
    (a:number, b:string) : number
}

const add: Add = (a, b) => {
    if (typeof b === "string") return a
    return a + b
}
```

즉, 오버로딩은 여러 call signitures가 있는 함수     

<br>    

▫ Nextjs에서 사용하는 실제 예시     
``` ts
// string으로 보냄
Router.push("/home")

// object로 보냄
Router.push({
    path: "/home",
    state: 1
})
```

<br>  

``` ts
type Config = {
    path: string,
    state: object
}

type Push = {
    (path: string): void
    (config: Config): void
}

const push: Push = (config) => {
    if (typeof config === "string") { 
        console.log(config)
    } else {
        console.log(config.path)
    }
}
```

<br>  

▫ 다른 개수의 파라미터를 가지게 되면, 나머지 파라미터도 타입을 지정해줘야 함    
``` ts 
// ❌
type Add = {
    (a:number, b:number) :number
    (a:number, b:number, c:number) :number
}

const add: Add = (a, b, c) => {
    return a + b
}
```
``` ts
// ⭕
type Add = {
    (a:number, b:number) :number
    (a:number, b:number, c?:number) :number
}

const add: Add = (a, b, c?:number) => {
    if(c) return a + b + c
    return a + b
}

add(1, 2)
add(1, 2, 3)
```
마지막에 적힌 추가 파라미터가 옵션이라는 뜻     
➡ 추가적으로 타입을 줘야 하고, 해당 파라미터는 선택사항이라는 것을 알려줘야 함     

<br><br>

---

## Polymorphism (다형성)
poly ➡ many, several, much, multi  

``` ts
// ⭕ 작동은 하지만 그리 좋은 코드는 아님
type SuperPrint = {
    (arr: number[]):void
    (arr: boolean[]):void
    (arr: string[]):void
}

const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
}

superPrint([1, 2, 3, 4])
superPrint([true, false, true])
superPrint(["a", "b", "c"])
```

콘크리트 타입 : number, string, boolean, void, unknown 등

### generic
▫ 타입의 placeholder  
▫ 콘크리트 타입 대신 사용 가능        
▫ call signitures를 작성할 때, 들어올 확실한 타입을 모를 때 사용  
▫ 많은 도메인에서 `<T>` 또는 `<V>` 사용    
-   `<T>(arr: T[]): T`
▫ 이름은 중요치 않음    

``` ts
type SuperPrint = {
    <TypePlaceholder>(arr: TypePlaceholder[]): TypePlaceholder
    
}

const superPrint: SuperPrint = (arr) => arr[0]

const a = superPrint([1, 2, 3, 4])
const b = superPrint([true, false, true])
const c = superPrint(["a", "b", "c"])
const d = superPrint([1, 2, true, false, "hello"])
```
> a ➡ number     
> b ➡ boolean  
> c ➡ string   
> d ➡ number | boolean | string    

<br>

▫ 타입스크립트는 제네릭을 처음 인식했을 때와 제네릭의 순서를 기반으로 제네릭의 타입을 알게 됨   
``` ts
type SuperPrint = <T, M>(a: T[], b: M) => T

const superPrint: SuperPrint = (arr) => arr[0]

const a = superPrint([1, 2, 3, 4], "x")
const b = superPrint([true, false, true], 1)
```

**❗ any를 사용하는 것과는 매우 다름 ❗**


<br><br>

---

## Generic 사용 사례    
``` ts
function superPrint<V>(a: V[]){
    return a[0]
}
```
<br>

``` ts
type Player<E> = {
    name: string
    extraInfo: E
}
```
``` ts
// 1️⃣
const nico: Player<{favFood:string}> = {
    name: "nico",
    extraInfo: {
        favFood: "kimchi"
    }
}
```

```ts
// 2️⃣
type NicoPlayer = Player<{favFood:string}>

const nico: NicoPlayer = {
    name: "nico",
    extraInfo: {
        favFood: "kimchi"
    }
}
```

``` ts
// 3️⃣
type NicoExtra = {
    favFood:string
}
type NicoPlayer = Player<NicoExtra>

const nico: NicoPlayer = {
    name: "nico",
    extraInfo: {
        favFood: "kimchi"
    }
}
```
<br>

▫ extraInfo를 가지고 있지 않은 변수 추가    
``` ts
const lynn: Player<null> = {
    name: 'lynn',
    extraInfo: null
}
```

<br>

▫ 대부분의 기본적인 타입스크립트의 타입은 제네릭으로 만들어짐   

``` ts
useState<number>()
```
▫ React에서 useState를 사용할 때 제네릭을 보내면, useState의 call signiture이 number 타입의 useState가 됨   
