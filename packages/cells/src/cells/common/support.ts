/**
 * This is all copied from packages/core/src/common/support.ts for now.
 */

function panic(message: string = "This should not happen"): never {
  throw new Error(message);
}

export function assertNever(_never: never): never {
  return panic("Hell froze over");
}

export function assert(
  fact: boolean,
  message: string = "Assertion failed"
): asserts fact {
  if (fact) return;
  return panic(message);
}
