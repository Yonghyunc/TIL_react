# 02. Next Project

<br>

### Layout 
너무 큰 _app.js 파일을 원하지 않음 -> 대신 Layout에 넣음

```js
// Layout.js

import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
```

``` js
// _app.js

import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <style jsx global>
        {`
          a {
            color: white;
            text-decoration: none;
          }
        `}
      </style>
    </Layout>
  );
}
```
Layout 컴포넌트는 children이라는 prop을 갖게 됨 -> children = component

<br><br>

### Head

``` js
// components/Seo.js

import Head from "next/head";

export default function Seo({ title }) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}
```
``` js
// index.js

import Seo from "@/components/Seo";

export default function Home() {
  return (
    <div>
      <Seo title="Home" />
      <h1 className="active">Hello</h1>
    </div>
  );
}
```

<br><br>

### Fetching Data

▫ public에 있는 파일 가져오기   
```js
<img src="/vercel.svg" />
```

<br>

▫ API 활용      
[TMDB API 목록](https://developers.themoviedb.org/3/getting-started/introduction)

<br>

▫ loading state     
- movies가 존재하는지 확인 후 map
- ?를 넣어 movies가 존재하지 않으면 map이 실행되지 않도록 함

<br>

```js
import Seo from "@/components/Seo";
import { useEffect, useState } from "react";

const API_KEY = "459e075ff89db74eeeccc6119bb8bfb2";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
      ).json();
      setMovies(results);
    })();
  }, []);

  return (
    <div>
      <Seo title="Home" />
      {!movies && <h3>Loading...</h3>}
      {movies?.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </div>
  );
}
```

<br><br>

## Redirect & Rewrite  
### Redirect
``` js
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/form",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
```

- redirection이 영구적인지 아닌지에 따라 브라우저나 검색엔진이 이 정보를 기억하는지 여부가 결정됨 

- contact 주소에 접근 시 form으로 자동으로 이동됨 

- 웹 사이트 내부든, 바깥으로든 redirect 가능

- 수정 후 서버 재시작 필요

<br>

▫ pattern matching  
- *을 붙여주면 모든 걸 catch O

``` js
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-blog/:path*",
        permanent: false,
      },
    ];
  },
```

<br>

### Rewrite
▫ 유저를 redirect 시키기는 하지만 URL은 변하지 않음     

``` js
/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    ...
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
```

``` js
// index.js

export default function Home() {
  ...
  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies`)).json();
      setMovies(results);
    })();
  }, []);

  ...
}
```

<br><br>

## Server Side Rendering

페이지 렌더링 방식
1. Client Side Rendering : 로딩 화면을 보여준 뒤 데이터를 받음 
2. Server Side Rendering : 데이터가 유효할 때 화면이 보여짐 

<br>

### getServerSideProps
▫ 이름이 바뀌어서는 안됨    
▫ client 쪽이 아닌 server 쪽에서 실행 
▫ API Key도 숨길 수 있음  
▫ return 하는 값을 props로 page에 줌  
``` js
// index.js
export default function Home({ results }) {
  return (
    ...
  )
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
```

<br><br>

## Dynamic Routes
▫ 만약 `/movies/all` 이라는 URL을 만들고 싶다면, movies라는 폴더를 만들고 그 내부에 all.js 파일을 생성  
▫ `/movies/all`이 있는 상태에서 `/movies`를 만들고 싶다면, movies 폴더 안에 index.js 파일 생성  

### URL에 변수를 넣는 방법
`/movies/:id` ➡ movies 폴더 내부에 [id].js 파일 생성   

### routing 방법
1️⃣ Link 사용   
``` js
{results?.map((movie) => (
  <Link href={`/movies/${movie.id}`} key={movie.id}>
    <div className="movie">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      <h4>{movie.original_title}</h4>
    </div>
  </Link>
))}
```

2️⃣ useRouter + onClick 이벤트  
``` js
export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id) => {
    router.push(`/movies/${id}`);
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        // <Link href={`/movies/${movie.id}`} key={movie.id}>
        <div className="movie" key={movie.id} onClick={() => onClick(movie.id)}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
        // </Link>
      ))}
    ...
  )
}
```

``` js
async rewrites() {
    return [
      ...
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      }
    ];
  },
```
▫ source의 변수명과 destination의 변수명을 반드시 일치시켜 줘야 함  

<br>

### URL에서 URL로 state 넘겨주기
(유저에게는 숨겨서)   

**as** : 브라우저의 URL을 마스킹  

``` js
const onClick = (id, title) => {
    router.push(
      {
        pathname: `/movies/${id}`,
        query: {
          title,
        },
      },
      `/movies/${id}`
    );
  };
```
▫ query에 데이터를 담아 보내지만 유저는 as에 담긴 `/movies/id`만 볼 수 있음   

<br>  

### catch-all URL 
파일명 ➡ `[...params].js`    

```js
const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };
```

``` js
// movies/[...params].js

import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  console.log(router);
  const [title, id] = router.query.params;
  return (
    <div>
      <h4>{title}</h4>
    </div>
  );
}
```

▫ 누군가가 Incognito 모드에서 접속한다면 에러 발생
- 페이지가 백엔드에서 pre-render 되기 때문  
- 서버에는 router.query.params가 없음 

``` js
// movies/[...params].js

import Seo from "@/components/Seo";

export default function Detail({ params }) {
  const [title, id] = params;
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
```

▫ 단지 조금 더 빠르게 데이터를 가져오기 위해 사용   
