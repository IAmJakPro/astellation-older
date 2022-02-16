/* import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import {
  Strategy as JwtStrategy,
  StrategyOptions,
  ExtractJwt,
} from 'passport-jwt';
import { injectable } from 'inversify';

@injectable()
export default class PassPortAuth {
  private readonly opts: StrategyOptions = {
    secretOrKey: process.env.JWT_SERCRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  private jwtStrategy(): JwtStrategy {
    return new JwtStrategy(this.opts, async function (jwt_payload, done) {
      console.log('JWT BASED  VALIDATION GETTING CALLED: ');
      console.log('JWT', jwt_payload);
      if (jwt_payload) {
        return done(null, jwt_payload);
      } else {
        // user account doesnt exists in the DATA
        return done(null, false);
      }
    });
  }

  private googleStrategy(): GoogleStrategy {
    return new GoogleStrategy(
      {
        clientID:
          '1007164219541-jrc0seifglhfrf3k8d6ou4h2nvf5nviu.apps.googleusercontent.com', //'808072987259-ski5otg9cru77ncelbfv844juga167vi.apps.googleusercontent.com',
        clientSecret: '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', // 'bE9XZ8nK8jxfoUb0jvb1Oni3',
        passReqToCallback: true,
        callbackURL: 'http://localhost:5000/api/auth/google/callback',
      },
      function (req, accessToken, refreshToken, profile, cb) {
        //console.log(accessToken, refreshToken, profile)
        console.log('Profile: ', profile);
        return cb(null, {
          provider: profile.provider,
          email: profile._json.email,
        });
      }
    );
  }

  private facebookStrategy(): FacebookStrategy {
    return new FacebookStrategy(
      {
        clientID: '341004904590448', //'313286827512611', //process.env['FACEBOOK_CLIENT_ID'],
        clientSecret: '2ddecc05de7033761815f49ca1f0d35f', // '9fa7cc9440bd412db6cd5c371ca7b840', //process.env['FACEBOOK_CLIENT_SECRET'],
        callbackURL: 'http://localhost:5000/api/auth/facebook/callback', // relative or absolute path
        profileFields: ['email'],
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        console.log('FACEBOOK BASED OAUTH VALIDATION GETTING CALLED');
        return cb(null, {
          provider: 'facebook',
          email: profile._json.email,
        });
      }
    );
  }

  public fetchStrategies() {
    passport.use(this.jwtStrategy());
    passport.use(this.googleStrategy());
    passport.use(this.facebookStrategy());

    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
  }
}
 */ 
//# sourceMappingURL=auth.js.map