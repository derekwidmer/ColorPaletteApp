import React, { Component } from "react";
import PaletteMetaForm from "./PaletteMetaForm";
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import QueueIcon from '@material-ui/icons/Queue';
import { Button } from "@material-ui/core";
import styles from '../styles/PaletteFormNavStyles'

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPaletteName: "",
            formShowing: false,
        }
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    showForm() {
        this.setState({ formShowing: true });
    }

    hideForm() {
        this.setState({ formShowing: false });
    }

    render() {
        const { classes, open, palettes, handleSubmit, handleDrawerOpen } = this.props;
        const { formShowing } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color='default'
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <QueueIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Create a Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.showForm}
                            className={classes.buttonNav}
                        >
                            Save
                        </Button>
                        <Link to="/">
                            <Button variant="contained" color="secondary" className={classes.buttonNav}>
                                Back
                            </Button>
                        </Link>
                        {formShowing && (
                            <PaletteMetaForm
                                palettes={palettes}
                                handleSubmit={handleSubmit}
                                hideForm={this.hideForm}
                            />
                        )}
                    </div>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
