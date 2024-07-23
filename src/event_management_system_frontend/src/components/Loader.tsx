import '../index.css'

const Loader = ({ message }: { message: string }) => {
    return (
        <div className='z-10 fixed w-[100%] h-[100%] top-0 left-0 bg-darkOpacity flex items-center justify-center flex-col'>
            <span className="loader"></span>
            <span className='p-3 mt-3 font-extrabold text-aqua-blue text-xl'>{message} ...</span>
        </div>
    )
}

export default Loader