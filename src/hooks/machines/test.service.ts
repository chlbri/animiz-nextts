import createMachineContext from 'src/utils/createFastContext';
import { testmachine } from '~machines';

export const { Provider, useSend, useMatches, useState, useContext } =
  createMachineContext(testmachine);
