const { userAgent } = window.navigator;

export const browserIsSafari = (userAgent.indexOf("Mac OS") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 0);
export const browserIsOSX = window.navigator.platform.toLowerCase().startsWith("mac");
export const isFirefox = userAgent.includes("Firefox");