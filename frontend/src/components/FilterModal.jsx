import React from 'react'
import { useForm } from 'react-hook-form'

function FilterModal({ isOpen, onClose, onApply, onClear }) {
    if(!isOpen) return null;
    const {register, handleSubmit, getValues, reset} = useForm();
    const typesOfPlaces = ["entireHome", "room", "other"];
    const essential = ["wifi", "pool", "parking"];

    const getTrueValuesArray = (data, keys) => keys.filter(key => data[key]);
    const onSubmit = (formData) => {
        const placeTypes = getTrueValuesArray(formData, typesOfPlaces);
        const essentials = getTrueValuesArray(formData, essential);

        const filters = {
            placeTypes,
            minPrice: formData.minPrice ? parseInt(formData.minPrice) : 0,
            maxPrice: formData.maxPrice ? parseInt(formData.maxPrice) : Infinity,
            essentials
        }

        onApply(filters);
        onClose();
    }

    return (
        <div className='fixed inset-0 backdrop-blur-[5px] bg-black/70 flex items-center justify-center z-50'>
            <div className='md:w-2xl lg:w-lg rounded-xl flex flex-col justify-center items-center bg-white relative px-8 py-6'>
                <div className='w-full flex justify-between items-center border-b-1 border-gray-300 pb-4'>
                    <h1 className='text-xl font-semibold font-jakarta'>Filters</h1>
                    <button 
                        onClick={() => {
                            onClear();
                            onClose();
                        }}
                        className="h-8 w-8 cursor-pointer hover:bg-gray-200 px-1 rounded-full"
                        title='Close'
                        >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    <div className='w-full pt-4 pb-2'>
                        <h1 className='text-md font-semibold mb-2 font-jakarta'>Type of place</h1>
                        <div className='w-full p-3 bg-gray-100 flex justify-around items-center border-1 border-gray-400 rounded-sm'>
                            <div className='flex justify-center items-center gap-2'>
                                <input type="checkbox" id='room' {...register("room")} className='cursor-pointer' />
                                <label htmlFor="room" className='cursor-pointer'>Room</label>
                            </div>
                            <div className='flex justify-center items-center gap-2'>
                                <input type="checkbox" id='entireHome' {...register("entireHome")} className='cursor-pointer' />
                                <label htmlFor="entireHome" className='cursor-pointer'>Entire Home</label>
                            </div>
                            <div className='flex justify-center items-center gap-2'>
                                <input type="checkbox" id='other' {...register("other")} className='cursor-pointer' />
                                <label htmlFor="other" className='cursor-pointer'>Other</label>
                            </div>
                        </div>
                    </div>
                    <div className='w-full py-2'>
                        <h1 className='text-md font-semibold mb-2'>Price range</h1>
                        <div className='w-full flex justify-around items-center gap-3'>
                            <input type="number" placeholder='Min Price' className='w-1/2 h-11 border-1 border-gray-400 p-4 rounded-sm' {...register("minPrice")} />
                            <input type="number" placeholder='Max Price' className='w-1/2 h-11 border-1 border-gray-400 p-4 rounded-sm' {...register("maxPrice")} />
                        </div>
                    </div>
                    <div className='w-full pt-2 pb-6 border-b-1 border-gray-300'>
                        <h1 className='text-md font-semibold mb-2'>Essentials</h1>
                        <div className='w-full p-3 bg-gray-100 flex justify-around items-center border-1 border-gray-400 rounded-sm'>
                            <div className='flex justify-center items-center gap-2'>
                                <input type="checkbox" id='wifi' {...register("wifi")} className='cursor-pointer' />
                                <label htmlFor="wifi" className='cursor-pointer'>WiFi</label>
                            </div>
                            <div className='flex justify-center items-center gap-2'>
                                <input type="checkbox" id='pool' {...register("pool")} className='cursor-pointer' />
                                <label htmlFor="pool" className='cursor-pointer'>Pool</label>
                            </div>
                            <div className='flex justify-center items-center gap-2'>
                                <input type="checkbox" id='parking' {...register("parking")} className='cursor-pointer' />
                                <label htmlFor="parking" className='cursor-pointer'>Parking</label>
                            </div>
                        </div>
                    </div>
                    <div className='w-full py-4 flex items-center justify-between'>
                        <button type="reset" className='border-1 border-gray-300 px-3 py-2 rounded-md cursor-pointer'>Clear All</button>
                        <button type="submit" className='px-3 py-2 rounded-md bg-[#FF4A5F] text-white cursor-pointer hover:bg-[#ff385c]'>Show Results</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FilterModal;
