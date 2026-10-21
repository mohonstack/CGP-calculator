/**
 * Ambient declaration for global stylesheet imports.
 *
 * `app/globals.css` is imported for its side effects only. Next.js compiles it
 * through its CSS pipeline, so the module has no runtime shape — this tells
 * TypeScript (and editors) that the import resolves, which keeps IDEs from
 * flagging the line and stops an unnecessary `@ts-expect-error` from being
 * added. An unused `@ts-expect-error` is itself a build error (TS2578).
 */
declare module "*.css";
