# 01. React Hooks

## React Hooks 사용규칙     
1️⃣ 같은 Hook을 여러번 호출할 수 있다. 

2️⃣ 함수 컴포넌트 몸통이 아닌, 몸통 안 복합 실행문의 {}에서는 사용할 수 없다. 

3️⃣ 비동기 함수(async)는 콜백 함수로 사용할 수 없다. 
``` js
useEffect(async () => {
    await Promise.resolve(1)
}, [])
```
> useEffect Hook 내부에 비동기 함수 사용 X -> 에러 발생     


## React에서 기본적으로 지원하는 Hooks
### useState 
컴포넌트 상태(state)관리    

▫ **상태 (state)**
> 컴포넌트에서 동적인 값     
- 일반적으로 컴포넌트 내부에서 변경 가능한 데이터를 관리해야 할 때 사용
- 값을 저장하거나 변경할 수 있는 객체
- 보통 이벤트와 함께 사용

> 리액트 16.8부터 Hooks 기능이 도입되며 함수형 컴포넌트 상태 관리 O     



``` js
const [state, setState] = useState(initialState)
```
➡ useState의 변수값이 바뀌면 컴포넌트가 새롭게 렌더링 됨        

▫ useState는 비동기로 동작한다  
(정확히는 setState가 비동기로 동작)     
> 하나의 컴포넌트 내부에 수많은 상태값 존재     
> 만약 이 상태 하나하나가 바뀔 때마다 화면을 렌더링하면 비효율적        
> **리액트 성능 향상을 위해 setState를 연속 호출하면 배치 처리하여 한 번에 렌더링 O**  

> **배치 (batch)**      
> 여러 개의 state 업데이트를 하나의 리렌더링으로 묶는 것    


<br><br>

### useEffect
렌더링 이후 실행할 코드 작성        
▫ mount     
▫ update        
▫ unmount       
![image](https://user-images.githubusercontent.com/93974908/219556995-5b133259-5c2e-4e0f-83e7-cd4d3a918de9.png)


### useLayoutEffect 
모든 DOM 변경 후 브라우저가 화면을 그리기 (render) 전에 실행되는 기능을 정할 수 있음
![image](https://user-images.githubusercontent.com/93974908/219557032-f2f080f9-d145-4397-8768-8174abde8e41.png)

### useContext 
부모 컴포넌트와 자식 컴포넌트 간의 변수와 함수를 전역적으로 정의

### useReducer 
상태(state) 업데이트 로직을 reducer 함수에 따로 분리 가능

### useRef 
컴포넌트나 HTML 요소를 래퍼런스로 관리

### forwardRef 
useRef로 만든 래퍼런스를 상위 컴포넌트로 전달

### useImperativeHandle
useRef로 만든 래퍼런스의 상태에 따라, 실행할 함수 정의 

### useMemo, useCallback
의존성 배열에 적힌 값이 변할 때만 값, 함수를 다시 정의 (재렌더링 시 정의 X)

### useDebugValue 
사용자 정의 Hook의 디버깅을 도움

