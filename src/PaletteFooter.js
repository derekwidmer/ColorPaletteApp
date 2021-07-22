import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles/FooterStyles'

function PaletteFooter(props) {
    const { paletteName, emoji } = props;
    const { classes } = props;
    return (
        <footer className={classes.Footer}>
            {paletteName}<span className={classes.emoji}>{emoji}</span>
        </footer>
    )
}

export default withStyles(styles)(PaletteFooter);