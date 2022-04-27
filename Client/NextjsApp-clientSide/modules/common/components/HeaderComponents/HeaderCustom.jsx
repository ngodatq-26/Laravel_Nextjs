import React from 'react';
import { API_PATHS } from '../../../../configs/apiConfigs';
import { fetchAPI } from '../../../../utils/fetch';
import IconHome from './IconHome';
import IconMessage from './IconMessage';
import IconNotifications from './IconNotifications';
import SearchInput from './SearchInput';
import ScaleHeader from '../ScaleHeader';
import IconSetting from './IconSetting';
export default function HeaderCustom(props) {

    const [dataFriend,setDataFriend] = React.useState();
    const [profile,setProfile] = React.useState();

    React.useEffect(()=>{
      async function fetchData() {
        const res = await fetchAPI(API_PATHS.getProfile,'GET',{},true);
        setProfile(res.data);
      }
      fetchData();
    },[])

    console.log('ok')
    console.log(profile)
    return (<>
        { !profile ? <ScaleHeader /> : 
        <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 z-40">
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
                        {profile.data.name}
                    </div>
                </div>
            </div>
        </header> }
        </>
    )
}


