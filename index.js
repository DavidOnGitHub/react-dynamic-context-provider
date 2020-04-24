import React from 'react';

let contexts = []

const ContextComponent = ({
  ValueContext,
  SetterContext,
  defaultValue,
  children,
}) => {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <ValueContext.Provider value={value}>
      <SetterContext.Provider value={setValue}>
        {children}
      </SetterContext.Provider>
    </ValueContext.Provider>
  );
};

export const getContextProvider = (contextList) => ({ children }) => {
  contexts = contextList.reduce((acc, context) => {
    const Context = React.createContext(context.value);
    const SetterContext = React.createContext(() => {});
    return {
      ...acc,
      [`${context.name}Context`]: Context,
      [`Set${context.name}Context`]: SetterContext,
    };
  }, {});
  return contextList.reduce(
    (acc, context) => (
      <ContextComponent
        defaultValue={context.value}
        ValueContext={contexts[`${context.name}Context`]}
        SetterContext={contexts[`Set${context.name}Context`]}
      >
        {acc}
      </ContextComponent>
    ),
    children
  );
}

export const getContexts = () => contexts;
