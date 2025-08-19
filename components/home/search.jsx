'use client';
import Image from 'next/image';
import { useState } from 'react';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search term:', searchTerm);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClear = () => {
        setSearchTerm('');
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const placeholderIcon = <Image src="/placeholder.png" alt="Icon" width={20} height={20} />;

    return (
        <form onSubmit={handleSubmit} className="w-[328px] mx-auto">
            <div className={`relative border rounded-lg flex justify-between items-center px-3 transition-all duration-200 ${isFocused
                ? 'border-primary-700 ring-2 ring-primary-700 ring-opacity-20'
                : 'border-primary-200'
                }`}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="What book are you looking for?"
                    className="w-full py-3 rounded-lg focus:outline-none flex-1 font-poppins"
                />
                <div className="flex items-center gap-4 pl-4">
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="text-btn uppercase hover:font-bold cursor-pointer duration-200"
                        >
                            Clear
                        </button>
                    )}
                    <button
                        className='cursor-pointer'
                        type="submit"
                    >
                        {/* <Image src="/placeholder.png" alt="Icon" width={20} height={20} /> */}
                        {placeholderIcon}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Search;  
