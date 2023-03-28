export interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: 'East' | 'West';
  division: string;
  full_name: string;
  name: string;
}
