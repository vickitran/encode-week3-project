import { ethers } from "hardhat";
import deployMyERC20Token from './deployMyERC20Token'
import mintToken from "./mintToken";
import delegateVoting from './delegateVoting';
import deployTokenizedBallot from './deployTokenizedBallot';
import castVote from './castVotes';
import pickWinner from "./pickWinner";

/*
  it works in local evm environment
*/

const PROPOSAL_NAMES = ['proposal1', 'proposal2', 'proposal3'];
const BYTES_PROPOSAL_NAMES = PROPOSAL_NAMES.map(proposal => ethers.utils.formatBytes32String(proposal));
const TOKEN_MINT = ethers.utils.parseEther("2")




const main = async () => { 
  // step 0: setup constants or variables
  const totalMints = 15;
 

  const [deployer, acc1, acc2, acc3, acc4, acc5, acc6, acc7, acc8] = await ethers.getSigners();
  const possibleMintAccounts = [acc1, acc2, acc3, acc4, acc5]
  const possibleDelegatees = [acc6, acc7, acc8]

  // step 1: deloy MyERC20Token contract
  const myERC20TokenContractAddress = await deployMyERC20Token();
  console.log(`step1: ERC20 vote tokens contract is deployed at ${myERC20TokenContractAddress}`)


  const currentBlock = await ethers.provider.getBlock('latest')
  console.log(`After deploy MyERC20Token contract, current block number is: ${currentBlock.number}`)

  // step 2: mint tokens
  const token_mint_accounts = await mintToken(deployer, possibleMintAccounts, totalMints, myERC20TokenContractAddress, TOKEN_MINT);
  console.log(`step2: mint tokens`)

  // step 3: delegate voting
  const votingAccounts = await delegateVoting(token_mint_accounts, possibleDelegatees, myERC20TokenContractAddress)
  const currentBlockAfterdelateVoting = await ethers.provider.getBlock('latest')
  console.log(`After delegate voting, current block number is: ${currentBlockAfterdelateVoting.number}`)
  console.log(`step3: delegate voting, voting accounts: ${JSON.stringify(votingAccounts)}`)

  const referenceBlockNumber = currentBlockAfterdelateVoting.number;

  // step 4: deploy tokneizedBallot contract
  const tokenizedBallotContractAddress = await deployTokenizedBallot(BYTES_PROPOSAL_NAMES, myERC20TokenContractAddress, referenceBlockNumber)
  console.log(`step4: deploy tokenizedBallotContract, the address is ${tokenizedBallotContractAddress}`)
  
  // step 5: cast votes
  const VoteAmount = ethers.utils.parseEther("1")
  await castVote(tokenizedBallotContractAddress, 2,votingAccounts ,VoteAmount )
  console.log(`step5: cast vote`)


  // step 6: pick winner
  const winner = await pickWinner(tokenizedBallotContractAddress)
  console.log(`step6: pick winner, the winning proposal is:  ${ethers.utils.parseBytes32String(winner)}`)

}

main().catch(err => { 
  console.error(err);
  process.exitCode = 1;
})
