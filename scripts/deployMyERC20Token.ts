import { ethers } from "hardhat";

const deployMyERC20Token = async () => { 
  
  const myERC20TokensFactory = await ethers.getContractFactory('MyERC20Token');
  const myERC20TokenContract = await myERC20TokensFactory.deploy()
  await myERC20TokenContract.deployed()
  return myERC20TokenContract.address

}

export default deployMyERC20Token;
