# react-context-provider

Provides an easy way to manage react contexts.
# Problem to solve
Following is a simple example of implementation of multiple dynamic contexts in React.
```js
import React from 'react';

export const UserContext = React.createContext(null);
export const SetUserContext = React.createContext(() => {}));
export const ThemeContext = React.createContext('light');
export const SetThemeContext = React.createContext(() => {}));
export const AnotherContext = React.createContext('another value');
export const SetAnotherContext = React.createContext(() => {});

const App = () => {
    const [user, setUser] = React.useState(null);
    const [theme, setTheme] = React.useState('light');
    const [another, setAnother] = React.useState(null);
    return (
        <UserContext.Provider value={user}>
            <SetUserContext.Provider value={setUser}>
                <ThemeContext.Provider value={theme}>
                    <SetThemeContext.Provider value={setTheme}>
                        <AnotherContext.Provider value={another}>
                            <SetAnotherContext.Provider value={setAnother}>
                                ...
                                <MainComponent />
                                ...
                            </SetAnotherContext.Provider>
                        </AnotherContext.Provider>
                    </SetThemeContext.Provider>
                </ThemeContext.Provider>
            </SetUserContext.Provider>
        </UserContext.Provider>
    )
}

export default App;
```
Note that the contexts of value (e.g. ```user```) and setter (e.g. ```setUser```) are separated to prevent re-render of component that needs to call ```setUser``` but doesn't depend on ```user```.

The problem with the approach above is there is too much boilerplate code. When you need to add a new context, what you will need to do is:
1. Create and export a new context with ```React.createContext()```.
2. Create a new state in ```App``` or other HOC for the new context value.
3. Wrap the ```App``` component with two context providers, e.g. ```NewContext.Provider``` and ```SetNewContext.Provider```.
4. Import the context with it's name e.g. ```import { NewContext } from 'SomeModule'```.

This is hard to manage especially when you need to remove or change the name of the context. Afterall, what you really have to provide is the name and value of the context. Other codes are just boilerplate codes which should be automatically generated or managed.

# Usage

This package manages the above boilerplate for you. With this package the above code becomes
```js
import React from 'react';
import { getContextProvider } from 'react-context-provider';

const contexts = [
    { name: 'User', value: null },
    { name: 'Theme', value: 'light' },
    { name: 'Another', value: 'another value' }
];
const ContextProvider = getContextProvider(contexts);

const App = () => (
    <ContextProvider>
        <MainComponent />
    </ContextProvider>
)

export default App;
```

When you need to add a new context (e.g. ```MyValue```), simply add a new name-value pair in the array of ```contexts```. Then two contexts will be automatically created ```MyValueContext``` and ```SetMyValueContext```. You can import and use them like
```js
import { getContexts } from 'react-context-provider';
...
const myValue = getContexts().MyValueContext;
const setMyValue = getContexts().SetMyValueContext;
```
When you need to remove a context, simply remove the context from the array ```contexts```. When you need to change the name or default value, you only need to change it in the same array.

# Installation

```
yarn add react-context-provider
```
