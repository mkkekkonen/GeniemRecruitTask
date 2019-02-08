import * as jwt from 'jsonwebtoken';

const HOUR = 3600;
const SECRET = process.env.JWT_SIGNING_SECRET;

const getSecondsNow = (): number => Math.floor(new Date().getTime() / 1000);

/**
 * Issues a new signed JSON Web token.
 * @param sub The subject (token holder's) identifier
 * @param validFor How long should the token stay valid (in seconds)
 */
export const issueToken = (sub: number | string, validFor: number = HOUR) => {
  const iat = getSecondsNow();
  const exp = iat + Math.floor(validFor);
  const payload = {
    sub,
    iat,
    exp,
  };
  return jwt.sign(payload, SECRET);
};

/**
 * Validates the given JSON web token.
 * @param token The signed JSON Web token to validate
 * @returns The token payload if the token was valid
 * @throws An error if token was invalid
 */
export const validateToken = (token: string) => {
  return jwt.verify(token, SECRET);
};

