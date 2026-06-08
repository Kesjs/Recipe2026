export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const errorMessages: Record<string, string> = {
  AUTH_REQUIRED: 'Vous devez être connecté pour effectuer cette action',
  INVALID_INPUT: 'Les données fournies sont invalides',
  NOT_FOUND: 'La ressource demandée n\'existe pas',
  SERVER_ERROR: 'Une erreur est survenue. Veuillez réessayer',
  SUPABASE_ERROR: 'Erreur de connexion à la base de données',
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return errorMessages[error.code] || error.message
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return errorMessages.SERVER_ERROR
}
