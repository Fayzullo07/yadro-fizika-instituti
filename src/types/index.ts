export interface PaginatedResponse<T> {
  status: boolean;
  message: string;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

export interface SingleResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
  search?: string;
}

// General
export interface GeneralData {
  id: number;
  organization_name: string;
  organization_short_name: string;
  organization_desc: string;
  organization_logo: string;
  phone: string;
  hotline: string;
  email: string;
  address: string;
  working_hours: string;
  map_url: string;
  website: string;
  telegram: string;
  facebook: string;
  instagram: string;
  youtube: string;
  social_media: { name: string; url: string }[];
}

export interface AboutData {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
}

export interface InstituteHistoryData {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface AnnouncementItem {
  id: number;
  title: string;
  description: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ConferenceItem {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string | null;
  file: string | null;
  start_date: string;
  end_date: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactUsData {
  full_name: string;
  email: string;
  phone: string;
  message: string;
}

// Banners
export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

// Council
export interface ScientificCouncil {
  id: number;
  title: string;
  image: string;
  council_duties: string;
}

export interface CouncilMember {
  id: number;
  scientific_council_id: number;
  fullname: string;
  position: string;
  degree: string;
  photo: string;
  order: number;
  created_at: string;
  updated_at: string;
}

// Department
export interface Department {
  id: number;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface Laboratory {
  id: number;
  name: string;
  description: string;
  image: string;
  image_uz: string;
  image_ru: string;
  image_en: string;
  tasks: string[];
}

export interface LeadershipMember {
  id: number;
  full_name: string;
  position: string;
  image: string;
  phone: string;
  email: string;
  reception_hours: string;
}

// News
export interface NewsImage {
  id: string | number;
  image?: string; // keeping image for backward compatibility if needed, but adding url
  url?: string;
  created_at?: string;
}

export interface NewsItem {
  id: string | number;
  title: string;
  description: string;
  image?: string;
  images: NewsImage[];
  created_at: string;
  updated_at?: string;
}

// Teams
export interface TeamMember {
  id: number;
  fullname: string;
  position: string;
  photo: string;
  phone: string;
  email: string;
  linkedin: string;
  reception_hours: string;
}

// Video Gallery
export interface VideoGalleryItem {
  id: number;
  title: string;
  description: string;
  url: string;
  order: number;
  created_at: string;
  updated_at: string;
}

// Gallery
export interface GalleryItem {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
}

// Stats
export interface StatData {
  id: number;
  title: string;
  value: number;
  suffix: string;
  display_value: string;
  order: number;
}

// Vacancy
export interface Vacancy {
  id: number;
  name: string;
  desc: string;
  requirements: string;
  salary: string;
  deadline: string;
  created_at: string;
}

export interface PartnerItem {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface StructureData {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationData {
  fullname: string;
  email: string;
  phone: string;
  comment: string;
  resume: File | null;
  vacancy?: number;
}

// Language
export type Language = 'uz' | 'ru' | 'en';

export interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// API Hook return type
export interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseMutationReturn<T, R = unknown> {
  mutate: (data: T) => Promise<R>;
  loading: boolean;
  error: string | null;
}

// Navigation
export interface MenuLink {
  label: string;
  path: string;
}

export interface MenuItem {
  id: string;
  label: string;
  links: MenuLink[];
}

export interface SocialMediaLink {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode;
}
