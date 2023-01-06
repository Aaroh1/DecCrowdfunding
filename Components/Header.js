import React, { Component, createRef } from "react";
import { Menu, Sticky, Image, Icon } from "semantic-ui-react";
import Link from "next/link";

export default function Header()
 {
    return (
      <div>
        <Sticky>
          <Menu color='teal' fluid size="huge" style={{ marginBottom: "5vh" }}>
            <Link href="/">
              FundMe
            </Link>
            <Menu.Menu position="right">
              <Link href='/'>
                    View Campaigns             
              </Link>
              <Link href="/campaign/new">
                  <Icon name="add"></Icon>
              </Link>
            </Menu.Menu>
          </Menu>
        </Sticky>
      </div>
    );
  }
