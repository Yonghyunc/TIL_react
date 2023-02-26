# 01. Next.JS
▫ 프로젝트 생성     
```
npx create-next-app@latest
```

▫ 실행  
```
npm run dev
```
![image](https://user-images.githubusercontent.com/93974908/221123143-add05aaf-a617-4185-a02c-7d9955b9b377.png)


<br>

### 라이브러리 vs 프레임워크    
▫ 라이브러리    
- 개발자로서 우리가 사용하는 것     
- 원하는 대로 코드를 작성할 수 있고, 사용하고 싶을 때 사용할 수 있음


▫ 프레임워크    
- 코드를 불러오는 것
- 코드를 적절한 위치에 (규칙을 따라서) 잘 적기만 하면 잘 동작
- 코드를 어떤 곳에 넣으면 프레임워크가 그 코드를 부르는 형태 (추상화)    

> next.js는 자동적으로 우리가 pages 안에 about이라는 페이지를 만들면, about에 갔을 때 그 component를 보여줌

<br>

### Page
▫ **파일의 이름**을 url의 이름으로 사용   
▫ 컴포넌트의 이름은 중요하지 않음 (export default 이기만 하면 됨)   
▫ 자동 404 페이지   

**예외상황**    
▫ index.js ➡ 홈페이지로 이동 ('/') 
▫ jsx를 쓰고 있다면 React.js를 import 할 필요 X     


<br>

### Static Pre Rendering
▫ 앱에 있는 페이지들이 미리 렌더링 됨 (정적으로 생성됨)     

**create react app** ➡ client-side render 하는 앱을 만듦 (브라우저가 유저가 보는 UI를 만드는 모든 것을 함)  

**next.js** ➡ 페이지의 소스코드에 실제 HTML이 있음 / 초기 상태로 pre-rendering을 함     

#### 📌 hydration   
react.js를 프론트엔드 안에서 실행   
페이지를 열었을 때 소스 코드에 있는 HTML을 보게됨 -> react.js가 클라이언트로 전송되었을 때 react.js 앱이 됨 

next.js는 react.js를 백엔드에서 동작시켜서 페이지를 미리 만듦 -> component들을 render 시킴 -> 렌더링이 끝나면 HTML이 됨 -> next.js는 그 HTML을 페이지의 소스코드에 넣어줌 -> 유저는 자바스크립트와 react.js가 로딩되지 않았더라도 콘텐츠를 볼 수 있음   


<br><br>

### Routing

NextJS 앱에서 anchor 태그를 네비게이팅하는 데 사용하면 안 되는 이유 ?
- NextJS에 앱 내에서 페이지를 네비게이트할 때 사용해야만 하는 특정 컴포넌트가 존재함    
- anchor -> 다른 페이지로 이동위해 전체 페이지를 새로고침함

**Link**
``` js
import Link from "next/link"
```
NextJS 어플리케이션의 클라이언트 사이드 네비게이션 제공 


<br><br>

### CSS Modules 
module.css ➡ 평범한 CSS를 사용할 수 있도록 해 줌   
클래스 이름 ➡ 자바스크립트 오브젝트에서의 프로퍼티 형식으로 적어줌     
```js
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
```

![image](https://user-images.githubusercontent.com/93974908/221406949-c573fd23-4c4e-45da-890b-7e5daad5dfda.png) 
실제 클래스 네임은 nav가 아님   
`NavBar_nav__무작위 텍스트` -> **충돌**을 막음  
다른 컴포넌트에서도 nav라는 클래스 이름을 사용할 수 있도록 함   

<br>

▫ 다수의 클래스 네임 사용   
1. 백틱 사용하여 하나의 문자열로 만들기
2. 배열 삽입 후 join으로 하나의 문자열로 합치기
``` js
// NavBar.js 

import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav>
      <Link
        href="/"
        className={`${styles.link} ${
          router.pathname === "/" ? styles.active : ""
        }`}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={[
          styles.link,
          router.pathname === "/about" ? styles.active : "",
        ].join(" ")}
      >
        About
      </Link>
    </nav>
  );
}
```

``` css
/* NavBar.module.css */

.link {
    text-decoration: none;
}

.active {
    color: tomato
}
```

⬇   
BUT, 새로운 파일을 만들어야 하고, 클래스 이름을 기억해야 함 

<br><br>

### Styles JSX
▫ style 태그 + jsx 프롭   

▫ 부모 컴포넌트에서의 적용이 자식 컴포넌트에 영향 X   

▫ 컴포넌트 내부로 범위가 한정됨 

```js
<style jsx>{`
    nav {
        background-color: tomato;
    }
    a {
        text-decoration: none;
    }
    .active {
        color: yellow;
    }
`}</style>
```

<br><br>

### Custom App

App Component   
App Page    

글로벌 스타일 적용하기  
1. global 프롭 적용
- 다른 페이지에 있을 경우, 적용되지 않음

2. App Component 
- 일종의 어떤 컴포넌트의 청사진
- **_app.js** : 페이지를 렌더링하기 전에 `_app.js`를 먼저 확인하고 페이지 렌더링

``` js
// _app.js

import NavBar from "@/components/NavBar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>
        {`
          a {
            color: white;
            text-decoration: none;
          }
        `}
      </style>
    </>
  );
}
```
▫ Component : 렌더링하길 원하는 페이지    


▫ 페이지나 컴포넌트 내에 css를 임포트하고 싶다면, 반드시 module이어야만 함    

▫ BUT, `_app.js`에서는 모든 Global Styles를 임포트할 수 있음

