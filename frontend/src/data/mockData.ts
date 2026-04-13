export interface ClassSession {
  id: string;
  subject: string;
  time: string;
  location: string;
  faculty: string;
  day: string;
}

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
}

export interface Attendance {
  subject: string;
  percentage: number;
  totalClasses: number;
  attendedClasses: number;
}

export interface Announcement {
  id: string;
  title: string;
  department: string;
  date: string;
  content: string;
}

export const mockSchedule: ClassSession[] = [
  { id: '1', subject: 'Advanced Algorithms', time: '09:00 AM - 10:30 AM', location: 'Hall A1', faculty: 'Dr. Sarah Smith', day: 'Monday' },
  { id: '2', subject: 'Machine Learning', time: '11:00 AM - 12:30 PM', location: 'Lab 3', faculty: 'Prof. James Wilson', day: 'Monday' },
  { id: '3', subject: 'Cloud Computing', time: '02:00 PM - 03:30 PM', location: 'Hall B2', faculty: 'Dr. Elena Rossi', day: 'Tuesday' },
  { id: '4', subject: 'Neural Networks', time: '10:00 AM - 11:30 AM', location: 'Lab 1', faculty: 'Prof. Alan Turing', day: 'Wednesday' },
];

export const mockAssignments: Assignment[] = [
  { id: '1', subject: 'Machine Learning', title: 'Neural Network Implementation', dueDate: '2026-04-15', status: 'pending', priority: 'high' },
  { id: '2', subject: 'Algorithms', title: 'Graph Theory Problems', dueDate: '2026-04-18', status: 'pending', priority: 'medium' },
  { id: '3', subject: 'Cloud Computing', title: 'AWS Deployment Script', dueDate: '2026-04-12', status: 'completed', priority: 'medium' },
];

export const mockAttendance: Attendance[] = [
  { subject: 'Machine Learning', percentage: 85, totalClasses: 20, attendedClasses: 17 },
  { subject: 'Algorithms', percentage: 72, totalClasses: 18, attendedClasses: 13 },
  { subject: 'Cloud Computing', percentage: 92, totalClasses: 15, attendedClasses: 14 },
  { subject: 'Neural Networks', percentage: 65, totalClasses: 12, attendedClasses: 8 },
];

export const mockAnnouncements: Announcement[] = [
  { id: '1', title: 'Mid-Term Schedule Released', department: 'Examination Cell', date: '2026-04-10', content: 'The mid-term examinations will start from May 1st...' },
  { id: '2', title: 'Guest Lecture: AI Ethics', department: 'Computer Science', date: '2026-04-12', content: 'Join us for a session by Dr. Lisa Ray on AI Ethics this Friday...' },
];
