import { verifyJwt,verifyRefreshJwt } from "../libs/jwt";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

 async function authorizeJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.cookies);
  const token = req.cookies.jwt;
  const refreshToken = req.cookies.Refreshjwt;

  // if (!token){
  //     return res.status(401).send({msg: 'Unauthorized'});
  // }
  if (!token && !refreshToken) {
    return res.status(401).send({ msg: "Unauthorized" });
  }

  const user = verifyJwt(token);
  if (!user && !refreshToken) {
    return res.status(401).send({ msg: "Unauthorized" });
  }
  if (!user && refreshToken) {
    const payload = verifyRefreshJwt(refreshToken);
    if (!payload) {
      return res.status(401).send({ msg: "Unauthorized" });
    } else if (typeof payload !== "string" && payload.user) {
      const user = await User.findOne({ _id: payload.user.id });
        if (!user) {
            return res.status(401).send({ msg: "Unauthorized" });
        }
        if (user.refreshToken !== refreshToken) {
            return res.status(401).send({ msg: "Unauthorized" });
        }
    }
  }

  // req.user = user;
  next();
}

export { authorizeJwt };
