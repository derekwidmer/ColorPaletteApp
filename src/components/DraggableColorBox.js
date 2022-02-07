import React from 'react'
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';
import styles from '../styles/DraggableColorBoxStyles'

const DraggableColorBox = SortableElement((props) => {
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
})


export default withStyles(styles)(DraggableColorBox);