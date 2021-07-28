import chroma from 'chroma-js'

const styles = {
    ColorBox: {
        width: "20%",
        height: props => (props.showingFullPalette ? "25%" : "50%"),
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        // marginBottom: "-4px",
        verticalAlign: "top",
        "&:hover button": {
            opacity: "1"
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.6 ? 'black' : 'white'
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.25 ? 'white' : 'black'
    },
    seeMore: {
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0",
        bottom: "0",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase",
        color: props => chroma(props.background).luminance() >= 0.6 ? 'rgba(0,0,0,0.7)' : 'white'
    },
    copyButton: {
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255,255,255,0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        transition: "0.5s opacity ease",
        textDecoration: "none",
        color: props => chroma(props.background).luminance() >= 0.6 ? 'rgba(0,0,0,0.7)' : 'white',
        opacity: "0"
    },
    boxContent: {
        position: "absolute",
        padding: "10px",
        width: "90%",
        left: "0",
        bottom: "0",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        color: "black",
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.5s ease-in-out",
        transform: "scale(0.001)",
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute",
    },
    copyMsg: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
        transform: "scale(0.001)",
        opacity: "0",
        color: "white",
        flexDirection: "column",
    },
    showMessage: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "25",
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s",
        "& h1": {
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255,255,255,0.2)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase",
            fontSize: "4rem",
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "100",
        }
    }
}

export default styles;