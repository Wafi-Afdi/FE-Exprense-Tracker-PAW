import React from 'react'

function TextInput({className, inputID, value="", callback=()=>{}, placeholder="placeholder"}) {

    function onChange(e) {
        callback(e.target.value)
    }
    return (
    <input className={`${className} outline-none border-2 border-black py-2 px-2 text-sm rounded-md`}
        id={inputID}
        name={inputID}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
    >
        
    </input>
    )
}

export default TextInput