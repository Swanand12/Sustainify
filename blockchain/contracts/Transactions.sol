// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;



contract Transactions{

    struct Transaction{
        address seller;
        address buyer;
        uint cost;
        uint tokens;
        uint timestamp; 
    }

    Transaction[] public transactions;
    

    function createTransaction (address payable seller, address buyer, uint tokens) public payable{

        transactions.push(Transaction(seller, buyer, msg.value, tokens, block.timestamp));

        seller.transfer(msg.value);
    }




    function getUserTransactions (address user) public view returns(Transaction[] memory ){

        uint count = 0;
        
        for (uint i=0; i<transactions.length; i++) 
        {
            if (transactions[i].seller == user || transactions[i].buyer == user){
                count++;
            }
        }

        Transaction[] memory userTransactions = new Transaction[](count);

        uint index = 0;

        for (uint i=0; i<transactions.length; i++) 
        {
            if (transactions[i].seller == user || transactions[i].buyer == user){
                userTransactions[index] = transactions[i];
                index++;
            }
        }

        return userTransactions;
    } 
}