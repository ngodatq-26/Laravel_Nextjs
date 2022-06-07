import React from 'react'
import { useSelector } from 'react-redux'
import friends_img from '../../../../images/friends.png'
import page_img from '../../../../images/page.png'
import memory_img from '../../../../images/memory.png'
import group_img from '../../../../images/group.png'
import Image from 'next/image'

const ProfileMini = () => {
  
  const user = useSelector(state => state.commonReducer.user)

  return (
    <div className="w-1/5 pt-16 h-full hidden xl:flex flex-col fixed top-0 left-0">
            <ul className="p-4">
                <li>
                    <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="Profile picture" className="w-10 h-10 rounded-full" />
                        <span className="font-semibold">{user.name}</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                        <Image src={require=(friends_img)} width={40} height={40} alt="Profile picture" className="w-10 h-10 rounded-full" />
                        <span className="font-semibold">Friends</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                         <Image src={require=(page_img)} width={40} height={40} alt="Profile picture" className="w-10 h-10 rounded-full" />
                        <span className="font-semibold">Pages</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                          <Image src={require=(memory_img)} width={40} height={40} alt="Profile picture" className="w-10 h-10 rounded-full" />
                        <span className="font-semibold">Memories</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                          <Image src={require=(group_img)} width={40} height={40} alt="Profile picture" className="w-10 h-10 rounded-full" />
                        <span className="font-semibold">Groups</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                        <span className="w-10 h-10 rounded-full grid place-items-center bg-gray-300 dark:bg-dark-second">
                            <i className='bx bx-chevron-down'></i>
                        </span>
                        <span className="font-semibold">See more</span>
                    </a>
                </li>
                <li className="border-b border-gray-200 dark:border-dark-third mt-6"></li>
            </ul>
            <div className="flex justify-between items-center px-4 h-4 group">
                <span className="font-semibold text-gray-500 text-lg dark:text-dark-txt">Your shortcuts</span>
                <span className="text-blue-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-third p-2 rounded-md hidden group-hover:inline-block">Edit</span>
            </div>
            <ul className="p-4">
                <li>
                    <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                    <Image src={require=(friends_img)} width={40} height={40} alt="Profile picture" className=" rounded-full" />
                        <span className="font-semibold">Cộng đồng Front-end(HTML/CSS/JS) Việt Nam</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                    <Image src={require=(group_img)} width={40} height={40} alt="Profile picture" className=" rounded-full" />
                        <span className="font-semibold">CNPM08_UIT_Group học tập</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                    <Image src={require=(page_img)} width={40} height={40} alt="Profile picture" className=" rounded-full" />
                        <span className="font-semibold">Cộng đồng UI/UX Design vietnam</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                    <Image src={require=(memory_img)} width={40} height={40} alt="Profile picture" className=" rounded-full" />
                        <span className="font-semibold">Nihon Koi</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                        <span className="w-10 h-10 rounded-full grid place-items-center bg-gray-300 dark:bg-dark-second">
                            <i className='bx bx-chevron-down'></i>
                        </span>
                        <span className="font-semibold">See more</span>
                    </a>
                </li>
            </ul>
            <div className="mt-auto p-6 text-sm text-gray-500 dark:text-dark-txt">
                <a href="#">Privacy</a>
                <span>.</span>
                <a href="#">Terms</a>
                <span>.</span>
                <a href="#">Advertising</a>
                <span>.</span>
                <a href="#">Cookies</a>
                <span>.</span>
                <a href="#">Ad choices</a>
                <span>.</span>
                <a href="#">More</a>
                <span>.</span>
                <span>Facebook © 2021</span>
            </div>
        </div>
  )
}

export default ProfileMini