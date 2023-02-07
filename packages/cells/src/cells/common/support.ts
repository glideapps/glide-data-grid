function panic(message: string = "This should not happen"): never {
    throw new Error(message);
}

export function assertNever(_never: never): never {
    return panic("Hell froze over");
}
