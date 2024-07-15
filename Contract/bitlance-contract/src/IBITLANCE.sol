// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
/***
*IBITLANCE  this is an interface which defines the core functionality of the bitlance exscrow
**/

interface IBITLANCE {

    struct Job{
        // string jobid;
        uint256 amount;
        address stableCoinToken;
        address[] freelancers;
        address selectedFreelancer;
        address  client;
        bool  isStarted;
        bool  isPaid;
        bool  hasConflict;
    }

    function requestJob(string memory _jobid,address client,uint256 amount)external returns(string memory);
    function initializeJob(string memory _jobid,address freelancer,address stabletoken)external ;
    function releasePayament(string memory _jobid)external;
    function raiseConflict(string memory _jobid)external;
    function refund(string memory _jobid,address _addr)external ;





    
}