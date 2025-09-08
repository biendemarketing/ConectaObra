export type Page = 
  'home' 
  | 'search' 
  | 'detail' 
  | 'login' 
  | 'register' 
  | 'dashboard'
  | 'provider-profile'
  | 'checkout'
  | 'listing-form'
  | 'como-funciona'
  | 'admin';

export type Role = 'client' | 'provider' | 'admin';

export type AdminView = 'analytics' | 'users' | 'listings' | 'disputes' | 'payments' | 'site-management';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  roles: Role[];
  projects?: Project[];
  status: 'active' | 'blocked';
}

export interface CompletedProjectSample {
  name: string;
  category: string;
}

export interface Provider {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  memberSince: string;
  spotlight?: boolean;
  bio: string;
  province: string;
  city: string;
  projectsCompleted: number;
  skills: string[];
  responseTime: string;
  completedProjectSamples: CompletedProjectSample[];
  unavailableDates: string[];
  status: 'active' | 'blocked';
}

export interface Review {
  id: string;
  author: string;
  authorAvatarUrl: string;
  date: string;
  rating: number;
  comment: string;
}

export interface ServicePackage {
  tier: 'Básico' | 'Estándar' | 'Premium';
  price: number;
  features: string[];
}

export interface Listing {
  id: string;
  title: string;
  category: 'Equipo' | 'Profesional';
  type: string; // e.g., 'Excavadora', 'Arquitecto'
  province: string;
  city: string;
  packages: ServicePackage[];
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  gallery: string[];
  provider: Provider;
  description: string;
  specs?: { [key: string]: string };
  reviews: Review[];
}

export interface Booking {
  id: string;
  listing: Listing;
  package: ServicePackage;
  bookingDate: string;
  status: 'Confirmada' | 'Pendiente' | 'Completada';
  projectId?: string | null;
}

export interface Message {
  from: 'client' | 'provider';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  client: User;
  provider: Provider;
  listing: Listing;
  messages: Message[];
}

export interface Project {
  id: string;
  name: string;
  userId: string;
  bookings: Booking[];
}

export interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Dispute {
    id: string;
    booking: Booking;
    reason: string;
    status: 'Abierta' | 'Resuelta';
    reportedDate: string;
    client: User;
    provider: Provider;
}

export interface Transaction {
    id: string;
    booking: Booking;
    amount: number;
    date: string;
    status: 'Pendiente de Liberación' | 'Pagado' | 'Reembolsado';
}

export interface ServiceCategory {
    id: string;
    name: string;
}

export interface Skill {
    id: string;
    name: string;
}