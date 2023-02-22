// SPDX-License-Identifire: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract FundRaising {
    uint public constant MINIMUM_AMOUNT = 1e16;
    uint public fundRaisingCloses;      // 모금 종료 시각
    address public beneficiary;         // 모금 수령자

    constructor (uint _duration, address _beneficiary) {
        fundRaisingCloses = block.timestamp + _duration;
        beneficiary = _beneficiary;
    }
    address[] funders;

    function fund() public payable {
        require(msg.value >= MINIMUM_AMOUNT, "MINIMUN AMOUNT: 0.01 ether");
        require(block.timestamp < fundRaisingCloses, "FUND RAISING CLOSED");

        address funder = msg.sender;
        funders.push(funder)
    }

    function currentCollection() public view
    returns(uint256){
        return address(this).balance;
    }


    modifier_onlyBeneficiary() {
        require(msg.sender == beneficiary);
        _;
    }
    function withdraw() public payable
    onlyBeneficiary {
        require(block.timestamp > fundRaisingCloses);
        msg.sender.transfer(address(this).balance);
    }
}