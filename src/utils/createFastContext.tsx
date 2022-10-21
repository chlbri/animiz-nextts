import { StateMatching, StateValue } from '@bemedev/decompose';
import { useInterpret, useSelector } from '@xstate/react';
import {
  createContext,
  FC,
  ReactNode,
  useContext as useContextR,
} from 'react';

import {
  BaseActionObject,
  EventObject,
  InterpreterFrom,
  NoInfer,
  Prop,
  ResolveTypegenMeta,
  ServiceMap,
  StateFrom,
  StateMachine,
  TypegenDisabled,
  TypegenEnabled,
  Typestate,
} from 'xstate';
import { matches, MatchOptions } from './machines/matches';

//from jherr

export default function createMachineContext<
  TContext,
  TEvent extends EventObject = EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  },
  TAction extends BaseActionObject = BaseActionObject,
  TServiceMap extends ServiceMap = ServiceMap,
  TResolvedTypesMeta = ResolveTypegenMeta<
    TypegenDisabled,
    NoInfer<TEvent>,
    TAction,
    TServiceMap
  >
>(
  machine: StateMachine<
    TContext,
    any,
    TEvent,
    TTypestate,
    TAction,
    TServiceMap,
    TResolvedTypesMeta
  >
) {
  type State = StateFrom<typeof machine>;
  type Actor = InterpreterFrom<typeof machine>;
  type ProviderProps = { children: ReactNode };

  const ServiceContext = createContext<Actor | null>(null);

  const Provider: FC<ProviderProps> = ({ children }) => {
    const service = useInterpret(machine);

    return (
      <ServiceContext.Provider value={service}>
        {children}
      </ServiceContext.Provider>
    );
  };

  function useService() {
    const service = useContextR(ServiceContext);
    if (!service) throw new Error('Store not found');
    return service;
  }

  function useState<T = State>(
    selector?: (emitted: State) => T,
    compare?: (a: T, b: T) => boolean,
    getSnapshot?: (a: Actor) => State
  ) {
    const service = useService();
    const _selector = (state: State) => {
      if (selector) return selector(state);
      return state as T;
    };

    const out = useSelector(service, _selector, compare, getSnapshot);
    return out;
  }

  function useContext<T = TContext>(
    selector?: (emitted: TContext) => T,
    compare?: (a: T, b: T) => boolean,
    getSnapshot?: (a: Actor) => State
  ) {
    const _selector = (state: State) => {
      if (selector) return selector(state.context);
      return state.context as unknown as T;
    };

    const out = useState(_selector, compare, getSnapshot);
    return out;
  }

  const useSend = () => useService().send;

  type TSV = TResolvedTypesMeta extends TypegenEnabled
    ? Prop<Prop<TResolvedTypesMeta, 'resolved'>, 'matchesStates'>
    : never;

  type UseMatchesProps = MatchOptions<
    StateMatching<TSV extends StateValue ? TSV : StateValue>
  >[];

  const useMatches = (...values: UseMatchesProps) => {
    const value = useState((state) => matches(state.value)(...values));
    return value;
  };

  const useHasTag = (
    tag: TResolvedTypesMeta extends TypegenEnabled
      ? Prop<Prop<TResolvedTypesMeta, 'resolved'>, 'tags'>
      : string
  ) => {
    const value = useState((state) => state.hasTag(tag));
    return value;
  };

  return {
    Provider,
    useState,
    useSend,
    useMatches,
    useContext,
    useHasTag,
  };
}
