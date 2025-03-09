export const convertMinutesToTime=(minutes)=> {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    const formattedTime = 
      `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
  
    return formattedTime;
  }
  
export const convertDateFormate=(date,options={ year: 'numeric', month: 'short', day: 'numeric'})=>{
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString('en-US', options)
}

export const convertTimeFormate=(dateString)=>{
  const time = new Date(dateString);
  return time.toTimeString().split(' ')[0];
}