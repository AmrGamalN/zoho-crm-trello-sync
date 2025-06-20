import { Response } from "express";

export const generateCookie = (
  res: Response,
  access_token: string,
  refresh_token: string
) => {
  const isProduction = process.env.NODE_ENV === "production";
  const options = {
    httpOnly: true,
    sameSite: isProduction ? ("none" as "none") : ("lax" as "lax"),
    secure: isProduction,
  };
  res.cookie("access_token", access_token, {
    ...options,
    expires: new Date(Date.now() + 1000 * 60 * 60),
  });
  res.cookie("refresh_token", refresh_token, {
    ...options,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
  });
};
