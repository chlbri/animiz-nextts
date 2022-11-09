import {
  LengthOf,
  StateMatching,
  StateValue,
  TuplifyUnion,
} from '@bemedev/decompose';
import { useSelector as useS } from '@xstate/react';
import {
  AreAllImplementationsAssumedToBeProvided,
  BaseActionObject,
  EventObject,
  interpret,
  InterpreterOptions,
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

//TODO: create Library
export default function reactInterpret<
  TContext,
  TEvents extends EventObject = EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  },
  TAction extends BaseActionObject = BaseActionObject,
  TServiceMap extends ServiceMap = ServiceMap,
  TResolvedTypesMeta = ResolveTypegenMeta<
    TypegenDisabled,
    NoInfer<TEvents>,
    TAction,
    TServiceMap
  >
>(
  machine: AreAllImplementationsAssumedToBeProvided<TResolvedTypesMeta> extends true
    ? StateMachine<
        TContext,
        any,
        TEvents,
        TTypestate,
        TAction,
        TServiceMap,
        TResolvedTypesMeta
      >
    : 'Some implementations missing',
  options?: InterpreterOptions
) {
  // #region Types
  type State = StateFrom<Exclude<typeof machine, string>>;

  type TSV = TResolvedTypesMeta extends TypegenEnabled
    ? Prop<Prop<TResolvedTypesMeta, 'resolved'>, 'matchesStates'>
    : never;

  type UseMatchesProps = MatchOptions<
    StateMatching<TSV extends StateValue ? TSV : StateValue>
  >[];

  type Tags = (TResolvedTypesMeta extends TypegenEnabled
    ? Prop<Prop<TResolvedTypesMeta, 'resolved'>, 'tags'>
    : string)[];
  // #endregion

  const service = interpret(machine, options);

  const start = (state?: StateValue | State) => service.start(state);
  const stop = () => service.stop();

  const useSelector = <T = State>(
    selector: (emitted: State) => T = (state) => state as T,
    compare?: (a: T, b: T) => boolean
  ) => {
    return useS(service, selector, compare);
  };

  const useContext = <T = TContext>(
    selector?: (emitted: TContext) => T,
    compare?: (a: T, b: T) => boolean
  ) => {
    const _selector = (state: State) => {
      if (selector) return selector(state.context);
      return state.context as unknown as T;
    };
    return useSelector(_selector, compare);
  };

  const useMatches = (...values: UseMatchesProps) => {
    return useSelector(({ value }) => {
      const fn = matches(value);
      return fn(...values);
    });
  };

  const useHasTags = (...tags: Tags) => {
    return useSelector(({ hasTag }) => tags.every(hasTag));
  };

  const send = service.send;

  const sender = <T extends TEvents['type']>(type: T) => {
    // #region Type
    type E = Required<TEvents> extends { type: T } & infer U
      ? LengthOf<TuplifyUnion<Extract<U, { type: T }>>> extends 0
        ? []
        : [Omit<Extract<TEvents, { type: T }>, 'type'>]
      : never;
    // #endregion

    const fn = (...[event]: E) => send({ type, ...event } as any);
    return fn;
  };

  return {
    start,
    send,
    sender,
    stop,
    useSelector,
    useContext,
    useMatches,
    useHasTags,
  };
}
