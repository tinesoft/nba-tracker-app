export interface GameStats {
  results: ('W' | 'L')[];
  avgScoredPoints: number;
  avgConcededPoints: number;
  totalScoredPoints: number;
  totalConcededPoints: number;
}