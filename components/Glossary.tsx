import { Fragment } from 'react';

const Glossary = ({data}: any) => {
  return (
    <dl className="grid grid-cols-5 gap-2 gap-y-6 items-start">
      {data && data.glossaryTerms.data.map((glossaryTerm: any, index: number) => {

        return (
          <Fragment key={`glossary-fragment-${index}`}>
            <dt className="text-blue-tory dark:text-lt-perfume col-span-1">{glossaryTerm.attributes.termName}</dt>
            <dd className="ml-8 glossary-term col-span-4" dangerouslySetInnerHTML={{ __html: glossaryTerm.attributes.termDescription }} />
          </Fragment>
        );
      })}
    </dl>
  );
}

export default Glossary;
