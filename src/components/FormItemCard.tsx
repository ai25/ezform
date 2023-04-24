import React, { useState } from "react";
import { Card, Dropdown, Menu, Spin, type MenuProps } from "antd";
import { FiExternalLink, FiCopy, FiShare2, FiEdit, FiCopy as FiCopy2, FiTrash, FiMoreHorizontal } from "react-icons/fi";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { usePreferencesStore } from "../store/preferences";

dayjs.extend(relativeTime);

interface FormItemCardProps {
    id: string;
    title: string;
    imageUrl: string;
    workspaceNames: string[];
}

const FormItemCard: React.FC<FormItemCardProps> = ({ id, title, imageUrl, workspaceNames }) => {
    const [opened, setOpened] = useState<string | null>(null);
    const [fromNow, setFromNow] = useState("Never");
    const { theme } = usePreferencesStore();
    const { t } = useTranslation(["common"]);

    React.useEffect(() => {
        if (!opened) return;
        setFromNow(dayjs(opened).fromNow());
        const interval = setInterval(() => {
            setFromNow(dayjs(opened).fromNow());
        }, 1000);
        return () => clearInterval(interval);
    }, [opened]);
    type MenuItem = Required<MenuProps>["items"][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: "group" | "divider",
        danger?: boolean,
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
            danger,
        } as MenuItem;
    }

    const items: MenuProps["items"] = [
        getItem(t("common:open"), `${id}-1`, <FiExternalLink />),
        getItem(t("common:copy_link"), `${id}-2`, <FiCopy />),
        getItem(t("common:share"), `${id}-3`, <FiShare2 />),
        { type: "divider" },
        getItem(t("common:edit"), `${id}-4`, <FiEdit />),
        getItem(t("common:duplicate"), `${id}-5`, <FiCopy2 />),
        getItem(
            t("common:copy_to"),
            `${id}-6`,
            null,
            workspaceNames.map((name, index) => getItem(name, `${id}-6-${index}`)),
        ),
        getItem(
            t("common:move_to"),
            `${id}-7`,
            null,
            workspaceNames.map((name, index) => getItem(name, `${id}-7-${index}`)),
        ),
        { type: "divider" },
        getItem(t("common:delete"), `${id}-8`, <FiTrash />, undefined, undefined, true),
    ];
    const menu: MenuProps = {
        items,
        onClick: ({ key }) => {
            console.log(key);
        },
    };

    return (
        <Card
            style={{ width: 220 }}
            cover={
                <Link href={`/builder/${id}`} className="relative">
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <h2 className="text-xl text-white">{title}</h2>
                    </div>
                    <Image
                        width={300}
                        height={300}
                        unoptimized
                        alt={title}
                        src={imageUrl}
                        className="h-32 max-w-full cursor-pointer object-cover"
                    />
                </Link>
            }
            className="relative"
        >
            <div className="flex items-center justify-between">
                <span className="text-xs">Opened: {fromNow}</span>
                <Dropdown menu={menu} trigger={["click"]}>
                    <FiMoreHorizontal className="cursor-pointer text-lg" />
                </Dropdown>
            </div>
        </Card>
    );
};

export default FormItemCard;
