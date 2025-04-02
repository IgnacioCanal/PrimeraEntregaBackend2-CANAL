import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { SECRET } from "../server.js";

import { userService } from "../services/user.service.js";
import { hashPassword, verifyPassword } from "../utils/password.utils.js";
import { cartService } from "../services/carts.service.js";
import { mailService } from "../services/mail.service.js";
import { EMAIL_TYPES } from "../common/constants/emailTypes.js";

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
          const userExists = await userService.findByEmail(email);

          if (userExists)
            return done(null, false, { message: "Usuario ya existe" });

          const hashedPassword = await hashPassword(password);
          const newCart = await cartService.createCart();

          const userData = {
            first_name,
            last_name,
            age: parseInt(age, 10),
            email,
            password: hashedPassword,
            cartId: newCart._id,
          };

          const user = await userService.create(userData);

          try {
            await mailService.sendMail({
              to: user.email,
              subject: "Bienvenido a Victornillo!",
              type: EMAIL_TYPES.WELCOME,
            });
          } catch (mailError) {
            console.error("Failed to send welcome email:", mailError);
          }

          return done(null, user);
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
          const user = await userService.findByEmail(email);

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
          const user = await userService.findByEmail(email);

          if (!user) return done(null, false, { message: "Usuario no encontrado" });

          const hashedPassword = await hashPassword(password);

          await userService.update(
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
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const user = await userService.getById(jwtPayload._id);
          if (!user) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

}