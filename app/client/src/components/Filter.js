import React from 'react'

export default function Filter({onChangeDescription}) {

    const handleChangeDescription = (event) => {
        onChangeDescription(event.target.value);
    };

    return (
        <div className="row">
            <input placeholder="Filtro" id="first_name" type="text" className="validate" onChange={handleChangeDescription}/>
        </div>
    )
}
