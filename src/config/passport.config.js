import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { SECRET } from "../server.js";

import { userModel } from "../models/user.model.js";
import { hashPassword, verifyPassword } from "../utils/password.utils.js";

export function initializePassport() {
  passport.use("register",new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { first_name, last_name, age } = req.body;

        if (!first_name || !last_name || !age)
          return done(null, false, { message: "Todos los campos son requeridos" });

        try {
          const userExists = await userModel.findOne({ email }).lean();

          if (userExists)
            return done(null, false, { message: "Usuario ya existe" });

          const hashedPassword = await hashPassword(password);

          const user = await userModel.create({
            first_name,
            last_name,
            age,
            email,
            password: hashedPassword,
          });

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email }).lean();

          if (!user) 
            return done(null, false, { message: "Usuario no encontrado" });

          const isPasswordCorrect = await verifyPassword( password, user.password );

          if (!isPasswordCorrect)
            return done(null, false, { message: "Password invalido" });

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "restore-password",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email }).lean();

          if (!user) return done(null, false, { message: "Usuario no encontrado" });

          const hashedPassword = await hashPassword(password);

          await userModel.updateOne(
            { _id: user._id },
            { password: hashedPassword }
          );

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies["token"];
    return token;
  };

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const user = await userModel.findById(jwtPayload._id).lean();
          if (!user) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id).lean();
    done(null, user);
  });
}