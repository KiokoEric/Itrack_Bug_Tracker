import React from 'react'

const PriorityLabels:React.FC = () => {
return (
    <div className='flex flex-col gap-2 items-start'> 
        <h3 className='font-bold text-center text-2xl'>Labels</h3>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-green-800 m-1.5'></div>
            <p className='text-lg'>Low Priority</p>
        </section>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-blue-900 m-1.5' ></div>
            <p className='text-lg'>Medium Priority</p>
        </section>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-pink-800 m-1.5' ></div>
            <p className='text-lg'>High Priority</p>
        </section>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-red-700 m-1.5' ></div>
            <p className='text-lg'>Critical Priority</p>
        </section>
    </div>
)
}

export default PriorityLabels
