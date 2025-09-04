
export interface Service {
  id: number;
  name: string;
  description: string;
  url: string;
  categories: string[];
  active?: boolean;
  fullDescription: string;
}
