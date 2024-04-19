type AccordionProps = {
  label: string;
  children: React.ReactNode;
  view: string;
  isExpanded: boolean;
  setExpanded: (param: string | null) => void;
};

type AccordionsProps = {
  label: string;
  items: {
    label?: string;
    items: string[];
    description?: string[] | undefined;
  }[];
};

type AccordionsGroupProps = {
  title?: string | null;
  accordions: AccordionsProps[];
  defaultExpanded?: string | null;
};

type RepoObj = {
  name: string;
  created_at: string;
  updated_at: string;
  homepage: string;
  html_url: string;
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
  content: {
    label: string;
    items: string[];
  }[];
};

type BlockTitleProps = {
  title: string;
  view: string;
};
