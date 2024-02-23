import {useSelector} from 'react-redux'

// global constants
import {
  BASE_URL,
} from '../../../config'

// default profile
import defaultProfile from '../../../assets/images/defaults/profiles/male-profile-3.jpg'

// actions from slice
// profiles slice
import {
  selectProfiles,
} from '../profilesSlice'

// main
// GetProfiles
const GetProfile = ({userId}) => {
  // states from slices
  // profles slice
  const profiles = useSelector(selectProfiles) 

  let userProfiles = profiles.find(profiles => profiles._id === userId)

  let finalProfiles = userProfiles?.profiles 

  return (
    <>
    {
      finalProfiles?.length > 0 
      ?
      <img src={`${BASE_URL}/${finalProfiles[finalProfiles.length - 1].profilePath}`} alt="user profile" className="w-[24px] h-[24px] rounded-full mx-1"/>
      :
      <img src={defaultProfile} alt="user profile" className="w-[24px] h-[24px] rounded-full mx-1"/>
    }
    </>
  )
}

export default GetProfile