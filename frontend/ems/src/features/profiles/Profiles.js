
import {useSelector,useDispatch} from 'react-redux'

import defaultProfile from '../../assets/images/defaults/profiles/male-profile-3.jpg'

// global constants
import {
    BASE_URL,
} from '../../config'

// actions from slices
// profiles
import {
    selectIsProfileId,
    selectUserProfiles,
    selectCurrentProfileIndex,
    imageNavigator,
    addNewProfile,
    deleteProfile,
    selectIsProfileUploading,
    selectIsProfileDeleting,
} from './profilesSlice'
// users slice
import {
    selectUser,
} from '../users/usersSlice'
// icons
import { MdDelete } from "react-icons/md"
import { BsArrowLeftCircleFill } from "react-icons/bs"
import { BsArrowRightCircleFill } from "react-icons/bs"
import { FaCamera } from "react-icons/fa"

// sub-users
import GetUsername from '../users/sub-users/GetUsername'

// main
// Profiles
const Profiles = () => {
    // states from slices
    // profiles slice
    const userProfiles = useSelector(selectUserProfiles)
    const isProfileId = useSelector(selectIsProfileId)
    const currentProfileIndex = useSelector(selectCurrentProfileIndex)
    const isProfileUploading = useSelector(selectIsProfileUploading)
    const isProfileDeleteing = useSelector(selectIsProfileDeleting)

    // users slice
    const user = useSelector(selectUser)

    // hooks
    const dispatch = useDispatch()

    // submit handler
    const submitHandler = e => {
        let formData = new FormData() 
        formData.append('profile',e.target.files[0])
        dispatch(addNewProfile(formData))
    }

  return (
    <div className="flex-grow flex justify-center pt-5 m-1 bg-black bg-opacity-[.1] rounded-sm">
        <div className="text-xs text-emerald-700 font-serif">
            {/* image */}
            <div className="border-b border-emerald-700">
                <div className="relative">
                    {
                        userProfiles?.length > 0 
                        ?
                        <img src={`${BASE_URL}/${userProfiles[currentProfileIndex].profilePath}`} className="w-[120px] h-[120px] rounded-full" alt=""  />
                        :
                        <img src={defaultProfile} className="w-[120px] h-[120px] rounded-full" alt="" />
                    }

                    {
                        user?._id === isProfileId && userProfiles.length > 0
                        ?
                        <>
                        {
                            isProfileDeleteing 
                            ?
                            <div className="absolute top-0 right-0 w-[16px] h-[16px] rounded-full border-2 border-emerald-700 border-r-transparent animate-spin"></div>
                            :
                            <button className="absolute top-0 right-0 text-xl" 
                                onClick={()=>{
                                    dispatch(deleteProfile(userProfiles[currentProfileIndex]._id))
                                }}
                            >
                                <MdDelete />
                            </button>
                        }
                        </>
                        :
                        <></>
                    }

                </div>
                <div className="flex items-center justify-center my-1 text-xl">
                    {
                        userProfiles?.length > 1 
                        ?
                        <button className="mr-1" 
                            onClick={()=>{
                                dispatch(imageNavigator(-1))
                            }}
                        >
                            <BsArrowLeftCircleFill />
                        </button>
                        :
                        <></>
                    }
                    <input type="file" name="profile" id="profile" accept="image/*" hidden onChange={submitHandler}/>
                    {
                        user?._id === isProfileId
                        ?
                        <>
                        {
                            isProfileUploading 
                            ?
                            <div className="w-[22px] h-[22px] rounded-full border-4 border-emerald-700 border-r-transparent animate-spin"></div>
                            :
                            <label htmlFor="profile" className="text-2xl cursor-pointer">
                                <FaCamera />
                            </label>
                        }
                        </>
                        :
                        <></>
                    }
                    {
                        userProfiles?.length > 1 
                        ?
                        <button className="ml-1" 
                            onClick={()=>{
                                dispatch(imageNavigator(1))
                            }}
                        >
                            <BsArrowRightCircleFill />
                        </button>
                        :
                        <></>
                    }
                </div>
                <div className="flex items-center justify-center m-1">
                    <span>
                        <GetUsername userId={isProfileId}/>
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profiles