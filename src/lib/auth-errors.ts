// src/lib/auth-errors.ts

const KNOWN_MESSAGES: Record<string, string> = {
  "Invalid login credentials": "Email ou mot de passe incorrect.",
  "Email not confirmed":
    "Merci de confirmer votre email avant de vous connecter (vérifiez votre boîte de réception).",
  "User already registered": "Un compte existe déjà avec cet email.",
  "Password should be at least 6 characters":
    "Le mot de passe doit contenir au moins 6 caractères.",
};

export function translateAuthError(message: string) {
  return KNOWN_MESSAGES[message] ?? "Une erreur est survenue, merci de réessayer.";
}
