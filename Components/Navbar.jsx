import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className='  bg-[#1B293B] py-1 text-white  '>
                <div className=' flex items-center justify-between mx-2 md:mx-45 '>


                    <div className='text-2xl font-bold'>
                        <span className='text-green-500'>&lt;</span>
                        <span>Pass</span>
                        <span className='text-green-500'>OP/&gt;</span>
                    </div>
                    <div>
                        <button onClick={()=>window.open("https://HASSNAIN513.github.io/Hassnain-portfolio")} className='flex text-xl justify-center items-center ring-1 ring-white font-semibold py-[3px] cursor-pointer pr-2 pl-1 rounded-full bg-green-700 rounded- text-white'>
                            <span><lord-icon
                                src="https://cdn.lordicon.com/lllcnxva.json"
                                trigger="hover"
                                stroke="light"
                                colors="primary:#ffffff,secondary:#66ee78,tertiary:#ffffff"
                                style={{ "width": "30px", "height": "30px", "paddingTop":"3px" }}>
                                     </lord-icon>
                                </span>
                           
                            <span>GitHub</span>

                        </button>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Navbar
