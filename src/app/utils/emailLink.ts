/**
 * Helper to handle email click properly across desktop and mobile.
 * On desktop Windows/Mac: Opens Gmail web compose directly in a new tab
 * (avoids dead mailto: clicks when no desktop mail client like Outlook is configured).
 */
export const VOLTOR_EMAIL = 'voltorvietnam@gmail.com';

export function getEmailComposeUrl(subject = 'Tư vấn sản phẩm VOLTOR'): string {
  const isMobile =
    typeof window !== 'undefined' &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    return `mailto:${VOLTOR_EMAIL}?subject=${encodeURIComponent(subject)}`;
  }

  // Opens web Gmail compose directly in a new tab
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${VOLTOR_EMAIL}&su=${encodeURIComponent(subject)}`;
}

export function handleEmailClickWithCopy(
  e: React.MouseEvent<HTMLAnchorElement>,
  subject = 'Tư vấn sản phẩm VOLTOR'
) {
  // Copy email to clipboard as convenient backup
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(VOLTOR_EMAIL).catch(() => {});
  }
}
