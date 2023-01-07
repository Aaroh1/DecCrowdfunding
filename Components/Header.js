import React, { Component, createRef } from "react";
import { Menu, Sticky, Image, Icon } from "semantic-ui-react";
import Link from "next/link";

export default function Header()
 {
    return (
      <div>
        <Sticky>
          <Menu color='teal' size="huge" widths={5} style={{ marginBottom: "5vh" }}>
          <Menu.Item>
            <Link href="/">
              DecCrowdFund
            </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href='/'>
                    View Campaigns             
              </Link>
              </Menu.Item> 
              <Menu.Item>
              <Link href="/campaign/new">
                  <Icon name="add"></Icon>
              </Link>
            </Menu.Item>
          </Menu>
        </Sticky>
      </div>
    );
  }
