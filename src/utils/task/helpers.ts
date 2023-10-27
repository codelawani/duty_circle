// calculate time interval between dueDate and current time
export function getDueDate(due: Date) {
  const currentDate = new Date();
  const diff = due.getTime() - currentDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
type DateObject = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

//
export function dateString(date: DateObject) {
  const { days, hours, minutes, seconds } = date;
  if (days < 0 || hours < 0 || 0 || minutes < 0 || seconds < 0)
    return 'due date exceeded';

  if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
  } else {
    return `${seconds} sec`;
  }
}

// estimate priority level of given task
export function calculatePriority(date: DateObject) {
  const { days } = date;

  if (days >= 2) {
    return 'low';
  } else if (days === 1) {
    return 'medium';
  } else {
    return 'high';
  }
}
