# 04. Class & Interface 

<br>

## Class
▫ private / public property를 만들 수 있음  
![image](https://user-images.githubusercontent.com/93974908/220524395-d01665c4-4543-4d94-8071-04623f40098e.png)
> JS에서는 private 부분이 보이지 않음   
> 즉, private 키워드는 오로지 타입스크립트가 사용하는 것임  

<br>

▫ private와 public이 JS에서 반영되지 않았다고 하더라도 타입스크립트가 보호해줌    
``` ts
// ❌ 타입스크립트가 허용하지 않음
nico.firstName
```
``` ts
// ⭕
nico.nickname
```
<br>

▫ 추상클래스    
다른 클래스가 상속받을 수 있는 클래스   
직접 새로운 인스턴스를 만들 수는 X  
즉, 오직 다른 곳에서 상속받을 수만 있는 클래스  

``` ts
abstract class User {
        constructor(
        private firstName: string,
        private lastName: string,
        public nickname: string
    ) {}
}

class Player extends User {

}

const nico = new Player("nico", "las", "니꼬")
```
<br>

▫ 추상 클래스 안의 메소드   
private / public은 method에서도 작동    
``` ts
abstract class User {
        constructor(
        private firstName: string,
        private lastName: string,
        public nickname: string
    ) {}
    getFullName(){
        return `${this.firstName} ${this.lastName}`
    }
}

class Player extends User {

}

const nico = new Player("nico", "las", "니꼬")

nico.getFullName()
```
<br>

▫ 추상 메소드   
메소드를 클래스 안에서 구현하지 않아야 함 -> call signiture만 적어줘야 함   
추상 클래스를 상속받는 모든 것들이 구현을 해야하는 메소드   
``` ts
abstract getNickName(): void
```

<br>

▫ protected     
필드가 외부로부터는 보호되지만 다른 자식 클래스에서는 사용되기를 원할 때 사용   

``` ts
abstract class User {
        constructor(
            protected firstName: string,
            protected lastName: string,
            protected nickname: string
    ) {}
    abstract getNickName(): void

    getFullName(){
        return `${this.firstName} ${this.lastName}`
    }
}

class Player extends User {
    getNickName() {
        console.log(this.nickname)
    }
}

const nico = new Player("nico", "las", "니꼬")

nico.getFullName()
```
<br><br>



| public | private | protected |
|:------:|:-------:|:---------:|
| 외부의 모든 곳에서 사용 O | 해당 메서드에서만 사용 가능 O | 상속받는 모든 클래스에서 사용 가능 O |

기본적으로 모든 것은 public     

<br>

### 해시맵 예제


``` ts
[key:string]: string
```
제한된 양의 property 혹은 key를 가지는 타입을 정의하는 방법     
object의 type을 선언 해야 할 때 쓸 수 O     
property의 이름은 모르지만, 타입만을 알 때 사용     

``` ts
type Words = {
    [key:string]: string
}

class Dict {
    private words: Words
    constructor() {
        this.words = {}
    }
    add(word:Word) {
        if (this.words[word.term] === undefined) {
            this.words[word.term] = word.def
        }
    }
    def(term: string){
        return this.words[term]
    } 
}

class Word {
    constructor(
        public term: string,
        public def: string
    ) {}
}

const kimchi = new Word("kimchi", "한국의 음식")

const dict = new Dict()
dict.add(kimchi)
dict.def("kimchi")
```

Words타입 == string 만을 property로 가지는 오브젝트     

term을 이용해 def를 찾음    

클래스를 타입처럼 사용 가능 (파라미터가 클래스의 인스턴스이기를 원하면 사용 가능)   
``` ts
add(word:Word)
```

<br><br>

---

## Interface

어떻게 하면 public이지만 더 이상 변경할 수 없도록 만들 수 있을까? (term, def)       
➡ 값은 보여주고 싶지만, 수정은 불가능하게 하고 싶어    
➡ readonly

주로 다른 누군가가 데이터를 덮어쓰는 것을 방지하기 위해 private나 protected property를 사용하는데 이 경우 읽기도 불가능     

▫ static    
자바스크립트의 메소드   
``` ts
type Words = {
    [key:string]: string
}

class Dict {
    private words: Words
    constructor() {
        this.words = {}
    }
    ...
    static hello() {
        return "hello"
    }
}
...

Dict.hello()
```

<br>

### Interface와 Type의 차이점  
✔ 타입의 사용  
``` ts
// 1. object의 모양을 알려주는데 사용   
type Player = {
    nickname: string,
    healthBar: number
}
const nico: Player = {
    nickname: "nico",
    healthBar: 10
}
```
``` ts
// 2. 변수 타입을 알려줌
type Food = string
const kimchi:Food = "delicious"
```
``` ts
// 3. Alias 사용 
type Nickname = string
type Health = number
type Friends = Array<string>

type Player = {
    nickname: Nickname,
    healthBar: Health
}
```
<br>

✔ 타입을 지정된 옵션으로 **제한**   
```ts
type Team = "read" | "blue" | "yellow"
type Health = 1 | 5 | 10

type Player = {
    nickname: string,
    team: Team
    health: Health
}

const nico: Player = {
    nickname: "nico",
    team: "yellow",
    health: 10
}
``` 
> 콘크리트 타입의 특정 값 사용  

<br>


1️⃣ type은 원하는 모든 것이 될 수 있지만, interface는 오직 오브젝트의 모양을 특정해주기 위해 사용    
➡ 즉, type 키워드는 interface 키워드에 비해 좀 더 활용할 수 있는 게 많음   


▫ 타입스크립트에게 오브젝트의 모양을 알려주는 방법  
1. type + 오브젝트 모양
2. interface 
``` ts
type Team = "read" | "blue" | "yellow"
type Health = 1 | 5 | 10

// 1. type 키워드
type Player =  {
    nickname: string,
    team: Team
    health: Health
}

// 2. interface 키워드
interface Person {
    nickname: string,
    team: Team
    health: Health
}
```

▫ **interface**는 타입스크립트에게 오브젝트의 모양을 설명해주는 하나의 목적으로만 사용가능  


``` ts 
interface User {
    name: string
}

interface Player extends User {
}

const nico: Player = {
    name: "nico"
}
```
``` ts
type User = {
    name: string
}

type Player = User & {
}

const nico: Player = {
    name: "nico"
}
```
<br>

2️⃣ interface는 property들을 축적시킬 수 있음     
``` ts
interface User {
    name: string
}

interface User {
    lastName: string
}

interface User {
    health: number
}

const nico: User = {
    name: "nico",
    lastName: "n",
    health: 10
}
```

▫ 인터페이스를 각각 만들면, 타입스크립트가 알아서 하나로 합쳐줌     
> type은 불가능 

즉, 같은 인터페이스에 다른 이름을 가진 property들을 쌓을 수 있음    


<br>

⭐ 인터페이스는 객체 지향 프로그래밍의 개념을 활용하여 디자인됨    
⭐ 타입은 더 유연하고 개방적임     


<br>

▫ User 추상 클래스  
상속받는 클래스가 어떻게 동작해야할 지 일러주기 위해 사용   
``` ts
abstract class User {
    constructor(
        protected firstName: string,
        protected lastName: string
    ) {}
    abstract sayHi(name:string): string
    abstract fullName(): string
}
```
> 만약 User 클래스를 상속한다면, sayHi와 fullName을 구현해야 하고 firstName과 lastName을 갖게 됨         

▫ Player 클래스    
```ts
class Player extends User {
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name:string) {
        return `Hello ${name}. My name is ${this.fullName()}`
    }
}
```

▫ new User 사용 불가    

▫ 추상 클래스는 JS에서 일반적인 클래스로 변함  
![image](https://user-images.githubusercontent.com/93974908/220792459-ee74aac0-2eb9-4296-8a1c-df1f58cfdd44.png)

▫ 다른 클래스들이 표준화된 property와 method를 갖도록 해주는 청사진을 만들기 위해 추상클래스 사용     

⬇   

▫ 자바스크립트는 클래스 뒤에 extends를 붙이는 문법을 사용하여 클래스를 상속받음     
▫ implements : User 인터페이스를 추적할 수 없음 
- 인터페이스는 타입스크립트에서만 존재
- BUT 타입스크립트가 Player는 User 인터페이스를 상속해야 한다고 알려줌

``` ts
interface User {
    firstName: string,
    lastName: string,
    sayHi(name:string): string,
    fullName(): string
}
```

▫ 인터페이스를 상속할 때 property를 private, protected로 만들지 못함   
``` ts
class Player implements User {
    constructor(
        public firstName: string,
        public lastName: string
    ) {}
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name:string) {
        return `Hello ${name}. My name is ${this.fullName()}`
    }
}
```

![image](https://user-images.githubusercontent.com/93974908/220793727-6405a02e-44a5-4d72-8298-22d08b03e0ef.png)

▫ 여러 개의 인터페이스 상속 가능        

``` ts
interface User {
    firstName: string,
    lastName: string,
    sayHi(name:string): string,
    fullName(): string
}
interface Human {
    health:number
}
class Player implements User, Human {
    constructor(
        public firstName: string,
        public lastName: string,
        public health: number
    ) {}
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name:string) {
        return `Hello ${name}. My name is ${this.fullName()}`
    }
}
```


▫ 인터페이스를 타입으로 사용 가능   

```ts
function makeUser(user: User){
    return "hi"
}

makeUser({
    firstName: "nici",
    lastName: "las",
    fullName: () => "xx",
    sayHi: (name) => "string"
})
```
> 인터페이스의 내용물만 넣어주면 됨

<br><br>

## 인터페이스와 타입 비교  

▫ 목적과 모양은 비슷함  
``` ts
// 타입
type PlayerA = {
    name: string
}
const playerA: PlayerA = {
    name: "noco"
}
```
``` ts
// 인터페이스
interface PlayerB = {
    name: string
}
const playerB: PlayerB = {
    name: "nico"
}
```
<br>

▫ 상속  
``` ts
// 타입
type PlayerA = {
    name: string
}
type PlayerAA = PlayerA & {
    lastName: string
}
const playerA: PlayerAA = {
    name: "noco",
    lastName: "xxx"
}
```
``` ts
// 인터페이스
interface PlayerB {
    name: string
}
interface PlayerBB extends PlayerB { 
    lastNmae: string
}
const playerB: PlayerBB = {
    name: "nico",
    lastName: "xxx"
}
```
<br>

▫ 나중에 property를 추가하고 싶을 때   

``` ts
// 인터페이스
interface PlayerB {
    name: string
}
interface PlayerB { 
    lastName: string
}
interface PlayerB {
    health: number
}
const playerB: PlayerB = {
    name: "nico",
    lastName: "xxx",
    health: 10
}
```
> 타입은 이런 방식 불가능 -> 상속하듯이 

<br>

▫ 추상클래스 대체 가능  

``` ts
type PlayerA = {
    firstName: string
}

interface PlayerB {
    firstName: string
}

// 같은 방식으로 타입, 인터페이스 모두 가능
class User implements PlayerA {
    constructor(
        public firstName: string
    ) {}
}
```

<br>

▫ 클래스나 오브젝트의 모양을 정의하고 싶으면 인터페이스 사용    
▫ 다른 모든 경우에는 타입 사용  

<br><br>

--- 

## Polymorphism 

▫ `interface Storage` : 타입스크립트에 의해 이미 선언된 자바스크립트의 웹 스토리지 API를 위한 인터페이스  
``` ts
interface Storage {
    ...
}
```     
> 이렇게 쓸 경우 기존 인터페이스를 override 하게 됨   


▫ 제네릭을 클래스로 보내고, 클래스는 제네릭을 인터페이스로 보낸 뒤에 인터페이스는 제네릭을 사용   
``` ts
interface SStorage<T> {
    [key:string]: T
}

class LocalStorage<T> {
    private storage: SStorage<T> = {}
}
```
▫ 로컬 스토리지 API 따라해보기  
```ts
interface SStorage<T> {
    [key:string]: T
}

class LocalStorage<T> {
    private storage: SStorage<T> = {}
    set(key:string, value:T){
        this.storage[key] = value
    }
    remove(key:string){
        delete this.storage[key]
    }
    get(key:string): T {
        return this.storage[key]
    }
    clear() {
        this.storage = {}
    }
}
```

▫ 제네릭을 쓰고 있기 때문에, 위의 클래스를 쓰려면 이렇게 사용해야 함    
``` ts
const stringStorage = new LocalStorage<string>
```

``` ts
const stringStorage = new LocalStorage<string>()
stringStorage.get("dd")
stringStorage.set("hello", "how are you")
// (method) LocalStorage<string>.get(key: string): string

const booleanStorage = new LocalStorage<boolean>()
booleanStorage.get("xx")
booleanStorage.set("hello", true)
// (method) LocalStorage<string>.get(key: string): string
```


