type ResumeDetailsProps = {
  label?: string;
  items: string[];
};

type AccordionProps = {
  label: string;
  children: React.ReactNode;
  view: string;
  isExpanded: boolean;
  setExpanded: (param: string | null) => void;
};

type AccordionItemProps = {
  label: string;
  items: AccordionItemProps[] & string[];
};

type AccordionsGroupProps = {
  title: string;
  content: AccordionItemProps[];
  isTitleLarge: boolean;
};

type RepoObj = {
  name: string;
  created_at: string;
  updated_at: string;
  homepage: string;
  html_url: string;
};

type ProjectProps = {
  name: string;
  title: string;
  about: string[];
  features: {
    label: string;
    items: string[];
  }[];
  icons: IconDetails[];
  fetchedData: RepoObj;
};

type TextGroupProps = {
  title: string;
  projectName: string;
  content: string[];
};

type ListGroupProps = {
  title: string;
  projectName: string;
  content: string[];
};

type IconDetails = {
  name: string;
  totalSVG: number;
};

type IconProps = {
  view: string;
  details: IconDetails;
};

type IconsList = {
  view: string;
  icons: IconDetails[];
};

type ProjectLinksProps = {
  projectName: string;
  repoUrl: string;
  demoUrl: string;
};

type ProjectFeaturesProps = {
  projectName: string;
  title: string;
  content: {
    label: string;
    items: string[];
  }[];
};

type BlockTitleProps = {
  title: string;
  view: string;
};
