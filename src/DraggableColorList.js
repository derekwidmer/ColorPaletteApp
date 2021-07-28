import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import DraggableColorBox from './DraggableColorBox';


const DraggableColorList = SortableContainer(({ colors, deleteColor }) => {
    return (
        <div style={{ height: "100%" }}>
            {colors.map((color, i) => (
                <DraggableColorBox {...color}
                    handleClick={() => deleteColor(color.name)}
                    key={color.name}
                    index={i}
                />
            ))}
        </div>
    )
});

export default DraggableColorList;