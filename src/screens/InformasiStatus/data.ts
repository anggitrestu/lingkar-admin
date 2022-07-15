export type dataCardType = {
  id: number;
  status: string;
  color: string;
};

let index = 0;
export const DataCard = [
  {
    id: index++,
    status: 'NORMAL',
    color: 'bg-green-700',
  },
  {
    id: index++,
    status: 'WASPADA',
    color: 'bg-yellow-600',
  },
  {
    id: index++,
    status: 'SIAGA',
    color: 'bg-orange-600',
  },
  {
    id: index++,
    status: 'AWAS',
    color: 'bg-red-700',
  },
];
