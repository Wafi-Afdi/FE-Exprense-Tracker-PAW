"use client"
import React, {useState, useEffect, useRef } from 'react'
import { AiOutlineCaretDown, AiOutlineCaretUp  } from "react-icons/ai";


function DropdownTypable({value = "", callback=(data) => {}, options=["test", "test2", "test3", "test4", "test5"], name="Placeholder", canType=false, className}) {
    const [isOpen, SetIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    function ChangeValue(value) {
        callback(value)
        SetIsOpen(false)
    }

    useEffect(() => {
        // Handler to check if click is outside of the dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
                SetIsOpen(false);
            }
        };
    
        // Add event listener on document
        document.addEventListener('mousedown', handleClickOutside);
    
        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    function showValue() {
        try {
            if(value) {
                return value
            } else {
                return name
            }
        } catch (error) {
            console.error(error)
            return name
        }
        
    }
    return (
        <div className={`relative flex flex-col items-center 
            max-w-fit ${className}
            `}
            ref={dropdownRef}
        >
            <div className='
                border-2 border-slate-900 rounded-lg p-2
                bg-white
                flex items-center justify-between 
            '>
                <input className='
                    flex items-center justify-between 
                    font-bold text-sm
                    bg-white
                    placeholder:text-gray-600
                    text-black
                    w-full
                    outline-none

                '
                onFocus={(e) => SetIsOpen(true)}
                onChange={(e) => callback(e.target.value)}
                value={value}
                type='text'
                placeholder={name}
                
                />
                {
                    isOpen ? (
                        <AiOutlineCaretUp className='text-black ml-2 hover:cursor-pointer'
                            onClick={(e) => SetIsOpen(false)}
                        />
                    ) 
                    :
                    (
                        <AiOutlineCaretDown className='text-black ml-2 hover:cursor-pointer'
                            onClick={(e) => SetIsOpen(true)}
                        />
                    )
                }
            </div>
            {
                isOpen ?
                (
                    <div className='bg-white text-black border-2 border-black border-t-0 absolute w-full top-[35px]
                        z-[100] 
                        overflow-y-auto max-h-[150px]
                    '>
                        {
                            options.map((data, idx) => (
                                <div key={idx} className='p-2 text-sm hover:cursor-pointer hover:bg-gray-300
                                '
                                onClick={(e) => ChangeValue(data)}
                                >
                                    {data} 
                                </div>
                            ))
                        }
                    </div>  
                )
                :
                (
                    <></>
                )
            }
        </div>
    )
}

export default DropdownTypable