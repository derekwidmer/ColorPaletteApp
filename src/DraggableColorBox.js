import React from 'react'
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete';
import chroma from 'chroma-js'

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
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
function DraggableColorBox(props) {
    const { classes } = props;
    return (
        <div className={props.classes.root} style={{ backgroundColor: props.color }}>
            <div className={classes.boxContent}>
                <span>
                    {props.name}
                </span>
                <span><DeleteIcon className={classes.deleteIcon} onClick={props.handleClick} /></span>
            </div>
        </div>
    )
}


export default withStyles(styles)(DraggableColorBox);