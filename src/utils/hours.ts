export interface ServiceEvent {
  day: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  name: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  description: string;
  timeFormatted: string;
}

export const SERVICES_SCHEDULE: ServiceEvent[] = [
  {
    day: 'Sunday',
    dayIndex: 0,
    name: 'Sunday School (All Ages)',
    startHour: 9,
    startMinute: 0,
    endHour: 10,
    endMinute: 0,
    description: 'Classes for Nursery (<2 yrs), Toddlers (2-4), Primary, Junior, Teens & Adults',
    timeFormatted: '9:00 AM – 10:00 AM'
  },
  {
    day: 'Sunday',
    dayIndex: 0,
    name: 'Sunday Morning Worship & Children’s Church',
    startHour: 10,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
    description: 'Biblical KJV preaching, congregational hymns, choir & children’s church',
    timeFormatted: '10:00 AM – 11:30 AM'
  },
  {
    day: 'Sunday',
    dayIndex: 0,
    name: 'Sunday Evening Service & Youth Discipleship',
    startHour: 18,
    startMinute: 0,
    endHour: 19,
    endMinute: 15,
    description: 'Evening preaching, teen fellowship & discipleship (September – May)',
    timeFormatted: '6:00 PM – 7:15 PM'
  },
  {
    day: 'Wednesday',
    dayIndex: 3,
    name: 'Midweek Prayer Meeting & Bible Study',
    startHour: 19,
    startMinute: 0,
    endHour: 20,
    endMinute: 15,
    description: 'Congregational prayer time & chapter-by-chapter Scripture exposition',
    timeFormatted: '7:00 PM – 8:15 PM'
  }
];

export interface StatusResult {
  isServiceActive: boolean;
  activeServiceName?: string;
  badgeText: string;
  subText: string;
  nextService?: {
    name: string;
    day: string;
    timeFormatted: string;
    relativeString: string;
  };
}

export function getChurchServiceStatus(mockDate?: Date): StatusResult {
  // Convert current time to US Eastern Time (Ohio)
  const now = mockDate || new Date();
  const easternFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour12: false,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });

  const parts = easternFormatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }

  const weekdayShort = partMap.weekday; // 'Sun', 'Mon', etc.
  const hour = parseInt(partMap.hour, 10);
  const minute = parseInt(partMap.minute, 10);
  const currentTotalMinutes = hour * 60 + minute;

  const dayMap: Record<string, number> = {
    'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6
  };
  const currentDayIndex = dayMap[weekdayShort] ?? 0;

  // 1. Check if any service is currently happening
  for (const s of SERVICES_SCHEDULE) {
    if (s.dayIndex === currentDayIndex) {
      const startMin = s.startHour * 60 + s.startMinute;
      const endMin = s.endHour * 60 + s.endMinute;
      if (currentTotalMinutes >= startMin && currentTotalMinutes <= endMin) {
        return {
          isServiceActive: true,
          activeServiceName: s.name,
          badgeText: 'Live Service in Progress',
          subText: `${s.name} • Until ${s.endHour > 12 ? s.endHour - 12 : s.endHour}:${s.endMinute === 0 ? '00' : s.endMinute} ${s.endHour >= 12 ? 'PM' : 'AM'}`
        };
      }
    }
  }

  // 2. Find next service
  let minDaysDiff = 999;
  let nextEvent: ServiceEvent | null = null;

  for (const s of SERVICES_SCHEDULE) {
    let dayDiff = s.dayIndex - currentDayIndex;
    const sStartMin = s.startHour * 60 + s.startMinute;

    if (dayDiff < 0 || (dayDiff === 0 && currentTotalMinutes > sStartMin)) {
      dayDiff += 7;
    }

    if (dayDiff < minDaysDiff) {
      minDaysDiff = dayDiff;
      nextEvent = s;
    }
  }

  if (nextEvent) {
    let relativeStr = '';
    if (minDaysDiff === 0) {
      relativeStr = 'Today';
    } else if (minDaysDiff === 1) {
      relativeStr = 'Tomorrow';
    } else {
      relativeStr = `This ${nextEvent.day}`;
    }

    return {
      isServiceActive: false,
      badgeText: `Next Service: ${relativeStr} at ${nextEvent.timeFormatted.split('–')[0].trim()}`,
      subText: `${nextEvent.name} • Visitors warmly welcomed`,
      nextService: {
        name: nextEvent.name,
        day: nextEvent.day,
        timeFormatted: nextEvent.timeFormatted,
        relativeString: relativeStr
      }
    };
  }

  return {
    isServiceActive: false,
    badgeText: 'Next Service: Sunday at 9:00 AM',
    subText: 'Sunday School & Worship • Nursery Provided'
  };
}
