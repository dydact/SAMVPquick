import {
  CognitoAWSCredentialsAndIdentityIdProvider,
  DefaultIdentityIdStore,
  cognitoUserPoolsTokenProvider
} from "./chunk-WXJDAAAH.js";
import {
  Amplify,
  CookieStorage,
  defaultStorage,
  parseAmplifyConfig
} from "./chunk-UPYUGGH5.js";
import "./chunk-O5X5HEN2.js";
import "./chunk-G3PMV62Z.js";

// node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/index.mjs
var cognitoCredentialsProvider = new CognitoAWSCredentialsAndIdentityIdProvider(new DefaultIdentityIdStore(defaultStorage));

// node_modules/aws-amplify/dist/esm/initSingleton.mjs
var DefaultAmplify = {
  /**
   * Configures Amplify with the {@link resourceConfig} and {@link libraryOptions}.
   *
   * @param resourceConfig The {@link ResourcesConfig} object that is typically imported from the
   * `amplifyconfiguration.json` file. It can also be an object literal created inline when calling `Amplify.configure`.
   * @param libraryOptions The {@link LibraryOptions} additional options for the library.
   *
   * @example
   * import config from './amplifyconfiguration.json';
   *
   * Amplify.configure(config);
   */
  configure(resourceConfig, libraryOptions) {
    const resolvedResourceConfig = parseAmplifyConfig(resourceConfig);
    if (!resolvedResourceConfig.Auth) {
      Amplify.configure(resolvedResourceConfig, libraryOptions);
      return;
    }
    if (libraryOptions == null ? void 0 : libraryOptions.Auth) {
      Amplify.configure(resolvedResourceConfig, libraryOptions);
      return;
    }
    if (!Amplify.libraryOptions.Auth) {
      cognitoUserPoolsTokenProvider.setAuthConfig(resolvedResourceConfig.Auth);
      cognitoUserPoolsTokenProvider.setKeyValueStorage(
        // TODO: allow configure with a public interface
        (libraryOptions == null ? void 0 : libraryOptions.ssr) ? new CookieStorage({ sameSite: "lax" }) : defaultStorage
      );
      Amplify.configure(resolvedResourceConfig, {
        ...libraryOptions,
        Auth: {
          tokenProvider: cognitoUserPoolsTokenProvider,
          credentialsProvider: cognitoCredentialsProvider
        }
      });
      return;
    }
    if (libraryOptions) {
      if (libraryOptions.ssr !== void 0) {
        cognitoUserPoolsTokenProvider.setKeyValueStorage(
          // TODO: allow configure with a public interface
          libraryOptions.ssr ? new CookieStorage({ sameSite: "lax" }) : defaultStorage
        );
      }
      Amplify.configure(resolvedResourceConfig, {
        Auth: Amplify.libraryOptions.Auth,
        ...libraryOptions
      });
      return;
    }
    Amplify.configure(resolvedResourceConfig);
  },
  /**
   * Returns the {@link ResourcesConfig} object passed in as the `resourceConfig` parameter when calling
   * `Amplify.configure`.
   *
   * @returns An {@link ResourcesConfig} object.
   */
  getConfig() {
    return Amplify.getConfig();
  }
};
export {
  DefaultAmplify as Amplify
};
//# sourceMappingURL=aws-amplify.js.map
