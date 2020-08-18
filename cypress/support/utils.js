const getCypressSelector = (selector) => `[data-test="${selector}"]`;

// Just a short-hand for less noisy tests
export const cys = getCypressSelector;
