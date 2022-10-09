// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface IERC20Votes {
    function getPastVotes(address account, uint256 amount)
        external
        view
        returns (uint256);
}

contract TokenizedBallot {
    uint256 public referenceBlock;
    IERC20Votes public tokenContract;

    struct Proposal {
        bytes32 name;
        uint256 voteCount;
    }

    Proposal[] public proposals;
    mapping(address => uint256) public votingPowerSpent;

    constructor(
        bytes32[] memory proposalNames,
        address _tokenContract,
        uint256 _referenceBlock
    ) {
        for (uint256 i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
        referenceBlock = _referenceBlock;
        tokenContract = IERC20Votes(_tokenContract);
    }

    function votingPower(address account)
        public
        view
        returns (uint256 votingPower_)
    {
        votingPower_ =
            tokenContract.getPastVotes(account, referenceBlock) -
            votingPowerSpent[msg.sender];
    }

    function vote(uint256 proposal, uint256 amount) public {
        uint256 _votingPower = votingPower(msg.sender);
        require(
            _votingPower >= amount,
            "trying to vote more than voting power"
        );
        votingPowerSpent[msg.sender] += amount;
        proposals[proposal].voteCount += amount;
    }

    function winningProposal() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winningProposalName() public view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
