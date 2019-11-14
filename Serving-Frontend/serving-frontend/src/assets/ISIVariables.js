const hexToRgb = input => {
    input = input + "";
    input = input.replace("#", "");
    let hexRegex = /[0-9A-Fa-f]/g;
    if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
        throw new Error("input is not a valid hex color.");
    }
    if (input.length === 3) {
        let first = input[0];
        let second = input[1];
        let last = input[2];
        input = first + first + second + second + last + last;
    }
    input = input.toUpperCase(input);
    let first = input[0] + input[1];
    let second = input[2] + input[3];
    let last = input[4] + input[5];
    return (
        parseInt(first, 16) +
        ", " +
        parseInt(second, 16) +
        ", " +
        parseInt(last, 16)
    );
};
const defaultFont = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em"
};
const grayColor = [
    "#999",
    "#777",
    "#3C4858",
    "#AAAAAA",
    "#D2D2D2",
    "#DDD",
    "#b4b4b4",
    "#555555",
    "#333",
    "#a9afbb",
    "#eee",
    "#e7e7e7"
];
const whiteColor = "#FFF";

const drawerWidth = 240;

export {
    hexToRgb,
    //variables
    drawerWidth,
    defaultFont,
    grayColor,
    whiteColor
};