import React from 'react'
import { assetsLogin, ticketMas } from '../assets'
import { FaUser } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DataLogin } from '../@types/login'
import { useNavigate } from 'react-router-dom'
import RoutesAuth from '../api/Login'


const Login:React.FC = () => {

    const { handleSubmit, register, reset } = useForm<DataLogin>()
    const navigate=useNavigate()

    const loginUser: SubmitHandler<DataLogin> = (data): void => {

        RoutesAuth.login({data}).post()
            .then(res => {
                console.log(res);
                navigate("/dashboard")
            })
            .catch(res => {
                console.log(res);
                reset({
                    password: ""
                })
            })

    }


    return (
        <div className='flex justify-center items-center min-h-[100vh]  overflow-hidden  relative '>
            <img className='absolute right-[-200px] bottom-[-200px] rotate-[-20deg] z-10' src={assetsLogin.hondasTicketMas} alt="" />
            <img className='absolute  left-[-200px] md:left-[-220px] top-[-100px] xl:left-[-220px] rotate-90 z-10 ' src={assetsLogin.hondasTicketMas} alt="" />

            <div className='pb-3 bg-white w-[90%] md:w-[70%] md:max-w-[850px] h-[450px] md:h-[450px] rounded-[30px] flex-wrap-reverse flex justify-center items-center relative overflow-hidden z-30' style={{ boxShadow: "black -1px 1px 20px 0px" }}>

                <div className=' w-[90%] md:w-1/2   '>
                    <div className='relative  '>
                        <img src={ticketMas.logoColor} className='w-[70%] ml-7 md:ml-4 mb-7' alt="" />
                        <span className='text-primary absolute bottom-0 right-0 left-0    font-bold text-center ' >
                            RAPIDEZ
                        </span>
                    </div>
                    <form onSubmit={handleSubmit(loginUser)} className="max-w-sm mx-auto flex flex-wrap">
                        <div className="mb-5 w-[90%] mx-auto ">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <FaUser className='text-primary' />
                                </div>
                                <input {...register("email")} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@example.com" required />
                            </div>
                        </div>
                        <div className="mb-5 w-[90%] mx-auto">

                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <RiLockPasswordFill className='text-primary' />
                                </div>
                                <input {...register("password")} type="password"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="contraseña " required />
                            </div>

                        </div>
                        <div className="flex items-start mb-5 w-[90%]">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>

                        <button type="submit" className="text-white bg-primary hover:bg-primary_hover py-2 px-10 rounded-lg mx-auto">
                            Submit
                        </button>

                    </form>

                </div>
                <div className='z-[14]'>
                    <img className='hidden md:block md:w-96  ' src={assetsLogin.avatars} alt="avatars" />
                </div>
                <img className='absolute right-[-200px] rotate-[-90deg] z-10' src={assetsLogin.hondasTicketMas} alt="" />

            </div>

        </div>
    )
}

export default Login