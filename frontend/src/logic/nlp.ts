import { mockSchedule, mockAssignments, mockAttendance, mockAnnouncements } from '../data/mockData';

export type Intent = 'get_schedule' | 'get_attendance' | 'get_assignments' | 'get_announcements' | 'greet' | 'unknown';

export interface AssistantResponse {
  intent: Intent;
  message: string;
  data?: any;
}

export const parseMessage = (text: string): AssistantResponse => {
  const query = text.toLowerCase();

  // Greeting
  if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('who are you')) {
    return {
      intent: 'greet',
      message: "Hello! I'm Nexus, your AI campus assistant. How can I help you manage your studies today?",
    };
  }

  // Schedule
  if (query.includes('schedule') || query.includes('class') || query.includes('timetable') || query.includes('appointment')) {
    const today = 'Monday'; // Defaulting for demo purposes
    const todayClasses = mockSchedule.filter(s => s.day === today);
    return {
      intent: 'get_schedule',
      message: `You have ${todayClasses.length} classes today. Your next class is ${todayClasses[0].subject} at ${todayClasses[0].time}.`,
      data: todayClasses,
    };
  }

  // Attendance
  if (query.includes('attendance') || query.includes('present') || query.includes('bunk')) {
    const lowAttendance = mockAttendance.filter(a => a.percentage < 75);
    const lowSubjects = lowAttendance.map(a => a.subject).join(', ');
    return {
      intent: 'get_attendance',
      message: lowAttendance.length > 0 
        ? `Your attendance is looking a bit low in: ${lowSubjects}. You need to attend more classes to stay above 75%.`
        : "Your attendance is excellent! Keep it up across all subjects.",
      data: mockAttendance,
    };
  }

  // Assignments
  if (query.includes('assignment') || query.includes('pending') || query.includes('due') || query.includes('homework')) {
    const pending = mockAssignments.filter(a => a.status === 'pending');
    return {
      intent: 'get_assignments',
      message: `You have ${pending.length} pending assignments. The most urgent one is "${pending[0].title}" due on ${pending[0].dueDate}.`,
      data: pending,
    };
  }

  // Announcements
  if (query.includes('announcement') || query.includes('notice') || query.includes('news') || query.includes('faculty')) {
    return {
      intent: 'get_announcements',
      message: `There are ${mockAnnouncements.length} new announcements. The latest is: "${mockAnnouncements[0].title}".`,
      data: mockAnnouncements,
    };
  }

  return {
    intent: 'unknown',
    message: "I'm not sure I understand. I can help with your schedule, attendance, assignments, and campus announcements!",
  };
};
