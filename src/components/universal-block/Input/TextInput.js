import React from 'react'

function TextInput({className, inputID, value="", callback=()=>{}, placeholder="placeholder", type="text"}) {

    function onChange(e) {
        callback(e.target.value)
    }
    if(type == "text" || type == "number") {
        return (
            <input className={`${className} outline-none border-2 border-black py-2 px-2 text-sm rounded-md`}
                id={inputID}
                name={inputID}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                type={type}
            >
                
            </input>
        )
    } else if (type == "textarea") {
        return (
            <textarea className={`${className} outline-none border-2 border-black py-2 px-2 text-sm rounded-md`}
                id={inputID}
                name={inputID}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                rows={2}
            >
                
            </textarea>
        )
    } else {
        throw error("Type hanya boleh 'textarea' atau 'text'")
    }
    
}

export default TextInput