export type IdeaValue = "Alto" | "Medio" | "Bajo";
export type IdeaEffort = "Alta" | "Media" | "Baja";

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
  updatedAt: string;
};

export type ActivityItem = {
  id: string;
  at: string;
  text: string;
};

export type ControlRoomState = {
  statuses: Status[];
  roles: Role[];
  users: AppUser[];
  ideas: Idea[];
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
};
