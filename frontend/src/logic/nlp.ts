import { mockSchedule, mockAssignments, mockAttendance, mockAnnouncements } from '../data/mockData';

export type Intent = 'get_schedule' | 'get_attendance' | 'get_assignments' | 'get_announcements' | 'greet' | 'unknown';

export interface AssistantResponse {
  intent: Intent;
  message: string;
  data?: unknown;
}

export const parseMessage = (text: string): AssistantResponse => {
  const query = text.toLowerCase();

  // Greeting
  if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('who are you') || query.includes('yo') || query.includes('supp') || query.includes('wake up')) {
    return {
      intent: 'greet',
      message: "Neural Link Established. I am Nexus. How can I assist with your academic trajectory today?",
    };
  }

  // Schedule
  if (query.includes('schedule') || query.includes('calendar') || query.includes('class') || query.includes('timetable') || query.includes('appointment') || query.includes('lecture') || query.includes('time')) {
    const today = 'Monday'; // Defaulting for demo purposes
    const todayClasses = mockSchedule.filter(s => s.day === today);
    return {
      intent: 'get_schedule',
      message: `You have ${todayClasses.length} classes today. Your next class is ${todayClasses[0].subject} at ${todayClasses[0].time}.`,
      data: todayClasses,
    };
  }

  // Attendance
  if (query.includes('attendance') || query.includes('present') || query.includes('bunk') || query.includes('progress') || query.includes('grade') || query.includes('gpa') || query.includes('radar')) {
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
  if (query.includes('assignment') || query.includes('pending') || query.includes('due') || query.includes('homework') || query.includes('task') || query.includes('matrix') || query.includes('work')) {
    const pending = mockAssignments.filter(a => a.status === 'pending');
    return {
      intent: 'get_assignments',
      message: `You have ${pending.length} pending assignments. The most urgent one is "${pending[0].title}" due on ${pending[0].dueDate}.`,
      data: pending,
    };
  }

  // Announcements
  if (query.includes('announcement') || query.includes('notice') || query.includes('news') || query.includes('what\'s new') || query.includes('faculty')) {
    if (mockAnnouncements.length === 0) {
      return {
        intent: 'get_announcements',
        message: "There are currently no new announcements on the Nexus network.",
        data: [],
      };
    }
    const latest = mockAnnouncements[0];
    const isAffirmative = query.includes('about') || query.includes('detail') || query.includes('is it') || 
                           query.includes('yes') || query.includes('please') || query.includes('more') || 
                           query.includes('sure') || query.includes('ok') || query.includes('okay') || 
                           query.includes('yeah') || query.includes('yup') || query.includes('tell') ||
                           query.includes('show me');

    if (isAffirmative) {
      return {
        intent: 'get_announcements',
        message: `The latest update "${latest.title}" is regarding: ${latest.content}`,
        data: mockAnnouncements,
      };
    }
    return {
      intent: 'get_announcements',
      message: `I've found ${mockAnnouncements.length} updates. The most recent is "${latest.title}". Would you like the full details?`,
      data: mockAnnouncements,
    };
  }

  return {
    intent: 'unknown',
    message: "I'm not sure I understand. I can help with your schedule, attendance, assignments, and campus announcements!",
  };
};
