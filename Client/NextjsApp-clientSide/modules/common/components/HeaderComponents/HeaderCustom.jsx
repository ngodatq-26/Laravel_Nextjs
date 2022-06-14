import React from 'react';
import IconHome from './IconHome';
import IconMessage from './IconMessage';
import IconNotifications from './IconNotifications';
import SearchInput from './SearchInput';
import IconSetting from './IconSetting';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import ShowGroup from './ShowGroup';
import { fetchAPI } from '../../../../utils/fetch';
import { API_PATHS } from '../../../../configs/apiConfigs';
import Echo from 'laravel-echo';
import { connectLaravel } from '../../../../utils/connectPusher';
import { useDispatch } from 'react-redux';

export default function HeaderCustom(props) {

    const [show,setShow] = React.useState(false);
    const [dataFriend,setDataFriend] = React.useState();
    const user = useSelector((state) =>state.commonReducer.user);
    const notices = useSelector((state) =>state.commonReducer.notice);
    const [notice,setNotice] = React.useState(notices);
    const dispatch = useDispatch();

    console.log(notice.length)

    React.useEffect(() => {
        connectLaravel();
    },[])

    React.useEffect(() => {
        var channel = window.Echo.channel("notice-channel");
        channel.listen(".notice-event", function(res) {
            setNotice([...notice, res.message]);
        });
    },[]) 

    return (<>
        <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 z-40" style={{position : 'fixed'}}>
            <Head>
                <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'/>
            </Head>
            <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                    <div className="container relative left-0 z-50 flex w-3/4 ">
                     <div className="border rounded-r-lg relative flex items-center w-full lg:w-64 h-full group"> 
                     <SearchInput />
                     </div>
                    </div>
                    <div className="container relative left-32 z-50 flex w-2/4 "><IconHome /></div>
                    <div className="container relative left-32 first-letter:z-50 flex w-2/4 "><IconMessage /></div>
                    <div className="container relative left-32 z-50 flex w-2/4 "><IconNotifications /></div>
                    <div className="container relative left-32 z-50 flex w-2/4 "><IconSetting /></div>
                    <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                            <a href="#" className="block relative">        
                            </a>
                    </div>
                    <div className="container relative left-0 z-50 flex w-3/4 ">
                    <ul className="hidden md:flex mx-4 items-center justify-center">
            <li className="h-full hidden xl:flex">
                <a href="#" className="inline-flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-third mx-1">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" className="mx-auto object-cover rounded-full h-10 w-10" alt="Profile picture" />
                    <span className="mx-2 font-semibold dark:text-dark-txt">{user.name}</span>
                </a>
            </li>
            <li>
                <div className="text-xl hidden xl:grid place-items-center bg-gray-200 dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
                    <i className='bx bx-plus'></i>
                </div>
            </li>
            <li>
                <div onClick ={(e) =>{
                    e.preventDefault();
                    setShow(!show);
                }} className="text-xl hidden xl:grid place-items-center bg-gray-200 dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
                    <i className='bx bxl-messenger'></i>
                </div>
            </li>
            <li>
                <div className="text-xl grid place-items-center bg-gray-200 dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
                    <i className='bx bxs-bell'></i>
                    {
                        (notice.length != 0) ? <span className="text-xs absolute top-0 right-0 bg-red-500 text-white font-semibold rounded-full px-1 text-center">{notice.length}</span>
                        : null
                    }
                </div>
            </li>
            <li>
                <div className="text-xl grid place-items-center bg-gray-200 dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative" id="dark-mode-toggle">
                    <i className='bx bxs-moon'></i>
                </div>
            </li>
        </ul>  
                    </div>
                    <div></div>
                </div>
            </div>
            <ShowGroup show={show} setShow ={setShow} />
        </header> 
        </>
    )
}


