type Flags = {
  isIntroMode: boolean;
  isMenuTransforming: boolean;
  shouldSectionsBeUpdated: boolean;
  isScrollEnabled: boolean;
  isMobileHeader: boolean;
  media: string | null;
  menuLayout: number | null;
};

type Item = {
  index: number;
  node: HTMLElement;
  offset: number;
  height: number;
  currentSectionIndex: number;
};

type Media = {
  sm: number;
  md: number;
  lg: number;
};

type Section = {
  index: number;
  id: string;
  node: HTMLElement;
  offset: number;
};
