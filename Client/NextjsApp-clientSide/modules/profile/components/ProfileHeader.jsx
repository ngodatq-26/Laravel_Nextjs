import React from 'react'

const ProfileHeader = () => {
  return (
    <div>
            <div className=" flex justify-center " style={{ height: '348px' }}>
                <div className="flex flex-col">
                    <div className="md:relative bg-gray-100 md:rounded-bl-lg rounded-lg
                         from-gray-100 via-gray-100 to-gray-400 bg-cover bg-landscape border-solid border-2 border-indigo-600"
                        style={{ width: '940px', height: '348px' }}>
                        {/* // cover photo */}
                        <div className="">
                            {/* profile photo */}
                            <img src="https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-9/83913139_780246012454102_8216424590759428096_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=OmxGCbBAY1QAX-lo99u&_nc_ht=scontent.fhan4-1.fna&oh=00_AT-W3GLbDnRympZ8ipx6mjW4uDYOhgP7XgZJf1jr2VfwmQ&oe=62862168"
                                className="rounded-full md:absolute top-48 inset-x-96 border-4 border-white w-40 h-40"
                                style={{ width: '168px', height: '168px',marginLeft:'400px',marginTop :'180px' }} />
                        </div>
                    </div>
                </div>
            </div>
            {/* // INFOS */}
            <div className="flex justify-center flex-col mt-5 mb-3.5">
                <h1 className="text-center font-bold text-3xl">Can Canbolat</h1>
                <a href="#" className="text-center text-blue-700 font-semibold">Add Bio</a>
                <hr className="full flex self-center w-2/3 mt-2" />
            </div>
            {/* // END INFOS */}
            {/* // TABS */}
            <div className="w-full flex justify-center">
                <div className="flex justify-between mb-2.5">
                    <ul className="flex px-5 py-1.5">
                        <li className="px-3 font-semibold text-gray-600"><a href="#">Posts</a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">About</a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">Friends</a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">Photos</a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">Story Archive</a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">More</a></li>
                    </ul>
                    <ul className="flex mb:pl-14">
                        <li className="px-2 font-semibold">
                            <button className="bg-blue-600 px-5 py-1 rounded-lg text-white font-semibold">
                                <i className="bx bx-plus-circle text-xl mr-2"></i>
                                Add to Story
                            </button>
                        </li>
                        <li className="px-2 font-semibold">
                            <button className="bg-gray-200 px-5 py-1 rounded-lg text-black font-semibold">
                                <i className="bx bx-edit-alt mr-2 text-xl"></i>
                                Edit Profile
                            </button>
                        </li>
                        <li className="px-2 font-semibold">
                            <button className="bg-gray-200 px-3 py-1 rounded-lg text-black font-semibold">
                                ...
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {/* // END TABS */}

        </div>
  )
}

export default ProfileHeader