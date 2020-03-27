import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/AxiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [ needupdate, setNeedUpdate ] = useState(false)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`,colorToEdit)
    .then(res => {
      setNeedUpdate(!needupdate)
    })
    .catch(err => console.log(err))
  };
  useEffect(()=> {
    axiosWithAuth()
    .get('/api/colors')
    .then(res => {
      updateColors(res.data)
      setColorToEdit(initialColor)

    })
    .catch(err => console.log(err))
  },[needupdate, updateColors])

  const deleteColor = deletedColor => {
    axiosWithAuth()
    .delete(`/api/colors/${deletedColor.id}`)
    .then(res => {
    const noneDeletedColors = colors.filter( color => {
      if(color.id !== res.data){
        return color
      }else{
        return null
      }
    })
    updateColors(noneDeletedColors)
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.id} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;

