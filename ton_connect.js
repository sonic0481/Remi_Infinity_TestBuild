//const script = document.createElement('script');
//script.src = 'https://cdn.jsdelivr.net/npm/@tonconnect/sdk@latest/dist/tonconnect-sdk.min.js';
//document.head.appendChild(script);

// script.onload = () => {
//     // TON Connect SDK 로드 완료 후 실행할 코드
//     const tonConnect = new TonConnect();    
// };

//import TonConnect from 'https://unpkg.com/@tonconnect/sdk@latest/dist/tonconnect-sdk.min.js';
class Ton_Connect {
    constructor() {
        this.tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
            manifestUrl: 'https://sonic0481.github.io/Remi_Infinity_TestBuild/tonconnect-manifest.json',
            twaReturnUrl: 'https://t.me/jsjgametest_bot',
            uiPreferences: {
                borderRadius: 's',
                displayWalletsList: true // 지갑 목록을 기본으로 표시
            }
        });
    }

    async connectWallet() {
        try {
            this.tonConnectUI.connectionRestored.then( restored => {
                if( restored ){
                    console.log( 'Connection restored Wallet' );
                }
                else {
                    console.log('Connection was not restored.');

                    const connectedWallet = this.tonConnectUI.connectWallet();
                    this.tonConnectUI.uiOptions = {
                        twaReturnUrl: 'https://t.me/remi_test'
                    };

                    return connectedWallet;
                }
            } );            

            //// 지갑 연결 시도
            //await this.tonConnect.connectWallet();

            //// 지갑 정보 가져오기
            //const walletInfo = this.tonConnect.getWallet();
            
            //return walletInfo;
            // Unity에 지갑 연결 정보 전달
            // if (window.unityInstance) {
            //     window.unityInstance.SendMessage('TonConnectManager', 'OnWalletConnected', JSON.stringify(walletInfo));
            // } else {
            //     console.warn('Unity instance is not available.');
            // }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            throw new Error('Failed to connect wallet');
        }
    }
}
// 모듈을 export하여 다른 스크립트에서 사용할 수 있도록 합니다.
export default Ton_Connect;
    
    // async function sendTransaction(toAddress, amount) {
    //     try {
    //         const response = await tonConnect.request({
    //             method: 'ton_sendTransaction',
    //             params: {
    //                 to: toAddress,
    //                 value: amount,
    //                 data: '0x',
    //                 feeLimit: '1000000'
    //             }
    //         });
    
    //         if (response.error) {
    //             console.error('Failed to send transaction:', response.error);
    //         } else {
    //             console.log('Transaction sent:', response);
    //             // Unity로 응답 전달
    //             unityInstanceRef.SendMessage('TonConnectManager', 'OnTransactionSent', JSON.stringify(response));
    //         }
    //     } catch (error) {
    //         console.error('Error sending transaction:', error);
    //     }
    // }
    
    // async function getAccountInfo() {
    //     try {
    //         const response = await tonConnect.request({
    //             method: 'ton_getAccountInfo',
    //             params: {}
    //         });
    
    //         if (response.error) {
    //             console.error('Failed to get account info:', response.error);
    //         } else {
    //             console.log('Account info:', response);
    //             // Unity로 응답 전달
    //             unityInstanceRef.SendMessage('TonConnectManager', 'OnAccountInfoReceived', JSON.stringify(response));
    //         }
    //     } catch (error) {
    //         console.error('Error getting account info:', error);
    //     }
    // }
//}

