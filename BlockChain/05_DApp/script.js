var web3;
/**
 * 실습 환경에 맞는 값 할당
 */
const SEPOLIA_URL = "https://sepolia.infura.io/v3/";
const CA = "0x251f0EE77Ed3921a71932901cf41d1Ee679D0b44";
const STORAGE_ABI = [];
const privateKey = "0x79956F70D399e07c903e736Ebf897F9696DEA336";
var sender;
var senderAddress;
var storageContract;

/**
 * TODO:
 * web3 객체 만들기
 */
window.addEventListener("load", () => {
  if (typeof web3 !== "undefined") {
    window.web3 = new Web3(web3.currentProvider);
    alert("web3 injected");
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider(ROPSTEN_URL));
  }
  startApp();
});

/**
 * TODO:
 * 계정 정보 생성 및 초기 값 세팅
 */
sender = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
web3.eth.accounts.wallet.add(sender);
web3.eth.defalutAccount = sender.address;
senderAddress = web3.eth.defalutAccount;

function startApp() {
  // 1. 계정 정보
  // 2. storage 컨트랙트 인스턴스
  // 3. 화면에 초기 값 세팅
}

/**
 * TODO:
 * retrieve() 함수 호출 후 화면에 결과 표시
 */
function retrieve() {}

/**
 * TODO:
 * store() 함수 호출 후 화면에 결과 표시
 */
function store() {}
