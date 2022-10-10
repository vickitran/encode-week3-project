// run this if you want to vote for proposals!

import { ethers } from "hardhat";
require("dotenv").config();

const test = async () => {
  const tokenizedBallotFactory = await ethers.getContractFactory(
    "TokenizedBallot"
  );
  const tokenizedBallotContract = await tokenizedBallotFactory.attach(
    "0x068AB304c07AaaA12e5a54eec38DF457bCF707F4"
  );
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    `${process.env.ALCHEMY_API_KEY}`
  );
  const walletPrivateKey = new ethers.Wallet(
    `${process.env.PRIVATE_KEY}`,
    provider
  );
  // const votingPower = await tokenizedBallotContract.votingPower(
  //   "0x92a8A20279B36eCF7dC77CAf2E5F7ca1106AD24E"
  // );
  // console.log(votingPower);
  const votingTx = await tokenizedBallotContract
    .connect(walletPrivateKey)
    .vote(0, ethers.utils.parseEther("1"), { gasLimit: 5000000 });
  const votingTxReciept = await votingTx.wait();
  console.log(votingTxReciept);
};

test().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
