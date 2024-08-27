
export default function Urgencias() {
    return (
        <div className='grid grid-cols-12 p-4 pt-8 pb-16 md:px-12 items-center'>
            <div className='col-span-12 xl:col-span-5 mb-6 xl:mb-0 space-y-4'>
                <p className='uppercase text-2xl sm:text-3xl text-neutral-600'>Sentite protegido todos los días</p>
                <p className='text-5xl sm:text-6xl text-[#0c423b]  font-bold'>Urgencias médicas<br className='hidden xl:block'/> y Atención telefónica</p>
                <p className='text-4xl sm:text-6xl text-[#126459] uppercase'>las 24 horas</p>
                <p className='text-4xl sm:text-7xl text-[#126459] font-bold'>0800-888-1264</p>
            </div>
            <div className='bg-[url("/images/urgency.jpg")] bg-cover bg-right col-span-12 xl:col-span-7 h-[350px] ml-0 xl:ml-20'>

            </div>
        </div>
    )
}
