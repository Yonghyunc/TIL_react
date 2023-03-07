# 05. Typescript Blockchain

▫ 프로젝트 생성     
```
npm init -y
```

▫ 타입스크립트 설치     
``` 
npm i -D typescript
```

▫ tsconfig.json 파일 만들기     
> 이름 바뀔 수 없음         
```
touch tsconfig.json
```

타입스크립트가 src의 모든 파일을 확인함     
``` json
// tsconfig.json

"include": [
    "src"
],
```

outDir : 자바스크립트 파일이 생성될 디렉토리    
target: 사용할 자바스크립트 코드의 버전
``` json
// tsconfig.json

"compilerOptions": {
    "outDir": "build",
    "target": "ES6"
}
```
타입스크립트에게 JD을 어디에 만들지 알려주기 위해, build라는 폴더에 만들어진 코드를 넣을 것이라 알림   

대부분의 nodeJS와 브라우저가 es6을 지원함   


``` json
// package.json

"scripts": {
    "build": "tsc"
},
```

▫ 빌드      
![image](https://user-images.githubusercontent.com/93974908/220841738-77651d4d-11e9-4a7b-9231-f82fb081e6c9.png)

![image](https://user-images.githubusercontent.com/93974908/220841843-bedc1b32-ae72-4211-ab28-7fe3dfa1f3fa.png)

``` ts
// index.ts
class Block {
  constructor(private data: string) {}
  static hello() {
    return "hi";
  }
}
```

``` js
// index.js
class Block {
    constructor(data) {
        this.data = data;
    }
    static hello() {
        return "hi";
    }
}
```


<br>    

▫ lib : 합쳐진 라이브러리의 **정의 파일**을 특정해주는 역할     

- 자바스크립트의 어떤 버전이 그 환경에서 사용되는지 알려줌 
- 어떤 API를 사용하고 어떤 환경에서 코드를 실행하는지 말해줌       

▫ 정의 파일     
- 타입스크립트는 내장된 자바스크립트 API를 위한 기본적인 타입 정의는 가지고 있다
- 타입 정의 : 타입스크립트에게 몇몇 자바스크립트 코드의 타입을 설명해 주기 위해 사용    
- 대부분 자바스크립트로 만들어진 패키지와 라이브러리를 사용 ➡ 타입스크립트에게 그 자바스크립트 파일의 모양을 설명해 줘야 함
- 정의 파일 (d.ts) : 자바스크립트 코드의 모양을 타입스크립트에 설명해주는 파일 

<br>

▫ node_modules에 설치된 자바스크립트 모듈을 어떻게 사용하는가 

``` json
// tsconfig.json

{
    "include": [
        "src"
    ],
    "compilerOptions": {
        "outDir": "build",
        "esModuleInterop": true,
        "target": "ES6",
        "lib": ["ES6", "DOM"],
        "strict": true
    }
}
```
``` js
// myPackage.js
// node_modules에 있는 모듈처럼 활용

export function init(config) {
  return true;
}

export function exit(code) {
  return code + 1;
}
```

``` ts
// myPackage.d.ts

interface Config {
  url: String;
}

declare module "myPackage" {
  function init(config: Config): boolean;
  function exit(code: number): number;
}
```

```ts
// index.ts

import { init, exit } from "myPackage";

init({
  url: "true",
});

exit(1);
```

<br>

▫ 자바스크립트 파일을 타입스크립트 파일에서 어떻게 사용하는가   

- 타입스크립트 안에서 자바스크립트 허용
``` json
"allowJs": true
```

▫ 타입스크립트가 자바스크립트 파일도 보호 O     
``` js
// @ts-check
```
⬇   
**JSDoc**   
- 코멘트로 이루어진 문법
- 함수 위에 코멘트를 제대로 작성하면 됨

``` js
// @ts-check
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */

export function init(config) {
  return true;
}

/**
 * Exits the program
 * @param {number} code
 * @returns number
 */
export function exit(code) {
  return code + 1;
}
```

<br><br>

## Blockchain

▫ ts-node : 빌드없이 타입스크립트 실행    
> 개발환경에서만 사용
```
npm i -D ts-node
```

▫ nodemon : 자동으로 커멘드 재실행  
```
npm i nodemon
```

<br>

``` json
// package.json
  "scripts": {
    "build": "tsc",
    "dev": "nodemon --exec ts-node src/index.ts",
    "start": "node build/index.js"
  },
```

<br>

▫ hash : 블록의 고유 서명   
- 이상하게 생긴 데이터 표시
- 결정론적
- 데이터가 변하지 않으면 해쉬값도 변하지 않음   
- 블록체인에서 블록을 보호하는 방법


▫ 타입스크립트로 작성되지 않은 패키지를 import 할 때 타입 정의를 일일이 다 적고 싶지 않은 경우  
[🔗 DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)    
> DefinitelyTyped/types/ : 모두 npm 패키지  
⬇
```
npm i -D @types/node
```

``` ts
import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}
```


``` ts
import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    return this.blocks;
  }
}

const blockchain = new Blockchain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");

console.log(blockchain.getBlocks());
```

![image](https://user-images.githubusercontent.com/93974908/220965749-ec3614a1-4ae8-4a74-b343-eb5a91367576.png)

BUT, 보안상의 문제 -> 누구든 새로운 블럭 추가 가능  

``` ts
import crypto from "crypto";

interface BlockShape {
    ...
}

class Block implements BlockShape {
    ...
}

class Blockchain {
  ...
  public getBlocks() {
    return [...this.blocks]; // 배열 안에 있는 데이터를 가진 새로운 배열을 반환
  }
}

const blockchain = new Blockchain();

...

// 배열 안에 새로운 블록을 더하고 있지만 블록체인의 state와 연결되지 않음
blockchain.getBlocks().push(new Block("xxxxx", 1111, "HACKED"));

console.log(blockchain.getBlocks());
```