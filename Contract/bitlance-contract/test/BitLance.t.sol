// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test, console} from "forge-std/Test.sol";
import {BITLANCE} from "../src/BITLANCE.sol";
import {USDCMOCK} from "../src/ERC20MOCK.sol";

contract BITLANCETEST is Test {
    BITLANCE public bitlance;
    USDCMOCK public usdc;
    string[] public jobIds = ["12345", "54321"];
    address public tokenA = address(1);
    address public tokenB = address(2);
    address public manager1 = address(3);
    address public client = address(4);
    address public freelancer = address(5);
    uint256 public jobAmount = 10 * 10 ** 18;
    event RequestJob(address indexed _freelancer,string indexed _jobid);
    event InitJob(address indexed  client,address indexed  freelancer,string jobid,uint256 _amout);

    

    function setUp() public {
        bitlance = new BITLANCE();
        usdc = new USDCMOCK();

        vm.label(tokenA, "tokenA");
        vm.label(tokenB, "tokenB");
        bitlance.addToken(address(usdc));
        usdc.mint(freelancer,1000);
         usdc.mint(client,1000);
    }

    /****
     * @dev BITLANCEMANAGEMENT CONTRACT
     * 1. check if an address token is allowed
     * 2. check if an address is not allowed
     * 3. check if the call is a manager
     * 4. check an address not a manager
     * 5. add another address to the manager list
     * 6. check user balance
     */
    function test_checkIfTokenIsAllowed() public view {
        bool isAllowed = bitlance.allowedTokens(address(usdc));
        assertEq(isAllowed, true);
    }

    function test_checkIfTokenIsNotAllowed() public view {
        bool isAllowed = bitlance.allowedTokens(tokenB);
        assertEq(isAllowed, false);
    }

    // the address(this) was the deployer of the contract -> automatic added to the list of the managers
    function test_isManager() public view {
        bool isManager = bitlance.isManager(address(this));
        assertEq(isManager, true);
    }

    function test_notManager() public view {
        bool isManager = bitlance.isManager(manager1);
        assertEq(isManager, false);
    }

    function test_addNewManager() public {
        bitlance.addManager(manager1);
        bool isManager = bitlance.isManager(manager1);
        assertEq(isManager, true);
    }

    function test_usdcBalance() public view {
        uint256 balance = usdc.balanceOf(freelancer);
        assertEq(balance, 1000 * 10 ** 18);
    }

    /****
     * @dev BITLANCE CONTRACT
     * 1. request for job
     * 2. init job
     * 3. release payment
     * 4. raise an issue
     * 5. refund back
     */

    function test_jobRequest() public {
        // Set the message sender to be the client for this transaction
        string memory jobId = jobIds[1];
        vm.startPrank(freelancer);
       
        
       console.logAddress(freelancer);
        // Approve the BITLANCE contract to spend USDC on behalf of the client
        // usdc.approve(address(bitlance), jobAmount);
        
        // Request a job
        
        
        bitlance.requestJob(jobId, client, jobAmount);
        // Check that the job request was successful
      (uint256 _amount,,,address _client,bool isStarted,bool isPaid,bool hasConflict) = bitlance.jobs(jobId);
      
      assertEq(_amount, jobAmount);
      assertEq(_client, client);
      assertEq(isStarted, false);
      assertEq(isPaid, false);
      assertEq(hasConflict, false);
    vm.stopPrank();
        
        
        

       
        
    }

// init job

function test_initJob()public{
    test_jobRequest();
    vm.startPrank(client);
    
     usdc.approve(address(bitlance), jobAmount);
    bitlance.initializeJob(jobIds[1],freelancer,address(usdc));
    (uint256 _amount,address _stable,address _selected,address _client,bool isStarted,bool isPaid,bool hasConflict) = bitlance.jobs(jobIds[1]);
    assertEq(_amount, jobAmount);
    assertEq(_client, client);
    assertEq(isStarted, true);
    assertEq(isPaid, false);
    assertEq(hasConflict, false);
    assertEq(_selected, freelancer);
    assertEq(address(usdc),_stable);

    vm.stopPrank();
}

//release payment
function test_releasePayment()public{
    test_initJob();
    vm.startPrank(client);
    bitlance.releasePayament(jobIds[1]);

    (uint256 _amount,address _stable,address _selected,address _client,bool isStarted,bool isPaid,bool hasConflict) = bitlance.jobs(jobIds[1]);
    assertEq(_amount, jobAmount);
    assertEq(_client, client);
    assertEq(isStarted, true);
    assertEq(isPaid, true);
    assertEq(hasConflict, false);
    assertEq(_selected, freelancer);
    assertEq(address(usdc),_stable);



    vm.stopPrank();
}

//confirm freelancer balance
function test_confirmFreelancerBalance()public{
    test_releasePayment();
    uint256 newBalance =  usdc.balanceOf(freelancer);
    assertEq(newBalance, jobAmount+(1000*10**18));
}

//confirm client balance
function test_confirmClientBalance()public{
    test_releasePayment();
    uint256 newBalance =  usdc.balanceOf(client);
    assertEq(newBalance, (1000*10**18)-jobAmount);
}

//raise conflict
function test_raiseConflict()public{
    test_initJob();
    vm.startPrank(freelancer);
    bitlance.raiseConflict(jobIds[1]);
    (uint256 _amount,address _stable,address _selected,address _client,bool isStarted,bool isPaid,bool hasConflict) = bitlance.jobs(jobIds[1]);
    assertEq(_amount, jobAmount);
    assertEq(_client, client);
    assertEq(isStarted, true);
    assertEq(isPaid, false);
    assertEq(hasConflict, true);
    assertEq(_selected, freelancer);
    assertEq(address(usdc),_stable);
    vm.stopPrank();
    
}

//refund to freelancer after a conflict
function test_refundToFreelancerAfterConflict()public{
    test_raiseConflict();
    bitlance.refund(jobIds[1],freelancer);
    (uint256 _amount,address _stable,address _selected,address _client,bool isStarted,bool isPaid,bool hasConflict) = bitlance.jobs(jobIds[1]);
     assertEq(isPaid, true);

   

}



}
