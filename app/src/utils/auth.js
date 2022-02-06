import { ethers } from "ethers";

async function getAddress() {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        const address = await signer.getAddress();
        return address;
    }
}

async function getNonce() {
    if (window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        const address = await signer.getAddress();
        const response = await fetch(`http://127.0.0.1:8000/auth/nonce?public_address=${address}`);
        const nonceResult = await response.json();
        return nonceResult.nonce;
    }
    
}

async function signNonce(nonce) {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const signature = await signer.signMessage(`I am signing my one-time nonce: ${nonce}`);
        return signature;
    }
}

export { signNonce, getNonce, getAddress }