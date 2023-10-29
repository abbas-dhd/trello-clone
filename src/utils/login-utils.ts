/**
 * Helper function to check if email is in valid format
 * @param email email to check
 * @returns boolean
 */
export const checkIfValidEmail = (email: string) => {
  const pattern = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  return pattern.test(email);
};
