'use client';
import { useState } from 'react';
import Button from '../common/button';
import Image from 'next/image';

const Email = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const placeholderIcon = <Image src="/placeholder.png" alt="Icon" width={20} height={20} />;

    return (
        <div className="container mx-auto flex gap-32 items-start py-36">
            <div className="max-w-3xl flex-shrink-0">
                <h2 className="font-recoleta text-header-1 text-primary-800">Our Special Surprise Just for You</h2>
                <p className="text-body-1 text-primary-600 mt-4">With us, you can shop online & help save your high street at the same time</p>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 space-y-6">
                {/* Full Name Input */}
                <div className="relative">
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {placeholderIcon}
                    </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        required
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {placeholderIcon}
                    </div>
                </div>

                <Button text="Send" onClick={handleSubmit} style="fill" color="info-green" size="medium" />
            </form>
        </div>
    )
}
export default Email