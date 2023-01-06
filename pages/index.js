import { useEffect } from "react";
import instance from "../ethereum/factory";
import "semantic-ui-css/semantic.min.css";
import { Button, Card, Image } from "semantic-ui-react";
import Layouts from "../Components/PageLayout";
import Link from "next/link";
function Home(props) {
  const opencamps = props.camps.map((address) => {
    return {
      header: address,
      description: <Link href={`/campaign/${address}`}>View Campaign</Link>,
      fluid: true,
    };
  });
  return (
    <>
      <Layouts>
        <div className="opencamps">
          <h3>Open Campaigns</h3>
          <Link href='/campaign/new'>  
          <Button
            content="Create New Campaign"
            floated="right"
            icon="add"
            labelPosition="right"
          />
          </Link>
          <Card.Group stackable={true} items={opencamps} centered></Card.Group>
        </div>
      </Layouts>
    </>
  );
}
Home.getInitialProps = async (ctx) => {
  const deployedcampaigns = await instance.methods
    .getDeployedCampaigns()
    .call();

  // const deployedcampaigns = await instance.methods.deployedCampaigns('1').call();
  console.log(deployedcampaigns);

  // instance.methods.getDeployedCampaigns.call().then(console.log())
  return { camps: deployedcampaigns };
};
export default Home;
