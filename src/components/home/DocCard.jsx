
export default function DocCard( { medico } ) {
    return (
        <div className="rounded-lg">
            {/* <div className="h-72 rounded-t-md bg-cover bg-center" style={{ backgroundImage: `url(${medico.img})` }}></div> */}
            <div className="flex flex-row lg:flex-col items-center lg:justify-center rounded-b-md drop-shadow-md relative">
                <img src={medico.img} className="h-32 w-24 lg:h-72 lg:w-72 xl:w-full rounded-md object-cover bg-center" alt="" />
                <div className='flex flex-col w-full lg:text-center md:items-center justify-center'>
                    <h1 className="bg-[#0c423b] rounded-md p-3 w-full font-bold text-white text-[20px]  bottom-[140px]">{medico.name}</h1>
                    <p className='w-full text-neutral-600 text-lg font-semibold  bg-white rounded-lg px-4 py-1'>{medico.speciality}</p>
                    <button
                        className="rounded-lg bg-neutral-300 w-4/5 text-[#126459] text-sm py-1 px-4 mb-2">
                        Más info
                    </button>
                </div>
            </div>
            <hr className='block md:hidden border-[0,5px] border-dashed border-white mt-4' />
        </div>
    )
}
