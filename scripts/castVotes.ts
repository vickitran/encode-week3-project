import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

const castVote = async (TokenizedBallotAddress: string, proposal: number, votingAccount: SignerWithAddress[], amount: BigNumber) => { 
  const tokenizedBallotFactory = await ethers.getContractFactory('TokenizedBallot');
  const tokenizedBallotContract = await tokenizedBallotFactory.attach(TokenizedBallotAddress);
  for await (const account of votingAccount) {
    const votingTx = await tokenizedBallotContract.connect(account).vote(proposal, amount);
    await votingTx.wait();
  }
}

export default castVote;
