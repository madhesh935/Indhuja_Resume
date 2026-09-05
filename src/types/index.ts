export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  capabilities: string[];
  techStack: string[];
  features?: { title: string; description: string }[];
  featured?: boolean;
  linkText?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface CapabilityGroup {
  id: string;
  title: string;
  number: string;
  iconName: string;
  skills: string[];
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  category: string;
}
