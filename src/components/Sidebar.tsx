import { Layout } from "antd";
import React, { type ReactNode } from "react";

const { Sider, Content } = Layout;

const Sidebar: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <Sider className="p-2">{children}</Sider>;
};

export default Sidebar;
