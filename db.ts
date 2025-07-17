import * as Effect from "effect/Effect";

export class Database {
  constructor() {
    console.log("Connected to database");
  }

  async execute(query: string) {
    console.log("Executing query", query);
  }

  async quit() {
    console.log("Disconnected from database");
  }
}

export class DatabaseService extends Effect.Service<DatabaseService>()(
  "DatabaseService",
  {
    accessors: true,
    scoped: Effect.gen(function* () {
      console.log("Initializing database service");

      const db = yield* Effect.acquireRelease(
        Effect.succeed(new Database()),
        (db) => Effect.promise(() => db.quit())
      );

      const execute = (query: string) => Effect.promise(() => db.execute(query));

      return { execute };
    }),
  }
) {}
