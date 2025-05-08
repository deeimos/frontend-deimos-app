import { TokensType } from "../../types/user.type";
import { deleteCookie, setCookie } from "cookies-next";

export default class TokenService {
  static setTokens(tokens: TokensType) {
    console.log(123, tokens);
    const now = Math.floor(Date.now() / 1000);
    setCookie("access_token", tokens.access_token, {
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: tokens.expires_at - now,
    });
    setCookie("refresh_token", tokens.refresh_token, {
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: tokens.refresh_expires_at - now,
    });
  }

  static removeTokens() {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
  }
}
