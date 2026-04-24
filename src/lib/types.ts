export type IdeaValue = "Alto" | "Medio" | "Bajo";
export type IdeaEffort = "Alta" | "Media" | "Baja";

export type IdeaPhaseNote = {
  id: string;
  statusId?: string | null;
  statusName: string;
  summary: string;
  details: string;
  link: string;
  createdAt: string;
  updatedAt: string;
};

export type Status = {
  id: string;
  name: string;
  position: number;
  wipLimit: number;
};

export type Role = {
  id: string;
  name: string;
};

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  verificationCode?: string;
};

export type Idea = {
  id: string;
  name: string;
  market: string;
  ownerId?: string | null;
  owner: string;
  statusId?: string | null;
  status: string;
  value: IdeaValue;
  effort: IdeaEffort;
  notes: string;
  prompt: string;
  tags: string[];
  phaseNotes?: IdeaPhaseNote[];
  developmentProgress?: number;
  returnScore?: number | null;
  difficultyScore?: number | null;
  updatedAt: string;
};

export type ActivityItem = {
  id: string;
  at: string;
  text: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  ownerName: string;
  ownerEmail?: string | null;
  startsAt: string;
  endsAt?: string | null;
  location: string;
  notes: string;
  completedAt?: string | null;
  createdAt: string;
};

export type ControlRoomState = {
  statuses: Status[];
  roles: Role[];
  users: AppUser[];
  ideas: Idea[];
  calendarEvents: CalendarEvent[];
  activity: ActivityItem[];
};

export type IdeaInput = {
  id?: string;
  name: string;
  market: string;
  ownerId?: string | null;
  owner?: string;
  statusId?: string | null;
  status?: string;
  value: IdeaValue;
  effort: IdeaEffort;
  notes: string;
  prompt: string;
  tags: string[];
  phaseNotes?: IdeaPhaseNote[];
  developmentProgress?: number;
  returnScore?: number | null;
  difficultyScore?: number | null;
};

export type CalendarEventInput = {
  title: string;
  ownerName: string;
  ownerEmail?: string | null;
  startsAt: string;
  endsAt?: string | null;
  location: string;
  notes: string;
  completedAt?: string | null;
};
