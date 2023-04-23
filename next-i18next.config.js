const path = require("path");

module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },
    localePath: path.resolve("./public/locales"),
    debug: process.env.NODE_ENV === "development",
    reloadOnPrerender: process.env.NODE_ENV === "development",
};
