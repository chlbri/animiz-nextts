export default function revoid<T>(fn: (arg?: T) => void) {
  return () => fn();
}
