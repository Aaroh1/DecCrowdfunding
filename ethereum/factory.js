import web3 from "./web3";
const CampaignFactory = require('./build/CampaignFactory.json');

const instance =new web3.eth.Contract(
    (CampaignFactory['abi']),
    '0x493451931e282F0B5B78EEaBb804B2c517c7b13e'
)

export default instance;