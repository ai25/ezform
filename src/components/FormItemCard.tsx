import React, { useState } from "react";
import { Card, Dropdown, Menu } from "antd";
import { FiExternalLink, FiCopy, FiShare2, FiEdit, FiCopy as FiCopy2, FiTrash, FiMoreHorizontal } from "react-icons/fi";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface FormItemCardProps {
    title: string;
    imageUrl: string;
    workspaceNames: string[];
}

const FormItemCard: React.FC<FormItemCardProps> = ({ title, imageUrl, workspaceNames }) => {
    const [opened, setOpened] = useState<string | null>(null);
    const [fromNow, setFromNow] = useState("Never");

    React.useEffect(() => {
        if (!opened) return;
        setFromNow(dayjs(opened).fromNow());
        const interval = setInterval(() => {
            setFromNow(dayjs(opened).fromNow());
        }, 1000);
        return () => clearInterval(interval);
    }, [opened]);

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<FiExternalLink />}>
                Open
            </Menu.Item>
            <Menu.Item key="2" icon={<FiCopy />}>
                Copy link
            </Menu.Item>
            <Menu.Item key="3" icon={<FiShare2 />}>
                Share
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="4" icon={<FiEdit />}>
                Rename
            </Menu.Item>
            <Menu.Item key="5" icon={<FiCopy2 />}>
                Duplicate
            </Menu.Item>
            <Menu.SubMenu key="6" title="Copy to">
                {workspaceNames.map((name, index) => (
                    <Menu.Item key={`6-${index}`}>{name}</Menu.Item>
                ))}
            </Menu.SubMenu>
            <Menu.SubMenu key="7" title="Move to">
                {workspaceNames.map((name, index) => (
                    <Menu.Item key={`7-${index}`}>{name}</Menu.Item>
                ))}
            </Menu.SubMenu>
            <Menu.Divider />
            <Menu.Item key="8" icon={<FiTrash />} danger={true}>
                Delete
            </Menu.Item>
        </Menu>
    );

    return (
        <Card
            style={{ width: 220 }}
            cover={
                <div className="relative h-32">
                    <div className="flex items-center justify-center absolute inset-0 pointer-events-none">
                        <h2 className="text-white text-xl">{title}</h2>
                    </div>
                    <Image
                        onClick={() => setOpened(dayjs().toString())}
                        width={300}
                        height={300}
                        unoptimized
                        alt={title}
                        src={imageUrl}
                        className="object-cover h-32 cursor-pointer"
                    />
                </div>
            }
            className="relative"
        >
            <div className="flex items-center justify-between p-0">
                <span className="text-xs">Opened: {fromNow}</span>
                <Dropdown overlay={menu} trigger={["click"]}>
                    <FiMoreHorizontal className="cursor-pointer text-lg" />
                </Dropdown>
            </div>
        </Card>
    );
};

export default FormItemCard;
