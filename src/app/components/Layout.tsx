'use client'
import React, { useState, useEffect, useRef } from "react";


import navigation from "./nav";


import Link from "next/link";
import { theme, Menu, Button, Layout, Spin, Drawer, Dropdown } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";



const AppSideNav: React.FC = ({children}:any) => {
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false); // Control Drawer visibility

  const popupRef = useRef<HTMLDivElement>(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
 


  
  const handleDrawerClose = () => setDrawerVisible(false);
 


  return (
    // <Layout style={{ minHeight: "100vh" }}>
    //   {/* Show Sider only on large screens */}

    //   <Sider
    //     theme="light"
    //     width={collapsed ? 80 : 200}
    //     style={{
    //       paddingTop: "100px",

    //       height: "100vh",
    //       position: "fixed",
    //       left: 0,
    //       top: 0,
    //       bottom: 0,
    //       backgroundColor: "white",

    //       transition: "width 0.2s",
    //     }}
    //     collapsible
    //     collapsed={collapsed}
    //     onCollapse={() => setCollapsed(!collapsed)}
    //   ></Sider>

    //   {/* Show Drawer on small screens */}

    //   <Drawer
    //     style={{ paddingTop: "100px" }}
    //     placement="left"
    //     closable={false}
    //     onClose={handleDrawerClose}
    //     visible={drawerVisible}
    //     bodyStyle={{ padding: 0 }}
    //   ></Drawer>

    //   <Layout style={{ marginLeft: 200 }}>
    //     <Header
    //       style={{
    //         padding: 0,
    //         background: "white",
    //         position: "fixed",
    //         left: 200,
    //         right: 0,
    //         top: 0,
    //         zIndex: 2,
    //         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "space-between",
    //         paddingLeft: "16px",
    //         paddingRight: "16px",
    //       }}
    //     >
    //       {/* User Info and Dropdown Menu */}
    //       <div
    //         style={{
    //           cursor: "pointer",
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //           padding: "0 16px",
    //           height: "36px",

    //           backgroundColor: "white",
    //           color: "black",
    //           fontSize: 16,
    //           position: "absolute",
    //           top: 16,
    //           right: 56,
    //         }}
    //       >
    //         <div style={{ display: "flex", alignItems: "center" }}>
    //           <div
    //             style={{
    //               width: 40,
    //               height: 40,
    //               borderRadius: "50%",
    //               backgroundColor: "#d9d9d9",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //               marginRight: 12,
    //             }}
    //           ></div>
    //         </div>
    //       </div>
    //     </Header>
    //     <Content
    //       style={{
    //         margin: "64px 16px",
    //         overflow: "auto",
    //         height: "100vh",
    //         backgroundColor: "#F5F7F8",
    //       }}
    //     >
    //       {children}
    //     </Content>
    //   </Layout>
    // </Layout>
    <></>
  );
};

export default AppSideNav;
