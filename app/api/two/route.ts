import * as Effect from "effect/Effect";
import * as ManagedRuntime from "effect/ManagedRuntime";
import * as HttpApp from "@effect/platform/HttpApp";
import * as HttpServerResponse from "@effect/platform/HttpServerResponse";

import { layerLive } from "@/layer";
import { DatabaseService } from "@/db";

const managedRuntime = ManagedRuntime.make(layerLive);
const runtime = await managedRuntime.runtime();

const app = Effect.gen(function* () {
  yield* DatabaseService.execute("SELECT 1 FROM two");

  return yield* HttpServerResponse.json({ ok: true });
});

export const GET = HttpApp.toWebHandlerRuntime(runtime)(
  app.pipe(
    Effect.catchAllCause((cause) =>
      Effect.gen(function* () {
        yield* Effect.logError("Unexpected error", cause);
        return yield* HttpServerResponse.json({ ok: false }, { status: 500 });
      })
    )
  )
) as (request: Request) => Promise<Response>
