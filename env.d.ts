/// <reference types="@cloudflare/workers-types/2023-07-01" />

declare module "wrangler" {
  export interface PlatformProxy {
    /**
     * Environment object containing the various Cloudflare bindings
     */
    env: Env;
    /**
     * Mock of the context object that Workers received in their request handler, all the object's methods are no-op
     */
    cf: CfProperties;
    /**
     * Mock of the context object that Workers received in their request handler, all the object's methods are no-op
     */
    ctx: ExecutionContext;
    /**
     * Caches object emulating the Workers Cache runtime API
     */
    caches: CacheStorage_2;
    /**
     * Function used to dispose of the child process providing the bindings implementation
     */
    dispose: () => Promise<void>;
  }
}
