import React from 'react'

const TypeLabels:React.FC = () => {
return (
    <div className='flex flex-col gap-2 items-start'>
        <h3 className='font-bold text-center text-2xl'>Labels</h3>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-green-800 m-1.5'></div> 
            <p className='text-lg'>Defect</p>
        </section>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-blue-900 m-1.5' ></div>
            <p className='text-lg'>Documentation</p>
        </section>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-pink-800 m-1.5' ></div>
            <p className='text-lg'>Enhancement</p>
        </section>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-red-700 m-1.5' ></div>
            <p className='text-lg'>Feature Request</p>
        </section>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-purple-900 m-1.5' ></div>
            <p className='text-lg'>Hardware Problem</p>
        </section>
    </div>
)
}

export default TypeLabels
