import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

const mintToken = async (deployer:SignerWithAddress, mintAccounts: SignerWithAddress[], totalMints: number, ERC20ContractAddress: string, tokenMint: BigNumber ) => { 

  const myERC20TokensFactory = await ethers.getContractFactory('MyERC20Token');
  const myERC20TokenContract = await myERC20TokensFactory.attach(ERC20ContractAddress);
  // connet to deployer
  // await myERC20TokenContract.connect(deployer);

  // TODO: It is same as connect(deployer)
  // const MINT_ROLE = await myERC20TokenContract.MINTER_ROLE();
  // const grantRoleTx = await myERC20TokenContract.grantRole(MINT_ROLE, ERC20ContractAddress);
  // await grantRoleTx.wait()

  const temp: string[] = [];
  const TOKEN_MINT_ACCOUNTS: any = []
  for (let i = 0; i < totalMints; i++) { 
    const accountIndex = Math.floor(Math.random() * mintAccounts.length);
    const mintAccount = mintAccounts[accountIndex];
    const mintTx = await myERC20TokenContract.mint(mintAccount.address, tokenMint);
    await mintTx.wait();
    if (!temp.includes(mintAccount.address)) { 
      temp.push(mintAccount.address)
      TOKEN_MINT_ACCOUNTS.push(mintAccount)
    }
  }

  return TOKEN_MINT_ACCOUNTS
  
}

export default mintToken
