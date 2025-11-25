// backend/middleware/auth.js
import jwt from "jsonwebtoken";

const realmPublicKey = process.env.KEYCLOAK_REALM_PUBLIC_KEY;
const issuer = `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`;

console.log("ENV PUBLIC KEY LENGTH =", realmPublicKey?.length);
console.log("ENV PUBLIC KEY RAW =", realmPublicKey);

// 🔥 Fix definitivo: PEM formateado correctamente
const PUBLIC_KEY_PEM =
  "-----BEGIN PUBLIC KEY-----\n" +
  realmPublicKey.replace(/\\n/g, "\n") +
  "\n-----END PUBLIC KEY-----\n";

console.log("======= FINAL PEM USED BY JWT =======");
console.log(JSON.stringify(PUBLIC_KEY_PEM));
console.log("LENGTH PEM =", PUBLIC_KEY_PEM.length);
console.log("======================================");


export default function authMiddleware(req, res, next) {
  const header =
    req.headers.authorization || req.headers.Authorization || "";

  if (!header.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Falta header Authorization Bearer" });
  }

  const token = header.substring(7);

  jwt.verify(
    token,
    PUBLIC_KEY_PEM,
    { algorithms: ["RS256"], issuer },
    (err, decoded) => {
      if (err) {
        console.error("🟥 JWT ERROR:", err);
        return res.status(401).json({ message: "Token inválido" });
      }

      // validar clientId
      if (decoded.azp !== process.env.KEYCLOAK_CLIENT_ID) {
        return res.status(401).json({ message: "ClientId incorrecto" });
      }

      req.user = {
        id: decoded.sub,
        username: decoded.preferred_username,
        email: decoded.email,
        roles: decoded.realm_access?.roles || [],
        raw: decoded,
      };

      next();
    }
  );
}
