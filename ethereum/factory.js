import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x8F11EC0D06524160a6338c7adc1D7765f62C5f35"
);

export default instance;
