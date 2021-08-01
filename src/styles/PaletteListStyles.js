import sizes from './sizes'
import bg from './bg.svg'
const styles = {
    "@global": {
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out"
        }
    },
    root: {
        height: "100vh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#002169",
        backgroundImage: `url(${bg})`,
        // background by SVGBackgrounds.com
        overflow: "auto"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("xl")]: {
            width: "80%"
        },
        [sizes.down("xs")]: {
            width: "75%"
        },
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        "& a": {
            color: "white"
        }
    },
    heading: {
        fontSize: "2rem"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5% 5%",
        [sizes.down("md")]: {
            gridGap: "2% 10%",
            gridTemplateColumns: "repeat(2, 45%)",
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
        },
    }
}
export default styles;