import { createContext } from 'react';

const CurrentViewContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>]
>([0, () => {}]);

export default CurrentViewContext;
