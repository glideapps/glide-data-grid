export const sleep = async (duration: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, duration));


export const isLinuxEnv = () => process.platform === 'linux';

export const getSystemCMDKey = (): 'Meta' | 'Control' => isLinuxEnv() ? 'Control' : 'Meta'
