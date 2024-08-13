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
        console.log( 'Initialize TonConnect.' );
        this.tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
            manifestUrl: 'https://r2oncorps.github.io/ton-stair-build/tonconnect-manifest.json'            
        });

        this.tonConnectUI.uiOptions = {
            twaReturnUrl: 'https://t.me/jsjgametest_bot'
        };
    }

    async isConnectWallet(){
        const restored = await this.tonConnectUI.connectionRestored;
        return restored;
    }

    async connectWallet() {               
        const connectInfo = await this.tonConnectUI.connectWallet();              
        return connectInfo;           
    }        

    async openWallet(){
        console.log( 'Connection restored Wallet' );                
        console.log('Wallet Info :', JSON.stringify(this.tonConnectUI.walletInfo));                            
        window.open(this.tonConnectUI.walletInfo.universalLink, '_blank');

        const walletList = await this.tonConnectUI.getWallets();
        return walletList;           
    }

    async sendTransaction(tonAddress, tonAmount, tonPayload){
        try {
            const transaction = {
                validUntil: Math.floor(Date.now() / 1000) + 600,
                messages: [
                    {
                        adress: tonAddress,
                        amount: tonAmount,
                        payload: tonPayload
                    }
                ],
            };

            const result = await this.tonConnectUI.sendTransaction(transaction);
            return result;
        }
        catch(error){
            throw new Error(`Failed to Transaction: ${error}`);
        }
    }

    async disconnectWallet(){
        try {
            await this.tonConnectUI.disconnect();
            console.log('Wallet disconnected successfully.');

            return true;
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
        }

        return false;
    }
}
// 모듈을 export하여 다른 스크립트에서 사용할 수 있도록 합니다.
export default Ton_Connect;   
