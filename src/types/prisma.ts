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
  nailTechId: string;
  startTime: Date;
  endTime: Date;
  status: 'AVAILABLE' | 'BUSY' | 'LUNCH' | 'ON_HOLD';
  createdAt: Date;
  updatedAt: Date;
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
