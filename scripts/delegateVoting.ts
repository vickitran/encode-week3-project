import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";


const delegateVoting = async (mintAccounts:SignerWithAddress[], delegatee: SignerWithAddress[], ERC20ContractAddress: string) => {
  
  const myERC20TokensFactory = await ethers.getContractFactory('MyERC20Token');

  const myERC20TokenContract = await myERC20TokensFactory.attach(ERC20ContractAddress);
  // connet to deployer
  // await myERC20TokenContract.connect(deployer);
  console.log(`attach ERC20 token contract address is : ${myERC20TokenContract.address}`);

  const votingAccount = []
  const tempAddress: string[] = []
  for await (const account of mintAccounts) {
    const isSelfDelegate = Math.floor(Math.random() * 4);
    if (isSelfDelegate) {
      const delegateTx = await myERC20TokenContract.connect(account).delegate(account.address)
      await delegateTx.wait()
      if (!tempAddress.includes(account.address)) { 
        tempAddress.push(account.address)
        votingAccount.push(account)
      }
      const votesAfterDelegating3 = await myERC20TokenContract.connect(account).getVotes(account.address)
      console.log(`Votes after self-delegating: ${ethers.utils.formatEther(votesAfterDelegating3)}`)
    } else { 
      const pickDelegateeIndex = Math.floor(Math.random() * delegatee.length);
      const delegateTx = await myERC20TokenContract.connect(account).delegate(delegatee[pickDelegateeIndex].address)
      await delegateTx.wait()
      if (!tempAddress.includes(delegatee[pickDelegateeIndex].address)) { 
        tempAddress.push(delegatee[pickDelegateeIndex].address)
        votingAccount.push(delegatee[pickDelegateeIndex])
      }
      const votesAfterDelegating3 = await myERC20TokenContract.connect(delegatee[pickDelegateeIndex]).getVotes(delegatee[pickDelegateeIndex].address)
      console.log(`Votes after delegating to others: ${ethers.utils.formatEther(votesAfterDelegating3)}`)
    }
  }

  return votingAccount
}


export default delegateVoting
