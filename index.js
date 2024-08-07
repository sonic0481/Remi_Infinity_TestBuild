window.addEventListener("load", function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('ServiceWorker.js').then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);

        registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                        // 새로운 서비스 워커가 설치됨
                        console.log('New or updated content is available.');
                        // 사용자에게 알림을 보내거나 페이지를 새로고침하도록 요청
                        if (confirm('새로운 업데이트가 있습니다. 페이지를 새로고침하시겠습니까?')) {
                            window.location.reload(true);
                        }
                    } else {
                        // 모든 콘텐츠가 캐시됨
                        console.log('Content is now available offline!');
                    }
                }
            };
        };
    }).catch((error) => {
        console.log('Service Worker registration failed:', error);
    });
}
  });
  var unityInstanceRef;
  var unsubscribe;
  var container = document.querySelector("#unity-container");
  var canvas = document.querySelector("#unity-canvas");
  var loadingBar = document.querySelector("#unity-loading-bar");
  var progressBarFull = document.querySelector("#unity-progress-bar-full");
  var warningBanner = document.querySelector("#unity-warning");

  // Shows a temporary message banner/ribbon for a few seconds, or
  // a permanent error message on top of the canvas if type=='error'.
  // If type=='warning', a yellow highlight color is used.
  // Modify or remove this function to customize the visually presented
  // way that non-critical warnings and error messages are presented to the
  // user.
  function unityShowBanner(msg, type) {
    function updateBannerVisibility() {
      warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }
    var div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type == 'error') div.style = 'background: red; padding: 10px;';
    else {
      if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
      setTimeout(function() {
        warningBanner.removeChild(div);
        updateBannerVisibility();
      }, 5000);
    }
    updateBannerVisibility();
  }

  var buildUrl = "Build";
  var loaderUrl = buildUrl + "/Remi_Infinity_TestBuild.loader.js";
  var config = {
    dataUrl: buildUrl + "/Remi_Infinity_TestBuild.data",
    frameworkUrl: buildUrl + "/Remi_Infinity_TestBuild.framework.js",
    codeUrl: buildUrl + "/Remi_Infinity_TestBuild.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "Monoverse_Game",
    productName: "Remi_Stair",
    productVersion: "1.1.716",
    showBanner: unityShowBanner,
  };

  // By default Unity keeps WebGL canvas render target size matched with
  // the DOM size of the canvas element (scaled by window.devicePixelRatio)
  // Set this to false if you want to decouple this synchronization from
  // happening inside the engine, and you would instead like to size up
  // the canvas DOM size and WebGL render target sizes yourself.
  // config.matchWebGLToCanvasSize = false;

  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Mobile device style: fill the whole browser client area with the game canvas:
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }

  loadingBar.style.display = "block";

  var script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
      progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
      window.unityInstanceRef = unityInstance;
      loadingBar.style.display = "none";
    }).catch((message) => {
      alert(message);
    });
  };
  document.body.appendChild(script);

  // Initialize TelegramBotInstance here
  function initializeTelegramBot(token) {
    if (!window.TelegramBotInstance) {
      window.TelegramBotInstance = new TelegramBot(token);
      console.log("TelegramBot instance created with token:", token);
    } else {
      console.log("TelegramBot instance already initialized.");
    }
  }

  // Example token initialization
  var telegramToken = "7255439789:AAH9Hltmj6ofUAsnSxOpWO1Zf5f7b3K1PyY";
  initializeTelegramBot(telegramToken);  

  //initialize Ton Connect
  import Ton_Connect from './ton_connect.js';

  function initializeTonConnect() {
    if(!window.tonConnectInstance){
      window.tonConnectInstance = new Ton_Connect();
      console.log("TonConnect instance created");
    }
    else{
      console.log("TonConnect instance already initialized.");
    }
    // const script = document.createElement('script');
    // script.src = 'https://cdn.jsdelivr.net/npm/@tonconnect/sdk@latest/dist/tonconnect-sdk.min.js';
    // script.onload = () => {
    //     window.tonConnect = new TonConnect();
    // };
    // document.head.appendChild(script);
  }
  initializeTonConnect();
