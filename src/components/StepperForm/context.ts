import { createContext } from 'react';

const Context = createContext<any>(null);

Context.displayName = 'StepperFormContext';

export default Context;
