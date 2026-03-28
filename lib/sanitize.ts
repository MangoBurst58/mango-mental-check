import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string): string {
  if (!input) return '';
  return DOMPurify.sanitize(input.trim());
}

export function sanitizeEmail(email: string): string {
  if (!email) return '';
  return email.toLowerCase().trim();
}

export function sanitizeText(text: string): string {
  if (!text) return '';
  return DOMPurify.sanitize(text.trim().replace(/[<>]/g, ''));
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) errors.push("Minimal 8 karakter");
  if (!/[A-Z]/.test(password)) errors.push("Harus mengandung huruf besar (A-Z)");
  if (!/[a-z]/.test(password)) errors.push("Harus mengandung huruf kecil (a-z)");
  if (!/[0-9]/.test(password)) errors.push("Harus mengandung angka (0-9)");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("Harus mengandung simbol (!@#$%^&*)");
  
  return { valid: errors.length === 0, errors };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return emailRegex.test(email);
}