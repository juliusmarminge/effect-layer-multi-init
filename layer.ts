import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { DatabaseService } from "./db";

export const layerLive = Layer.empty.pipe(
  Layer.provideMerge(DatabaseService.Default),
  Layer.tap(() => Effect.log("Layer initialization successful"))
);
