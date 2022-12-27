//SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;
contract CampaignFactory{// A campaign factory to create new campaigns
    address[] public deployedCampaigns;
    function createCampaign(uint min) public{
      Campaign newCampaign= new Campaign(min,msg.sender);//creating new instance of Campaign
      deployedCampaigns.push(address(newCampaign));//pushing instances of new created/deployed campaigns
    }
    function getDeployedCampaigns()public view returns(address []memory ){
        return deployedCampaigns;
    }
}


contract Campaign{
    struct Request{
        string  description;
        uint value;
        address payable recipient;
        bool complete;
        uint Numberofapprovals;
        mapping(address => bool )approvals;
    }
    uint Numofapprovers;
    uint numRequests;
    mapping (uint => Request) requests;
    address public manager;
    uint private minContribution;
    mapping(address=>bool )approvers;

    constructor(uint min, address creator){
        minContribution=min;
        manager=creator;
        Numofapprovers=0;
    } 
    modifier restriction(){
        require(msg.value>0);
        _;
    }
    modifier isManager(){
        require(msg.sender==manager);
        _;
    }
    function contribute () public payable restriction{
        approvers[msg.sender]=true;
        Numofapprovers++;
    }
    function createRequest (string memory desc,uint val,address payable rec)public isManager{
        Request storage r = requests[numRequests++];
        r.description = desc;
        r.value = val;
        r.recipient = rec;
        r.complete = false;
        r.Numberofapprovals = 0;
    }
    function approveRequest(uint index) public {
        Request storage req= requests[index];

        require(approvers[msg.sender]);//msg sender is in list of approvers
        require(!req.approvals[msg.sender]);//approver hasn't already voted No
        
        req.approvals[msg.sender]=true;
        req.Numberofapprovals++;
    }
    function finalizeRequest(uint index)public payable isManager{
        Request storage req=requests[index];
        require(!req.complete);
        require(req.Numberofapprovals>(Numofapprovers/2));
        req.complete=true;
        req.recipient.transfer(req.value);
    }
}