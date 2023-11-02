import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PauseIcon from '@mui/icons-material/Pause';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';

function AppStatusIndicator() {

  const  { status } = useSelector( (state) => state.app)
  const [statusIcon, setStatusIcon] = useState(<PauseIcon/>)

  useEffect(() => {

    (status == 'idle') 
        ? setStatusIcon(<PauseIcon/>) 
        : (status == 'querying') 
            ? setStatusIcon(<CloudSyncIcon/>)
            : (status == 'queryDone')
                ? setStatusIcon(<CloudDoneIcon/>)
                : (status == 'processing')
                    ? setStatusIcon(<EngineeringIcon/>)
                    : (status == 'success')
                        ? setStatusIcon(<CheckIcon/>)
                        : (status == 'error')
                            ? setStatusIcon(<ErrorOutlineIcon/>)
                            : (status == 'emailSending')
                              ? setStatusIcon(<ScheduleSendIcon/>)
                              : (status == 'emailSent')
                                ? setStatusIcon(<MarkEmailReadIcon/>)
                                : (status == 'emailNotSent')
                                  ? setStatusIcon(<UnsubscribeIcon/>)
                                  :null
                                
  }, [status])
  

  return (
    <div className="bg-white rounded-xl p-2 me-4">{statusIcon}</div>
  )
}

export default AppStatusIndicator