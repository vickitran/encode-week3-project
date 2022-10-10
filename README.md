# Solidity Bootcamp Project - Week3: Tokenized Ballot

The project aims to extend and introduce new features to the Ballot.sol smart contract. The novelty is that the voting mechanism is based on the ERC20 Token minting process.

The proposal voting consists of the interaction of two smart contracts: MyERC20Token (responsible for the minting of tokens and grants users permission to vote) and TokenizedBallot (implements the voting system).

The development environment tests both smart contract functions (give voting tokens, delegating voting power, casting votes, checking vote power and querying results) locally through the use of scripts developed in Typescript and interaction with public blockchains.

Each function corresponds to a script.ts.

The project contains the following scripts:

- `castVotes.ts`
- `delegateVoting.ts`
- `deployMyERC20Token.ts`
- `deployTokenizedBallot.ts`
- `startVotingProcess.ts`
- `mintToken.ts`
- `pickWinner.ts`

For users with voting rights, the following script provides an easy way to vote on Goerli Test network.

- `voteForProposal.ts`

Additional information is available within the individual files.

## For the Encode Camp the following contracts are deployed here

TokenizedBallot.sol -> 0x068AB304c07AaaA12e5a54eec38DF457bCF707F4 

MyERC20Token.sol -> 0x30d90e8b9add4051e134cdc2bd692b01811fccc2

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ALCHEMY_API_KEY`

`INFURA_API_KEY`

`MNEMONIC` (12 seed phrase)

OR

`PRIVATE_KEY`

## Deployment

To deploy this project run

```bash
yarn install
yarn hardhat compile
yarn hardhat run .\scripts\-insert selected script-.ts
```
