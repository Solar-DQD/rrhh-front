import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';

export const PulsingWarning = () => (
  <div className='relative flex items-center justify-center mr-2'>
    <span className='absolute w-5 h-5 rounded-full bg-red-500 opacity-50 animate-ping pointer-events-none'></span>
    <PriorityHighRoundedIcon color='error' className='relative z-10' />
  </div>
);