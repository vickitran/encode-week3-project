import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

const castVote = async (TokenizedBallotAddress: string, proposal: number, votingAccount: SignerWithAddress[], amount: BigNumber) => { 
  const tokenizedBallotFactory = await ethers.getContractFactory('TokenizedBallot');
  // attach contract address
  const tokenizedBallotContract = await tokenizedBallotFactory.attach(TokenizedBallotAddress);
  // connet to deployer
  // await myERC20TokenContract.connect(deployer);
  console.log(`attach tokenizedBallot contract address is : ${tokenizedBallotContract.address}`);
  for await (const account of votingAccount) {
    const votingTx = await tokenizedBallotContract.connect(account).vote(proposal, amount);
    await votingTx.wait();
  }
}

export default castVote;
