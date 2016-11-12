export function isClientSide() {
  return (typeof window != 'undefined' && window.document);
}