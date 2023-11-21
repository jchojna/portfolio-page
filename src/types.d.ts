type ResumeDetailsProps = {
  label?: string;
  items: string[];
};

type AccordionProps = {
  label: string;
  items: AccordionItemProps[];
  isExpanded: boolean;
  setExpanded: (param: string | null) => void;
};

type ResumeAccordionProps = {
  content: AccordionProps[];
};
