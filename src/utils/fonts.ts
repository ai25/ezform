export const fontsFromString = (str: string) => {
    return str
        .split("family=")
        .slice(1)
        .map(str => str.split("&")[0])
        .map(str => str?.replaceAll("+", " "));
};
