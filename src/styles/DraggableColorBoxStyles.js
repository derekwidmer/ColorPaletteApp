import chroma from 'chroma-js'
import sizes from './sizes'

const styles = {
    root: {
        width: "25%",
        height: "20%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-7px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.2)"
        },
        [sizes.down("lg")]: {
            width: "50%",
            height: "10%"
        },
        [sizes.down("md")]: {
            width: "100%",
            height: "5%"
        },
    },
    boxContent: {
        position: "absolute",
        padding: "10px",
        width: "100%",
        left: "0",
        bottom: "0",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        color: props => chroma(props.color).luminance() <= 0.25 ? 'white' : 'black',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    deleteIcon: {
        color: "rgba(0,0,0,0.5)",
        transition: "all 0.2s ease-in-out"
    }
}

export default styles;