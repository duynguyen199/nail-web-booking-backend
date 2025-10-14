// Define types manually based on Prisma schema
export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: 'CLIENT' | 'NAIL_TECH' | 'ADMIN';
  avatarUrl?: string;
  createdAt: Date;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type NailTechProfile = {
  id: string;
  userId: string;
  bio?: string;
  yearOfExp: number;
  ratingAvg: number;
  bufferMinutes: number;
  workingHours: any;
  createdAt: Date;
  updatedAt: Date;
};

export type Availability = {
  id: string;
  techId: string;
  startAt: Date;
  endAt: Date;
  status: 'AVAILABLE' | 'BUSY' | 'LUNCH' | 'ON_HOLD';
  createdAt?: Date;
  updatedAt?: Date;
};

export enum AvailabilityStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  LUNCH = 'LUNCH',
  ON_HOLD = 'ON_HOLD'
}

export enum UserRole {
  CLIENT = 'CLIENT',
  NAIL_TECH = 'NAIL_TECH',
  ADMIN = 'ADMIN'
}
export enum NotificationType{
  PORTFOLIO_UPLOAD= "PORTFOLIO_UPLOAD",
  APPOINTMENT_CREATED="APPOINTMENT_CREATED",
  APPOINTMENT_CONFIRMED= "APPOINTMENT_CONFIRMED",
  APPOINTMENT_DENIED="APPOINTMENT_DENIED",
  GENERAL= "GENERAL"
}
