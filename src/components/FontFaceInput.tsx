/* eslint-disable react/no-unknown-property */
import { Dropdown, Input, type MenuProps, Select } from "antd";
import { type MenuItemType } from "antd/es/menu/hooks/useItems";
import React from "react";
import { Design } from "../models/Design";
import { fontsFromString } from "~/utils/fonts";

const FontFaceInput: React.FC<{ font: string; onChange: (font: string) => void }> = ({ font, onChange }) => {
    const onItemClick = (item: MenuItemType) => {
        setValue(item.key as string);
        onChange(item.key as string);
    };
    const items: MenuProps["items"] = fontsFromString(
        `@import url("https://fonts.googleapis.com/css2?family=Inter&family=Lato&family=Montserrat&family=Noto+Sans&family=Nunito&family=Nunito+Sans&family=Open+Sans&family=Oswald&family=Poppins&family=Raleway&family=Roboto&family=Roboto+Condensed&family=Roboto+Mono&family=Roboto+Slab&family=Source+Sans+Pro&family=Ubuntu&display=swap");`,
    ).map(font =>
        font
            ? {
                  key: font,
                  label: font,
                  onClick: onItemClick,
                  style: {
                      fontFamily: font,
                  },
              }
            : null,
    );
    const [value, setValue] = React.useState(font);
    const [filteredItems, setFilteredItems] = React.useState(items);
    const [shouldLoadFonts, setShouldLoadFonts] = React.useState(false);
    const filter = (input: string, item: MenuItemType) => {
        return (item.label as string).toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setFilteredItems(items.filter(item => filter(e.target.value, item as MenuItemType)));
    };

    return (
        <>
            <Dropdown onOpenChange={() => setShouldLoadFonts(true)} trigger={["click"]} menu={{ items: filteredItems }}>
                <Input value={value} onChange={handleChange} />
            </Dropdown>
            {shouldLoadFonts && (
                <style jsx>{`
                    @import url("https://fonts.googleapis.com/css2?family=Inter&family=Lato&family=Montserrat&family=Noto+Sans&family=Nunito&family=Nunito+Sans&family=Open+Sans&family=Oswald&family=Poppins&family=Raleway&family=Roboto&family=Roboto+Condensed&family=Roboto+Mono&family=Roboto+Slab&family=Source+Sans+Pro&family=Ubuntu&display=swap");
                `}</style>
            )}
        </>
    );
};

export default FontFaceInput;
