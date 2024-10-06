import React from 'react'

const StatusLabels:React.FC = () => {
return (
    <div className='flex flex-col gap-2 items-start'>
        <h3 className='font-bold text-center text-2xl'>Labels</h3>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-green-800 m-1.5'></div>
            <p className='text-lg'>Open</p>
        </section>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-blue-900 m-1.5' ></div>
            <p className='text-lg'>In Progress</p>
        </section>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-pink-800 m-1.5' ></div>
            <p className='text-lg'>Resolved</p>
        </section>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-red-700 m-1.5' ></div>
            <p className='text-lg'>Done</p>
        </section>
    </div>
)
}

export default StatusLabels
