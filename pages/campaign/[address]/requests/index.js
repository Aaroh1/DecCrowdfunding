import Link from "next/link";
import React, { useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import PageLayout from "../../../../Components/PageLayout";
import camp from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3"

export default function index(props) {
  let requests
  useEffect(()=>{
    (async ()=>{
      const instance = await camp(props.address);
      requests = await Promise.all(
      Array(parseInt(props.reqCount))
        .fill()
        .map(async(ele, i) => {
          let u= await instance.methods.requests(i).call();
          return u
        })
    );
    } )();
  },[requests])
  return (
    <PageLayout>
      <Link href={`/campaign/${props.address}/requests/new`}>
        <Button primary>Make a Request</Button>
      </Link><Table celled structured striped textAlign="center" singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Recepient</Table.HeaderCell>
                <Table.HeaderCell>Approval Count</Table.HeaderCell>
                <Table.HeaderCell>Approve</Table.HeaderCell>
                <Table.HeaderCell>Finalize</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.requestRows()}</Table.Body>
          </Table>

    </PageLayout>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { address } = params;
  const instance = await camp(address);
  const size = await instance.methods.getNumRequests().call();
  return {
    props: {
      address: address,
      reqCount: size,
    },
  };
}
