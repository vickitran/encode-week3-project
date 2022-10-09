import { ethers } from "hardhat";

const deployTokenizedBallot = async (proposalNames: string[], ERC20TokenAddress: string, referenceBlockNumber: number) => {   
  const tokenizedBallotFactory = await ethers.getContractFactory('TokenizedBallot');
  const tokenizedBallotContract = await tokenizedBallotFactory.deploy(proposalNames, ERC20TokenAddress, referenceBlockNumber)
  await tokenizedBallotContract.deployed()

  console.log(`Ballot is deployed, the address is: ${tokenizedBallotContract.address}`)
  return tokenizedBallotContract.address
}

export default deployTokenizedBallot;
