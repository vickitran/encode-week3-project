import { ethers } from "hardhat";

const pickWinner = async (TokenizedBallotAddress: string) => { 
  const tokenizedBallotFactory = await ethers.getContractFactory('TokenizedBallot');
  const tokenizedBallotContract = await tokenizedBallotFactory.attach(TokenizedBallotAddress);
  const winnerProposal = await tokenizedBallotContract.winningProposalName()
  return winnerProposal
}

export default pickWinner;
