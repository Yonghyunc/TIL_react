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