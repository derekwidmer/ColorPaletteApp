import chroma from 'chroma-js'

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-7px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.2)"
        }
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