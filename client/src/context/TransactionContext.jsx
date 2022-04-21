import React, {useEffect, useState} from 'react'
import {ethers} from 'ethers'

import {contractABI, contractAddress} from '../utils/contstants'

export const TransactionContext = React.createContext()

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI,signer);

    return transactionContract;
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({adressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setisLoading] = useState(false);
    const [transactionCount, settransactionCount] = useState(localStorage.getItem("transactionCount"))

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }

    const checkIfWalletConnected = async () => {
      try {
        if(!ethereum) return alert("Please install Metamask!")

        const accounts = await ethereum.request({method: 'eth_accounts'})

        if (accounts.length) {
            setCurrentAccount(accounts[0]);

            //getAllTransactions
        } else {
            console.log("No account found")
        }
        
        console.log(accounts)
      } catch (error) {
        console.log(error);
        throw new Error("No ethereum Object.")
      }

    }

    const connectWallet = async () =>  {
        try {
            if(!ethereum) return alert("Please install Metamask!");

            const accounts = await ethereum.request({method: 'eth_requestAccounts'})

            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object.")
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask!");
            const {addressTo, keyword, message, amount} = formData;
            const transactionContract = getEthereumContract()
            const parseAmount = ethers.utils.parseEther(amount)

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parseAmount._hex
                }]
            });
           const transactionHash = await transactionContract.addToBlockchain(addressTo, parseAmount, message, keyword);

           setisLoading(true);
           console.log(`Loading... ${transactionHash.hash}`);
           await transactionHash.wait();
           setisLoading(false);
           console.log(`Success... ${transactionHash.hash}`);
           const transactionCount = await transactionContract.getTransactionCounter();
           settransactionCount(transactionCount.toNumber())

           setFormData({adressTo: '', amount: '', keyword: '', message: ''})

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object.")
        }
    }

    useEffect(() => {
        checkIfWalletConnected()
    }, [])
    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, handleChange, sendTransaction, setFormData}}>
            {children}
        </TransactionContext.Provider>
    )
}