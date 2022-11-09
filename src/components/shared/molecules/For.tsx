type Props<T> = {
  list: T[];
  children: (item: T) => JSX.Element;
};

export function For<T>({ list, children }: Props<T>): JSX.Element {
  return <>{list.map(children)}</>;
}
