import { Avatar } from "antd";
import React from "react";

export default function Header() {
    return (
        <div className="flex justify-between p-2 bg-yellow-200">
            <div>Home</div>
            <Avatar />
        </div>
    );
}
