import React from 'react';
import Button from '@material-ui/core/Button'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import useStyles from '../styles/ColorPickerFormStyles'

export default function ColorPickerForm({ paletteFull, updateColors, colors }) {
    const classes = useStyles();
    const [currentColor, setColor] = React.useState("teal");
    const [newColorName, setName] = React.useState("")

    React.useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", value => {
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule("isColorUnique", value => {
            return colors.every(
                ({ color }) =>
                    color.toLowerCase() !== currentColor.toLowerCase()
            );
        });
    });

    function addNewColor() {
        let newColor = { color: currentColor, name: newColorName }
        updateColors(oldColors => [...oldColors, newColor]);
        setName("");
    };

    return (
        <div>
            <ChromePicker
                color={currentColor}
                onChangeComplete={(newColor) => { setColor(newColor.hex) }}
                className={classes.picker}
            />
            <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
                <TextValidator
                    className={classes.input}
                    variant="filled"
                    margin="normal"
                    placeholder="Color Name"
                    value={newColorName}
                    name={newColorName}
                    onChange={(evt) => setName(evt.target.value)}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={['Color name required', 'Color name must be unique', 'Color must be unique']}
                />
                <Button
                    className={classes.addColor}
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: paletteFull ? 'gray' : currentColor }}
                    type="submit"
                    disabled={paletteFull}
                >
                    {paletteFull ? 'Palette Full' : 'Add Color'}
                </Button>
            </ValidatorForm >
        </div>
    )
}
