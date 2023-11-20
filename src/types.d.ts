type ItemPropertiesProps = {
  items: string[];
};

type AccordionItemProps = {
  label: string;
  items: string[] & AccordionItemProps[];
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
