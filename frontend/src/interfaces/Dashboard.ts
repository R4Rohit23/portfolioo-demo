export interface IStats {
  artistCount: number;
  clientCount: number;
  totalGigsCount: number;
  monthlyartistCounts: {
    [year: number]: {
      [month: string]: number;
    };
  };

  monthlyclientCounts: {
    [year: number]: {
      [month: string]: number;
    };
  };
}
