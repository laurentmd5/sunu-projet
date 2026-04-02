
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model TeamMember
 * 
 */
export type TeamMember = $Result.DefaultSelection<Prisma.$TeamMemberPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model ProjectUser
 * 
 */
export type ProjectUser = $Result.DefaultSelection<Prisma.$ProjectUserPayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>
/**
 * Model TeamMeeting
 * 
 */
export type TeamMeeting = $Result.DefaultSelection<Prisma.$TeamMeetingPayload>
/**
 * Model MeetingRecording
 * 
 */
export type MeetingRecording = $Result.DefaultSelection<Prisma.$MeetingRecordingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProjectRole: {
  OWNER: 'OWNER',
  MANAGER: 'MANAGER',
  MEMBER: 'MEMBER'
};

export type ProjectRole = (typeof ProjectRole)[keyof typeof ProjectRole]


export const TeamRole: {
  OWNER: 'OWNER',
  MANAGER: 'MANAGER',
  MEMBER: 'MEMBER'
};

export type TeamRole = (typeof TeamRole)[keyof typeof TeamRole]


export const ProjectCollaboratorScope: {
  INTERNAL: 'INTERNAL',
  EXTERNAL: 'EXTERNAL'
};

export type ProjectCollaboratorScope = (typeof ProjectCollaboratorScope)[keyof typeof ProjectCollaboratorScope]


export const MeetingStatus: {
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type MeetingStatus = (typeof MeetingStatus)[keyof typeof MeetingStatus]


export const MeetingProvider: {
  NONE: 'NONE',
  JITSI: 'JITSI'
};

export type MeetingProvider = (typeof MeetingProvider)[keyof typeof MeetingProvider]


export const ActivityType: {
  PROJECT_CREATED: 'PROJECT_CREATED',
  MEMBER_JOINED: 'MEMBER_JOINED',
  MEMBER_ROLE_UPDATED: 'MEMBER_ROLE_UPDATED',
  MEMBER_REMOVED: 'MEMBER_REMOVED',
  TASK_CREATED: 'TASK_CREATED',
  TASK_STATUS_UPDATED: 'TASK_STATUS_UPDATED',
  TEAM_CREATED: 'TEAM_CREATED',
  TEAM_MEMBER_JOINED: 'TEAM_MEMBER_JOINED',
  TEAM_MEMBER_ROLE_UPDATED: 'TEAM_MEMBER_ROLE_UPDATED',
  TEAM_MEMBER_REMOVED: 'TEAM_MEMBER_REMOVED',
  PROJECT_LINKED_TO_TEAM: 'PROJECT_LINKED_TO_TEAM'
};

export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType]

}

export type ProjectRole = $Enums.ProjectRole

export const ProjectRole: typeof $Enums.ProjectRole

export type TeamRole = $Enums.TeamRole

export const TeamRole: typeof $Enums.TeamRole

export type ProjectCollaboratorScope = $Enums.ProjectCollaboratorScope

export const ProjectCollaboratorScope: typeof $Enums.ProjectCollaboratorScope

export type MeetingStatus = $Enums.MeetingStatus

export const MeetingStatus: typeof $Enums.MeetingStatus

export type MeetingProvider = $Enums.MeetingProvider

export const MeetingProvider: typeof $Enums.MeetingProvider

export type ActivityType = $Enums.ActivityType

export const ActivityType: typeof $Enums.ActivityType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teamMember`: Exposes CRUD operations for the **TeamMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMembers
    * const teamMembers = await prisma.teamMember.findMany()
    * ```
    */
  get teamMember(): Prisma.TeamMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectUser`: Exposes CRUD operations for the **ProjectUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectUsers
    * const projectUsers = await prisma.projectUser.findMany()
    * ```
    */
  get projectUser(): Prisma.ProjectUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teamMeeting`: Exposes CRUD operations for the **TeamMeeting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMeetings
    * const teamMeetings = await prisma.teamMeeting.findMany()
    * ```
    */
  get teamMeeting(): Prisma.TeamMeetingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meetingRecording`: Exposes CRUD operations for the **MeetingRecording** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MeetingRecordings
    * const meetingRecordings = await prisma.meetingRecording.findMany()
    * ```
    */
  get meetingRecording(): Prisma.MeetingRecordingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Team: 'Team',
    TeamMember: 'TeamMember',
    Project: 'Project',
    Task: 'Task',
    ProjectUser: 'ProjectUser',
    ActivityLog: 'ActivityLog',
    TeamMeeting: 'TeamMeeting',
    MeetingRecording: 'MeetingRecording'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "team" | "teamMember" | "project" | "task" | "projectUser" | "activityLog" | "teamMeeting" | "meetingRecording"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      TeamMember: {
        payload: Prisma.$TeamMemberPayload<ExtArgs>
        fields: Prisma.TeamMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findFirst: {
            args: Prisma.TeamMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findMany: {
            args: Prisma.TeamMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>[]
          }
          create: {
            args: Prisma.TeamMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          createMany: {
            args: Prisma.TeamMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TeamMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          update: {
            args: Prisma.TeamMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          deleteMany: {
            args: Prisma.TeamMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeamMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          aggregate: {
            args: Prisma.TeamMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMember>
          }
          groupBy: {
            args: Prisma.TeamMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMemberCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      ProjectUser: {
        payload: Prisma.$ProjectUserPayload<ExtArgs>
        fields: Prisma.ProjectUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectUserPayload>
          }
          findFirst: {
            args: Prisma.ProjectUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectUserPayload>
          }
          findMany: {
            args: Prisma.ProjectUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectUserPayload>[]
          }
          create: {
            args: Prisma.ProjectUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectUserPayload>
          }
          createMany: {
            args: Prisma.ProjectUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProjectUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectUserPayload>
          }
          update: {
            args: Prisma.ProjectUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectUserPayload>
          }
          deleteMany: {
            args: Prisma.ProjectUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectUserPayload>
          }
          aggregate: {
            args: Prisma.ProjectUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectUser>
          }
          groupBy: {
            args: Prisma.ProjectUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectUserCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectUserCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
      TeamMeeting: {
        payload: Prisma.$TeamMeetingPayload<ExtArgs>
        fields: Prisma.TeamMeetingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMeetingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMeetingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingPayload>
          }
          findFirst: {
            args: Prisma.TeamMeetingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMeetingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingPayload>
          }
          findMany: {
            args: Prisma.TeamMeetingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingPayload>[]
          }
          create: {
            args: Prisma.TeamMeetingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingPayload>
          }
          createMany: {
            args: Prisma.TeamMeetingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TeamMeetingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingPayload>
          }
          update: {
            args: Prisma.TeamMeetingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingPayload>
          }
          deleteMany: {
            args: Prisma.TeamMeetingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMeetingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeamMeetingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingPayload>
          }
          aggregate: {
            args: Prisma.TeamMeetingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMeeting>
          }
          groupBy: {
            args: Prisma.TeamMeetingGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMeetingGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMeetingCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMeetingCountAggregateOutputType> | number
          }
        }
      }
      MeetingRecording: {
        payload: Prisma.$MeetingRecordingPayload<ExtArgs>
        fields: Prisma.MeetingRecordingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MeetingRecordingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingRecordingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeetingRecordingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingRecordingPayload>
          }
          findFirst: {
            args: Prisma.MeetingRecordingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingRecordingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeetingRecordingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingRecordingPayload>
          }
          findMany: {
            args: Prisma.MeetingRecordingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingRecordingPayload>[]
          }
          create: {
            args: Prisma.MeetingRecordingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingRecordingPayload>
          }
          createMany: {
            args: Prisma.MeetingRecordingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MeetingRecordingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingRecordingPayload>
          }
          update: {
            args: Prisma.MeetingRecordingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingRecordingPayload>
          }
          deleteMany: {
            args: Prisma.MeetingRecordingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MeetingRecordingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MeetingRecordingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingRecordingPayload>
          }
          aggregate: {
            args: Prisma.MeetingRecordingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeetingRecording>
          }
          groupBy: {
            args: Prisma.MeetingRecordingGroupByArgs<ExtArgs>
            result: $Utils.Optional<MeetingRecordingGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeetingRecordingCountArgs<ExtArgs>
            result: $Utils.Optional<MeetingRecordingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    team?: TeamOmit
    teamMember?: TeamMemberOmit
    project?: ProjectOmit
    task?: TaskOmit
    projectUser?: ProjectUserOmit
    activityLog?: ActivityLogOmit
    teamMeeting?: TeamMeetingOmit
    meetingRecording?: MeetingRecordingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    tasks: number
    createdTasks: number
    projects: number
    userProjects: number
    activityLogs: number
    createdTeams: number
    teamMembers: number
    createdMeetings: number
    addedMeetingRecordings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | UserCountOutputTypeCountTasksArgs
    createdTasks?: boolean | UserCountOutputTypeCountCreatedTasksArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    userProjects?: boolean | UserCountOutputTypeCountUserProjectsArgs
    activityLogs?: boolean | UserCountOutputTypeCountActivityLogsArgs
    createdTeams?: boolean | UserCountOutputTypeCountCreatedTeamsArgs
    teamMembers?: boolean | UserCountOutputTypeCountTeamMembersArgs
    createdMeetings?: boolean | UserCountOutputTypeCountCreatedMeetingsArgs
    addedMeetingRecordings?: boolean | UserCountOutputTypeCountAddedMeetingRecordingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectUserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTeamMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedMeetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMeetingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAddedMeetingRecordingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingRecordingWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    members: number
    projects: number
    meetings: number
    recordings: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | TeamCountOutputTypeCountMembersArgs
    projects?: boolean | TeamCountOutputTypeCountProjectsArgs
    meetings?: boolean | TeamCountOutputTypeCountMeetingsArgs
    recordings?: boolean | TeamCountOutputTypeCountRecordingsArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountMeetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMeetingWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountRecordingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingRecordingWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    tasks: number
    meetings: number
    users: number
    activityLogs: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | ProjectCountOutputTypeCountTasksArgs
    meetings?: boolean | ProjectCountOutputTypeCountMeetingsArgs
    users?: boolean | ProjectCountOutputTypeCountUsersArgs
    activityLogs?: boolean | ProjectCountOutputTypeCountActivityLogsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountMeetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMeetingWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectUserWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountActivityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
  }


  /**
   * Count Type TeamMeetingCountOutputType
   */

  export type TeamMeetingCountOutputType = {
    meetingRecordings: number
  }

  export type TeamMeetingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meetingRecordings?: boolean | TeamMeetingCountOutputTypeCountMeetingRecordingsArgs
  }

  // Custom InputTypes
  /**
   * TeamMeetingCountOutputType without action
   */
  export type TeamMeetingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingCountOutputType
     */
    select?: TeamMeetingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamMeetingCountOutputType without action
   */
  export type TeamMeetingCountOutputTypeCountMeetingRecordingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingRecordingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    tasks?: boolean | User$tasksArgs<ExtArgs>
    createdTasks?: boolean | User$createdTasksArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    userProjects?: boolean | User$userProjectsArgs<ExtArgs>
    activityLogs?: boolean | User$activityLogsArgs<ExtArgs>
    createdTeams?: boolean | User$createdTeamsArgs<ExtArgs>
    teamMembers?: boolean | User$teamMembersArgs<ExtArgs>
    createdMeetings?: boolean | User$createdMeetingsArgs<ExtArgs>
    addedMeetingRecordings?: boolean | User$addedMeetingRecordingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | User$tasksArgs<ExtArgs>
    createdTasks?: boolean | User$createdTasksArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    userProjects?: boolean | User$userProjectsArgs<ExtArgs>
    activityLogs?: boolean | User$activityLogsArgs<ExtArgs>
    createdTeams?: boolean | User$createdTeamsArgs<ExtArgs>
    teamMembers?: boolean | User$teamMembersArgs<ExtArgs>
    createdMeetings?: boolean | User$createdMeetingsArgs<ExtArgs>
    addedMeetingRecordings?: boolean | User$addedMeetingRecordingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      createdTasks: Prisma.$TaskPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      userProjects: Prisma.$ProjectUserPayload<ExtArgs>[]
      activityLogs: Prisma.$ActivityLogPayload<ExtArgs>[]
      createdTeams: Prisma.$TeamPayload<ExtArgs>[]
      teamMembers: Prisma.$TeamMemberPayload<ExtArgs>[]
      createdMeetings: Prisma.$TeamMeetingPayload<ExtArgs>[]
      addedMeetingRecordings: Prisma.$MeetingRecordingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends User$tasksArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdTasks<T extends User$createdTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$createdTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userProjects<T extends User$userProjectsArgs<ExtArgs> = {}>(args?: Subset<T, User$userProjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activityLogs<T extends User$activityLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$activityLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdTeams<T extends User$createdTeamsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdTeamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teamMembers<T extends User$teamMembersArgs<ExtArgs> = {}>(args?: Subset<T, User$teamMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdMeetings<T extends User$createdMeetingsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdMeetingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addedMeetingRecordings<T extends User$addedMeetingRecordingsArgs<ExtArgs> = {}>(args?: Subset<T, User$addedMeetingRecordingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingRecordingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.tasks
   */
  export type User$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.createdTasks
   */
  export type User$createdTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.userProjects
   */
  export type User$userProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectUser
     */
    select?: ProjectUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectUser
     */
    omit?: ProjectUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectUserInclude<ExtArgs> | null
    where?: ProjectUserWhereInput
    orderBy?: ProjectUserOrderByWithRelationInput | ProjectUserOrderByWithRelationInput[]
    cursor?: ProjectUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectUserScalarFieldEnum | ProjectUserScalarFieldEnum[]
  }

  /**
   * User.activityLogs
   */
  export type User$activityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    cursor?: ActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * User.createdTeams
   */
  export type User$createdTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    cursor?: TeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * User.teamMembers
   */
  export type User$teamMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    cursor?: TeamMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * User.createdMeetings
   */
  export type User$createdMeetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
    where?: TeamMeetingWhereInput
    orderBy?: TeamMeetingOrderByWithRelationInput | TeamMeetingOrderByWithRelationInput[]
    cursor?: TeamMeetingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMeetingScalarFieldEnum | TeamMeetingScalarFieldEnum[]
  }

  /**
   * User.addedMeetingRecordings
   */
  export type User$addedMeetingRecordingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
    where?: MeetingRecordingWhereInput
    orderBy?: MeetingRecordingOrderByWithRelationInput | MeetingRecordingOrderByWithRelationInput[]
    cursor?: MeetingRecordingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingRecordingScalarFieldEnum | MeetingRecordingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    inviteCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type TeamMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    inviteCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    name: number
    description: number
    inviteCode: number
    createdAt: number
    updatedAt: number
    createdById: number
    _all: number
  }


  export type TeamMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    inviteCode?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    inviteCode?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    inviteCode?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: string
    name: string
    description: string | null
    inviteCode: string
    createdAt: Date
    updatedAt: Date
    createdById: string
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    inviteCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Team$membersArgs<ExtArgs>
    projects?: boolean | Team$projectsArgs<ExtArgs>
    meetings?: boolean | Team$meetingsArgs<ExtArgs>
    recordings?: boolean | Team$recordingsArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>



  export type TeamSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    inviteCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
  }

  export type TeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "inviteCode" | "createdAt" | "updatedAt" | "createdById", ExtArgs["result"]["team"]>
  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Team$membersArgs<ExtArgs>
    projects?: boolean | Team$projectsArgs<ExtArgs>
    meetings?: boolean | Team$meetingsArgs<ExtArgs>
    recordings?: boolean | Team$recordingsArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$TeamMemberPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      meetings: Prisma.$TeamMeetingPayload<ExtArgs>[]
      recordings: Prisma.$MeetingRecordingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      inviteCode: string
      createdAt: Date
      updatedAt: Date
      createdById: string
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Team$membersArgs<ExtArgs> = {}>(args?: Subset<T, Team$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends Team$projectsArgs<ExtArgs> = {}>(args?: Subset<T, Team$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    meetings<T extends Team$meetingsArgs<ExtArgs> = {}>(args?: Subset<T, Team$meetingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recordings<T extends Team$recordingsArgs<ExtArgs> = {}>(args?: Subset<T, Team$recordingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingRecordingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'String'>
    readonly name: FieldRef<"Team", 'String'>
    readonly description: FieldRef<"Team", 'String'>
    readonly inviteCode: FieldRef<"Team", 'String'>
    readonly createdAt: FieldRef<"Team", 'DateTime'>
    readonly updatedAt: FieldRef<"Team", 'DateTime'>
    readonly createdById: FieldRef<"Team", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to delete.
     */
    limit?: number
  }

  /**
   * Team.members
   */
  export type Team$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    cursor?: TeamMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * Team.projects
   */
  export type Team$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Team.meetings
   */
  export type Team$meetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
    where?: TeamMeetingWhereInput
    orderBy?: TeamMeetingOrderByWithRelationInput | TeamMeetingOrderByWithRelationInput[]
    cursor?: TeamMeetingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMeetingScalarFieldEnum | TeamMeetingScalarFieldEnum[]
  }

  /**
   * Team.recordings
   */
  export type Team$recordingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
    where?: MeetingRecordingWhereInput
    orderBy?: MeetingRecordingOrderByWithRelationInput | MeetingRecordingOrderByWithRelationInput[]
    cursor?: MeetingRecordingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingRecordingScalarFieldEnum | MeetingRecordingScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model TeamMember
   */

  export type AggregateTeamMember = {
    _count: TeamMemberCountAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  export type TeamMemberMinAggregateOutputType = {
    id: string | null
    teamId: string | null
    userId: string | null
    role: $Enums.TeamRole | null
    joinedAt: Date | null
  }

  export type TeamMemberMaxAggregateOutputType = {
    id: string | null
    teamId: string | null
    userId: string | null
    role: $Enums.TeamRole | null
    joinedAt: Date | null
  }

  export type TeamMemberCountAggregateOutputType = {
    id: number
    teamId: number
    userId: number
    role: number
    joinedAt: number
    _all: number
  }


  export type TeamMemberMinAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    joinedAt?: true
  }

  export type TeamMemberMaxAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    joinedAt?: true
  }

  export type TeamMemberCountAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    joinedAt?: true
    _all?: true
  }

  export type TeamMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMember to aggregate.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMembers
    **/
    _count?: true | TeamMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMemberMaxAggregateInputType
  }

  export type GetTeamMemberAggregateType<T extends TeamMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMember[P]>
      : GetScalarType<T[P], AggregateTeamMember[P]>
  }




  export type TeamMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithAggregationInput | TeamMemberOrderByWithAggregationInput[]
    by: TeamMemberScalarFieldEnum[] | TeamMemberScalarFieldEnum
    having?: TeamMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMemberCountAggregateInputType | true
    _min?: TeamMemberMinAggregateInputType
    _max?: TeamMemberMaxAggregateInputType
  }

  export type TeamMemberGroupByOutputType = {
    id: string
    teamId: string
    userId: string
    role: $Enums.TeamRole
    joinedAt: Date
    _count: TeamMemberCountAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  type GetTeamMemberGroupByPayload<T extends TeamMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
        }
      >
    >


  export type TeamMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMember"]>



  export type TeamMemberSelectScalar = {
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
  }

  export type TeamMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teamId" | "userId" | "role" | "joinedAt", ExtArgs["result"]["teamMember"]>
  export type TeamMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TeamMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMember"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teamId: string
      userId: string
      role: $Enums.TeamRole
      joinedAt: Date
    }, ExtArgs["result"]["teamMember"]>
    composites: {}
  }

  type TeamMemberGetPayload<S extends boolean | null | undefined | TeamMemberDefaultArgs> = $Result.GetResult<Prisma.$TeamMemberPayload, S>

  type TeamMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamMemberCountAggregateInputType | true
    }

  export interface TeamMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMember'], meta: { name: 'TeamMember' } }
    /**
     * Find zero or one TeamMember that matches the filter.
     * @param {TeamMemberFindUniqueArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMemberFindUniqueArgs>(args: SelectSubset<T, TeamMemberFindUniqueArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TeamMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamMemberFindUniqueOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMemberFindFirstArgs>(args?: SelectSubset<T, TeamMemberFindFirstArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TeamMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMembers
     * const teamMembers = await prisma.teamMember.findMany()
     * 
     * // Get first 10 TeamMembers
     * const teamMembers = await prisma.teamMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamMemberWithIdOnly = await prisma.teamMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamMemberFindManyArgs>(args?: SelectSubset<T, TeamMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TeamMember.
     * @param {TeamMemberCreateArgs} args - Arguments to create a TeamMember.
     * @example
     * // Create one TeamMember
     * const TeamMember = await prisma.teamMember.create({
     *   data: {
     *     // ... data to create a TeamMember
     *   }
     * })
     * 
     */
    create<T extends TeamMemberCreateArgs>(args: SelectSubset<T, TeamMemberCreateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TeamMembers.
     * @param {TeamMemberCreateManyArgs} args - Arguments to create many TeamMembers.
     * @example
     * // Create many TeamMembers
     * const teamMember = await prisma.teamMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMemberCreateManyArgs>(args?: SelectSubset<T, TeamMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TeamMember.
     * @param {TeamMemberDeleteArgs} args - Arguments to delete one TeamMember.
     * @example
     * // Delete one TeamMember
     * const TeamMember = await prisma.teamMember.delete({
     *   where: {
     *     // ... filter to delete one TeamMember
     *   }
     * })
     * 
     */
    delete<T extends TeamMemberDeleteArgs>(args: SelectSubset<T, TeamMemberDeleteArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TeamMember.
     * @param {TeamMemberUpdateArgs} args - Arguments to update one TeamMember.
     * @example
     * // Update one TeamMember
     * const teamMember = await prisma.teamMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMemberUpdateArgs>(args: SelectSubset<T, TeamMemberUpdateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TeamMembers.
     * @param {TeamMemberDeleteManyArgs} args - Arguments to filter TeamMembers to delete.
     * @example
     * // Delete a few TeamMembers
     * const { count } = await prisma.teamMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMemberDeleteManyArgs>(args?: SelectSubset<T, TeamMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMembers
     * const teamMember = await prisma.teamMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMemberUpdateManyArgs>(args: SelectSubset<T, TeamMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TeamMember.
     * @param {TeamMemberUpsertArgs} args - Arguments to update or create a TeamMember.
     * @example
     * // Update or create a TeamMember
     * const teamMember = await prisma.teamMember.upsert({
     *   create: {
     *     // ... data to create a TeamMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMember we want to update
     *   }
     * })
     */
    upsert<T extends TeamMemberUpsertArgs>(args: SelectSubset<T, TeamMemberUpsertArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberCountArgs} args - Arguments to filter TeamMembers to count.
     * @example
     * // Count the number of TeamMembers
     * const count = await prisma.teamMember.count({
     *   where: {
     *     // ... the filter for the TeamMembers we want to count
     *   }
     * })
    **/
    count<T extends TeamMemberCountArgs>(
      args?: Subset<T, TeamMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamMemberAggregateArgs>(args: Subset<T, TeamMemberAggregateArgs>): Prisma.PrismaPromise<GetTeamMemberAggregateType<T>>

    /**
     * Group by TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMemberGroupByArgs['orderBy'] }
        : { orderBy?: TeamMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMember model
   */
  readonly fields: TeamMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamMember model
   */
  interface TeamMemberFieldRefs {
    readonly id: FieldRef<"TeamMember", 'String'>
    readonly teamId: FieldRef<"TeamMember", 'String'>
    readonly userId: FieldRef<"TeamMember", 'String'>
    readonly role: FieldRef<"TeamMember", 'TeamRole'>
    readonly joinedAt: FieldRef<"TeamMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TeamMember findUnique
   */
  export type TeamMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findUniqueOrThrow
   */
  export type TeamMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findFirst
   */
  export type TeamMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findFirstOrThrow
   */
  export type TeamMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findMany
   */
  export type TeamMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembers to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember create
   */
  export type TeamMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a TeamMember.
     */
    data: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
  }

  /**
   * TeamMember createMany
   */
  export type TeamMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMembers.
     */
    data: TeamMemberCreateManyInput | TeamMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMember update
   */
  export type TeamMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a TeamMember.
     */
    data: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
    /**
     * Choose, which TeamMember to update.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember updateMany
   */
  export type TeamMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMembers.
     */
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyInput>
    /**
     * Filter which TeamMembers to update
     */
    where?: TeamMemberWhereInput
    /**
     * Limit how many TeamMembers to update.
     */
    limit?: number
  }

  /**
   * TeamMember upsert
   */
  export type TeamMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the TeamMember to update in case it exists.
     */
    where: TeamMemberWhereUniqueInput
    /**
     * In case the TeamMember found by the `where` argument doesn't exist, create a new TeamMember with this data.
     */
    create: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
    /**
     * In case the TeamMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
  }

  /**
   * TeamMember delete
   */
  export type TeamMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter which TeamMember to delete.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember deleteMany
   */
  export type TeamMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMembers to delete
     */
    where?: TeamMemberWhereInput
    /**
     * Limit how many TeamMembers to delete.
     */
    limit?: number
  }

  /**
   * TeamMember without action
   */
  export type TeamMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    inviteCode: string | null
    createdById: string | null
    teamId: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    inviteCode: string | null
    createdById: string | null
    teamId: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    inviteCode: number
    createdById: number
    teamId: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    inviteCode?: true
    createdById?: true
    teamId?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    inviteCode?: true
    createdById?: true
    teamId?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    inviteCode?: true
    createdById?: true
    teamId?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    inviteCode: string
    createdById: string
    teamId: string | null
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inviteCode?: boolean
    createdById?: boolean
    teamId?: boolean
    tasks?: boolean | Project$tasksArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    team?: boolean | Project$teamArgs<ExtArgs>
    meetings?: boolean | Project$meetingsArgs<ExtArgs>
    users?: boolean | Project$usersArgs<ExtArgs>
    activityLogs?: boolean | Project$activityLogsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>



  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inviteCode?: boolean
    createdById?: boolean
    teamId?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt" | "inviteCode" | "createdById" | "teamId", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | Project$tasksArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    team?: boolean | Project$teamArgs<ExtArgs>
    meetings?: boolean | Project$meetingsArgs<ExtArgs>
    users?: boolean | Project$usersArgs<ExtArgs>
    activityLogs?: boolean | Project$activityLogsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      createdBy: Prisma.$UserPayload<ExtArgs>
      team: Prisma.$TeamPayload<ExtArgs> | null
      meetings: Prisma.$TeamMeetingPayload<ExtArgs>[]
      users: Prisma.$ProjectUserPayload<ExtArgs>[]
      activityLogs: Prisma.$ActivityLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
      inviteCode: string
      createdById: string
      teamId: string | null
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends Project$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Project$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    team<T extends Project$teamArgs<ExtArgs> = {}>(args?: Subset<T, Project$teamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    meetings<T extends Project$meetingsArgs<ExtArgs> = {}>(args?: Subset<T, Project$meetingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Project$usersArgs<ExtArgs> = {}>(args?: Subset<T, Project$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activityLogs<T extends Project$activityLogsArgs<ExtArgs> = {}>(args?: Subset<T, Project$activityLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
    readonly inviteCode: FieldRef<"Project", 'String'>
    readonly createdById: FieldRef<"Project", 'String'>
    readonly teamId: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.tasks
   */
  export type Project$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Project.team
   */
  export type Project$teamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * Project.meetings
   */
  export type Project$meetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
    where?: TeamMeetingWhereInput
    orderBy?: TeamMeetingOrderByWithRelationInput | TeamMeetingOrderByWithRelationInput[]
    cursor?: TeamMeetingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMeetingScalarFieldEnum | TeamMeetingScalarFieldEnum[]
  }

  /**
   * Project.users
   */
  export type Project$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectUser
     */
    select?: ProjectUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectUser
     */
    omit?: ProjectUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectUserInclude<ExtArgs> | null
    where?: ProjectUserWhereInput
    orderBy?: ProjectUserOrderByWithRelationInput | ProjectUserOrderByWithRelationInput[]
    cursor?: ProjectUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectUserScalarFieldEnum | ProjectUserScalarFieldEnum[]
  }

  /**
   * Project.activityLogs
   */
  export type Project$activityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    cursor?: ActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: string | null
    dueDate: Date | null
    projectId: string | null
    userId: string | null
    createdById: string | null
    solutionDescription: string | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: string | null
    dueDate: Date | null
    projectId: string | null
    userId: string | null
    createdById: string | null
    solutionDescription: string | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    name: number
    description: number
    status: number
    dueDate: number
    projectId: number
    userId: number
    createdById: number
    solutionDescription: number
    _all: number
  }


  export type TaskMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    dueDate?: true
    projectId?: true
    userId?: true
    createdById?: true
    solutionDescription?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    dueDate?: true
    projectId?: true
    userId?: true
    createdById?: true
    solutionDescription?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    dueDate?: true
    projectId?: true
    userId?: true
    createdById?: true
    solutionDescription?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    name: string
    description: string
    status: string
    dueDate: Date | null
    projectId: string
    userId: string | null
    createdById: string
    solutionDescription: string | null
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    dueDate?: boolean
    projectId?: boolean
    userId?: boolean
    createdById?: boolean
    solutionDescription?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | Task$userArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>



  export type TaskSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    dueDate?: boolean
    projectId?: boolean
    userId?: boolean
    createdById?: boolean
    solutionDescription?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "status" | "dueDate" | "projectId" | "userId" | "createdById" | "solutionDescription", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | Task$userArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      status: string
      dueDate: Date | null
      projectId: string
      userId: string | null
      createdById: string
      solutionDescription: string | null
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends Task$userArgs<ExtArgs> = {}>(args?: Subset<T, Task$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly name: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly status: FieldRef<"Task", 'String'>
    readonly dueDate: FieldRef<"Task", 'DateTime'>
    readonly projectId: FieldRef<"Task", 'String'>
    readonly userId: FieldRef<"Task", 'String'>
    readonly createdById: FieldRef<"Task", 'String'>
    readonly solutionDescription: FieldRef<"Task", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.user
   */
  export type Task$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model ProjectUser
   */

  export type AggregateProjectUser = {
    _count: ProjectUserCountAggregateOutputType | null
    _min: ProjectUserMinAggregateOutputType | null
    _max: ProjectUserMaxAggregateOutputType | null
  }

  export type ProjectUserMinAggregateOutputType = {
    id: string | null
    userId: string | null
    projectId: string | null
    role: $Enums.ProjectRole | null
    scope: $Enums.ProjectCollaboratorScope | null
  }

  export type ProjectUserMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    projectId: string | null
    role: $Enums.ProjectRole | null
    scope: $Enums.ProjectCollaboratorScope | null
  }

  export type ProjectUserCountAggregateOutputType = {
    id: number
    userId: number
    projectId: number
    role: number
    scope: number
    _all: number
  }


  export type ProjectUserMinAggregateInputType = {
    id?: true
    userId?: true
    projectId?: true
    role?: true
    scope?: true
  }

  export type ProjectUserMaxAggregateInputType = {
    id?: true
    userId?: true
    projectId?: true
    role?: true
    scope?: true
  }

  export type ProjectUserCountAggregateInputType = {
    id?: true
    userId?: true
    projectId?: true
    role?: true
    scope?: true
    _all?: true
  }

  export type ProjectUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectUser to aggregate.
     */
    where?: ProjectUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectUsers to fetch.
     */
    orderBy?: ProjectUserOrderByWithRelationInput | ProjectUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectUsers
    **/
    _count?: true | ProjectUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectUserMaxAggregateInputType
  }

  export type GetProjectUserAggregateType<T extends ProjectUserAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectUser[P]>
      : GetScalarType<T[P], AggregateProjectUser[P]>
  }




  export type ProjectUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectUserWhereInput
    orderBy?: ProjectUserOrderByWithAggregationInput | ProjectUserOrderByWithAggregationInput[]
    by: ProjectUserScalarFieldEnum[] | ProjectUserScalarFieldEnum
    having?: ProjectUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectUserCountAggregateInputType | true
    _min?: ProjectUserMinAggregateInputType
    _max?: ProjectUserMaxAggregateInputType
  }

  export type ProjectUserGroupByOutputType = {
    id: string
    userId: string
    projectId: string
    role: $Enums.ProjectRole
    scope: $Enums.ProjectCollaboratorScope
    _count: ProjectUserCountAggregateOutputType | null
    _min: ProjectUserMinAggregateOutputType | null
    _max: ProjectUserMaxAggregateOutputType | null
  }

  type GetProjectUserGroupByPayload<T extends ProjectUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectUserGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectUserGroupByOutputType[P]>
        }
      >
    >


  export type ProjectUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    projectId?: boolean
    role?: boolean
    scope?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectUser"]>



  export type ProjectUserSelectScalar = {
    id?: boolean
    userId?: boolean
    projectId?: boolean
    role?: boolean
    scope?: boolean
  }

  export type ProjectUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "projectId" | "role" | "scope", ExtArgs["result"]["projectUser"]>
  export type ProjectUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectUser"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      projectId: string
      role: $Enums.ProjectRole
      scope: $Enums.ProjectCollaboratorScope
    }, ExtArgs["result"]["projectUser"]>
    composites: {}
  }

  type ProjectUserGetPayload<S extends boolean | null | undefined | ProjectUserDefaultArgs> = $Result.GetResult<Prisma.$ProjectUserPayload, S>

  type ProjectUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectUserCountAggregateInputType | true
    }

  export interface ProjectUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectUser'], meta: { name: 'ProjectUser' } }
    /**
     * Find zero or one ProjectUser that matches the filter.
     * @param {ProjectUserFindUniqueArgs} args - Arguments to find a ProjectUser
     * @example
     * // Get one ProjectUser
     * const projectUser = await prisma.projectUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectUserFindUniqueArgs>(args: SelectSubset<T, ProjectUserFindUniqueArgs<ExtArgs>>): Prisma__ProjectUserClient<$Result.GetResult<Prisma.$ProjectUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectUserFindUniqueOrThrowArgs} args - Arguments to find a ProjectUser
     * @example
     * // Get one ProjectUser
     * const projectUser = await prisma.projectUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectUserFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectUserClient<$Result.GetResult<Prisma.$ProjectUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUserFindFirstArgs} args - Arguments to find a ProjectUser
     * @example
     * // Get one ProjectUser
     * const projectUser = await prisma.projectUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectUserFindFirstArgs>(args?: SelectSubset<T, ProjectUserFindFirstArgs<ExtArgs>>): Prisma__ProjectUserClient<$Result.GetResult<Prisma.$ProjectUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUserFindFirstOrThrowArgs} args - Arguments to find a ProjectUser
     * @example
     * // Get one ProjectUser
     * const projectUser = await prisma.projectUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectUserFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectUserClient<$Result.GetResult<Prisma.$ProjectUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectUsers
     * const projectUsers = await prisma.projectUser.findMany()
     * 
     * // Get first 10 ProjectUsers
     * const projectUsers = await prisma.projectUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectUserWithIdOnly = await prisma.projectUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectUserFindManyArgs>(args?: SelectSubset<T, ProjectUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectUser.
     * @param {ProjectUserCreateArgs} args - Arguments to create a ProjectUser.
     * @example
     * // Create one ProjectUser
     * const ProjectUser = await prisma.projectUser.create({
     *   data: {
     *     // ... data to create a ProjectUser
     *   }
     * })
     * 
     */
    create<T extends ProjectUserCreateArgs>(args: SelectSubset<T, ProjectUserCreateArgs<ExtArgs>>): Prisma__ProjectUserClient<$Result.GetResult<Prisma.$ProjectUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectUsers.
     * @param {ProjectUserCreateManyArgs} args - Arguments to create many ProjectUsers.
     * @example
     * // Create many ProjectUsers
     * const projectUser = await prisma.projectUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectUserCreateManyArgs>(args?: SelectSubset<T, ProjectUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProjectUser.
     * @param {ProjectUserDeleteArgs} args - Arguments to delete one ProjectUser.
     * @example
     * // Delete one ProjectUser
     * const ProjectUser = await prisma.projectUser.delete({
     *   where: {
     *     // ... filter to delete one ProjectUser
     *   }
     * })
     * 
     */
    delete<T extends ProjectUserDeleteArgs>(args: SelectSubset<T, ProjectUserDeleteArgs<ExtArgs>>): Prisma__ProjectUserClient<$Result.GetResult<Prisma.$ProjectUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectUser.
     * @param {ProjectUserUpdateArgs} args - Arguments to update one ProjectUser.
     * @example
     * // Update one ProjectUser
     * const projectUser = await prisma.projectUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUserUpdateArgs>(args: SelectSubset<T, ProjectUserUpdateArgs<ExtArgs>>): Prisma__ProjectUserClient<$Result.GetResult<Prisma.$ProjectUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectUsers.
     * @param {ProjectUserDeleteManyArgs} args - Arguments to filter ProjectUsers to delete.
     * @example
     * // Delete a few ProjectUsers
     * const { count } = await prisma.projectUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectUserDeleteManyArgs>(args?: SelectSubset<T, ProjectUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectUsers
     * const projectUser = await prisma.projectUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUserUpdateManyArgs>(args: SelectSubset<T, ProjectUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProjectUser.
     * @param {ProjectUserUpsertArgs} args - Arguments to update or create a ProjectUser.
     * @example
     * // Update or create a ProjectUser
     * const projectUser = await prisma.projectUser.upsert({
     *   create: {
     *     // ... data to create a ProjectUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectUser we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUserUpsertArgs>(args: SelectSubset<T, ProjectUserUpsertArgs<ExtArgs>>): Prisma__ProjectUserClient<$Result.GetResult<Prisma.$ProjectUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUserCountArgs} args - Arguments to filter ProjectUsers to count.
     * @example
     * // Count the number of ProjectUsers
     * const count = await prisma.projectUser.count({
     *   where: {
     *     // ... the filter for the ProjectUsers we want to count
     *   }
     * })
    **/
    count<T extends ProjectUserCountArgs>(
      args?: Subset<T, ProjectUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectUserAggregateArgs>(args: Subset<T, ProjectUserAggregateArgs>): Prisma.PrismaPromise<GetProjectUserAggregateType<T>>

    /**
     * Group by ProjectUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectUserGroupByArgs['orderBy'] }
        : { orderBy?: ProjectUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectUser model
   */
  readonly fields: ProjectUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectUser model
   */
  interface ProjectUserFieldRefs {
    readonly id: FieldRef<"ProjectUser", 'String'>
    readonly userId: FieldRef<"ProjectUser", 'String'>
    readonly projectId: FieldRef<"ProjectUser", 'String'>
    readonly role: FieldRef<"ProjectUser", 'ProjectRole'>
    readonly scope: FieldRef<"ProjectUser", 'ProjectCollaboratorScope'>
  }
    

  // Custom InputTypes
  /**
   * ProjectUser findUnique
   */
  export type ProjectUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectUser
     */
    select?: ProjectUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectUser
     */
    omit?: ProjectUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectUserInclude<ExtArgs> | null
    /**
     * Filter, which ProjectUser to fetch.
     */
    where: ProjectUserWhereUniqueInput
  }

  /**
   * ProjectUser findUniqueOrThrow
   */
  export type ProjectUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectUser
     */
    select?: ProjectUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectUser
     */
    omit?: ProjectUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectUserInclude<ExtArgs> | null
    /**
     * Filter, which ProjectUser to fetch.
     */
    where: ProjectUserWhereUniqueInput
  }

  /**
   * ProjectUser findFirst
   */
  export type ProjectUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectUser
     */
    select?: ProjectUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectUser
     */
    omit?: ProjectUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectUserInclude<ExtArgs> | null
    /**
     * Filter, which ProjectUser to fetch.
     */
    where?: ProjectUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectUsers to fetch.
     */
    orderBy?: ProjectUserOrderByWithRelationInput | ProjectUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectUsers.
     */
    cursor?: ProjectUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectUsers.
     */
    distinct?: ProjectUserScalarFieldEnum | ProjectUserScalarFieldEnum[]
  }

  /**
   * ProjectUser findFirstOrThrow
   */
  export type ProjectUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectUser
     */
    select?: ProjectUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectUser
     */
    omit?: ProjectUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectUserInclude<ExtArgs> | null
    /**
     * Filter, which ProjectUser to fetch.
     */
    where?: ProjectUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectUsers to fetch.
     */
    orderBy?: ProjectUserOrderByWithRelationInput | ProjectUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectUsers.
     */
    cursor?: ProjectUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectUsers.
     */
    distinct?: ProjectUserScalarFieldEnum | ProjectUserScalarFieldEnum[]
  }

  /**
   * ProjectUser findMany
   */
  export type ProjectUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectUser
     */
    select?: ProjectUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectUser
     */
    omit?: ProjectUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectUserInclude<ExtArgs> | null
    /**
     * Filter, which ProjectUsers to fetch.
     */
    where?: ProjectUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectUsers to fetch.
     */
    orderBy?: ProjectUserOrderByWithRelationInput | ProjectUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectUsers.
     */
    cursor?: ProjectUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectUsers.
     */
    skip?: number
    distinct?: ProjectUserScalarFieldEnum | ProjectUserScalarFieldEnum[]
  }

  /**
   * ProjectUser create
   */
  export type ProjectUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectUser
     */
    select?: ProjectUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectUser
     */
    omit?: ProjectUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectUserInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectUser.
     */
    data: XOR<ProjectUserCreateInput, ProjectUserUncheckedCreateInput>
  }

  /**
   * ProjectUser createMany
   */
  export type ProjectUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectUsers.
     */
    data: ProjectUserCreateManyInput | ProjectUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectUser update
   */
  export type ProjectUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectUser
     */
    select?: ProjectUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectUser
     */
    omit?: ProjectUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectUserInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectUser.
     */
    data: XOR<ProjectUserUpdateInput, ProjectUserUncheckedUpdateInput>
    /**
     * Choose, which ProjectUser to update.
     */
    where: ProjectUserWhereUniqueInput
  }

  /**
   * ProjectUser updateMany
   */
  export type ProjectUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectUsers.
     */
    data: XOR<ProjectUserUpdateManyMutationInput, ProjectUserUncheckedUpdateManyInput>
    /**
     * Filter which ProjectUsers to update
     */
    where?: ProjectUserWhereInput
    /**
     * Limit how many ProjectUsers to update.
     */
    limit?: number
  }

  /**
   * ProjectUser upsert
   */
  export type ProjectUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectUser
     */
    select?: ProjectUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectUser
     */
    omit?: ProjectUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectUserInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectUser to update in case it exists.
     */
    where: ProjectUserWhereUniqueInput
    /**
     * In case the ProjectUser found by the `where` argument doesn't exist, create a new ProjectUser with this data.
     */
    create: XOR<ProjectUserCreateInput, ProjectUserUncheckedCreateInput>
    /**
     * In case the ProjectUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUserUpdateInput, ProjectUserUncheckedUpdateInput>
  }

  /**
   * ProjectUser delete
   */
  export type ProjectUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectUser
     */
    select?: ProjectUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectUser
     */
    omit?: ProjectUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectUserInclude<ExtArgs> | null
    /**
     * Filter which ProjectUser to delete.
     */
    where: ProjectUserWhereUniqueInput
  }

  /**
   * ProjectUser deleteMany
   */
  export type ProjectUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectUsers to delete
     */
    where?: ProjectUserWhereInput
    /**
     * Limit how many ProjectUsers to delete.
     */
    limit?: number
  }

  /**
   * ProjectUser without action
   */
  export type ProjectUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectUser
     */
    select?: ProjectUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectUser
     */
    omit?: ProjectUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectUserInclude<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    actorUserId: string | null
    type: $Enums.ActivityType | null
    message: string | null
    createdAt: Date | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    actorUserId: string | null
    type: $Enums.ActivityType | null
    message: string | null
    createdAt: Date | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    projectId: number
    actorUserId: number
    type: number
    message: number
    createdAt: number
    _all: number
  }


  export type ActivityLogMinAggregateInputType = {
    id?: true
    projectId?: true
    actorUserId?: true
    type?: true
    message?: true
    createdAt?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    projectId?: true
    actorUserId?: true
    type?: true
    message?: true
    createdAt?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    projectId?: true
    actorUserId?: true
    type?: true
    message?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: string
    projectId: string
    actorUserId: string
    type: $Enums.ActivityType
    message: string
    createdAt: Date
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    actorUserId?: boolean
    type?: boolean
    message?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>



  export type ActivityLogSelectScalar = {
    id?: boolean
    projectId?: boolean
    actorUserId?: boolean
    type?: boolean
    message?: boolean
    createdAt?: boolean
  }

  export type ActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "actorUserId" | "type" | "message" | "createdAt", ExtArgs["result"]["activityLog"]>
  export type ActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      actor: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      actorUserId: string
      type: $Enums.ActivityType
      message: string
      createdAt: Date
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    actor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityLog model
   */
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'String'>
    readonly projectId: FieldRef<"ActivityLog", 'String'>
    readonly actorUserId: FieldRef<"ActivityLog", 'String'>
    readonly type: FieldRef<"ActivityLog", 'ActivityType'>
    readonly message: FieldRef<"ActivityLog", 'String'>
    readonly createdAt: FieldRef<"ActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
  }


  /**
   * Model TeamMeeting
   */

  export type AggregateTeamMeeting = {
    _count: TeamMeetingCountAggregateOutputType | null
    _avg: TeamMeetingAvgAggregateOutputType | null
    _sum: TeamMeetingSumAggregateOutputType | null
    _min: TeamMeetingMinAggregateOutputType | null
    _max: TeamMeetingMaxAggregateOutputType | null
  }

  export type TeamMeetingAvgAggregateOutputType = {
    durationMinutes: number | null
  }

  export type TeamMeetingSumAggregateOutputType = {
    durationMinutes: number | null
  }

  export type TeamMeetingMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    notes: string | null
    scheduledAt: Date | null
    durationMinutes: number | null
    status: $Enums.MeetingStatus | null
    provider: $Enums.MeetingProvider | null
    externalUrl: string | null
    teamId: string | null
    projectId: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamMeetingMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    notes: string | null
    scheduledAt: Date | null
    durationMinutes: number | null
    status: $Enums.MeetingStatus | null
    provider: $Enums.MeetingProvider | null
    externalUrl: string | null
    teamId: string | null
    projectId: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamMeetingCountAggregateOutputType = {
    id: number
    title: number
    description: number
    notes: number
    scheduledAt: number
    durationMinutes: number
    status: number
    provider: number
    externalUrl: number
    teamId: number
    projectId: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamMeetingAvgAggregateInputType = {
    durationMinutes?: true
  }

  export type TeamMeetingSumAggregateInputType = {
    durationMinutes?: true
  }

  export type TeamMeetingMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    notes?: true
    scheduledAt?: true
    durationMinutes?: true
    status?: true
    provider?: true
    externalUrl?: true
    teamId?: true
    projectId?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamMeetingMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    notes?: true
    scheduledAt?: true
    durationMinutes?: true
    status?: true
    provider?: true
    externalUrl?: true
    teamId?: true
    projectId?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamMeetingCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    notes?: true
    scheduledAt?: true
    durationMinutes?: true
    status?: true
    provider?: true
    externalUrl?: true
    teamId?: true
    projectId?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamMeetingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMeeting to aggregate.
     */
    where?: TeamMeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMeetings to fetch.
     */
    orderBy?: TeamMeetingOrderByWithRelationInput | TeamMeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMeetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMeetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMeetings
    **/
    _count?: true | TeamMeetingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeamMeetingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeamMeetingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMeetingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMeetingMaxAggregateInputType
  }

  export type GetTeamMeetingAggregateType<T extends TeamMeetingAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMeeting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMeeting[P]>
      : GetScalarType<T[P], AggregateTeamMeeting[P]>
  }




  export type TeamMeetingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMeetingWhereInput
    orderBy?: TeamMeetingOrderByWithAggregationInput | TeamMeetingOrderByWithAggregationInput[]
    by: TeamMeetingScalarFieldEnum[] | TeamMeetingScalarFieldEnum
    having?: TeamMeetingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMeetingCountAggregateInputType | true
    _avg?: TeamMeetingAvgAggregateInputType
    _sum?: TeamMeetingSumAggregateInputType
    _min?: TeamMeetingMinAggregateInputType
    _max?: TeamMeetingMaxAggregateInputType
  }

  export type TeamMeetingGroupByOutputType = {
    id: string
    title: string
    description: string | null
    notes: string | null
    scheduledAt: Date
    durationMinutes: number | null
    status: $Enums.MeetingStatus
    provider: $Enums.MeetingProvider
    externalUrl: string | null
    teamId: string
    projectId: string | null
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: TeamMeetingCountAggregateOutputType | null
    _avg: TeamMeetingAvgAggregateOutputType | null
    _sum: TeamMeetingSumAggregateOutputType | null
    _min: TeamMeetingMinAggregateOutputType | null
    _max: TeamMeetingMaxAggregateOutputType | null
  }

  type GetTeamMeetingGroupByPayload<T extends TeamMeetingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMeetingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMeetingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMeetingGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMeetingGroupByOutputType[P]>
        }
      >
    >


  export type TeamMeetingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    notes?: boolean
    scheduledAt?: boolean
    durationMinutes?: boolean
    status?: boolean
    provider?: boolean
    externalUrl?: boolean
    teamId?: boolean
    projectId?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | TeamMeeting$projectArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    meetingRecordings?: boolean | TeamMeeting$meetingRecordingsArgs<ExtArgs>
    _count?: boolean | TeamMeetingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMeeting"]>



  export type TeamMeetingSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    notes?: boolean
    scheduledAt?: boolean
    durationMinutes?: boolean
    status?: boolean
    provider?: boolean
    externalUrl?: boolean
    teamId?: boolean
    projectId?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeamMeetingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "notes" | "scheduledAt" | "durationMinutes" | "status" | "provider" | "externalUrl" | "teamId" | "projectId" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["teamMeeting"]>
  export type TeamMeetingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | TeamMeeting$projectArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    meetingRecordings?: boolean | TeamMeeting$meetingRecordingsArgs<ExtArgs>
    _count?: boolean | TeamMeetingCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TeamMeetingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMeeting"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs> | null
      createdBy: Prisma.$UserPayload<ExtArgs>
      meetingRecordings: Prisma.$MeetingRecordingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      notes: string | null
      scheduledAt: Date
      durationMinutes: number | null
      status: $Enums.MeetingStatus
      provider: $Enums.MeetingProvider
      externalUrl: string | null
      teamId: string
      projectId: string | null
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["teamMeeting"]>
    composites: {}
  }

  type TeamMeetingGetPayload<S extends boolean | null | undefined | TeamMeetingDefaultArgs> = $Result.GetResult<Prisma.$TeamMeetingPayload, S>

  type TeamMeetingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamMeetingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamMeetingCountAggregateInputType | true
    }

  export interface TeamMeetingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMeeting'], meta: { name: 'TeamMeeting' } }
    /**
     * Find zero or one TeamMeeting that matches the filter.
     * @param {TeamMeetingFindUniqueArgs} args - Arguments to find a TeamMeeting
     * @example
     * // Get one TeamMeeting
     * const teamMeeting = await prisma.teamMeeting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMeetingFindUniqueArgs>(args: SelectSubset<T, TeamMeetingFindUniqueArgs<ExtArgs>>): Prisma__TeamMeetingClient<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TeamMeeting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamMeetingFindUniqueOrThrowArgs} args - Arguments to find a TeamMeeting
     * @example
     * // Get one TeamMeeting
     * const teamMeeting = await prisma.teamMeeting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMeetingFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMeetingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMeetingClient<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMeeting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingFindFirstArgs} args - Arguments to find a TeamMeeting
     * @example
     * // Get one TeamMeeting
     * const teamMeeting = await prisma.teamMeeting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMeetingFindFirstArgs>(args?: SelectSubset<T, TeamMeetingFindFirstArgs<ExtArgs>>): Prisma__TeamMeetingClient<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMeeting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingFindFirstOrThrowArgs} args - Arguments to find a TeamMeeting
     * @example
     * // Get one TeamMeeting
     * const teamMeeting = await prisma.teamMeeting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMeetingFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMeetingFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMeetingClient<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TeamMeetings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMeetings
     * const teamMeetings = await prisma.teamMeeting.findMany()
     * 
     * // Get first 10 TeamMeetings
     * const teamMeetings = await prisma.teamMeeting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamMeetingWithIdOnly = await prisma.teamMeeting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamMeetingFindManyArgs>(args?: SelectSubset<T, TeamMeetingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TeamMeeting.
     * @param {TeamMeetingCreateArgs} args - Arguments to create a TeamMeeting.
     * @example
     * // Create one TeamMeeting
     * const TeamMeeting = await prisma.teamMeeting.create({
     *   data: {
     *     // ... data to create a TeamMeeting
     *   }
     * })
     * 
     */
    create<T extends TeamMeetingCreateArgs>(args: SelectSubset<T, TeamMeetingCreateArgs<ExtArgs>>): Prisma__TeamMeetingClient<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TeamMeetings.
     * @param {TeamMeetingCreateManyArgs} args - Arguments to create many TeamMeetings.
     * @example
     * // Create many TeamMeetings
     * const teamMeeting = await prisma.teamMeeting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMeetingCreateManyArgs>(args?: SelectSubset<T, TeamMeetingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TeamMeeting.
     * @param {TeamMeetingDeleteArgs} args - Arguments to delete one TeamMeeting.
     * @example
     * // Delete one TeamMeeting
     * const TeamMeeting = await prisma.teamMeeting.delete({
     *   where: {
     *     // ... filter to delete one TeamMeeting
     *   }
     * })
     * 
     */
    delete<T extends TeamMeetingDeleteArgs>(args: SelectSubset<T, TeamMeetingDeleteArgs<ExtArgs>>): Prisma__TeamMeetingClient<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TeamMeeting.
     * @param {TeamMeetingUpdateArgs} args - Arguments to update one TeamMeeting.
     * @example
     * // Update one TeamMeeting
     * const teamMeeting = await prisma.teamMeeting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMeetingUpdateArgs>(args: SelectSubset<T, TeamMeetingUpdateArgs<ExtArgs>>): Prisma__TeamMeetingClient<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TeamMeetings.
     * @param {TeamMeetingDeleteManyArgs} args - Arguments to filter TeamMeetings to delete.
     * @example
     * // Delete a few TeamMeetings
     * const { count } = await prisma.teamMeeting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMeetingDeleteManyArgs>(args?: SelectSubset<T, TeamMeetingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMeetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMeetings
     * const teamMeeting = await prisma.teamMeeting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMeetingUpdateManyArgs>(args: SelectSubset<T, TeamMeetingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TeamMeeting.
     * @param {TeamMeetingUpsertArgs} args - Arguments to update or create a TeamMeeting.
     * @example
     * // Update or create a TeamMeeting
     * const teamMeeting = await prisma.teamMeeting.upsert({
     *   create: {
     *     // ... data to create a TeamMeeting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMeeting we want to update
     *   }
     * })
     */
    upsert<T extends TeamMeetingUpsertArgs>(args: SelectSubset<T, TeamMeetingUpsertArgs<ExtArgs>>): Prisma__TeamMeetingClient<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TeamMeetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingCountArgs} args - Arguments to filter TeamMeetings to count.
     * @example
     * // Count the number of TeamMeetings
     * const count = await prisma.teamMeeting.count({
     *   where: {
     *     // ... the filter for the TeamMeetings we want to count
     *   }
     * })
    **/
    count<T extends TeamMeetingCountArgs>(
      args?: Subset<T, TeamMeetingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMeetingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMeeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamMeetingAggregateArgs>(args: Subset<T, TeamMeetingAggregateArgs>): Prisma.PrismaPromise<GetTeamMeetingAggregateType<T>>

    /**
     * Group by TeamMeeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamMeetingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMeetingGroupByArgs['orderBy'] }
        : { orderBy?: TeamMeetingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamMeetingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMeetingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMeeting model
   */
  readonly fields: TeamMeetingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMeeting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMeetingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends TeamMeeting$projectArgs<ExtArgs> = {}>(args?: Subset<T, TeamMeeting$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    meetingRecordings<T extends TeamMeeting$meetingRecordingsArgs<ExtArgs> = {}>(args?: Subset<T, TeamMeeting$meetingRecordingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingRecordingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamMeeting model
   */
  interface TeamMeetingFieldRefs {
    readonly id: FieldRef<"TeamMeeting", 'String'>
    readonly title: FieldRef<"TeamMeeting", 'String'>
    readonly description: FieldRef<"TeamMeeting", 'String'>
    readonly notes: FieldRef<"TeamMeeting", 'String'>
    readonly scheduledAt: FieldRef<"TeamMeeting", 'DateTime'>
    readonly durationMinutes: FieldRef<"TeamMeeting", 'Int'>
    readonly status: FieldRef<"TeamMeeting", 'MeetingStatus'>
    readonly provider: FieldRef<"TeamMeeting", 'MeetingProvider'>
    readonly externalUrl: FieldRef<"TeamMeeting", 'String'>
    readonly teamId: FieldRef<"TeamMeeting", 'String'>
    readonly projectId: FieldRef<"TeamMeeting", 'String'>
    readonly createdById: FieldRef<"TeamMeeting", 'String'>
    readonly createdAt: FieldRef<"TeamMeeting", 'DateTime'>
    readonly updatedAt: FieldRef<"TeamMeeting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TeamMeeting findUnique
   */
  export type TeamMeetingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
    /**
     * Filter, which TeamMeeting to fetch.
     */
    where: TeamMeetingWhereUniqueInput
  }

  /**
   * TeamMeeting findUniqueOrThrow
   */
  export type TeamMeetingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
    /**
     * Filter, which TeamMeeting to fetch.
     */
    where: TeamMeetingWhereUniqueInput
  }

  /**
   * TeamMeeting findFirst
   */
  export type TeamMeetingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
    /**
     * Filter, which TeamMeeting to fetch.
     */
    where?: TeamMeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMeetings to fetch.
     */
    orderBy?: TeamMeetingOrderByWithRelationInput | TeamMeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMeetings.
     */
    cursor?: TeamMeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMeetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMeetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMeetings.
     */
    distinct?: TeamMeetingScalarFieldEnum | TeamMeetingScalarFieldEnum[]
  }

  /**
   * TeamMeeting findFirstOrThrow
   */
  export type TeamMeetingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
    /**
     * Filter, which TeamMeeting to fetch.
     */
    where?: TeamMeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMeetings to fetch.
     */
    orderBy?: TeamMeetingOrderByWithRelationInput | TeamMeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMeetings.
     */
    cursor?: TeamMeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMeetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMeetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMeetings.
     */
    distinct?: TeamMeetingScalarFieldEnum | TeamMeetingScalarFieldEnum[]
  }

  /**
   * TeamMeeting findMany
   */
  export type TeamMeetingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
    /**
     * Filter, which TeamMeetings to fetch.
     */
    where?: TeamMeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMeetings to fetch.
     */
    orderBy?: TeamMeetingOrderByWithRelationInput | TeamMeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMeetings.
     */
    cursor?: TeamMeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMeetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMeetings.
     */
    skip?: number
    distinct?: TeamMeetingScalarFieldEnum | TeamMeetingScalarFieldEnum[]
  }

  /**
   * TeamMeeting create
   */
  export type TeamMeetingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
    /**
     * The data needed to create a TeamMeeting.
     */
    data: XOR<TeamMeetingCreateInput, TeamMeetingUncheckedCreateInput>
  }

  /**
   * TeamMeeting createMany
   */
  export type TeamMeetingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMeetings.
     */
    data: TeamMeetingCreateManyInput | TeamMeetingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMeeting update
   */
  export type TeamMeetingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
    /**
     * The data needed to update a TeamMeeting.
     */
    data: XOR<TeamMeetingUpdateInput, TeamMeetingUncheckedUpdateInput>
    /**
     * Choose, which TeamMeeting to update.
     */
    where: TeamMeetingWhereUniqueInput
  }

  /**
   * TeamMeeting updateMany
   */
  export type TeamMeetingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMeetings.
     */
    data: XOR<TeamMeetingUpdateManyMutationInput, TeamMeetingUncheckedUpdateManyInput>
    /**
     * Filter which TeamMeetings to update
     */
    where?: TeamMeetingWhereInput
    /**
     * Limit how many TeamMeetings to update.
     */
    limit?: number
  }

  /**
   * TeamMeeting upsert
   */
  export type TeamMeetingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
    /**
     * The filter to search for the TeamMeeting to update in case it exists.
     */
    where: TeamMeetingWhereUniqueInput
    /**
     * In case the TeamMeeting found by the `where` argument doesn't exist, create a new TeamMeeting with this data.
     */
    create: XOR<TeamMeetingCreateInput, TeamMeetingUncheckedCreateInput>
    /**
     * In case the TeamMeeting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMeetingUpdateInput, TeamMeetingUncheckedUpdateInput>
  }

  /**
   * TeamMeeting delete
   */
  export type TeamMeetingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
    /**
     * Filter which TeamMeeting to delete.
     */
    where: TeamMeetingWhereUniqueInput
  }

  /**
   * TeamMeeting deleteMany
   */
  export type TeamMeetingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMeetings to delete
     */
    where?: TeamMeetingWhereInput
    /**
     * Limit how many TeamMeetings to delete.
     */
    limit?: number
  }

  /**
   * TeamMeeting.project
   */
  export type TeamMeeting$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * TeamMeeting.meetingRecordings
   */
  export type TeamMeeting$meetingRecordingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
    where?: MeetingRecordingWhereInput
    orderBy?: MeetingRecordingOrderByWithRelationInput | MeetingRecordingOrderByWithRelationInput[]
    cursor?: MeetingRecordingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingRecordingScalarFieldEnum | MeetingRecordingScalarFieldEnum[]
  }

  /**
   * TeamMeeting without action
   */
  export type TeamMeetingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeeting
     */
    select?: TeamMeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMeeting
     */
    omit?: TeamMeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMeetingInclude<ExtArgs> | null
  }


  /**
   * Model MeetingRecording
   */

  export type AggregateMeetingRecording = {
    _count: MeetingRecordingCountAggregateOutputType | null
    _min: MeetingRecordingMinAggregateOutputType | null
    _max: MeetingRecordingMaxAggregateOutputType | null
  }

  export type MeetingRecordingMinAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    description: string | null
    createdAt: Date | null
    meetingId: string | null
    addedById: string | null
    teamId: string | null
  }

  export type MeetingRecordingMaxAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    description: string | null
    createdAt: Date | null
    meetingId: string | null
    addedById: string | null
    teamId: string | null
  }

  export type MeetingRecordingCountAggregateOutputType = {
    id: number
    title: number
    url: number
    description: number
    createdAt: number
    meetingId: number
    addedById: number
    teamId: number
    _all: number
  }


  export type MeetingRecordingMinAggregateInputType = {
    id?: true
    title?: true
    url?: true
    description?: true
    createdAt?: true
    meetingId?: true
    addedById?: true
    teamId?: true
  }

  export type MeetingRecordingMaxAggregateInputType = {
    id?: true
    title?: true
    url?: true
    description?: true
    createdAt?: true
    meetingId?: true
    addedById?: true
    teamId?: true
  }

  export type MeetingRecordingCountAggregateInputType = {
    id?: true
    title?: true
    url?: true
    description?: true
    createdAt?: true
    meetingId?: true
    addedById?: true
    teamId?: true
    _all?: true
  }

  export type MeetingRecordingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MeetingRecording to aggregate.
     */
    where?: MeetingRecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingRecordings to fetch.
     */
    orderBy?: MeetingRecordingOrderByWithRelationInput | MeetingRecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeetingRecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingRecordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingRecordings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MeetingRecordings
    **/
    _count?: true | MeetingRecordingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeetingRecordingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeetingRecordingMaxAggregateInputType
  }

  export type GetMeetingRecordingAggregateType<T extends MeetingRecordingAggregateArgs> = {
        [P in keyof T & keyof AggregateMeetingRecording]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeetingRecording[P]>
      : GetScalarType<T[P], AggregateMeetingRecording[P]>
  }




  export type MeetingRecordingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingRecordingWhereInput
    orderBy?: MeetingRecordingOrderByWithAggregationInput | MeetingRecordingOrderByWithAggregationInput[]
    by: MeetingRecordingScalarFieldEnum[] | MeetingRecordingScalarFieldEnum
    having?: MeetingRecordingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeetingRecordingCountAggregateInputType | true
    _min?: MeetingRecordingMinAggregateInputType
    _max?: MeetingRecordingMaxAggregateInputType
  }

  export type MeetingRecordingGroupByOutputType = {
    id: string
    title: string
    url: string
    description: string | null
    createdAt: Date
    meetingId: string
    addedById: string
    teamId: string | null
    _count: MeetingRecordingCountAggregateOutputType | null
    _min: MeetingRecordingMinAggregateOutputType | null
    _max: MeetingRecordingMaxAggregateOutputType | null
  }

  type GetMeetingRecordingGroupByPayload<T extends MeetingRecordingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MeetingRecordingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeetingRecordingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeetingRecordingGroupByOutputType[P]>
            : GetScalarType<T[P], MeetingRecordingGroupByOutputType[P]>
        }
      >
    >


  export type MeetingRecordingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    description?: boolean
    createdAt?: boolean
    meetingId?: boolean
    addedById?: boolean
    teamId?: boolean
    meeting?: boolean | TeamMeetingDefaultArgs<ExtArgs>
    addedBy?: boolean | UserDefaultArgs<ExtArgs>
    team?: boolean | MeetingRecording$teamArgs<ExtArgs>
  }, ExtArgs["result"]["meetingRecording"]>



  export type MeetingRecordingSelectScalar = {
    id?: boolean
    title?: boolean
    url?: boolean
    description?: boolean
    createdAt?: boolean
    meetingId?: boolean
    addedById?: boolean
    teamId?: boolean
  }

  export type MeetingRecordingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "url" | "description" | "createdAt" | "meetingId" | "addedById" | "teamId", ExtArgs["result"]["meetingRecording"]>
  export type MeetingRecordingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting?: boolean | TeamMeetingDefaultArgs<ExtArgs>
    addedBy?: boolean | UserDefaultArgs<ExtArgs>
    team?: boolean | MeetingRecording$teamArgs<ExtArgs>
  }

  export type $MeetingRecordingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MeetingRecording"
    objects: {
      meeting: Prisma.$TeamMeetingPayload<ExtArgs>
      addedBy: Prisma.$UserPayload<ExtArgs>
      team: Prisma.$TeamPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      url: string
      description: string | null
      createdAt: Date
      meetingId: string
      addedById: string
      teamId: string | null
    }, ExtArgs["result"]["meetingRecording"]>
    composites: {}
  }

  type MeetingRecordingGetPayload<S extends boolean | null | undefined | MeetingRecordingDefaultArgs> = $Result.GetResult<Prisma.$MeetingRecordingPayload, S>

  type MeetingRecordingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MeetingRecordingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MeetingRecordingCountAggregateInputType | true
    }

  export interface MeetingRecordingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MeetingRecording'], meta: { name: 'MeetingRecording' } }
    /**
     * Find zero or one MeetingRecording that matches the filter.
     * @param {MeetingRecordingFindUniqueArgs} args - Arguments to find a MeetingRecording
     * @example
     * // Get one MeetingRecording
     * const meetingRecording = await prisma.meetingRecording.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeetingRecordingFindUniqueArgs>(args: SelectSubset<T, MeetingRecordingFindUniqueArgs<ExtArgs>>): Prisma__MeetingRecordingClient<$Result.GetResult<Prisma.$MeetingRecordingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MeetingRecording that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeetingRecordingFindUniqueOrThrowArgs} args - Arguments to find a MeetingRecording
     * @example
     * // Get one MeetingRecording
     * const meetingRecording = await prisma.meetingRecording.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeetingRecordingFindUniqueOrThrowArgs>(args: SelectSubset<T, MeetingRecordingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MeetingRecordingClient<$Result.GetResult<Prisma.$MeetingRecordingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MeetingRecording that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingRecordingFindFirstArgs} args - Arguments to find a MeetingRecording
     * @example
     * // Get one MeetingRecording
     * const meetingRecording = await prisma.meetingRecording.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeetingRecordingFindFirstArgs>(args?: SelectSubset<T, MeetingRecordingFindFirstArgs<ExtArgs>>): Prisma__MeetingRecordingClient<$Result.GetResult<Prisma.$MeetingRecordingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MeetingRecording that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingRecordingFindFirstOrThrowArgs} args - Arguments to find a MeetingRecording
     * @example
     * // Get one MeetingRecording
     * const meetingRecording = await prisma.meetingRecording.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeetingRecordingFindFirstOrThrowArgs>(args?: SelectSubset<T, MeetingRecordingFindFirstOrThrowArgs<ExtArgs>>): Prisma__MeetingRecordingClient<$Result.GetResult<Prisma.$MeetingRecordingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MeetingRecordings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingRecordingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MeetingRecordings
     * const meetingRecordings = await prisma.meetingRecording.findMany()
     * 
     * // Get first 10 MeetingRecordings
     * const meetingRecordings = await prisma.meetingRecording.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meetingRecordingWithIdOnly = await prisma.meetingRecording.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MeetingRecordingFindManyArgs>(args?: SelectSubset<T, MeetingRecordingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingRecordingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MeetingRecording.
     * @param {MeetingRecordingCreateArgs} args - Arguments to create a MeetingRecording.
     * @example
     * // Create one MeetingRecording
     * const MeetingRecording = await prisma.meetingRecording.create({
     *   data: {
     *     // ... data to create a MeetingRecording
     *   }
     * })
     * 
     */
    create<T extends MeetingRecordingCreateArgs>(args: SelectSubset<T, MeetingRecordingCreateArgs<ExtArgs>>): Prisma__MeetingRecordingClient<$Result.GetResult<Prisma.$MeetingRecordingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MeetingRecordings.
     * @param {MeetingRecordingCreateManyArgs} args - Arguments to create many MeetingRecordings.
     * @example
     * // Create many MeetingRecordings
     * const meetingRecording = await prisma.meetingRecording.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MeetingRecordingCreateManyArgs>(args?: SelectSubset<T, MeetingRecordingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MeetingRecording.
     * @param {MeetingRecordingDeleteArgs} args - Arguments to delete one MeetingRecording.
     * @example
     * // Delete one MeetingRecording
     * const MeetingRecording = await prisma.meetingRecording.delete({
     *   where: {
     *     // ... filter to delete one MeetingRecording
     *   }
     * })
     * 
     */
    delete<T extends MeetingRecordingDeleteArgs>(args: SelectSubset<T, MeetingRecordingDeleteArgs<ExtArgs>>): Prisma__MeetingRecordingClient<$Result.GetResult<Prisma.$MeetingRecordingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MeetingRecording.
     * @param {MeetingRecordingUpdateArgs} args - Arguments to update one MeetingRecording.
     * @example
     * // Update one MeetingRecording
     * const meetingRecording = await prisma.meetingRecording.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MeetingRecordingUpdateArgs>(args: SelectSubset<T, MeetingRecordingUpdateArgs<ExtArgs>>): Prisma__MeetingRecordingClient<$Result.GetResult<Prisma.$MeetingRecordingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MeetingRecordings.
     * @param {MeetingRecordingDeleteManyArgs} args - Arguments to filter MeetingRecordings to delete.
     * @example
     * // Delete a few MeetingRecordings
     * const { count } = await prisma.meetingRecording.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MeetingRecordingDeleteManyArgs>(args?: SelectSubset<T, MeetingRecordingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MeetingRecordings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingRecordingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MeetingRecordings
     * const meetingRecording = await prisma.meetingRecording.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MeetingRecordingUpdateManyArgs>(args: SelectSubset<T, MeetingRecordingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MeetingRecording.
     * @param {MeetingRecordingUpsertArgs} args - Arguments to update or create a MeetingRecording.
     * @example
     * // Update or create a MeetingRecording
     * const meetingRecording = await prisma.meetingRecording.upsert({
     *   create: {
     *     // ... data to create a MeetingRecording
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MeetingRecording we want to update
     *   }
     * })
     */
    upsert<T extends MeetingRecordingUpsertArgs>(args: SelectSubset<T, MeetingRecordingUpsertArgs<ExtArgs>>): Prisma__MeetingRecordingClient<$Result.GetResult<Prisma.$MeetingRecordingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MeetingRecordings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingRecordingCountArgs} args - Arguments to filter MeetingRecordings to count.
     * @example
     * // Count the number of MeetingRecordings
     * const count = await prisma.meetingRecording.count({
     *   where: {
     *     // ... the filter for the MeetingRecordings we want to count
     *   }
     * })
    **/
    count<T extends MeetingRecordingCountArgs>(
      args?: Subset<T, MeetingRecordingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeetingRecordingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MeetingRecording.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingRecordingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MeetingRecordingAggregateArgs>(args: Subset<T, MeetingRecordingAggregateArgs>): Prisma.PrismaPromise<GetMeetingRecordingAggregateType<T>>

    /**
     * Group by MeetingRecording.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingRecordingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MeetingRecordingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeetingRecordingGroupByArgs['orderBy'] }
        : { orderBy?: MeetingRecordingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MeetingRecordingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeetingRecordingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MeetingRecording model
   */
  readonly fields: MeetingRecordingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MeetingRecording.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeetingRecordingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meeting<T extends TeamMeetingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamMeetingDefaultArgs<ExtArgs>>): Prisma__TeamMeetingClient<$Result.GetResult<Prisma.$TeamMeetingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    addedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    team<T extends MeetingRecording$teamArgs<ExtArgs> = {}>(args?: Subset<T, MeetingRecording$teamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MeetingRecording model
   */
  interface MeetingRecordingFieldRefs {
    readonly id: FieldRef<"MeetingRecording", 'String'>
    readonly title: FieldRef<"MeetingRecording", 'String'>
    readonly url: FieldRef<"MeetingRecording", 'String'>
    readonly description: FieldRef<"MeetingRecording", 'String'>
    readonly createdAt: FieldRef<"MeetingRecording", 'DateTime'>
    readonly meetingId: FieldRef<"MeetingRecording", 'String'>
    readonly addedById: FieldRef<"MeetingRecording", 'String'>
    readonly teamId: FieldRef<"MeetingRecording", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MeetingRecording findUnique
   */
  export type MeetingRecordingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
    /**
     * Filter, which MeetingRecording to fetch.
     */
    where: MeetingRecordingWhereUniqueInput
  }

  /**
   * MeetingRecording findUniqueOrThrow
   */
  export type MeetingRecordingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
    /**
     * Filter, which MeetingRecording to fetch.
     */
    where: MeetingRecordingWhereUniqueInput
  }

  /**
   * MeetingRecording findFirst
   */
  export type MeetingRecordingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
    /**
     * Filter, which MeetingRecording to fetch.
     */
    where?: MeetingRecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingRecordings to fetch.
     */
    orderBy?: MeetingRecordingOrderByWithRelationInput | MeetingRecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MeetingRecordings.
     */
    cursor?: MeetingRecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingRecordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingRecordings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MeetingRecordings.
     */
    distinct?: MeetingRecordingScalarFieldEnum | MeetingRecordingScalarFieldEnum[]
  }

  /**
   * MeetingRecording findFirstOrThrow
   */
  export type MeetingRecordingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
    /**
     * Filter, which MeetingRecording to fetch.
     */
    where?: MeetingRecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingRecordings to fetch.
     */
    orderBy?: MeetingRecordingOrderByWithRelationInput | MeetingRecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MeetingRecordings.
     */
    cursor?: MeetingRecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingRecordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingRecordings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MeetingRecordings.
     */
    distinct?: MeetingRecordingScalarFieldEnum | MeetingRecordingScalarFieldEnum[]
  }

  /**
   * MeetingRecording findMany
   */
  export type MeetingRecordingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
    /**
     * Filter, which MeetingRecordings to fetch.
     */
    where?: MeetingRecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingRecordings to fetch.
     */
    orderBy?: MeetingRecordingOrderByWithRelationInput | MeetingRecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MeetingRecordings.
     */
    cursor?: MeetingRecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingRecordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingRecordings.
     */
    skip?: number
    distinct?: MeetingRecordingScalarFieldEnum | MeetingRecordingScalarFieldEnum[]
  }

  /**
   * MeetingRecording create
   */
  export type MeetingRecordingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
    /**
     * The data needed to create a MeetingRecording.
     */
    data: XOR<MeetingRecordingCreateInput, MeetingRecordingUncheckedCreateInput>
  }

  /**
   * MeetingRecording createMany
   */
  export type MeetingRecordingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MeetingRecordings.
     */
    data: MeetingRecordingCreateManyInput | MeetingRecordingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MeetingRecording update
   */
  export type MeetingRecordingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
    /**
     * The data needed to update a MeetingRecording.
     */
    data: XOR<MeetingRecordingUpdateInput, MeetingRecordingUncheckedUpdateInput>
    /**
     * Choose, which MeetingRecording to update.
     */
    where: MeetingRecordingWhereUniqueInput
  }

  /**
   * MeetingRecording updateMany
   */
  export type MeetingRecordingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MeetingRecordings.
     */
    data: XOR<MeetingRecordingUpdateManyMutationInput, MeetingRecordingUncheckedUpdateManyInput>
    /**
     * Filter which MeetingRecordings to update
     */
    where?: MeetingRecordingWhereInput
    /**
     * Limit how many MeetingRecordings to update.
     */
    limit?: number
  }

  /**
   * MeetingRecording upsert
   */
  export type MeetingRecordingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
    /**
     * The filter to search for the MeetingRecording to update in case it exists.
     */
    where: MeetingRecordingWhereUniqueInput
    /**
     * In case the MeetingRecording found by the `where` argument doesn't exist, create a new MeetingRecording with this data.
     */
    create: XOR<MeetingRecordingCreateInput, MeetingRecordingUncheckedCreateInput>
    /**
     * In case the MeetingRecording was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeetingRecordingUpdateInput, MeetingRecordingUncheckedUpdateInput>
  }

  /**
   * MeetingRecording delete
   */
  export type MeetingRecordingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
    /**
     * Filter which MeetingRecording to delete.
     */
    where: MeetingRecordingWhereUniqueInput
  }

  /**
   * MeetingRecording deleteMany
   */
  export type MeetingRecordingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MeetingRecordings to delete
     */
    where?: MeetingRecordingWhereInput
    /**
     * Limit how many MeetingRecordings to delete.
     */
    limit?: number
  }

  /**
   * MeetingRecording.team
   */
  export type MeetingRecording$teamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * MeetingRecording without action
   */
  export type MeetingRecordingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingRecording
     */
    select?: MeetingRecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingRecording
     */
    omit?: MeetingRecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingRecordingInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    inviteCode: 'inviteCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const TeamMemberScalarFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    userId: 'userId',
    role: 'role',
    joinedAt: 'joinedAt'
  };

  export type TeamMemberScalarFieldEnum = (typeof TeamMemberScalarFieldEnum)[keyof typeof TeamMemberScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    inviteCode: 'inviteCode',
    createdById: 'createdById',
    teamId: 'teamId'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    status: 'status',
    dueDate: 'dueDate',
    projectId: 'projectId',
    userId: 'userId',
    createdById: 'createdById',
    solutionDescription: 'solutionDescription'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const ProjectUserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    projectId: 'projectId',
    role: 'role',
    scope: 'scope'
  };

  export type ProjectUserScalarFieldEnum = (typeof ProjectUserScalarFieldEnum)[keyof typeof ProjectUserScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    actorUserId: 'actorUserId',
    type: 'type',
    message: 'message',
    createdAt: 'createdAt'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const TeamMeetingScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    notes: 'notes',
    scheduledAt: 'scheduledAt',
    durationMinutes: 'durationMinutes',
    status: 'status',
    provider: 'provider',
    externalUrl: 'externalUrl',
    teamId: 'teamId',
    projectId: 'projectId',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeamMeetingScalarFieldEnum = (typeof TeamMeetingScalarFieldEnum)[keyof typeof TeamMeetingScalarFieldEnum]


  export const MeetingRecordingScalarFieldEnum: {
    id: 'id',
    title: 'title',
    url: 'url',
    description: 'description',
    createdAt: 'createdAt',
    meetingId: 'meetingId',
    addedById: 'addedById',
    teamId: 'teamId'
  };

  export type MeetingRecordingScalarFieldEnum = (typeof MeetingRecordingScalarFieldEnum)[keyof typeof MeetingRecordingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const TeamOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    inviteCode: 'inviteCode',
    createdById: 'createdById'
  };

  export type TeamOrderByRelevanceFieldEnum = (typeof TeamOrderByRelevanceFieldEnum)[keyof typeof TeamOrderByRelevanceFieldEnum]


  export const TeamMemberOrderByRelevanceFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    userId: 'userId'
  };

  export type TeamMemberOrderByRelevanceFieldEnum = (typeof TeamMemberOrderByRelevanceFieldEnum)[keyof typeof TeamMemberOrderByRelevanceFieldEnum]


  export const ProjectOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    inviteCode: 'inviteCode',
    createdById: 'createdById',
    teamId: 'teamId'
  };

  export type ProjectOrderByRelevanceFieldEnum = (typeof ProjectOrderByRelevanceFieldEnum)[keyof typeof ProjectOrderByRelevanceFieldEnum]


  export const TaskOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    status: 'status',
    projectId: 'projectId',
    userId: 'userId',
    createdById: 'createdById',
    solutionDescription: 'solutionDescription'
  };

  export type TaskOrderByRelevanceFieldEnum = (typeof TaskOrderByRelevanceFieldEnum)[keyof typeof TaskOrderByRelevanceFieldEnum]


  export const ProjectUserOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    projectId: 'projectId'
  };

  export type ProjectUserOrderByRelevanceFieldEnum = (typeof ProjectUserOrderByRelevanceFieldEnum)[keyof typeof ProjectUserOrderByRelevanceFieldEnum]


  export const ActivityLogOrderByRelevanceFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    actorUserId: 'actorUserId',
    message: 'message'
  };

  export type ActivityLogOrderByRelevanceFieldEnum = (typeof ActivityLogOrderByRelevanceFieldEnum)[keyof typeof ActivityLogOrderByRelevanceFieldEnum]


  export const TeamMeetingOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    notes: 'notes',
    externalUrl: 'externalUrl',
    teamId: 'teamId',
    projectId: 'projectId',
    createdById: 'createdById'
  };

  export type TeamMeetingOrderByRelevanceFieldEnum = (typeof TeamMeetingOrderByRelevanceFieldEnum)[keyof typeof TeamMeetingOrderByRelevanceFieldEnum]


  export const MeetingRecordingOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    url: 'url',
    description: 'description',
    meetingId: 'meetingId',
    addedById: 'addedById',
    teamId: 'teamId'
  };

  export type MeetingRecordingOrderByRelevanceFieldEnum = (typeof MeetingRecordingOrderByRelevanceFieldEnum)[keyof typeof MeetingRecordingOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'TeamRole'
   */
  export type EnumTeamRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TeamRole'>
    


  /**
   * Reference to a field of type 'ProjectRole'
   */
  export type EnumProjectRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectRole'>
    


  /**
   * Reference to a field of type 'ProjectCollaboratorScope'
   */
  export type EnumProjectCollaboratorScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectCollaboratorScope'>
    


  /**
   * Reference to a field of type 'ActivityType'
   */
  export type EnumActivityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivityType'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'MeetingStatus'
   */
  export type EnumMeetingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MeetingStatus'>
    


  /**
   * Reference to a field of type 'MeetingProvider'
   */
  export type EnumMeetingProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MeetingProvider'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    tasks?: TaskListRelationFilter
    createdTasks?: TaskListRelationFilter
    projects?: ProjectListRelationFilter
    userProjects?: ProjectUserListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
    createdTeams?: TeamListRelationFilter
    teamMembers?: TeamMemberListRelationFilter
    createdMeetings?: TeamMeetingListRelationFilter
    addedMeetingRecordings?: MeetingRecordingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    tasks?: TaskOrderByRelationAggregateInput
    createdTasks?: TaskOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    userProjects?: ProjectUserOrderByRelationAggregateInput
    activityLogs?: ActivityLogOrderByRelationAggregateInput
    createdTeams?: TeamOrderByRelationAggregateInput
    teamMembers?: TeamMemberOrderByRelationAggregateInput
    createdMeetings?: TeamMeetingOrderByRelationAggregateInput
    addedMeetingRecordings?: MeetingRecordingOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    tasks?: TaskListRelationFilter
    createdTasks?: TaskListRelationFilter
    projects?: ProjectListRelationFilter
    userProjects?: ProjectUserListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
    createdTeams?: TeamListRelationFilter
    teamMembers?: TeamMemberListRelationFilter
    createdMeetings?: TeamMeetingListRelationFilter
    addedMeetingRecordings?: MeetingRecordingListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    description?: StringNullableFilter<"Team"> | string | null
    inviteCode?: StringFilter<"Team"> | string
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    createdById?: StringFilter<"Team"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: TeamMemberListRelationFilter
    projects?: ProjectListRelationFilter
    meetings?: TeamMeetingListRelationFilter
    recordings?: MeetingRecordingListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    inviteCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    members?: TeamMemberOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    meetings?: TeamMeetingOrderByRelationAggregateInput
    recordings?: MeetingRecordingOrderByRelationAggregateInput
    _relevance?: TeamOrderByRelevanceInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    inviteCode?: string
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    name?: StringFilter<"Team"> | string
    description?: StringNullableFilter<"Team"> | string | null
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    createdById?: StringFilter<"Team"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: TeamMemberListRelationFilter
    projects?: ProjectListRelationFilter
    meetings?: TeamMeetingListRelationFilter
    recordings?: MeetingRecordingListRelationFilter
  }, "id" | "inviteCode">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    inviteCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Team"> | string
    name?: StringWithAggregatesFilter<"Team"> | string
    description?: StringNullableWithAggregatesFilter<"Team"> | string | null
    inviteCode?: StringWithAggregatesFilter<"Team"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
    createdById?: StringWithAggregatesFilter<"Team"> | string
  }

  export type TeamMemberWhereInput = {
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    id?: StringFilter<"TeamMember"> | string
    teamId?: StringFilter<"TeamMember"> | string
    userId?: StringFilter<"TeamMember"> | string
    role?: EnumTeamRoleFilter<"TeamMember"> | $Enums.TeamRole
    joinedAt?: DateTimeFilter<"TeamMember"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TeamMemberOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    team?: TeamOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    _relevance?: TeamMemberOrderByRelevanceInput
  }

  export type TeamMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    teamId_userId?: TeamMemberTeamIdUserIdCompoundUniqueInput
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    teamId?: StringFilter<"TeamMember"> | string
    userId?: StringFilter<"TeamMember"> | string
    role?: EnumTeamRoleFilter<"TeamMember"> | $Enums.TeamRole
    joinedAt?: DateTimeFilter<"TeamMember"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "teamId_userId">

  export type TeamMemberOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    _count?: TeamMemberCountOrderByAggregateInput
    _max?: TeamMemberMaxOrderByAggregateInput
    _min?: TeamMemberMinOrderByAggregateInput
  }

  export type TeamMemberScalarWhereWithAggregatesInput = {
    AND?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    OR?: TeamMemberScalarWhereWithAggregatesInput[]
    NOT?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TeamMember"> | string
    teamId?: StringWithAggregatesFilter<"TeamMember"> | string
    userId?: StringWithAggregatesFilter<"TeamMember"> | string
    role?: EnumTeamRoleWithAggregatesFilter<"TeamMember"> | $Enums.TeamRole
    joinedAt?: DateTimeWithAggregatesFilter<"TeamMember"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    inviteCode?: StringFilter<"Project"> | string
    createdById?: StringFilter<"Project"> | string
    teamId?: StringNullableFilter<"Project"> | string | null
    tasks?: TaskListRelationFilter
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    meetings?: TeamMeetingListRelationFilter
    users?: ProjectUserListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inviteCode?: SortOrder
    createdById?: SortOrder
    teamId?: SortOrderInput | SortOrder
    tasks?: TaskOrderByRelationAggregateInput
    createdBy?: UserOrderByWithRelationInput
    team?: TeamOrderByWithRelationInput
    meetings?: TeamMeetingOrderByRelationAggregateInput
    users?: ProjectUserOrderByRelationAggregateInput
    activityLogs?: ActivityLogOrderByRelationAggregateInput
    _relevance?: ProjectOrderByRelevanceInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    inviteCode?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    createdById?: StringFilter<"Project"> | string
    teamId?: StringNullableFilter<"Project"> | string | null
    tasks?: TaskListRelationFilter
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    meetings?: TeamMeetingListRelationFilter
    users?: ProjectUserListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
  }, "id" | "inviteCode">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inviteCode?: SortOrder
    createdById?: SortOrder
    teamId?: SortOrderInput | SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    inviteCode?: StringWithAggregatesFilter<"Project"> | string
    createdById?: StringWithAggregatesFilter<"Project"> | string
    teamId?: StringNullableWithAggregatesFilter<"Project"> | string | null
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    name?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    projectId?: StringFilter<"Task"> | string
    userId?: StringNullableFilter<"Task"> | string | null
    createdById?: StringFilter<"Task"> | string
    solutionDescription?: StringNullableFilter<"Task"> | string | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    projectId?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdById?: SortOrder
    solutionDescription?: SortOrderInput | SortOrder
    project?: ProjectOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    _relevance?: TaskOrderByRelevanceInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    name?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    projectId?: StringFilter<"Task"> | string
    userId?: StringNullableFilter<"Task"> | string | null
    createdById?: StringFilter<"Task"> | string
    solutionDescription?: StringNullableFilter<"Task"> | string | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    projectId?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdById?: SortOrder
    solutionDescription?: SortOrderInput | SortOrder
    _count?: TaskCountOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    name?: StringWithAggregatesFilter<"Task"> | string
    description?: StringWithAggregatesFilter<"Task"> | string
    status?: StringWithAggregatesFilter<"Task"> | string
    dueDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    projectId?: StringWithAggregatesFilter<"Task"> | string
    userId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    createdById?: StringWithAggregatesFilter<"Task"> | string
    solutionDescription?: StringNullableWithAggregatesFilter<"Task"> | string | null
  }

  export type ProjectUserWhereInput = {
    AND?: ProjectUserWhereInput | ProjectUserWhereInput[]
    OR?: ProjectUserWhereInput[]
    NOT?: ProjectUserWhereInput | ProjectUserWhereInput[]
    id?: StringFilter<"ProjectUser"> | string
    userId?: StringFilter<"ProjectUser"> | string
    projectId?: StringFilter<"ProjectUser"> | string
    role?: EnumProjectRoleFilter<"ProjectUser"> | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFilter<"ProjectUser"> | $Enums.ProjectCollaboratorScope
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectUserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    scope?: SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    _relevance?: ProjectUserOrderByRelevanceInput
  }

  export type ProjectUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_projectId?: ProjectUserUserIdProjectIdCompoundUniqueInput
    AND?: ProjectUserWhereInput | ProjectUserWhereInput[]
    OR?: ProjectUserWhereInput[]
    NOT?: ProjectUserWhereInput | ProjectUserWhereInput[]
    userId?: StringFilter<"ProjectUser"> | string
    projectId?: StringFilter<"ProjectUser"> | string
    role?: EnumProjectRoleFilter<"ProjectUser"> | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFilter<"ProjectUser"> | $Enums.ProjectCollaboratorScope
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "userId_projectId">

  export type ProjectUserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    scope?: SortOrder
    _count?: ProjectUserCountOrderByAggregateInput
    _max?: ProjectUserMaxOrderByAggregateInput
    _min?: ProjectUserMinOrderByAggregateInput
  }

  export type ProjectUserScalarWhereWithAggregatesInput = {
    AND?: ProjectUserScalarWhereWithAggregatesInput | ProjectUserScalarWhereWithAggregatesInput[]
    OR?: ProjectUserScalarWhereWithAggregatesInput[]
    NOT?: ProjectUserScalarWhereWithAggregatesInput | ProjectUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectUser"> | string
    userId?: StringWithAggregatesFilter<"ProjectUser"> | string
    projectId?: StringWithAggregatesFilter<"ProjectUser"> | string
    role?: EnumProjectRoleWithAggregatesFilter<"ProjectUser"> | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeWithAggregatesFilter<"ProjectUser"> | $Enums.ProjectCollaboratorScope
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    projectId?: StringFilter<"ActivityLog"> | string
    actorUserId?: StringFilter<"ActivityLog"> | string
    type?: EnumActivityTypeFilter<"ActivityLog"> | $Enums.ActivityType
    message?: StringFilter<"ActivityLog"> | string
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    actor?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    actorUserId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    actor?: UserOrderByWithRelationInput
    _relevance?: ActivityLogOrderByRelevanceInput
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    projectId?: StringFilter<"ActivityLog"> | string
    actorUserId?: StringFilter<"ActivityLog"> | string
    type?: EnumActivityTypeFilter<"ActivityLog"> | $Enums.ActivityType
    message?: StringFilter<"ActivityLog"> | string
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    actor?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    actorUserId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityLog"> | string
    projectId?: StringWithAggregatesFilter<"ActivityLog"> | string
    actorUserId?: StringWithAggregatesFilter<"ActivityLog"> | string
    type?: EnumActivityTypeWithAggregatesFilter<"ActivityLog"> | $Enums.ActivityType
    message?: StringWithAggregatesFilter<"ActivityLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
  }

  export type TeamMeetingWhereInput = {
    AND?: TeamMeetingWhereInput | TeamMeetingWhereInput[]
    OR?: TeamMeetingWhereInput[]
    NOT?: TeamMeetingWhereInput | TeamMeetingWhereInput[]
    id?: StringFilter<"TeamMeeting"> | string
    title?: StringFilter<"TeamMeeting"> | string
    description?: StringNullableFilter<"TeamMeeting"> | string | null
    notes?: StringNullableFilter<"TeamMeeting"> | string | null
    scheduledAt?: DateTimeFilter<"TeamMeeting"> | Date | string
    durationMinutes?: IntNullableFilter<"TeamMeeting"> | number | null
    status?: EnumMeetingStatusFilter<"TeamMeeting"> | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFilter<"TeamMeeting"> | $Enums.MeetingProvider
    externalUrl?: StringNullableFilter<"TeamMeeting"> | string | null
    teamId?: StringFilter<"TeamMeeting"> | string
    projectId?: StringNullableFilter<"TeamMeeting"> | string | null
    createdById?: StringFilter<"TeamMeeting"> | string
    createdAt?: DateTimeFilter<"TeamMeeting"> | Date | string
    updatedAt?: DateTimeFilter<"TeamMeeting"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    meetingRecordings?: MeetingRecordingListRelationFilter
  }

  export type TeamMeetingOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    scheduledAt?: SortOrder
    durationMinutes?: SortOrderInput | SortOrder
    status?: SortOrder
    provider?: SortOrder
    externalUrl?: SortOrderInput | SortOrder
    teamId?: SortOrder
    projectId?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    team?: TeamOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    meetingRecordings?: MeetingRecordingOrderByRelationAggregateInput
    _relevance?: TeamMeetingOrderByRelevanceInput
  }

  export type TeamMeetingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TeamMeetingWhereInput | TeamMeetingWhereInput[]
    OR?: TeamMeetingWhereInput[]
    NOT?: TeamMeetingWhereInput | TeamMeetingWhereInput[]
    title?: StringFilter<"TeamMeeting"> | string
    description?: StringNullableFilter<"TeamMeeting"> | string | null
    notes?: StringNullableFilter<"TeamMeeting"> | string | null
    scheduledAt?: DateTimeFilter<"TeamMeeting"> | Date | string
    durationMinutes?: IntNullableFilter<"TeamMeeting"> | number | null
    status?: EnumMeetingStatusFilter<"TeamMeeting"> | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFilter<"TeamMeeting"> | $Enums.MeetingProvider
    externalUrl?: StringNullableFilter<"TeamMeeting"> | string | null
    teamId?: StringFilter<"TeamMeeting"> | string
    projectId?: StringNullableFilter<"TeamMeeting"> | string | null
    createdById?: StringFilter<"TeamMeeting"> | string
    createdAt?: DateTimeFilter<"TeamMeeting"> | Date | string
    updatedAt?: DateTimeFilter<"TeamMeeting"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    meetingRecordings?: MeetingRecordingListRelationFilter
  }, "id">

  export type TeamMeetingOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    scheduledAt?: SortOrder
    durationMinutes?: SortOrderInput | SortOrder
    status?: SortOrder
    provider?: SortOrder
    externalUrl?: SortOrderInput | SortOrder
    teamId?: SortOrder
    projectId?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamMeetingCountOrderByAggregateInput
    _avg?: TeamMeetingAvgOrderByAggregateInput
    _max?: TeamMeetingMaxOrderByAggregateInput
    _min?: TeamMeetingMinOrderByAggregateInput
    _sum?: TeamMeetingSumOrderByAggregateInput
  }

  export type TeamMeetingScalarWhereWithAggregatesInput = {
    AND?: TeamMeetingScalarWhereWithAggregatesInput | TeamMeetingScalarWhereWithAggregatesInput[]
    OR?: TeamMeetingScalarWhereWithAggregatesInput[]
    NOT?: TeamMeetingScalarWhereWithAggregatesInput | TeamMeetingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TeamMeeting"> | string
    title?: StringWithAggregatesFilter<"TeamMeeting"> | string
    description?: StringNullableWithAggregatesFilter<"TeamMeeting"> | string | null
    notes?: StringNullableWithAggregatesFilter<"TeamMeeting"> | string | null
    scheduledAt?: DateTimeWithAggregatesFilter<"TeamMeeting"> | Date | string
    durationMinutes?: IntNullableWithAggregatesFilter<"TeamMeeting"> | number | null
    status?: EnumMeetingStatusWithAggregatesFilter<"TeamMeeting"> | $Enums.MeetingStatus
    provider?: EnumMeetingProviderWithAggregatesFilter<"TeamMeeting"> | $Enums.MeetingProvider
    externalUrl?: StringNullableWithAggregatesFilter<"TeamMeeting"> | string | null
    teamId?: StringWithAggregatesFilter<"TeamMeeting"> | string
    projectId?: StringNullableWithAggregatesFilter<"TeamMeeting"> | string | null
    createdById?: StringWithAggregatesFilter<"TeamMeeting"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TeamMeeting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TeamMeeting"> | Date | string
  }

  export type MeetingRecordingWhereInput = {
    AND?: MeetingRecordingWhereInput | MeetingRecordingWhereInput[]
    OR?: MeetingRecordingWhereInput[]
    NOT?: MeetingRecordingWhereInput | MeetingRecordingWhereInput[]
    id?: StringFilter<"MeetingRecording"> | string
    title?: StringFilter<"MeetingRecording"> | string
    url?: StringFilter<"MeetingRecording"> | string
    description?: StringNullableFilter<"MeetingRecording"> | string | null
    createdAt?: DateTimeFilter<"MeetingRecording"> | Date | string
    meetingId?: StringFilter<"MeetingRecording"> | string
    addedById?: StringFilter<"MeetingRecording"> | string
    teamId?: StringNullableFilter<"MeetingRecording"> | string | null
    meeting?: XOR<TeamMeetingScalarRelationFilter, TeamMeetingWhereInput>
    addedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
  }

  export type MeetingRecordingOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    meetingId?: SortOrder
    addedById?: SortOrder
    teamId?: SortOrderInput | SortOrder
    meeting?: TeamMeetingOrderByWithRelationInput
    addedBy?: UserOrderByWithRelationInput
    team?: TeamOrderByWithRelationInput
    _relevance?: MeetingRecordingOrderByRelevanceInput
  }

  export type MeetingRecordingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MeetingRecordingWhereInput | MeetingRecordingWhereInput[]
    OR?: MeetingRecordingWhereInput[]
    NOT?: MeetingRecordingWhereInput | MeetingRecordingWhereInput[]
    title?: StringFilter<"MeetingRecording"> | string
    url?: StringFilter<"MeetingRecording"> | string
    description?: StringNullableFilter<"MeetingRecording"> | string | null
    createdAt?: DateTimeFilter<"MeetingRecording"> | Date | string
    meetingId?: StringFilter<"MeetingRecording"> | string
    addedById?: StringFilter<"MeetingRecording"> | string
    teamId?: StringNullableFilter<"MeetingRecording"> | string | null
    meeting?: XOR<TeamMeetingScalarRelationFilter, TeamMeetingWhereInput>
    addedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
  }, "id">

  export type MeetingRecordingOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    meetingId?: SortOrder
    addedById?: SortOrder
    teamId?: SortOrderInput | SortOrder
    _count?: MeetingRecordingCountOrderByAggregateInput
    _max?: MeetingRecordingMaxOrderByAggregateInput
    _min?: MeetingRecordingMinOrderByAggregateInput
  }

  export type MeetingRecordingScalarWhereWithAggregatesInput = {
    AND?: MeetingRecordingScalarWhereWithAggregatesInput | MeetingRecordingScalarWhereWithAggregatesInput[]
    OR?: MeetingRecordingScalarWhereWithAggregatesInput[]
    NOT?: MeetingRecordingScalarWhereWithAggregatesInput | MeetingRecordingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MeetingRecording"> | string
    title?: StringWithAggregatesFilter<"MeetingRecording"> | string
    url?: StringWithAggregatesFilter<"MeetingRecording"> | string
    description?: StringNullableWithAggregatesFilter<"MeetingRecording"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MeetingRecording"> | Date | string
    meetingId?: StringWithAggregatesFilter<"MeetingRecording"> | string
    addedById?: StringWithAggregatesFilter<"MeetingRecording"> | string
    teamId?: StringNullableWithAggregatesFilter<"MeetingRecording"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    projects?: ProjectCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutActorInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingCreateNestedManyWithoutAddedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutActorInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingUncheckedCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutAddedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUpdateManyWithoutAddedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUncheckedUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutAddedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type TeamCreateInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedTeamsInput
    members?: TeamMemberCreateNestedManyWithoutTeamInput
    projects?: ProjectCreateNestedManyWithoutTeamInput
    meetings?: TeamMeetingCreateNestedManyWithoutTeamInput
    recordings?: MeetingRecordingCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
    projects?: ProjectUncheckedCreateNestedManyWithoutTeamInput
    meetings?: TeamMeetingUncheckedCreateNestedManyWithoutTeamInput
    recordings?: MeetingRecordingUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedTeamsNestedInput
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
    projects?: ProjectUpdateManyWithoutTeamNestedInput
    meetings?: TeamMeetingUpdateManyWithoutTeamNestedInput
    recordings?: MeetingRecordingUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutTeamNestedInput
    meetings?: TeamMeetingUncheckedUpdateManyWithoutTeamNestedInput
    recordings?: MeetingRecordingUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
  }

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type TeamMemberCreateInput = {
    id?: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
    team: TeamCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutTeamMembersInput
  }

  export type TeamMemberUncheckedCreateInput = {
    id?: string
    teamId: string
    userId: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
  }

  export type TeamMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutTeamMembersNestedInput
  }

  export type TeamMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberCreateManyInput = {
    id?: string
    teamId: string
    userId: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
  }

  export type TeamMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    tasks?: TaskCreateNestedManyWithoutProjectInput
    createdBy: UserCreateNestedOneWithoutProjectsInput
    team?: TeamCreateNestedOneWithoutProjectsInput
    meetings?: TeamMeetingCreateNestedManyWithoutProjectInput
    users?: ProjectUserCreateNestedManyWithoutProjectInput
    activityLogs?: ActivityLogCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    createdById: string
    teamId?: string | null
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
    meetings?: TeamMeetingUncheckedCreateNestedManyWithoutProjectInput
    users?: ProjectUserUncheckedCreateNestedManyWithoutProjectInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutProjectNestedInput
    createdBy?: UserUpdateOneRequiredWithoutProjectsNestedInput
    team?: TeamUpdateOneWithoutProjectsNestedInput
    meetings?: TeamMeetingUpdateManyWithoutProjectNestedInput
    users?: ProjectUserUpdateManyWithoutProjectNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
    meetings?: TeamMeetingUncheckedUpdateManyWithoutProjectNestedInput
    users?: ProjectUserUncheckedUpdateManyWithoutProjectNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    createdById: string
    teamId?: string | null
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskCreateInput = {
    id?: string
    name: string
    description: string
    status?: string
    dueDate?: Date | string | null
    solutionDescription?: string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    user?: UserCreateNestedOneWithoutTasksInput
    createdBy: UserCreateNestedOneWithoutCreatedTasksInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    status?: string
    dueDate?: Date | string | null
    projectId: string
    userId?: string | null
    createdById: string
    solutionDescription?: string | null
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    user?: UserUpdateOneWithoutTasksNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedTasksNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskCreateManyInput = {
    id?: string
    name: string
    description: string
    status?: string
    dueDate?: Date | string | null
    projectId: string
    userId?: string | null
    createdById: string
    solutionDescription?: string | null
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUserCreateInput = {
    id?: string
    role?: $Enums.ProjectRole
    scope?: $Enums.ProjectCollaboratorScope
    user: UserCreateNestedOneWithoutUserProjectsInput
    project: ProjectCreateNestedOneWithoutUsersInput
  }

  export type ProjectUserUncheckedCreateInput = {
    id?: string
    userId: string
    projectId: string
    role?: $Enums.ProjectRole
    scope?: $Enums.ProjectCollaboratorScope
  }

  export type ProjectUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFieldUpdateOperationsInput | $Enums.ProjectCollaboratorScope
    user?: UserUpdateOneRequiredWithoutUserProjectsNestedInput
    project?: ProjectUpdateOneRequiredWithoutUsersNestedInput
  }

  export type ProjectUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFieldUpdateOperationsInput | $Enums.ProjectCollaboratorScope
  }

  export type ProjectUserCreateManyInput = {
    id?: string
    userId: string
    projectId: string
    role?: $Enums.ProjectRole
    scope?: $Enums.ProjectCollaboratorScope
  }

  export type ProjectUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFieldUpdateOperationsInput | $Enums.ProjectCollaboratorScope
  }

  export type ProjectUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFieldUpdateOperationsInput | $Enums.ProjectCollaboratorScope
  }

  export type ActivityLogCreateInput = {
    id?: string
    type: $Enums.ActivityType
    message: string
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutActivityLogsInput
    actor: UserCreateNestedOneWithoutActivityLogsInput
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: string
    projectId: string
    actorUserId: string
    type: $Enums.ActivityType
    message: string
    createdAt?: Date | string
  }

  export type ActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | $Enums.ActivityType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutActivityLogsNestedInput
    actor?: UserUpdateOneRequiredWithoutActivityLogsNestedInput
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    actorUserId?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | $Enums.ActivityType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateManyInput = {
    id?: string
    projectId: string
    actorUserId: string
    type: $Enums.ActivityType
    message: string
    createdAt?: Date | string
  }

  export type ActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | $Enums.ActivityType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    actorUserId?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | $Enums.ActivityType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMeetingCreateInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutMeetingsInput
    project?: ProjectCreateNestedOneWithoutMeetingsInput
    createdBy: UserCreateNestedOneWithoutCreatedMeetingsInput
    meetingRecordings?: MeetingRecordingCreateNestedManyWithoutMeetingInput
  }

  export type TeamMeetingUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    teamId: string
    projectId?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    meetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type TeamMeetingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutMeetingsNestedInput
    project?: ProjectUpdateOneWithoutMeetingsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedMeetingsNestedInput
    meetingRecordings?: MeetingRecordingUpdateManyWithoutMeetingNestedInput
  }

  export type TeamMeetingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type TeamMeetingCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    teamId: string
    projectId?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMeetingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMeetingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingRecordingCreateInput = {
    id?: string
    title: string
    url: string
    description?: string | null
    createdAt?: Date | string
    meeting: TeamMeetingCreateNestedOneWithoutMeetingRecordingsInput
    addedBy: UserCreateNestedOneWithoutAddedMeetingRecordingsInput
    team?: TeamCreateNestedOneWithoutRecordingsInput
  }

  export type MeetingRecordingUncheckedCreateInput = {
    id?: string
    title: string
    url: string
    description?: string | null
    createdAt?: Date | string
    meetingId: string
    addedById: string
    teamId?: string | null
  }

  export type MeetingRecordingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: TeamMeetingUpdateOneRequiredWithoutMeetingRecordingsNestedInput
    addedBy?: UserUpdateOneRequiredWithoutAddedMeetingRecordingsNestedInput
    team?: TeamUpdateOneWithoutRecordingsNestedInput
  }

  export type MeetingRecordingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MeetingRecordingCreateManyInput = {
    id?: string
    title: string
    url: string
    description?: string | null
    createdAt?: Date | string
    meetingId: string
    addedById: string
    teamId?: string | null
  }

  export type MeetingRecordingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingRecordingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type ProjectUserListRelationFilter = {
    every?: ProjectUserWhereInput
    some?: ProjectUserWhereInput
    none?: ProjectUserWhereInput
  }

  export type ActivityLogListRelationFilter = {
    every?: ActivityLogWhereInput
    some?: ActivityLogWhereInput
    none?: ActivityLogWhereInput
  }

  export type TeamListRelationFilter = {
    every?: TeamWhereInput
    some?: TeamWhereInput
    none?: TeamWhereInput
  }

  export type TeamMemberListRelationFilter = {
    every?: TeamMemberWhereInput
    some?: TeamMemberWhereInput
    none?: TeamMemberWhereInput
  }

  export type TeamMeetingListRelationFilter = {
    every?: TeamMeetingWhereInput
    some?: TeamMeetingWhereInput
    none?: TeamMeetingWhereInput
  }

  export type MeetingRecordingListRelationFilter = {
    every?: MeetingRecordingWhereInput
    some?: MeetingRecordingWhereInput
    none?: MeetingRecordingWhereInput
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamMeetingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MeetingRecordingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TeamOrderByRelevanceInput = {
    fields: TeamOrderByRelevanceFieldEnum | TeamOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    inviteCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    inviteCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    inviteCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumTeamRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamRole | EnumTeamRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TeamRole[]
    notIn?: $Enums.TeamRole[]
    not?: NestedEnumTeamRoleFilter<$PrismaModel> | $Enums.TeamRole
  }

  export type TeamScalarRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type TeamMemberOrderByRelevanceInput = {
    fields: TeamMemberOrderByRelevanceFieldEnum | TeamMemberOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TeamMemberTeamIdUserIdCompoundUniqueInput = {
    teamId: string
    userId: string
  }

  export type TeamMemberCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type TeamMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type TeamMemberMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type EnumTeamRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamRole | EnumTeamRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TeamRole[]
    notIn?: $Enums.TeamRole[]
    not?: NestedEnumTeamRoleWithAggregatesFilter<$PrismaModel> | $Enums.TeamRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTeamRoleFilter<$PrismaModel>
    _max?: NestedEnumTeamRoleFilter<$PrismaModel>
  }

  export type TeamNullableScalarRelationFilter = {
    is?: TeamWhereInput | null
    isNot?: TeamWhereInput | null
  }

  export type ProjectOrderByRelevanceInput = {
    fields: ProjectOrderByRelevanceFieldEnum | ProjectOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inviteCode?: SortOrder
    createdById?: SortOrder
    teamId?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inviteCode?: SortOrder
    createdById?: SortOrder
    teamId?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inviteCode?: SortOrder
    createdById?: SortOrder
    teamId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TaskOrderByRelevanceInput = {
    fields: TaskOrderByRelevanceFieldEnum | TaskOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    dueDate?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    createdById?: SortOrder
    solutionDescription?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    dueDate?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    createdById?: SortOrder
    solutionDescription?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    dueDate?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    createdById?: SortOrder
    solutionDescription?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumProjectRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectRole | EnumProjectRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectRole[]
    notIn?: $Enums.ProjectRole[]
    not?: NestedEnumProjectRoleFilter<$PrismaModel> | $Enums.ProjectRole
  }

  export type EnumProjectCollaboratorScopeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectCollaboratorScope | EnumProjectCollaboratorScopeFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectCollaboratorScope[]
    notIn?: $Enums.ProjectCollaboratorScope[]
    not?: NestedEnumProjectCollaboratorScopeFilter<$PrismaModel> | $Enums.ProjectCollaboratorScope
  }

  export type ProjectUserOrderByRelevanceInput = {
    fields: ProjectUserOrderByRelevanceFieldEnum | ProjectUserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProjectUserUserIdProjectIdCompoundUniqueInput = {
    userId: string
    projectId: string
  }

  export type ProjectUserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    scope?: SortOrder
  }

  export type ProjectUserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    scope?: SortOrder
  }

  export type ProjectUserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    scope?: SortOrder
  }

  export type EnumProjectRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectRole | EnumProjectRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectRole[]
    notIn?: $Enums.ProjectRole[]
    not?: NestedEnumProjectRoleWithAggregatesFilter<$PrismaModel> | $Enums.ProjectRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectRoleFilter<$PrismaModel>
    _max?: NestedEnumProjectRoleFilter<$PrismaModel>
  }

  export type EnumProjectCollaboratorScopeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectCollaboratorScope | EnumProjectCollaboratorScopeFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectCollaboratorScope[]
    notIn?: $Enums.ProjectCollaboratorScope[]
    not?: NestedEnumProjectCollaboratorScopeWithAggregatesFilter<$PrismaModel> | $Enums.ProjectCollaboratorScope
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectCollaboratorScopeFilter<$PrismaModel>
    _max?: NestedEnumProjectCollaboratorScopeFilter<$PrismaModel>
  }

  export type EnumActivityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityType | EnumActivityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActivityType[]
    notIn?: $Enums.ActivityType[]
    not?: NestedEnumActivityTypeFilter<$PrismaModel> | $Enums.ActivityType
  }

  export type ActivityLogOrderByRelevanceInput = {
    fields: ActivityLogOrderByRelevanceFieldEnum | ActivityLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    actorUserId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    actorUserId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    actorUserId?: SortOrder
    type?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumActivityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityType | EnumActivityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActivityType[]
    notIn?: $Enums.ActivityType[]
    not?: NestedEnumActivityTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActivityType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActivityTypeFilter<$PrismaModel>
    _max?: NestedEnumActivityTypeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumMeetingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MeetingStatus | EnumMeetingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MeetingStatus[]
    notIn?: $Enums.MeetingStatus[]
    not?: NestedEnumMeetingStatusFilter<$PrismaModel> | $Enums.MeetingStatus
  }

  export type EnumMeetingProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.MeetingProvider | EnumMeetingProviderFieldRefInput<$PrismaModel>
    in?: $Enums.MeetingProvider[]
    notIn?: $Enums.MeetingProvider[]
    not?: NestedEnumMeetingProviderFilter<$PrismaModel> | $Enums.MeetingProvider
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type TeamMeetingOrderByRelevanceInput = {
    fields: TeamMeetingOrderByRelevanceFieldEnum | TeamMeetingOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TeamMeetingCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    notes?: SortOrder
    scheduledAt?: SortOrder
    durationMinutes?: SortOrder
    status?: SortOrder
    provider?: SortOrder
    externalUrl?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMeetingAvgOrderByAggregateInput = {
    durationMinutes?: SortOrder
  }

  export type TeamMeetingMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    notes?: SortOrder
    scheduledAt?: SortOrder
    durationMinutes?: SortOrder
    status?: SortOrder
    provider?: SortOrder
    externalUrl?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMeetingMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    notes?: SortOrder
    scheduledAt?: SortOrder
    durationMinutes?: SortOrder
    status?: SortOrder
    provider?: SortOrder
    externalUrl?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMeetingSumOrderByAggregateInput = {
    durationMinutes?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumMeetingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MeetingStatus | EnumMeetingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MeetingStatus[]
    notIn?: $Enums.MeetingStatus[]
    not?: NestedEnumMeetingStatusWithAggregatesFilter<$PrismaModel> | $Enums.MeetingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMeetingStatusFilter<$PrismaModel>
    _max?: NestedEnumMeetingStatusFilter<$PrismaModel>
  }

  export type EnumMeetingProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MeetingProvider | EnumMeetingProviderFieldRefInput<$PrismaModel>
    in?: $Enums.MeetingProvider[]
    notIn?: $Enums.MeetingProvider[]
    not?: NestedEnumMeetingProviderWithAggregatesFilter<$PrismaModel> | $Enums.MeetingProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMeetingProviderFilter<$PrismaModel>
    _max?: NestedEnumMeetingProviderFilter<$PrismaModel>
  }

  export type TeamMeetingScalarRelationFilter = {
    is?: TeamMeetingWhereInput
    isNot?: TeamMeetingWhereInput
  }

  export type MeetingRecordingOrderByRelevanceInput = {
    fields: MeetingRecordingOrderByRelevanceFieldEnum | MeetingRecordingOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MeetingRecordingCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    meetingId?: SortOrder
    addedById?: SortOrder
    teamId?: SortOrder
  }

  export type MeetingRecordingMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    meetingId?: SortOrder
    addedById?: SortOrder
    teamId?: SortOrder
  }

  export type MeetingRecordingMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    meetingId?: SortOrder
    addedById?: SortOrder
    teamId?: SortOrder
  }

  export type TaskCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TaskCreateWithoutCreatedByInput, TaskUncheckedCreateWithoutCreatedByInput> | TaskCreateWithoutCreatedByInput[] | TaskUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCreatedByInput | TaskCreateOrConnectWithoutCreatedByInput[]
    createMany?: TaskCreateManyCreatedByInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ProjectCreateWithoutCreatedByInput, ProjectUncheckedCreateWithoutCreatedByInput> | ProjectCreateWithoutCreatedByInput[] | ProjectUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCreatedByInput | ProjectCreateOrConnectWithoutCreatedByInput[]
    createMany?: ProjectCreateManyCreatedByInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUserCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectUserCreateWithoutUserInput, ProjectUserUncheckedCreateWithoutUserInput> | ProjectUserCreateWithoutUserInput[] | ProjectUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectUserCreateOrConnectWithoutUserInput | ProjectUserCreateOrConnectWithoutUserInput[]
    createMany?: ProjectUserCreateManyUserInputEnvelope
    connect?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
  }

  export type ActivityLogCreateNestedManyWithoutActorInput = {
    create?: XOR<ActivityLogCreateWithoutActorInput, ActivityLogUncheckedCreateWithoutActorInput> | ActivityLogCreateWithoutActorInput[] | ActivityLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutActorInput | ActivityLogCreateOrConnectWithoutActorInput[]
    createMany?: ActivityLogCreateManyActorInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type TeamCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TeamCreateWithoutCreatedByInput, TeamUncheckedCreateWithoutCreatedByInput> | TeamCreateWithoutCreatedByInput[] | TeamUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCreatedByInput | TeamCreateOrConnectWithoutCreatedByInput[]
    createMany?: TeamCreateManyCreatedByInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type TeamMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput> | TeamMemberCreateWithoutUserInput[] | TeamMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput | TeamMemberCreateOrConnectWithoutUserInput[]
    createMany?: TeamMemberCreateManyUserInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type TeamMeetingCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TeamMeetingCreateWithoutCreatedByInput, TeamMeetingUncheckedCreateWithoutCreatedByInput> | TeamMeetingCreateWithoutCreatedByInput[] | TeamMeetingUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutCreatedByInput | TeamMeetingCreateOrConnectWithoutCreatedByInput[]
    createMany?: TeamMeetingCreateManyCreatedByInputEnvelope
    connect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
  }

  export type MeetingRecordingCreateNestedManyWithoutAddedByInput = {
    create?: XOR<MeetingRecordingCreateWithoutAddedByInput, MeetingRecordingUncheckedCreateWithoutAddedByInput> | MeetingRecordingCreateWithoutAddedByInput[] | MeetingRecordingUncheckedCreateWithoutAddedByInput[]
    connectOrCreate?: MeetingRecordingCreateOrConnectWithoutAddedByInput | MeetingRecordingCreateOrConnectWithoutAddedByInput[]
    createMany?: MeetingRecordingCreateManyAddedByInputEnvelope
    connect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TaskCreateWithoutCreatedByInput, TaskUncheckedCreateWithoutCreatedByInput> | TaskCreateWithoutCreatedByInput[] | TaskUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCreatedByInput | TaskCreateOrConnectWithoutCreatedByInput[]
    createMany?: TaskCreateManyCreatedByInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ProjectCreateWithoutCreatedByInput, ProjectUncheckedCreateWithoutCreatedByInput> | ProjectCreateWithoutCreatedByInput[] | ProjectUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCreatedByInput | ProjectCreateOrConnectWithoutCreatedByInput[]
    createMany?: ProjectCreateManyCreatedByInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectUserCreateWithoutUserInput, ProjectUserUncheckedCreateWithoutUserInput> | ProjectUserCreateWithoutUserInput[] | ProjectUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectUserCreateOrConnectWithoutUserInput | ProjectUserCreateOrConnectWithoutUserInput[]
    createMany?: ProjectUserCreateManyUserInputEnvelope
    connect?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
  }

  export type ActivityLogUncheckedCreateNestedManyWithoutActorInput = {
    create?: XOR<ActivityLogCreateWithoutActorInput, ActivityLogUncheckedCreateWithoutActorInput> | ActivityLogCreateWithoutActorInput[] | ActivityLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutActorInput | ActivityLogCreateOrConnectWithoutActorInput[]
    createMany?: ActivityLogCreateManyActorInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type TeamUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TeamCreateWithoutCreatedByInput, TeamUncheckedCreateWithoutCreatedByInput> | TeamCreateWithoutCreatedByInput[] | TeamUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCreatedByInput | TeamCreateOrConnectWithoutCreatedByInput[]
    createMany?: TeamCreateManyCreatedByInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type TeamMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput> | TeamMemberCreateWithoutUserInput[] | TeamMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput | TeamMemberCreateOrConnectWithoutUserInput[]
    createMany?: TeamMemberCreateManyUserInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type TeamMeetingUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TeamMeetingCreateWithoutCreatedByInput, TeamMeetingUncheckedCreateWithoutCreatedByInput> | TeamMeetingCreateWithoutCreatedByInput[] | TeamMeetingUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutCreatedByInput | TeamMeetingCreateOrConnectWithoutCreatedByInput[]
    createMany?: TeamMeetingCreateManyCreatedByInputEnvelope
    connect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
  }

  export type MeetingRecordingUncheckedCreateNestedManyWithoutAddedByInput = {
    create?: XOR<MeetingRecordingCreateWithoutAddedByInput, MeetingRecordingUncheckedCreateWithoutAddedByInput> | MeetingRecordingCreateWithoutAddedByInput[] | MeetingRecordingUncheckedCreateWithoutAddedByInput[]
    connectOrCreate?: MeetingRecordingCreateOrConnectWithoutAddedByInput | MeetingRecordingCreateOrConnectWithoutAddedByInput[]
    createMany?: MeetingRecordingCreateManyAddedByInputEnvelope
    connect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type TaskUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TaskCreateWithoutCreatedByInput, TaskUncheckedCreateWithoutCreatedByInput> | TaskCreateWithoutCreatedByInput[] | TaskUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCreatedByInput | TaskCreateOrConnectWithoutCreatedByInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutCreatedByInput | TaskUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TaskCreateManyCreatedByInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutCreatedByInput | TaskUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutCreatedByInput | TaskUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ProjectCreateWithoutCreatedByInput, ProjectUncheckedCreateWithoutCreatedByInput> | ProjectCreateWithoutCreatedByInput[] | ProjectUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCreatedByInput | ProjectCreateOrConnectWithoutCreatedByInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutCreatedByInput | ProjectUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ProjectCreateManyCreatedByInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutCreatedByInput | ProjectUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutCreatedByInput | ProjectUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectUserCreateWithoutUserInput, ProjectUserUncheckedCreateWithoutUserInput> | ProjectUserCreateWithoutUserInput[] | ProjectUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectUserCreateOrConnectWithoutUserInput | ProjectUserCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUserUpsertWithWhereUniqueWithoutUserInput | ProjectUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectUserCreateManyUserInputEnvelope
    set?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    disconnect?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    delete?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    connect?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    update?: ProjectUserUpdateWithWhereUniqueWithoutUserInput | ProjectUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUserUpdateManyWithWhereWithoutUserInput | ProjectUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectUserScalarWhereInput | ProjectUserScalarWhereInput[]
  }

  export type ActivityLogUpdateManyWithoutActorNestedInput = {
    create?: XOR<ActivityLogCreateWithoutActorInput, ActivityLogUncheckedCreateWithoutActorInput> | ActivityLogCreateWithoutActorInput[] | ActivityLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutActorInput | ActivityLogCreateOrConnectWithoutActorInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutActorInput | ActivityLogUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: ActivityLogCreateManyActorInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutActorInput | ActivityLogUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutActorInput | ActivityLogUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type TeamUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TeamCreateWithoutCreatedByInput, TeamUncheckedCreateWithoutCreatedByInput> | TeamCreateWithoutCreatedByInput[] | TeamUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCreatedByInput | TeamCreateOrConnectWithoutCreatedByInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutCreatedByInput | TeamUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TeamCreateManyCreatedByInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutCreatedByInput | TeamUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutCreatedByInput | TeamUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type TeamMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput> | TeamMemberCreateWithoutUserInput[] | TeamMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput | TeamMemberCreateOrConnectWithoutUserInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutUserInput | TeamMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TeamMemberCreateManyUserInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutUserInput | TeamMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutUserInput | TeamMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type TeamMeetingUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TeamMeetingCreateWithoutCreatedByInput, TeamMeetingUncheckedCreateWithoutCreatedByInput> | TeamMeetingCreateWithoutCreatedByInput[] | TeamMeetingUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutCreatedByInput | TeamMeetingCreateOrConnectWithoutCreatedByInput[]
    upsert?: TeamMeetingUpsertWithWhereUniqueWithoutCreatedByInput | TeamMeetingUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TeamMeetingCreateManyCreatedByInputEnvelope
    set?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    disconnect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    delete?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    connect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    update?: TeamMeetingUpdateWithWhereUniqueWithoutCreatedByInput | TeamMeetingUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TeamMeetingUpdateManyWithWhereWithoutCreatedByInput | TeamMeetingUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TeamMeetingScalarWhereInput | TeamMeetingScalarWhereInput[]
  }

  export type MeetingRecordingUpdateManyWithoutAddedByNestedInput = {
    create?: XOR<MeetingRecordingCreateWithoutAddedByInput, MeetingRecordingUncheckedCreateWithoutAddedByInput> | MeetingRecordingCreateWithoutAddedByInput[] | MeetingRecordingUncheckedCreateWithoutAddedByInput[]
    connectOrCreate?: MeetingRecordingCreateOrConnectWithoutAddedByInput | MeetingRecordingCreateOrConnectWithoutAddedByInput[]
    upsert?: MeetingRecordingUpsertWithWhereUniqueWithoutAddedByInput | MeetingRecordingUpsertWithWhereUniqueWithoutAddedByInput[]
    createMany?: MeetingRecordingCreateManyAddedByInputEnvelope
    set?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    disconnect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    delete?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    connect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    update?: MeetingRecordingUpdateWithWhereUniqueWithoutAddedByInput | MeetingRecordingUpdateWithWhereUniqueWithoutAddedByInput[]
    updateMany?: MeetingRecordingUpdateManyWithWhereWithoutAddedByInput | MeetingRecordingUpdateManyWithWhereWithoutAddedByInput[]
    deleteMany?: MeetingRecordingScalarWhereInput | MeetingRecordingScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TaskCreateWithoutCreatedByInput, TaskUncheckedCreateWithoutCreatedByInput> | TaskCreateWithoutCreatedByInput[] | TaskUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCreatedByInput | TaskCreateOrConnectWithoutCreatedByInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutCreatedByInput | TaskUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TaskCreateManyCreatedByInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutCreatedByInput | TaskUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutCreatedByInput | TaskUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ProjectCreateWithoutCreatedByInput, ProjectUncheckedCreateWithoutCreatedByInput> | ProjectCreateWithoutCreatedByInput[] | ProjectUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCreatedByInput | ProjectCreateOrConnectWithoutCreatedByInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutCreatedByInput | ProjectUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ProjectCreateManyCreatedByInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutCreatedByInput | ProjectUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutCreatedByInput | ProjectUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectUserCreateWithoutUserInput, ProjectUserUncheckedCreateWithoutUserInput> | ProjectUserCreateWithoutUserInput[] | ProjectUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectUserCreateOrConnectWithoutUserInput | ProjectUserCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUserUpsertWithWhereUniqueWithoutUserInput | ProjectUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectUserCreateManyUserInputEnvelope
    set?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    disconnect?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    delete?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    connect?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    update?: ProjectUserUpdateWithWhereUniqueWithoutUserInput | ProjectUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUserUpdateManyWithWhereWithoutUserInput | ProjectUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectUserScalarWhereInput | ProjectUserScalarWhereInput[]
  }

  export type ActivityLogUncheckedUpdateManyWithoutActorNestedInput = {
    create?: XOR<ActivityLogCreateWithoutActorInput, ActivityLogUncheckedCreateWithoutActorInput> | ActivityLogCreateWithoutActorInput[] | ActivityLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutActorInput | ActivityLogCreateOrConnectWithoutActorInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutActorInput | ActivityLogUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: ActivityLogCreateManyActorInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutActorInput | ActivityLogUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutActorInput | ActivityLogUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type TeamUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TeamCreateWithoutCreatedByInput, TeamUncheckedCreateWithoutCreatedByInput> | TeamCreateWithoutCreatedByInput[] | TeamUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCreatedByInput | TeamCreateOrConnectWithoutCreatedByInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutCreatedByInput | TeamUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TeamCreateManyCreatedByInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutCreatedByInput | TeamUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutCreatedByInput | TeamUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type TeamMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput> | TeamMemberCreateWithoutUserInput[] | TeamMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput | TeamMemberCreateOrConnectWithoutUserInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutUserInput | TeamMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TeamMemberCreateManyUserInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutUserInput | TeamMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutUserInput | TeamMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type TeamMeetingUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TeamMeetingCreateWithoutCreatedByInput, TeamMeetingUncheckedCreateWithoutCreatedByInput> | TeamMeetingCreateWithoutCreatedByInput[] | TeamMeetingUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutCreatedByInput | TeamMeetingCreateOrConnectWithoutCreatedByInput[]
    upsert?: TeamMeetingUpsertWithWhereUniqueWithoutCreatedByInput | TeamMeetingUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TeamMeetingCreateManyCreatedByInputEnvelope
    set?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    disconnect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    delete?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    connect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    update?: TeamMeetingUpdateWithWhereUniqueWithoutCreatedByInput | TeamMeetingUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TeamMeetingUpdateManyWithWhereWithoutCreatedByInput | TeamMeetingUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TeamMeetingScalarWhereInput | TeamMeetingScalarWhereInput[]
  }

  export type MeetingRecordingUncheckedUpdateManyWithoutAddedByNestedInput = {
    create?: XOR<MeetingRecordingCreateWithoutAddedByInput, MeetingRecordingUncheckedCreateWithoutAddedByInput> | MeetingRecordingCreateWithoutAddedByInput[] | MeetingRecordingUncheckedCreateWithoutAddedByInput[]
    connectOrCreate?: MeetingRecordingCreateOrConnectWithoutAddedByInput | MeetingRecordingCreateOrConnectWithoutAddedByInput[]
    upsert?: MeetingRecordingUpsertWithWhereUniqueWithoutAddedByInput | MeetingRecordingUpsertWithWhereUniqueWithoutAddedByInput[]
    createMany?: MeetingRecordingCreateManyAddedByInputEnvelope
    set?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    disconnect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    delete?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    connect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    update?: MeetingRecordingUpdateWithWhereUniqueWithoutAddedByInput | MeetingRecordingUpdateWithWhereUniqueWithoutAddedByInput[]
    updateMany?: MeetingRecordingUpdateManyWithWhereWithoutAddedByInput | MeetingRecordingUpdateManyWithWhereWithoutAddedByInput[]
    deleteMany?: MeetingRecordingScalarWhereInput | MeetingRecordingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreatedTeamsInput = {
    create?: XOR<UserCreateWithoutCreatedTeamsInput, UserUncheckedCreateWithoutCreatedTeamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTeamsInput
    connect?: UserWhereUniqueInput
  }

  export type TeamMemberCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutTeamInput = {
    create?: XOR<ProjectCreateWithoutTeamInput, ProjectUncheckedCreateWithoutTeamInput> | ProjectCreateWithoutTeamInput[] | ProjectUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutTeamInput | ProjectCreateOrConnectWithoutTeamInput[]
    createMany?: ProjectCreateManyTeamInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type TeamMeetingCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMeetingCreateWithoutTeamInput, TeamMeetingUncheckedCreateWithoutTeamInput> | TeamMeetingCreateWithoutTeamInput[] | TeamMeetingUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutTeamInput | TeamMeetingCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMeetingCreateManyTeamInputEnvelope
    connect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
  }

  export type MeetingRecordingCreateNestedManyWithoutTeamInput = {
    create?: XOR<MeetingRecordingCreateWithoutTeamInput, MeetingRecordingUncheckedCreateWithoutTeamInput> | MeetingRecordingCreateWithoutTeamInput[] | MeetingRecordingUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: MeetingRecordingCreateOrConnectWithoutTeamInput | MeetingRecordingCreateOrConnectWithoutTeamInput[]
    createMany?: MeetingRecordingCreateManyTeamInputEnvelope
    connect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
  }

  export type TeamMemberUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<ProjectCreateWithoutTeamInput, ProjectUncheckedCreateWithoutTeamInput> | ProjectCreateWithoutTeamInput[] | ProjectUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutTeamInput | ProjectCreateOrConnectWithoutTeamInput[]
    createMany?: ProjectCreateManyTeamInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type TeamMeetingUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMeetingCreateWithoutTeamInput, TeamMeetingUncheckedCreateWithoutTeamInput> | TeamMeetingCreateWithoutTeamInput[] | TeamMeetingUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutTeamInput | TeamMeetingCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMeetingCreateManyTeamInputEnvelope
    connect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
  }

  export type MeetingRecordingUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<MeetingRecordingCreateWithoutTeamInput, MeetingRecordingUncheckedCreateWithoutTeamInput> | MeetingRecordingCreateWithoutTeamInput[] | MeetingRecordingUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: MeetingRecordingCreateOrConnectWithoutTeamInput | MeetingRecordingCreateOrConnectWithoutTeamInput[]
    createMany?: MeetingRecordingCreateManyTeamInputEnvelope
    connect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutCreatedTeamsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedTeamsInput, UserUncheckedCreateWithoutCreatedTeamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTeamsInput
    upsert?: UserUpsertWithoutCreatedTeamsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedTeamsInput, UserUpdateWithoutCreatedTeamsInput>, UserUncheckedUpdateWithoutCreatedTeamsInput>
  }

  export type TeamMemberUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutTeamInput | TeamMemberUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutTeamInput | TeamMemberUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutTeamInput | TeamMemberUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutTeamNestedInput = {
    create?: XOR<ProjectCreateWithoutTeamInput, ProjectUncheckedCreateWithoutTeamInput> | ProjectCreateWithoutTeamInput[] | ProjectUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutTeamInput | ProjectCreateOrConnectWithoutTeamInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutTeamInput | ProjectUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: ProjectCreateManyTeamInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutTeamInput | ProjectUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutTeamInput | ProjectUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type TeamMeetingUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMeetingCreateWithoutTeamInput, TeamMeetingUncheckedCreateWithoutTeamInput> | TeamMeetingCreateWithoutTeamInput[] | TeamMeetingUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutTeamInput | TeamMeetingCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMeetingUpsertWithWhereUniqueWithoutTeamInput | TeamMeetingUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMeetingCreateManyTeamInputEnvelope
    set?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    disconnect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    delete?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    connect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    update?: TeamMeetingUpdateWithWhereUniqueWithoutTeamInput | TeamMeetingUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMeetingUpdateManyWithWhereWithoutTeamInput | TeamMeetingUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMeetingScalarWhereInput | TeamMeetingScalarWhereInput[]
  }

  export type MeetingRecordingUpdateManyWithoutTeamNestedInput = {
    create?: XOR<MeetingRecordingCreateWithoutTeamInput, MeetingRecordingUncheckedCreateWithoutTeamInput> | MeetingRecordingCreateWithoutTeamInput[] | MeetingRecordingUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: MeetingRecordingCreateOrConnectWithoutTeamInput | MeetingRecordingCreateOrConnectWithoutTeamInput[]
    upsert?: MeetingRecordingUpsertWithWhereUniqueWithoutTeamInput | MeetingRecordingUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: MeetingRecordingCreateManyTeamInputEnvelope
    set?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    disconnect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    delete?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    connect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    update?: MeetingRecordingUpdateWithWhereUniqueWithoutTeamInput | MeetingRecordingUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: MeetingRecordingUpdateManyWithWhereWithoutTeamInput | MeetingRecordingUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: MeetingRecordingScalarWhereInput | MeetingRecordingScalarWhereInput[]
  }

  export type TeamMemberUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutTeamInput | TeamMemberUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutTeamInput | TeamMemberUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutTeamInput | TeamMemberUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<ProjectCreateWithoutTeamInput, ProjectUncheckedCreateWithoutTeamInput> | ProjectCreateWithoutTeamInput[] | ProjectUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutTeamInput | ProjectCreateOrConnectWithoutTeamInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutTeamInput | ProjectUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: ProjectCreateManyTeamInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutTeamInput | ProjectUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutTeamInput | ProjectUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type TeamMeetingUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMeetingCreateWithoutTeamInput, TeamMeetingUncheckedCreateWithoutTeamInput> | TeamMeetingCreateWithoutTeamInput[] | TeamMeetingUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutTeamInput | TeamMeetingCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMeetingUpsertWithWhereUniqueWithoutTeamInput | TeamMeetingUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMeetingCreateManyTeamInputEnvelope
    set?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    disconnect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    delete?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    connect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    update?: TeamMeetingUpdateWithWhereUniqueWithoutTeamInput | TeamMeetingUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMeetingUpdateManyWithWhereWithoutTeamInput | TeamMeetingUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMeetingScalarWhereInput | TeamMeetingScalarWhereInput[]
  }

  export type MeetingRecordingUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<MeetingRecordingCreateWithoutTeamInput, MeetingRecordingUncheckedCreateWithoutTeamInput> | MeetingRecordingCreateWithoutTeamInput[] | MeetingRecordingUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: MeetingRecordingCreateOrConnectWithoutTeamInput | MeetingRecordingCreateOrConnectWithoutTeamInput[]
    upsert?: MeetingRecordingUpsertWithWhereUniqueWithoutTeamInput | MeetingRecordingUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: MeetingRecordingCreateManyTeamInputEnvelope
    set?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    disconnect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    delete?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    connect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    update?: MeetingRecordingUpdateWithWhereUniqueWithoutTeamInput | MeetingRecordingUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: MeetingRecordingUpdateManyWithWhereWithoutTeamInput | MeetingRecordingUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: MeetingRecordingScalarWhereInput | MeetingRecordingScalarWhereInput[]
  }

  export type TeamCreateNestedOneWithoutMembersInput = {
    create?: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMembersInput
    connect?: TeamWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTeamMembersInput = {
    create?: XOR<UserCreateWithoutTeamMembersInput, UserUncheckedCreateWithoutTeamMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamMembersInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTeamRoleFieldUpdateOperationsInput = {
    set?: $Enums.TeamRole
  }

  export type TeamUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMembersInput
    upsert?: TeamUpsertWithoutMembersInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutMembersInput, TeamUpdateWithoutMembersInput>, TeamUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutTeamMembersNestedInput = {
    create?: XOR<UserCreateWithoutTeamMembersInput, UserUncheckedCreateWithoutTeamMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamMembersInput
    upsert?: UserUpsertWithoutTeamMembersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTeamMembersInput, UserUpdateWithoutTeamMembersInput>, UserUncheckedUpdateWithoutTeamMembersInput>
  }

  export type TaskCreateNestedManyWithoutProjectInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutProjectsInput = {
    create?: XOR<TeamCreateWithoutProjectsInput, TeamUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutProjectsInput
    connect?: TeamWhereUniqueInput
  }

  export type TeamMeetingCreateNestedManyWithoutProjectInput = {
    create?: XOR<TeamMeetingCreateWithoutProjectInput, TeamMeetingUncheckedCreateWithoutProjectInput> | TeamMeetingCreateWithoutProjectInput[] | TeamMeetingUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutProjectInput | TeamMeetingCreateOrConnectWithoutProjectInput[]
    createMany?: TeamMeetingCreateManyProjectInputEnvelope
    connect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
  }

  export type ProjectUserCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectUserCreateWithoutProjectInput, ProjectUserUncheckedCreateWithoutProjectInput> | ProjectUserCreateWithoutProjectInput[] | ProjectUserUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectUserCreateOrConnectWithoutProjectInput | ProjectUserCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectUserCreateManyProjectInputEnvelope
    connect?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
  }

  export type ActivityLogCreateNestedManyWithoutProjectInput = {
    create?: XOR<ActivityLogCreateWithoutProjectInput, ActivityLogUncheckedCreateWithoutProjectInput> | ActivityLogCreateWithoutProjectInput[] | ActivityLogUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutProjectInput | ActivityLogCreateOrConnectWithoutProjectInput[]
    createMany?: ActivityLogCreateManyProjectInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TeamMeetingUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<TeamMeetingCreateWithoutProjectInput, TeamMeetingUncheckedCreateWithoutProjectInput> | TeamMeetingCreateWithoutProjectInput[] | TeamMeetingUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutProjectInput | TeamMeetingCreateOrConnectWithoutProjectInput[]
    createMany?: TeamMeetingCreateManyProjectInputEnvelope
    connect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
  }

  export type ProjectUserUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectUserCreateWithoutProjectInput, ProjectUserUncheckedCreateWithoutProjectInput> | ProjectUserCreateWithoutProjectInput[] | ProjectUserUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectUserCreateOrConnectWithoutProjectInput | ProjectUserCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectUserCreateManyProjectInputEnvelope
    connect?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
  }

  export type ActivityLogUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ActivityLogCreateWithoutProjectInput, ActivityLogUncheckedCreateWithoutProjectInput> | ActivityLogCreateWithoutProjectInput[] | ActivityLogUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutProjectInput | ActivityLogCreateOrConnectWithoutProjectInput[]
    createMany?: ActivityLogCreateManyProjectInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type TaskUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutProjectInput | TaskUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutProjectInput | TaskUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutProjectInput | TaskUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type TeamUpdateOneWithoutProjectsNestedInput = {
    create?: XOR<TeamCreateWithoutProjectsInput, TeamUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutProjectsInput
    upsert?: TeamUpsertWithoutProjectsInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutProjectsInput, TeamUpdateWithoutProjectsInput>, TeamUncheckedUpdateWithoutProjectsInput>
  }

  export type TeamMeetingUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TeamMeetingCreateWithoutProjectInput, TeamMeetingUncheckedCreateWithoutProjectInput> | TeamMeetingCreateWithoutProjectInput[] | TeamMeetingUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutProjectInput | TeamMeetingCreateOrConnectWithoutProjectInput[]
    upsert?: TeamMeetingUpsertWithWhereUniqueWithoutProjectInput | TeamMeetingUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TeamMeetingCreateManyProjectInputEnvelope
    set?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    disconnect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    delete?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    connect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    update?: TeamMeetingUpdateWithWhereUniqueWithoutProjectInput | TeamMeetingUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TeamMeetingUpdateManyWithWhereWithoutProjectInput | TeamMeetingUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TeamMeetingScalarWhereInput | TeamMeetingScalarWhereInput[]
  }

  export type ProjectUserUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectUserCreateWithoutProjectInput, ProjectUserUncheckedCreateWithoutProjectInput> | ProjectUserCreateWithoutProjectInput[] | ProjectUserUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectUserCreateOrConnectWithoutProjectInput | ProjectUserCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectUserUpsertWithWhereUniqueWithoutProjectInput | ProjectUserUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectUserCreateManyProjectInputEnvelope
    set?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    disconnect?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    delete?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    connect?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    update?: ProjectUserUpdateWithWhereUniqueWithoutProjectInput | ProjectUserUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectUserUpdateManyWithWhereWithoutProjectInput | ProjectUserUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectUserScalarWhereInput | ProjectUserScalarWhereInput[]
  }

  export type ActivityLogUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ActivityLogCreateWithoutProjectInput, ActivityLogUncheckedCreateWithoutProjectInput> | ActivityLogCreateWithoutProjectInput[] | ActivityLogUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutProjectInput | ActivityLogCreateOrConnectWithoutProjectInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutProjectInput | ActivityLogUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ActivityLogCreateManyProjectInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutProjectInput | ActivityLogUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutProjectInput | ActivityLogUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutProjectInput | TaskUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutProjectInput | TaskUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutProjectInput | TaskUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TeamMeetingUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TeamMeetingCreateWithoutProjectInput, TeamMeetingUncheckedCreateWithoutProjectInput> | TeamMeetingCreateWithoutProjectInput[] | TeamMeetingUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutProjectInput | TeamMeetingCreateOrConnectWithoutProjectInput[]
    upsert?: TeamMeetingUpsertWithWhereUniqueWithoutProjectInput | TeamMeetingUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TeamMeetingCreateManyProjectInputEnvelope
    set?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    disconnect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    delete?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    connect?: TeamMeetingWhereUniqueInput | TeamMeetingWhereUniqueInput[]
    update?: TeamMeetingUpdateWithWhereUniqueWithoutProjectInput | TeamMeetingUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TeamMeetingUpdateManyWithWhereWithoutProjectInput | TeamMeetingUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TeamMeetingScalarWhereInput | TeamMeetingScalarWhereInput[]
  }

  export type ProjectUserUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectUserCreateWithoutProjectInput, ProjectUserUncheckedCreateWithoutProjectInput> | ProjectUserCreateWithoutProjectInput[] | ProjectUserUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectUserCreateOrConnectWithoutProjectInput | ProjectUserCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectUserUpsertWithWhereUniqueWithoutProjectInput | ProjectUserUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectUserCreateManyProjectInputEnvelope
    set?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    disconnect?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    delete?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    connect?: ProjectUserWhereUniqueInput | ProjectUserWhereUniqueInput[]
    update?: ProjectUserUpdateWithWhereUniqueWithoutProjectInput | ProjectUserUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectUserUpdateManyWithWhereWithoutProjectInput | ProjectUserUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectUserScalarWhereInput | ProjectUserScalarWhereInput[]
  }

  export type ActivityLogUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ActivityLogCreateWithoutProjectInput, ActivityLogUncheckedCreateWithoutProjectInput> | ActivityLogCreateWithoutProjectInput[] | ActivityLogUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutProjectInput | ActivityLogCreateOrConnectWithoutProjectInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutProjectInput | ActivityLogUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ActivityLogCreateManyProjectInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutProjectInput | ActivityLogUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutProjectInput | ActivityLogUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutTasksInput = {
    create?: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTasksInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedTasksInput = {
    create?: XOR<UserCreateWithoutCreatedTasksInput, UserUncheckedCreateWithoutCreatedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTasksInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProjectUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput
    upsert?: ProjectUpsertWithoutTasksInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutTasksInput, ProjectUpdateWithoutTasksInput>, ProjectUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateOneWithoutTasksNestedInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    upsert?: UserUpsertWithoutTasksInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksInput, UserUpdateWithoutTasksInput>, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateOneRequiredWithoutCreatedTasksNestedInput = {
    create?: XOR<UserCreateWithoutCreatedTasksInput, UserUncheckedCreateWithoutCreatedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTasksInput
    upsert?: UserUpsertWithoutCreatedTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedTasksInput, UserUpdateWithoutCreatedTasksInput>, UserUncheckedUpdateWithoutCreatedTasksInput>
  }

  export type UserCreateNestedOneWithoutUserProjectsInput = {
    create?: XOR<UserCreateWithoutUserProjectsInput, UserUncheckedCreateWithoutUserProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutUsersInput = {
    create?: XOR<ProjectCreateWithoutUsersInput, ProjectUncheckedCreateWithoutUsersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutUsersInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumProjectRoleFieldUpdateOperationsInput = {
    set?: $Enums.ProjectRole
  }

  export type EnumProjectCollaboratorScopeFieldUpdateOperationsInput = {
    set?: $Enums.ProjectCollaboratorScope
  }

  export type UserUpdateOneRequiredWithoutUserProjectsNestedInput = {
    create?: XOR<UserCreateWithoutUserProjectsInput, UserUncheckedCreateWithoutUserProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserProjectsInput
    upsert?: UserUpsertWithoutUserProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserProjectsInput, UserUpdateWithoutUserProjectsInput>, UserUncheckedUpdateWithoutUserProjectsInput>
  }

  export type ProjectUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<ProjectCreateWithoutUsersInput, ProjectUncheckedCreateWithoutUsersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutUsersInput
    upsert?: ProjectUpsertWithoutUsersInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutUsersInput, ProjectUpdateWithoutUsersInput>, ProjectUncheckedUpdateWithoutUsersInput>
  }

  export type ProjectCreateNestedOneWithoutActivityLogsInput = {
    create?: XOR<ProjectCreateWithoutActivityLogsInput, ProjectUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutActivityLogsInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutActivityLogsInput = {
    create?: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumActivityTypeFieldUpdateOperationsInput = {
    set?: $Enums.ActivityType
  }

  export type ProjectUpdateOneRequiredWithoutActivityLogsNestedInput = {
    create?: XOR<ProjectCreateWithoutActivityLogsInput, ProjectUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutActivityLogsInput
    upsert?: ProjectUpsertWithoutActivityLogsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutActivityLogsInput, ProjectUpdateWithoutActivityLogsInput>, ProjectUncheckedUpdateWithoutActivityLogsInput>
  }

  export type UserUpdateOneRequiredWithoutActivityLogsNestedInput = {
    create?: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogsInput
    upsert?: UserUpsertWithoutActivityLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivityLogsInput, UserUpdateWithoutActivityLogsInput>, UserUncheckedUpdateWithoutActivityLogsInput>
  }

  export type TeamCreateNestedOneWithoutMeetingsInput = {
    create?: XOR<TeamCreateWithoutMeetingsInput, TeamUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMeetingsInput
    connect?: TeamWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutMeetingsInput = {
    create?: XOR<ProjectCreateWithoutMeetingsInput, ProjectUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMeetingsInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedMeetingsInput = {
    create?: XOR<UserCreateWithoutCreatedMeetingsInput, UserUncheckedCreateWithoutCreatedMeetingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedMeetingsInput
    connect?: UserWhereUniqueInput
  }

  export type MeetingRecordingCreateNestedManyWithoutMeetingInput = {
    create?: XOR<MeetingRecordingCreateWithoutMeetingInput, MeetingRecordingUncheckedCreateWithoutMeetingInput> | MeetingRecordingCreateWithoutMeetingInput[] | MeetingRecordingUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: MeetingRecordingCreateOrConnectWithoutMeetingInput | MeetingRecordingCreateOrConnectWithoutMeetingInput[]
    createMany?: MeetingRecordingCreateManyMeetingInputEnvelope
    connect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
  }

  export type MeetingRecordingUncheckedCreateNestedManyWithoutMeetingInput = {
    create?: XOR<MeetingRecordingCreateWithoutMeetingInput, MeetingRecordingUncheckedCreateWithoutMeetingInput> | MeetingRecordingCreateWithoutMeetingInput[] | MeetingRecordingUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: MeetingRecordingCreateOrConnectWithoutMeetingInput | MeetingRecordingCreateOrConnectWithoutMeetingInput[]
    createMany?: MeetingRecordingCreateManyMeetingInputEnvelope
    connect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumMeetingStatusFieldUpdateOperationsInput = {
    set?: $Enums.MeetingStatus
  }

  export type EnumMeetingProviderFieldUpdateOperationsInput = {
    set?: $Enums.MeetingProvider
  }

  export type TeamUpdateOneRequiredWithoutMeetingsNestedInput = {
    create?: XOR<TeamCreateWithoutMeetingsInput, TeamUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMeetingsInput
    upsert?: TeamUpsertWithoutMeetingsInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutMeetingsInput, TeamUpdateWithoutMeetingsInput>, TeamUncheckedUpdateWithoutMeetingsInput>
  }

  export type ProjectUpdateOneWithoutMeetingsNestedInput = {
    create?: XOR<ProjectCreateWithoutMeetingsInput, ProjectUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMeetingsInput
    upsert?: ProjectUpsertWithoutMeetingsInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutMeetingsInput, ProjectUpdateWithoutMeetingsInput>, ProjectUncheckedUpdateWithoutMeetingsInput>
  }

  export type UserUpdateOneRequiredWithoutCreatedMeetingsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedMeetingsInput, UserUncheckedCreateWithoutCreatedMeetingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedMeetingsInput
    upsert?: UserUpsertWithoutCreatedMeetingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedMeetingsInput, UserUpdateWithoutCreatedMeetingsInput>, UserUncheckedUpdateWithoutCreatedMeetingsInput>
  }

  export type MeetingRecordingUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<MeetingRecordingCreateWithoutMeetingInput, MeetingRecordingUncheckedCreateWithoutMeetingInput> | MeetingRecordingCreateWithoutMeetingInput[] | MeetingRecordingUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: MeetingRecordingCreateOrConnectWithoutMeetingInput | MeetingRecordingCreateOrConnectWithoutMeetingInput[]
    upsert?: MeetingRecordingUpsertWithWhereUniqueWithoutMeetingInput | MeetingRecordingUpsertWithWhereUniqueWithoutMeetingInput[]
    createMany?: MeetingRecordingCreateManyMeetingInputEnvelope
    set?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    disconnect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    delete?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    connect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    update?: MeetingRecordingUpdateWithWhereUniqueWithoutMeetingInput | MeetingRecordingUpdateWithWhereUniqueWithoutMeetingInput[]
    updateMany?: MeetingRecordingUpdateManyWithWhereWithoutMeetingInput | MeetingRecordingUpdateManyWithWhereWithoutMeetingInput[]
    deleteMany?: MeetingRecordingScalarWhereInput | MeetingRecordingScalarWhereInput[]
  }

  export type MeetingRecordingUncheckedUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<MeetingRecordingCreateWithoutMeetingInput, MeetingRecordingUncheckedCreateWithoutMeetingInput> | MeetingRecordingCreateWithoutMeetingInput[] | MeetingRecordingUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: MeetingRecordingCreateOrConnectWithoutMeetingInput | MeetingRecordingCreateOrConnectWithoutMeetingInput[]
    upsert?: MeetingRecordingUpsertWithWhereUniqueWithoutMeetingInput | MeetingRecordingUpsertWithWhereUniqueWithoutMeetingInput[]
    createMany?: MeetingRecordingCreateManyMeetingInputEnvelope
    set?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    disconnect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    delete?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    connect?: MeetingRecordingWhereUniqueInput | MeetingRecordingWhereUniqueInput[]
    update?: MeetingRecordingUpdateWithWhereUniqueWithoutMeetingInput | MeetingRecordingUpdateWithWhereUniqueWithoutMeetingInput[]
    updateMany?: MeetingRecordingUpdateManyWithWhereWithoutMeetingInput | MeetingRecordingUpdateManyWithWhereWithoutMeetingInput[]
    deleteMany?: MeetingRecordingScalarWhereInput | MeetingRecordingScalarWhereInput[]
  }

  export type TeamMeetingCreateNestedOneWithoutMeetingRecordingsInput = {
    create?: XOR<TeamMeetingCreateWithoutMeetingRecordingsInput, TeamMeetingUncheckedCreateWithoutMeetingRecordingsInput>
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutMeetingRecordingsInput
    connect?: TeamMeetingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAddedMeetingRecordingsInput = {
    create?: XOR<UserCreateWithoutAddedMeetingRecordingsInput, UserUncheckedCreateWithoutAddedMeetingRecordingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddedMeetingRecordingsInput
    connect?: UserWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutRecordingsInput = {
    create?: XOR<TeamCreateWithoutRecordingsInput, TeamUncheckedCreateWithoutRecordingsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutRecordingsInput
    connect?: TeamWhereUniqueInput
  }

  export type TeamMeetingUpdateOneRequiredWithoutMeetingRecordingsNestedInput = {
    create?: XOR<TeamMeetingCreateWithoutMeetingRecordingsInput, TeamMeetingUncheckedCreateWithoutMeetingRecordingsInput>
    connectOrCreate?: TeamMeetingCreateOrConnectWithoutMeetingRecordingsInput
    upsert?: TeamMeetingUpsertWithoutMeetingRecordingsInput
    connect?: TeamMeetingWhereUniqueInput
    update?: XOR<XOR<TeamMeetingUpdateToOneWithWhereWithoutMeetingRecordingsInput, TeamMeetingUpdateWithoutMeetingRecordingsInput>, TeamMeetingUncheckedUpdateWithoutMeetingRecordingsInput>
  }

  export type UserUpdateOneRequiredWithoutAddedMeetingRecordingsNestedInput = {
    create?: XOR<UserCreateWithoutAddedMeetingRecordingsInput, UserUncheckedCreateWithoutAddedMeetingRecordingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddedMeetingRecordingsInput
    upsert?: UserUpsertWithoutAddedMeetingRecordingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAddedMeetingRecordingsInput, UserUpdateWithoutAddedMeetingRecordingsInput>, UserUncheckedUpdateWithoutAddedMeetingRecordingsInput>
  }

  export type TeamUpdateOneWithoutRecordingsNestedInput = {
    create?: XOR<TeamCreateWithoutRecordingsInput, TeamUncheckedCreateWithoutRecordingsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutRecordingsInput
    upsert?: TeamUpsertWithoutRecordingsInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutRecordingsInput, TeamUpdateWithoutRecordingsInput>, TeamUncheckedUpdateWithoutRecordingsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumTeamRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamRole | EnumTeamRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TeamRole[]
    notIn?: $Enums.TeamRole[]
    not?: NestedEnumTeamRoleFilter<$PrismaModel> | $Enums.TeamRole
  }

  export type NestedEnumTeamRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamRole | EnumTeamRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TeamRole[]
    notIn?: $Enums.TeamRole[]
    not?: NestedEnumTeamRoleWithAggregatesFilter<$PrismaModel> | $Enums.TeamRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTeamRoleFilter<$PrismaModel>
    _max?: NestedEnumTeamRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumProjectRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectRole | EnumProjectRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectRole[]
    notIn?: $Enums.ProjectRole[]
    not?: NestedEnumProjectRoleFilter<$PrismaModel> | $Enums.ProjectRole
  }

  export type NestedEnumProjectCollaboratorScopeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectCollaboratorScope | EnumProjectCollaboratorScopeFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectCollaboratorScope[]
    notIn?: $Enums.ProjectCollaboratorScope[]
    not?: NestedEnumProjectCollaboratorScopeFilter<$PrismaModel> | $Enums.ProjectCollaboratorScope
  }

  export type NestedEnumProjectRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectRole | EnumProjectRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectRole[]
    notIn?: $Enums.ProjectRole[]
    not?: NestedEnumProjectRoleWithAggregatesFilter<$PrismaModel> | $Enums.ProjectRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectRoleFilter<$PrismaModel>
    _max?: NestedEnumProjectRoleFilter<$PrismaModel>
  }

  export type NestedEnumProjectCollaboratorScopeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectCollaboratorScope | EnumProjectCollaboratorScopeFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectCollaboratorScope[]
    notIn?: $Enums.ProjectCollaboratorScope[]
    not?: NestedEnumProjectCollaboratorScopeWithAggregatesFilter<$PrismaModel> | $Enums.ProjectCollaboratorScope
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectCollaboratorScopeFilter<$PrismaModel>
    _max?: NestedEnumProjectCollaboratorScopeFilter<$PrismaModel>
  }

  export type NestedEnumActivityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityType | EnumActivityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActivityType[]
    notIn?: $Enums.ActivityType[]
    not?: NestedEnumActivityTypeFilter<$PrismaModel> | $Enums.ActivityType
  }

  export type NestedEnumActivityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityType | EnumActivityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActivityType[]
    notIn?: $Enums.ActivityType[]
    not?: NestedEnumActivityTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActivityType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActivityTypeFilter<$PrismaModel>
    _max?: NestedEnumActivityTypeFilter<$PrismaModel>
  }

  export type NestedEnumMeetingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MeetingStatus | EnumMeetingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MeetingStatus[]
    notIn?: $Enums.MeetingStatus[]
    not?: NestedEnumMeetingStatusFilter<$PrismaModel> | $Enums.MeetingStatus
  }

  export type NestedEnumMeetingProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.MeetingProvider | EnumMeetingProviderFieldRefInput<$PrismaModel>
    in?: $Enums.MeetingProvider[]
    notIn?: $Enums.MeetingProvider[]
    not?: NestedEnumMeetingProviderFilter<$PrismaModel> | $Enums.MeetingProvider
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumMeetingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MeetingStatus | EnumMeetingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MeetingStatus[]
    notIn?: $Enums.MeetingStatus[]
    not?: NestedEnumMeetingStatusWithAggregatesFilter<$PrismaModel> | $Enums.MeetingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMeetingStatusFilter<$PrismaModel>
    _max?: NestedEnumMeetingStatusFilter<$PrismaModel>
  }

  export type NestedEnumMeetingProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MeetingProvider | EnumMeetingProviderFieldRefInput<$PrismaModel>
    in?: $Enums.MeetingProvider[]
    notIn?: $Enums.MeetingProvider[]
    not?: NestedEnumMeetingProviderWithAggregatesFilter<$PrismaModel> | $Enums.MeetingProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMeetingProviderFilter<$PrismaModel>
    _max?: NestedEnumMeetingProviderFilter<$PrismaModel>
  }

  export type TaskCreateWithoutUserInput = {
    id?: string
    name: string
    description: string
    status?: string
    dueDate?: Date | string | null
    solutionDescription?: string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    createdBy: UserCreateNestedOneWithoutCreatedTasksInput
  }

  export type TaskUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description: string
    status?: string
    dueDate?: Date | string | null
    projectId: string
    createdById: string
    solutionDescription?: string | null
  }

  export type TaskCreateOrConnectWithoutUserInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskCreateManyUserInputEnvelope = {
    data: TaskCreateManyUserInput | TaskCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description: string
    status?: string
    dueDate?: Date | string | null
    solutionDescription?: string | null
    project: ProjectCreateNestedOneWithoutTasksInput
    user?: UserCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description: string
    status?: string
    dueDate?: Date | string | null
    projectId: string
    userId?: string | null
    solutionDescription?: string | null
  }

  export type TaskCreateOrConnectWithoutCreatedByInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCreatedByInput, TaskUncheckedCreateWithoutCreatedByInput>
  }

  export type TaskCreateManyCreatedByInputEnvelope = {
    data: TaskCreateManyCreatedByInput | TaskCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    tasks?: TaskCreateNestedManyWithoutProjectInput
    team?: TeamCreateNestedOneWithoutProjectsInput
    meetings?: TeamMeetingCreateNestedManyWithoutProjectInput
    users?: ProjectUserCreateNestedManyWithoutProjectInput
    activityLogs?: ActivityLogCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    teamId?: string | null
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
    meetings?: TeamMeetingUncheckedCreateNestedManyWithoutProjectInput
    users?: ProjectUserUncheckedCreateNestedManyWithoutProjectInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutCreatedByInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutCreatedByInput, ProjectUncheckedCreateWithoutCreatedByInput>
  }

  export type ProjectCreateManyCreatedByInputEnvelope = {
    data: ProjectCreateManyCreatedByInput | ProjectCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUserCreateWithoutUserInput = {
    id?: string
    role?: $Enums.ProjectRole
    scope?: $Enums.ProjectCollaboratorScope
    project: ProjectCreateNestedOneWithoutUsersInput
  }

  export type ProjectUserUncheckedCreateWithoutUserInput = {
    id?: string
    projectId: string
    role?: $Enums.ProjectRole
    scope?: $Enums.ProjectCollaboratorScope
  }

  export type ProjectUserCreateOrConnectWithoutUserInput = {
    where: ProjectUserWhereUniqueInput
    create: XOR<ProjectUserCreateWithoutUserInput, ProjectUserUncheckedCreateWithoutUserInput>
  }

  export type ProjectUserCreateManyUserInputEnvelope = {
    data: ProjectUserCreateManyUserInput | ProjectUserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActivityLogCreateWithoutActorInput = {
    id?: string
    type: $Enums.ActivityType
    message: string
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutActivityLogsInput
  }

  export type ActivityLogUncheckedCreateWithoutActorInput = {
    id?: string
    projectId: string
    type: $Enums.ActivityType
    message: string
    createdAt?: Date | string
  }

  export type ActivityLogCreateOrConnectWithoutActorInput = {
    where: ActivityLogWhereUniqueInput
    create: XOR<ActivityLogCreateWithoutActorInput, ActivityLogUncheckedCreateWithoutActorInput>
  }

  export type ActivityLogCreateManyActorInputEnvelope = {
    data: ActivityLogCreateManyActorInput | ActivityLogCreateManyActorInput[]
    skipDuplicates?: boolean
  }

  export type TeamCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: TeamMemberCreateNestedManyWithoutTeamInput
    projects?: ProjectCreateNestedManyWithoutTeamInput
    meetings?: TeamMeetingCreateNestedManyWithoutTeamInput
    recordings?: MeetingRecordingCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
    projects?: ProjectUncheckedCreateNestedManyWithoutTeamInput
    meetings?: TeamMeetingUncheckedCreateNestedManyWithoutTeamInput
    recordings?: MeetingRecordingUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutCreatedByInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutCreatedByInput, TeamUncheckedCreateWithoutCreatedByInput>
  }

  export type TeamCreateManyCreatedByInputEnvelope = {
    data: TeamCreateManyCreatedByInput | TeamCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type TeamMemberCreateWithoutUserInput = {
    id?: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
    team: TeamCreateNestedOneWithoutMembersInput
  }

  export type TeamMemberUncheckedCreateWithoutUserInput = {
    id?: string
    teamId: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
  }

  export type TeamMemberCreateOrConnectWithoutUserInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput>
  }

  export type TeamMemberCreateManyUserInputEnvelope = {
    data: TeamMemberCreateManyUserInput | TeamMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TeamMeetingCreateWithoutCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutMeetingsInput
    project?: ProjectCreateNestedOneWithoutMeetingsInput
    meetingRecordings?: MeetingRecordingCreateNestedManyWithoutMeetingInput
  }

  export type TeamMeetingUncheckedCreateWithoutCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    teamId: string
    projectId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    meetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type TeamMeetingCreateOrConnectWithoutCreatedByInput = {
    where: TeamMeetingWhereUniqueInput
    create: XOR<TeamMeetingCreateWithoutCreatedByInput, TeamMeetingUncheckedCreateWithoutCreatedByInput>
  }

  export type TeamMeetingCreateManyCreatedByInputEnvelope = {
    data: TeamMeetingCreateManyCreatedByInput | TeamMeetingCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type MeetingRecordingCreateWithoutAddedByInput = {
    id?: string
    title: string
    url: string
    description?: string | null
    createdAt?: Date | string
    meeting: TeamMeetingCreateNestedOneWithoutMeetingRecordingsInput
    team?: TeamCreateNestedOneWithoutRecordingsInput
  }

  export type MeetingRecordingUncheckedCreateWithoutAddedByInput = {
    id?: string
    title: string
    url: string
    description?: string | null
    createdAt?: Date | string
    meetingId: string
    teamId?: string | null
  }

  export type MeetingRecordingCreateOrConnectWithoutAddedByInput = {
    where: MeetingRecordingWhereUniqueInput
    create: XOR<MeetingRecordingCreateWithoutAddedByInput, MeetingRecordingUncheckedCreateWithoutAddedByInput>
  }

  export type MeetingRecordingCreateManyAddedByInputEnvelope = {
    data: MeetingRecordingCreateManyAddedByInput | MeetingRecordingCreateManyAddedByInput[]
    skipDuplicates?: boolean
  }

  export type TaskUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
  }

  export type TaskUpdateManyWithWhereWithoutUserInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    name?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    projectId?: StringFilter<"Task"> | string
    userId?: StringNullableFilter<"Task"> | string | null
    createdById?: StringFilter<"Task"> | string
    solutionDescription?: StringNullableFilter<"Task"> | string | null
  }

  export type TaskUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutCreatedByInput, TaskUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TaskCreateWithoutCreatedByInput, TaskUncheckedCreateWithoutCreatedByInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutCreatedByInput, TaskUncheckedUpdateWithoutCreatedByInput>
  }

  export type TaskUpdateManyWithWhereWithoutCreatedByInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ProjectUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutCreatedByInput, ProjectUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ProjectCreateWithoutCreatedByInput, ProjectUncheckedCreateWithoutCreatedByInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutCreatedByInput, ProjectUncheckedUpdateWithoutCreatedByInput>
  }

  export type ProjectUpdateManyWithWhereWithoutCreatedByInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    inviteCode?: StringFilter<"Project"> | string
    createdById?: StringFilter<"Project"> | string
    teamId?: StringNullableFilter<"Project"> | string | null
  }

  export type ProjectUserUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectUserWhereUniqueInput
    update: XOR<ProjectUserUpdateWithoutUserInput, ProjectUserUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectUserCreateWithoutUserInput, ProjectUserUncheckedCreateWithoutUserInput>
  }

  export type ProjectUserUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectUserWhereUniqueInput
    data: XOR<ProjectUserUpdateWithoutUserInput, ProjectUserUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUserUpdateManyWithWhereWithoutUserInput = {
    where: ProjectUserScalarWhereInput
    data: XOR<ProjectUserUpdateManyMutationInput, ProjectUserUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectUserScalarWhereInput = {
    AND?: ProjectUserScalarWhereInput | ProjectUserScalarWhereInput[]
    OR?: ProjectUserScalarWhereInput[]
    NOT?: ProjectUserScalarWhereInput | ProjectUserScalarWhereInput[]
    id?: StringFilter<"ProjectUser"> | string
    userId?: StringFilter<"ProjectUser"> | string
    projectId?: StringFilter<"ProjectUser"> | string
    role?: EnumProjectRoleFilter<"ProjectUser"> | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFilter<"ProjectUser"> | $Enums.ProjectCollaboratorScope
  }

  export type ActivityLogUpsertWithWhereUniqueWithoutActorInput = {
    where: ActivityLogWhereUniqueInput
    update: XOR<ActivityLogUpdateWithoutActorInput, ActivityLogUncheckedUpdateWithoutActorInput>
    create: XOR<ActivityLogCreateWithoutActorInput, ActivityLogUncheckedCreateWithoutActorInput>
  }

  export type ActivityLogUpdateWithWhereUniqueWithoutActorInput = {
    where: ActivityLogWhereUniqueInput
    data: XOR<ActivityLogUpdateWithoutActorInput, ActivityLogUncheckedUpdateWithoutActorInput>
  }

  export type ActivityLogUpdateManyWithWhereWithoutActorInput = {
    where: ActivityLogScalarWhereInput
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyWithoutActorInput>
  }

  export type ActivityLogScalarWhereInput = {
    AND?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    OR?: ActivityLogScalarWhereInput[]
    NOT?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    projectId?: StringFilter<"ActivityLog"> | string
    actorUserId?: StringFilter<"ActivityLog"> | string
    type?: EnumActivityTypeFilter<"ActivityLog"> | $Enums.ActivityType
    message?: StringFilter<"ActivityLog"> | string
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }

  export type TeamUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TeamWhereUniqueInput
    update: XOR<TeamUpdateWithoutCreatedByInput, TeamUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TeamCreateWithoutCreatedByInput, TeamUncheckedCreateWithoutCreatedByInput>
  }

  export type TeamUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TeamWhereUniqueInput
    data: XOR<TeamUpdateWithoutCreatedByInput, TeamUncheckedUpdateWithoutCreatedByInput>
  }

  export type TeamUpdateManyWithWhereWithoutCreatedByInput = {
    where: TeamScalarWhereInput
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type TeamScalarWhereInput = {
    AND?: TeamScalarWhereInput | TeamScalarWhereInput[]
    OR?: TeamScalarWhereInput[]
    NOT?: TeamScalarWhereInput | TeamScalarWhereInput[]
    id?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    description?: StringNullableFilter<"Team"> | string | null
    inviteCode?: StringFilter<"Team"> | string
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    createdById?: StringFilter<"Team"> | string
  }

  export type TeamMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: TeamMemberWhereUniqueInput
    update: XOR<TeamMemberUpdateWithoutUserInput, TeamMemberUncheckedUpdateWithoutUserInput>
    create: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput>
  }

  export type TeamMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: TeamMemberWhereUniqueInput
    data: XOR<TeamMemberUpdateWithoutUserInput, TeamMemberUncheckedUpdateWithoutUserInput>
  }

  export type TeamMemberUpdateManyWithWhereWithoutUserInput = {
    where: TeamMemberScalarWhereInput
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type TeamMemberScalarWhereInput = {
    AND?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
    OR?: TeamMemberScalarWhereInput[]
    NOT?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
    id?: StringFilter<"TeamMember"> | string
    teamId?: StringFilter<"TeamMember"> | string
    userId?: StringFilter<"TeamMember"> | string
    role?: EnumTeamRoleFilter<"TeamMember"> | $Enums.TeamRole
    joinedAt?: DateTimeFilter<"TeamMember"> | Date | string
  }

  export type TeamMeetingUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TeamMeetingWhereUniqueInput
    update: XOR<TeamMeetingUpdateWithoutCreatedByInput, TeamMeetingUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TeamMeetingCreateWithoutCreatedByInput, TeamMeetingUncheckedCreateWithoutCreatedByInput>
  }

  export type TeamMeetingUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TeamMeetingWhereUniqueInput
    data: XOR<TeamMeetingUpdateWithoutCreatedByInput, TeamMeetingUncheckedUpdateWithoutCreatedByInput>
  }

  export type TeamMeetingUpdateManyWithWhereWithoutCreatedByInput = {
    where: TeamMeetingScalarWhereInput
    data: XOR<TeamMeetingUpdateManyMutationInput, TeamMeetingUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type TeamMeetingScalarWhereInput = {
    AND?: TeamMeetingScalarWhereInput | TeamMeetingScalarWhereInput[]
    OR?: TeamMeetingScalarWhereInput[]
    NOT?: TeamMeetingScalarWhereInput | TeamMeetingScalarWhereInput[]
    id?: StringFilter<"TeamMeeting"> | string
    title?: StringFilter<"TeamMeeting"> | string
    description?: StringNullableFilter<"TeamMeeting"> | string | null
    notes?: StringNullableFilter<"TeamMeeting"> | string | null
    scheduledAt?: DateTimeFilter<"TeamMeeting"> | Date | string
    durationMinutes?: IntNullableFilter<"TeamMeeting"> | number | null
    status?: EnumMeetingStatusFilter<"TeamMeeting"> | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFilter<"TeamMeeting"> | $Enums.MeetingProvider
    externalUrl?: StringNullableFilter<"TeamMeeting"> | string | null
    teamId?: StringFilter<"TeamMeeting"> | string
    projectId?: StringNullableFilter<"TeamMeeting"> | string | null
    createdById?: StringFilter<"TeamMeeting"> | string
    createdAt?: DateTimeFilter<"TeamMeeting"> | Date | string
    updatedAt?: DateTimeFilter<"TeamMeeting"> | Date | string
  }

  export type MeetingRecordingUpsertWithWhereUniqueWithoutAddedByInput = {
    where: MeetingRecordingWhereUniqueInput
    update: XOR<MeetingRecordingUpdateWithoutAddedByInput, MeetingRecordingUncheckedUpdateWithoutAddedByInput>
    create: XOR<MeetingRecordingCreateWithoutAddedByInput, MeetingRecordingUncheckedCreateWithoutAddedByInput>
  }

  export type MeetingRecordingUpdateWithWhereUniqueWithoutAddedByInput = {
    where: MeetingRecordingWhereUniqueInput
    data: XOR<MeetingRecordingUpdateWithoutAddedByInput, MeetingRecordingUncheckedUpdateWithoutAddedByInput>
  }

  export type MeetingRecordingUpdateManyWithWhereWithoutAddedByInput = {
    where: MeetingRecordingScalarWhereInput
    data: XOR<MeetingRecordingUpdateManyMutationInput, MeetingRecordingUncheckedUpdateManyWithoutAddedByInput>
  }

  export type MeetingRecordingScalarWhereInput = {
    AND?: MeetingRecordingScalarWhereInput | MeetingRecordingScalarWhereInput[]
    OR?: MeetingRecordingScalarWhereInput[]
    NOT?: MeetingRecordingScalarWhereInput | MeetingRecordingScalarWhereInput[]
    id?: StringFilter<"MeetingRecording"> | string
    title?: StringFilter<"MeetingRecording"> | string
    url?: StringFilter<"MeetingRecording"> | string
    description?: StringNullableFilter<"MeetingRecording"> | string | null
    createdAt?: DateTimeFilter<"MeetingRecording"> | Date | string
    meetingId?: StringFilter<"MeetingRecording"> | string
    addedById?: StringFilter<"MeetingRecording"> | string
    teamId?: StringNullableFilter<"MeetingRecording"> | string | null
  }

  export type UserCreateWithoutCreatedTeamsInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    projects?: ProjectCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutActorInput
    teamMembers?: TeamMemberCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingCreateNestedManyWithoutAddedByInput
  }

  export type UserUncheckedCreateWithoutCreatedTeamsInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutActorInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingUncheckedCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutAddedByInput
  }

  export type UserCreateOrConnectWithoutCreatedTeamsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedTeamsInput, UserUncheckedCreateWithoutCreatedTeamsInput>
  }

  export type TeamMemberCreateWithoutTeamInput = {
    id?: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutTeamMembersInput
  }

  export type TeamMemberUncheckedCreateWithoutTeamInput = {
    id?: string
    userId: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
  }

  export type TeamMemberCreateOrConnectWithoutTeamInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput>
  }

  export type TeamMemberCreateManyTeamInputEnvelope = {
    data: TeamMemberCreateManyTeamInput | TeamMemberCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutTeamInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    tasks?: TaskCreateNestedManyWithoutProjectInput
    createdBy: UserCreateNestedOneWithoutProjectsInput
    meetings?: TeamMeetingCreateNestedManyWithoutProjectInput
    users?: ProjectUserCreateNestedManyWithoutProjectInput
    activityLogs?: ActivityLogCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutTeamInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    createdById: string
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
    meetings?: TeamMeetingUncheckedCreateNestedManyWithoutProjectInput
    users?: ProjectUserUncheckedCreateNestedManyWithoutProjectInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutTeamInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTeamInput, ProjectUncheckedCreateWithoutTeamInput>
  }

  export type ProjectCreateManyTeamInputEnvelope = {
    data: ProjectCreateManyTeamInput | ProjectCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type TeamMeetingCreateWithoutTeamInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project?: ProjectCreateNestedOneWithoutMeetingsInput
    createdBy: UserCreateNestedOneWithoutCreatedMeetingsInput
    meetingRecordings?: MeetingRecordingCreateNestedManyWithoutMeetingInput
  }

  export type TeamMeetingUncheckedCreateWithoutTeamInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    projectId?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    meetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type TeamMeetingCreateOrConnectWithoutTeamInput = {
    where: TeamMeetingWhereUniqueInput
    create: XOR<TeamMeetingCreateWithoutTeamInput, TeamMeetingUncheckedCreateWithoutTeamInput>
  }

  export type TeamMeetingCreateManyTeamInputEnvelope = {
    data: TeamMeetingCreateManyTeamInput | TeamMeetingCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type MeetingRecordingCreateWithoutTeamInput = {
    id?: string
    title: string
    url: string
    description?: string | null
    createdAt?: Date | string
    meeting: TeamMeetingCreateNestedOneWithoutMeetingRecordingsInput
    addedBy: UserCreateNestedOneWithoutAddedMeetingRecordingsInput
  }

  export type MeetingRecordingUncheckedCreateWithoutTeamInput = {
    id?: string
    title: string
    url: string
    description?: string | null
    createdAt?: Date | string
    meetingId: string
    addedById: string
  }

  export type MeetingRecordingCreateOrConnectWithoutTeamInput = {
    where: MeetingRecordingWhereUniqueInput
    create: XOR<MeetingRecordingCreateWithoutTeamInput, MeetingRecordingUncheckedCreateWithoutTeamInput>
  }

  export type MeetingRecordingCreateManyTeamInputEnvelope = {
    data: MeetingRecordingCreateManyTeamInput | MeetingRecordingCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedTeamsInput = {
    update: XOR<UserUpdateWithoutCreatedTeamsInput, UserUncheckedUpdateWithoutCreatedTeamsInput>
    create: XOR<UserCreateWithoutCreatedTeamsInput, UserUncheckedCreateWithoutCreatedTeamsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedTeamsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedTeamsInput, UserUncheckedUpdateWithoutCreatedTeamsInput>
  }

  export type UserUpdateWithoutCreatedTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutActorNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUpdateManyWithoutAddedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutActorNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUncheckedUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutAddedByNestedInput
  }

  export type TeamMemberUpsertWithWhereUniqueWithoutTeamInput = {
    where: TeamMemberWhereUniqueInput
    update: XOR<TeamMemberUpdateWithoutTeamInput, TeamMemberUncheckedUpdateWithoutTeamInput>
    create: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput>
  }

  export type TeamMemberUpdateWithWhereUniqueWithoutTeamInput = {
    where: TeamMemberWhereUniqueInput
    data: XOR<TeamMemberUpdateWithoutTeamInput, TeamMemberUncheckedUpdateWithoutTeamInput>
  }

  export type TeamMemberUpdateManyWithWhereWithoutTeamInput = {
    where: TeamMemberScalarWhereInput
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyWithoutTeamInput>
  }

  export type ProjectUpsertWithWhereUniqueWithoutTeamInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutTeamInput, ProjectUncheckedUpdateWithoutTeamInput>
    create: XOR<ProjectCreateWithoutTeamInput, ProjectUncheckedCreateWithoutTeamInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutTeamInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutTeamInput, ProjectUncheckedUpdateWithoutTeamInput>
  }

  export type ProjectUpdateManyWithWhereWithoutTeamInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutTeamInput>
  }

  export type TeamMeetingUpsertWithWhereUniqueWithoutTeamInput = {
    where: TeamMeetingWhereUniqueInput
    update: XOR<TeamMeetingUpdateWithoutTeamInput, TeamMeetingUncheckedUpdateWithoutTeamInput>
    create: XOR<TeamMeetingCreateWithoutTeamInput, TeamMeetingUncheckedCreateWithoutTeamInput>
  }

  export type TeamMeetingUpdateWithWhereUniqueWithoutTeamInput = {
    where: TeamMeetingWhereUniqueInput
    data: XOR<TeamMeetingUpdateWithoutTeamInput, TeamMeetingUncheckedUpdateWithoutTeamInput>
  }

  export type TeamMeetingUpdateManyWithWhereWithoutTeamInput = {
    where: TeamMeetingScalarWhereInput
    data: XOR<TeamMeetingUpdateManyMutationInput, TeamMeetingUncheckedUpdateManyWithoutTeamInput>
  }

  export type MeetingRecordingUpsertWithWhereUniqueWithoutTeamInput = {
    where: MeetingRecordingWhereUniqueInput
    update: XOR<MeetingRecordingUpdateWithoutTeamInput, MeetingRecordingUncheckedUpdateWithoutTeamInput>
    create: XOR<MeetingRecordingCreateWithoutTeamInput, MeetingRecordingUncheckedCreateWithoutTeamInput>
  }

  export type MeetingRecordingUpdateWithWhereUniqueWithoutTeamInput = {
    where: MeetingRecordingWhereUniqueInput
    data: XOR<MeetingRecordingUpdateWithoutTeamInput, MeetingRecordingUncheckedUpdateWithoutTeamInput>
  }

  export type MeetingRecordingUpdateManyWithWhereWithoutTeamInput = {
    where: MeetingRecordingScalarWhereInput
    data: XOR<MeetingRecordingUpdateManyMutationInput, MeetingRecordingUncheckedUpdateManyWithoutTeamInput>
  }

  export type TeamCreateWithoutMembersInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedTeamsInput
    projects?: ProjectCreateNestedManyWithoutTeamInput
    meetings?: TeamMeetingCreateNestedManyWithoutTeamInput
    recordings?: MeetingRecordingCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    projects?: ProjectUncheckedCreateNestedManyWithoutTeamInput
    meetings?: TeamMeetingUncheckedCreateNestedManyWithoutTeamInput
    recordings?: MeetingRecordingUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutMembersInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutTeamMembersInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    projects?: ProjectCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutActorInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    createdMeetings?: TeamMeetingCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingCreateNestedManyWithoutAddedByInput
  }

  export type UserUncheckedCreateWithoutTeamMembersInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutActorInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    createdMeetings?: TeamMeetingUncheckedCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutAddedByInput
  }

  export type UserCreateOrConnectWithoutTeamMembersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTeamMembersInput, UserUncheckedCreateWithoutTeamMembersInput>
  }

  export type TeamUpsertWithoutMembersInput = {
    update: XOR<TeamUpdateWithoutMembersInput, TeamUncheckedUpdateWithoutMembersInput>
    create: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutMembersInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutMembersInput, TeamUncheckedUpdateWithoutMembersInput>
  }

  export type TeamUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedTeamsNestedInput
    projects?: ProjectUpdateManyWithoutTeamNestedInput
    meetings?: TeamMeetingUpdateManyWithoutTeamNestedInput
    recordings?: MeetingRecordingUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    projects?: ProjectUncheckedUpdateManyWithoutTeamNestedInput
    meetings?: TeamMeetingUncheckedUpdateManyWithoutTeamNestedInput
    recordings?: MeetingRecordingUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type UserUpsertWithoutTeamMembersInput = {
    update: XOR<UserUpdateWithoutTeamMembersInput, UserUncheckedUpdateWithoutTeamMembersInput>
    create: XOR<UserCreateWithoutTeamMembersInput, UserUncheckedCreateWithoutTeamMembersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTeamMembersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTeamMembersInput, UserUncheckedUpdateWithoutTeamMembersInput>
  }

  export type UserUpdateWithoutTeamMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    createdMeetings?: TeamMeetingUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUpdateManyWithoutAddedByNestedInput
  }

  export type UserUncheckedUpdateWithoutTeamMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    createdMeetings?: TeamMeetingUncheckedUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutAddedByNestedInput
  }

  export type TaskCreateWithoutProjectInput = {
    id?: string
    name: string
    description: string
    status?: string
    dueDate?: Date | string | null
    solutionDescription?: string | null
    user?: UserCreateNestedOneWithoutTasksInput
    createdBy: UserCreateNestedOneWithoutCreatedTasksInput
  }

  export type TaskUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    description: string
    status?: string
    dueDate?: Date | string | null
    userId?: string | null
    createdById: string
    solutionDescription?: string | null
  }

  export type TaskCreateOrConnectWithoutProjectInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput>
  }

  export type TaskCreateManyProjectInputEnvelope = {
    data: TaskCreateManyProjectInput | TaskCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutActorInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingCreateNestedManyWithoutAddedByInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutActorInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingUncheckedCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutAddedByInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type TeamCreateWithoutProjectsInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedTeamsInput
    members?: TeamMemberCreateNestedManyWithoutTeamInput
    meetings?: TeamMeetingCreateNestedManyWithoutTeamInput
    recordings?: MeetingRecordingCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutProjectsInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
    meetings?: TeamMeetingUncheckedCreateNestedManyWithoutTeamInput
    recordings?: MeetingRecordingUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutProjectsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutProjectsInput, TeamUncheckedCreateWithoutProjectsInput>
  }

  export type TeamMeetingCreateWithoutProjectInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutMeetingsInput
    createdBy: UserCreateNestedOneWithoutCreatedMeetingsInput
    meetingRecordings?: MeetingRecordingCreateNestedManyWithoutMeetingInput
  }

  export type TeamMeetingUncheckedCreateWithoutProjectInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    teamId: string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    meetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type TeamMeetingCreateOrConnectWithoutProjectInput = {
    where: TeamMeetingWhereUniqueInput
    create: XOR<TeamMeetingCreateWithoutProjectInput, TeamMeetingUncheckedCreateWithoutProjectInput>
  }

  export type TeamMeetingCreateManyProjectInputEnvelope = {
    data: TeamMeetingCreateManyProjectInput | TeamMeetingCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUserCreateWithoutProjectInput = {
    id?: string
    role?: $Enums.ProjectRole
    scope?: $Enums.ProjectCollaboratorScope
    user: UserCreateNestedOneWithoutUserProjectsInput
  }

  export type ProjectUserUncheckedCreateWithoutProjectInput = {
    id?: string
    userId: string
    role?: $Enums.ProjectRole
    scope?: $Enums.ProjectCollaboratorScope
  }

  export type ProjectUserCreateOrConnectWithoutProjectInput = {
    where: ProjectUserWhereUniqueInput
    create: XOR<ProjectUserCreateWithoutProjectInput, ProjectUserUncheckedCreateWithoutProjectInput>
  }

  export type ProjectUserCreateManyProjectInputEnvelope = {
    data: ProjectUserCreateManyProjectInput | ProjectUserCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ActivityLogCreateWithoutProjectInput = {
    id?: string
    type: $Enums.ActivityType
    message: string
    createdAt?: Date | string
    actor: UserCreateNestedOneWithoutActivityLogsInput
  }

  export type ActivityLogUncheckedCreateWithoutProjectInput = {
    id?: string
    actorUserId: string
    type: $Enums.ActivityType
    message: string
    createdAt?: Date | string
  }

  export type ActivityLogCreateOrConnectWithoutProjectInput = {
    where: ActivityLogWhereUniqueInput
    create: XOR<ActivityLogCreateWithoutProjectInput, ActivityLogUncheckedCreateWithoutProjectInput>
  }

  export type ActivityLogCreateManyProjectInputEnvelope = {
    data: ActivityLogCreateManyProjectInput | ActivityLogCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type TaskUpsertWithWhereUniqueWithoutProjectInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutProjectInput, TaskUncheckedUpdateWithoutProjectInput>
    create: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutProjectInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutProjectInput, TaskUncheckedUpdateWithoutProjectInput>
  }

  export type TaskUpdateManyWithWhereWithoutProjectInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutProjectInput>
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUpdateManyWithoutAddedByNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUncheckedUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutAddedByNestedInput
  }

  export type TeamUpsertWithoutProjectsInput = {
    update: XOR<TeamUpdateWithoutProjectsInput, TeamUncheckedUpdateWithoutProjectsInput>
    create: XOR<TeamCreateWithoutProjectsInput, TeamUncheckedCreateWithoutProjectsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutProjectsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutProjectsInput, TeamUncheckedUpdateWithoutProjectsInput>
  }

  export type TeamUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedTeamsNestedInput
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
    meetings?: TeamMeetingUpdateManyWithoutTeamNestedInput
    recordings?: MeetingRecordingUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
    meetings?: TeamMeetingUncheckedUpdateManyWithoutTeamNestedInput
    recordings?: MeetingRecordingUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamMeetingUpsertWithWhereUniqueWithoutProjectInput = {
    where: TeamMeetingWhereUniqueInput
    update: XOR<TeamMeetingUpdateWithoutProjectInput, TeamMeetingUncheckedUpdateWithoutProjectInput>
    create: XOR<TeamMeetingCreateWithoutProjectInput, TeamMeetingUncheckedCreateWithoutProjectInput>
  }

  export type TeamMeetingUpdateWithWhereUniqueWithoutProjectInput = {
    where: TeamMeetingWhereUniqueInput
    data: XOR<TeamMeetingUpdateWithoutProjectInput, TeamMeetingUncheckedUpdateWithoutProjectInput>
  }

  export type TeamMeetingUpdateManyWithWhereWithoutProjectInput = {
    where: TeamMeetingScalarWhereInput
    data: XOR<TeamMeetingUpdateManyMutationInput, TeamMeetingUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectUserUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectUserWhereUniqueInput
    update: XOR<ProjectUserUpdateWithoutProjectInput, ProjectUserUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectUserCreateWithoutProjectInput, ProjectUserUncheckedCreateWithoutProjectInput>
  }

  export type ProjectUserUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectUserWhereUniqueInput
    data: XOR<ProjectUserUpdateWithoutProjectInput, ProjectUserUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectUserUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectUserScalarWhereInput
    data: XOR<ProjectUserUpdateManyMutationInput, ProjectUserUncheckedUpdateManyWithoutProjectInput>
  }

  export type ActivityLogUpsertWithWhereUniqueWithoutProjectInput = {
    where: ActivityLogWhereUniqueInput
    update: XOR<ActivityLogUpdateWithoutProjectInput, ActivityLogUncheckedUpdateWithoutProjectInput>
    create: XOR<ActivityLogCreateWithoutProjectInput, ActivityLogUncheckedCreateWithoutProjectInput>
  }

  export type ActivityLogUpdateWithWhereUniqueWithoutProjectInput = {
    where: ActivityLogWhereUniqueInput
    data: XOR<ActivityLogUpdateWithoutProjectInput, ActivityLogUncheckedUpdateWithoutProjectInput>
  }

  export type ActivityLogUpdateManyWithWhereWithoutProjectInput = {
    where: ActivityLogScalarWhereInput
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectCreateWithoutTasksInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    createdBy: UserCreateNestedOneWithoutProjectsInput
    team?: TeamCreateNestedOneWithoutProjectsInput
    meetings?: TeamMeetingCreateNestedManyWithoutProjectInput
    users?: ProjectUserCreateNestedManyWithoutProjectInput
    activityLogs?: ActivityLogCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutTasksInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    createdById: string
    teamId?: string | null
    meetings?: TeamMeetingUncheckedCreateNestedManyWithoutProjectInput
    users?: ProjectUserUncheckedCreateNestedManyWithoutProjectInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutTasksInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
  }

  export type UserCreateWithoutTasksInput = {
    id?: string
    name: string
    email: string
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    projects?: ProjectCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutActorInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingCreateNestedManyWithoutAddedByInput
  }

  export type UserUncheckedCreateWithoutTasksInput = {
    id?: string
    name: string
    email: string
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutActorInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingUncheckedCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutAddedByInput
  }

  export type UserCreateOrConnectWithoutTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
  }

  export type UserCreateWithoutCreatedTasksInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutActorInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingCreateNestedManyWithoutAddedByInput
  }

  export type UserUncheckedCreateWithoutCreatedTasksInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutActorInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingUncheckedCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutAddedByInput
  }

  export type UserCreateOrConnectWithoutCreatedTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedTasksInput, UserUncheckedCreateWithoutCreatedTasksInput>
  }

  export type ProjectUpsertWithoutTasksInput = {
    update: XOR<ProjectUpdateWithoutTasksInput, ProjectUncheckedUpdateWithoutTasksInput>
    create: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutTasksInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutTasksInput, ProjectUncheckedUpdateWithoutTasksInput>
  }

  export type ProjectUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: UserUpdateOneRequiredWithoutProjectsNestedInput
    team?: TeamUpdateOneWithoutProjectsNestedInput
    meetings?: TeamMeetingUpdateManyWithoutProjectNestedInput
    users?: ProjectUserUpdateManyWithoutProjectNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    meetings?: TeamMeetingUncheckedUpdateManyWithoutProjectNestedInput
    users?: ProjectUserUncheckedUpdateManyWithoutProjectNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutTasksInput = {
    update: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUpdateManyWithoutAddedByNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUncheckedUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutAddedByNestedInput
  }

  export type UserUpsertWithoutCreatedTasksInput = {
    update: XOR<UserUpdateWithoutCreatedTasksInput, UserUncheckedUpdateWithoutCreatedTasksInput>
    create: XOR<UserCreateWithoutCreatedTasksInput, UserUncheckedCreateWithoutCreatedTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedTasksInput, UserUncheckedUpdateWithoutCreatedTasksInput>
  }

  export type UserUpdateWithoutCreatedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUpdateManyWithoutAddedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUncheckedUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutAddedByNestedInput
  }

  export type UserCreateWithoutUserProjectsInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    projects?: ProjectCreateNestedManyWithoutCreatedByInput
    activityLogs?: ActivityLogCreateNestedManyWithoutActorInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingCreateNestedManyWithoutAddedByInput
  }

  export type UserUncheckedCreateWithoutUserProjectsInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutActorInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingUncheckedCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutAddedByInput
  }

  export type UserCreateOrConnectWithoutUserProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserProjectsInput, UserUncheckedCreateWithoutUserProjectsInput>
  }

  export type ProjectCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    tasks?: TaskCreateNestedManyWithoutProjectInput
    createdBy: UserCreateNestedOneWithoutProjectsInput
    team?: TeamCreateNestedOneWithoutProjectsInput
    meetings?: TeamMeetingCreateNestedManyWithoutProjectInput
    activityLogs?: ActivityLogCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    createdById: string
    teamId?: string | null
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
    meetings?: TeamMeetingUncheckedCreateNestedManyWithoutProjectInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUsersInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUsersInput, ProjectUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutUserProjectsInput = {
    update: XOR<UserUpdateWithoutUserProjectsInput, UserUncheckedUpdateWithoutUserProjectsInput>
    create: XOR<UserCreateWithoutUserProjectsInput, UserUncheckedCreateWithoutUserProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserProjectsInput, UserUncheckedUpdateWithoutUserProjectsInput>
  }

  export type UserUpdateWithoutUserProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUpdateManyWithoutCreatedByNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUpdateManyWithoutAddedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUserProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUncheckedUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutAddedByNestedInput
  }

  export type ProjectUpsertWithoutUsersInput = {
    update: XOR<ProjectUpdateWithoutUsersInput, ProjectUncheckedUpdateWithoutUsersInput>
    create: XOR<ProjectCreateWithoutUsersInput, ProjectUncheckedCreateWithoutUsersInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutUsersInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutUsersInput, ProjectUncheckedUpdateWithoutUsersInput>
  }

  export type ProjectUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutProjectNestedInput
    createdBy?: UserUpdateOneRequiredWithoutProjectsNestedInput
    team?: TeamUpdateOneWithoutProjectsNestedInput
    meetings?: TeamMeetingUpdateManyWithoutProjectNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
    meetings?: TeamMeetingUncheckedUpdateManyWithoutProjectNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutActivityLogsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    tasks?: TaskCreateNestedManyWithoutProjectInput
    createdBy: UserCreateNestedOneWithoutProjectsInput
    team?: TeamCreateNestedOneWithoutProjectsInput
    meetings?: TeamMeetingCreateNestedManyWithoutProjectInput
    users?: ProjectUserCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutActivityLogsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    createdById: string
    teamId?: string | null
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
    meetings?: TeamMeetingUncheckedCreateNestedManyWithoutProjectInput
    users?: ProjectUserUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutActivityLogsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutActivityLogsInput, ProjectUncheckedCreateWithoutActivityLogsInput>
  }

  export type UserCreateWithoutActivityLogsInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    projects?: ProjectCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserCreateNestedManyWithoutUserInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingCreateNestedManyWithoutAddedByInput
  }

  export type UserUncheckedCreateWithoutActivityLogsInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserUncheckedCreateNestedManyWithoutUserInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingUncheckedCreateNestedManyWithoutCreatedByInput
    addedMeetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutAddedByInput
  }

  export type UserCreateOrConnectWithoutActivityLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
  }

  export type ProjectUpsertWithoutActivityLogsInput = {
    update: XOR<ProjectUpdateWithoutActivityLogsInput, ProjectUncheckedUpdateWithoutActivityLogsInput>
    create: XOR<ProjectCreateWithoutActivityLogsInput, ProjectUncheckedCreateWithoutActivityLogsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutActivityLogsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutActivityLogsInput, ProjectUncheckedUpdateWithoutActivityLogsInput>
  }

  export type ProjectUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutProjectNestedInput
    createdBy?: UserUpdateOneRequiredWithoutProjectsNestedInput
    team?: TeamUpdateOneWithoutProjectsNestedInput
    meetings?: TeamMeetingUpdateManyWithoutProjectNestedInput
    users?: ProjectUserUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
    meetings?: TeamMeetingUncheckedUpdateManyWithoutProjectNestedInput
    users?: ProjectUserUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutActivityLogsInput = {
    update: XOR<UserUpdateWithoutActivityLogsInput, UserUncheckedUpdateWithoutActivityLogsInput>
    create: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivityLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivityLogsInput, UserUncheckedUpdateWithoutActivityLogsInput>
  }

  export type UserUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUpdateManyWithoutAddedByNestedInput
  }

  export type UserUncheckedUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUncheckedUpdateManyWithoutUserNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUncheckedUpdateManyWithoutCreatedByNestedInput
    addedMeetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutAddedByNestedInput
  }

  export type TeamCreateWithoutMeetingsInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedTeamsInput
    members?: TeamMemberCreateNestedManyWithoutTeamInput
    projects?: ProjectCreateNestedManyWithoutTeamInput
    recordings?: MeetingRecordingCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutMeetingsInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
    projects?: ProjectUncheckedCreateNestedManyWithoutTeamInput
    recordings?: MeetingRecordingUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutMeetingsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutMeetingsInput, TeamUncheckedCreateWithoutMeetingsInput>
  }

  export type ProjectCreateWithoutMeetingsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    tasks?: TaskCreateNestedManyWithoutProjectInput
    createdBy: UserCreateNestedOneWithoutProjectsInput
    team?: TeamCreateNestedOneWithoutProjectsInput
    users?: ProjectUserCreateNestedManyWithoutProjectInput
    activityLogs?: ActivityLogCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutMeetingsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    createdById: string
    teamId?: string | null
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
    users?: ProjectUserUncheckedCreateNestedManyWithoutProjectInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutMeetingsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutMeetingsInput, ProjectUncheckedCreateWithoutMeetingsInput>
  }

  export type UserCreateWithoutCreatedMeetingsInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    projects?: ProjectCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutActorInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberCreateNestedManyWithoutUserInput
    addedMeetingRecordings?: MeetingRecordingCreateNestedManyWithoutAddedByInput
  }

  export type UserUncheckedCreateWithoutCreatedMeetingsInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutActorInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
    addedMeetingRecordings?: MeetingRecordingUncheckedCreateNestedManyWithoutAddedByInput
  }

  export type UserCreateOrConnectWithoutCreatedMeetingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedMeetingsInput, UserUncheckedCreateWithoutCreatedMeetingsInput>
  }

  export type MeetingRecordingCreateWithoutMeetingInput = {
    id?: string
    title: string
    url: string
    description?: string | null
    createdAt?: Date | string
    addedBy: UserCreateNestedOneWithoutAddedMeetingRecordingsInput
    team?: TeamCreateNestedOneWithoutRecordingsInput
  }

  export type MeetingRecordingUncheckedCreateWithoutMeetingInput = {
    id?: string
    title: string
    url: string
    description?: string | null
    createdAt?: Date | string
    addedById: string
    teamId?: string | null
  }

  export type MeetingRecordingCreateOrConnectWithoutMeetingInput = {
    where: MeetingRecordingWhereUniqueInput
    create: XOR<MeetingRecordingCreateWithoutMeetingInput, MeetingRecordingUncheckedCreateWithoutMeetingInput>
  }

  export type MeetingRecordingCreateManyMeetingInputEnvelope = {
    data: MeetingRecordingCreateManyMeetingInput | MeetingRecordingCreateManyMeetingInput[]
    skipDuplicates?: boolean
  }

  export type TeamUpsertWithoutMeetingsInput = {
    update: XOR<TeamUpdateWithoutMeetingsInput, TeamUncheckedUpdateWithoutMeetingsInput>
    create: XOR<TeamCreateWithoutMeetingsInput, TeamUncheckedCreateWithoutMeetingsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutMeetingsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutMeetingsInput, TeamUncheckedUpdateWithoutMeetingsInput>
  }

  export type TeamUpdateWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedTeamsNestedInput
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
    projects?: ProjectUpdateManyWithoutTeamNestedInput
    recordings?: MeetingRecordingUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutTeamNestedInput
    recordings?: MeetingRecordingUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type ProjectUpsertWithoutMeetingsInput = {
    update: XOR<ProjectUpdateWithoutMeetingsInput, ProjectUncheckedUpdateWithoutMeetingsInput>
    create: XOR<ProjectCreateWithoutMeetingsInput, ProjectUncheckedCreateWithoutMeetingsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutMeetingsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutMeetingsInput, ProjectUncheckedUpdateWithoutMeetingsInput>
  }

  export type ProjectUpdateWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutProjectNestedInput
    createdBy?: UserUpdateOneRequiredWithoutProjectsNestedInput
    team?: TeamUpdateOneWithoutProjectsNestedInput
    users?: ProjectUserUpdateManyWithoutProjectNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
    users?: ProjectUserUncheckedUpdateManyWithoutProjectNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutCreatedMeetingsInput = {
    update: XOR<UserUpdateWithoutCreatedMeetingsInput, UserUncheckedUpdateWithoutCreatedMeetingsInput>
    create: XOR<UserCreateWithoutCreatedMeetingsInput, UserUncheckedCreateWithoutCreatedMeetingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedMeetingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedMeetingsInput, UserUncheckedUpdateWithoutCreatedMeetingsInput>
  }

  export type UserUpdateWithoutCreatedMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutUserNestedInput
    addedMeetingRecordings?: MeetingRecordingUpdateManyWithoutAddedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
    addedMeetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutAddedByNestedInput
  }

  export type MeetingRecordingUpsertWithWhereUniqueWithoutMeetingInput = {
    where: MeetingRecordingWhereUniqueInput
    update: XOR<MeetingRecordingUpdateWithoutMeetingInput, MeetingRecordingUncheckedUpdateWithoutMeetingInput>
    create: XOR<MeetingRecordingCreateWithoutMeetingInput, MeetingRecordingUncheckedCreateWithoutMeetingInput>
  }

  export type MeetingRecordingUpdateWithWhereUniqueWithoutMeetingInput = {
    where: MeetingRecordingWhereUniqueInput
    data: XOR<MeetingRecordingUpdateWithoutMeetingInput, MeetingRecordingUncheckedUpdateWithoutMeetingInput>
  }

  export type MeetingRecordingUpdateManyWithWhereWithoutMeetingInput = {
    where: MeetingRecordingScalarWhereInput
    data: XOR<MeetingRecordingUpdateManyMutationInput, MeetingRecordingUncheckedUpdateManyWithoutMeetingInput>
  }

  export type TeamMeetingCreateWithoutMeetingRecordingsInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutMeetingsInput
    project?: ProjectCreateNestedOneWithoutMeetingsInput
    createdBy: UserCreateNestedOneWithoutCreatedMeetingsInput
  }

  export type TeamMeetingUncheckedCreateWithoutMeetingRecordingsInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    teamId: string
    projectId?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMeetingCreateOrConnectWithoutMeetingRecordingsInput = {
    where: TeamMeetingWhereUniqueInput
    create: XOR<TeamMeetingCreateWithoutMeetingRecordingsInput, TeamMeetingUncheckedCreateWithoutMeetingRecordingsInput>
  }

  export type UserCreateWithoutAddedMeetingRecordingsInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskCreateNestedManyWithoutUserInput
    createdTasks?: TaskCreateNestedManyWithoutCreatedByInput
    projects?: ProjectCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutActorInput
    createdTeams?: TeamCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutAddedMeetingRecordingsInput = {
    id?: string
    name: string
    email: string
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    createdTasks?: TaskUncheckedCreateNestedManyWithoutCreatedByInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    userProjects?: ProjectUserUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutActorInput
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatedByInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
    createdMeetings?: TeamMeetingUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutAddedMeetingRecordingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAddedMeetingRecordingsInput, UserUncheckedCreateWithoutAddedMeetingRecordingsInput>
  }

  export type TeamCreateWithoutRecordingsInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedTeamsInput
    members?: TeamMemberCreateNestedManyWithoutTeamInput
    projects?: ProjectCreateNestedManyWithoutTeamInput
    meetings?: TeamMeetingCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutRecordingsInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
    projects?: ProjectUncheckedCreateNestedManyWithoutTeamInput
    meetings?: TeamMeetingUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutRecordingsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutRecordingsInput, TeamUncheckedCreateWithoutRecordingsInput>
  }

  export type TeamMeetingUpsertWithoutMeetingRecordingsInput = {
    update: XOR<TeamMeetingUpdateWithoutMeetingRecordingsInput, TeamMeetingUncheckedUpdateWithoutMeetingRecordingsInput>
    create: XOR<TeamMeetingCreateWithoutMeetingRecordingsInput, TeamMeetingUncheckedCreateWithoutMeetingRecordingsInput>
    where?: TeamMeetingWhereInput
  }

  export type TeamMeetingUpdateToOneWithWhereWithoutMeetingRecordingsInput = {
    where?: TeamMeetingWhereInput
    data: XOR<TeamMeetingUpdateWithoutMeetingRecordingsInput, TeamMeetingUncheckedUpdateWithoutMeetingRecordingsInput>
  }

  export type TeamMeetingUpdateWithoutMeetingRecordingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutMeetingsNestedInput
    project?: ProjectUpdateOneWithoutMeetingsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedMeetingsNestedInput
  }

  export type TeamMeetingUncheckedUpdateWithoutMeetingRecordingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutAddedMeetingRecordingsInput = {
    update: XOR<UserUpdateWithoutAddedMeetingRecordingsInput, UserUncheckedUpdateWithoutAddedMeetingRecordingsInput>
    create: XOR<UserCreateWithoutAddedMeetingRecordingsInput, UserUncheckedCreateWithoutAddedMeetingRecordingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAddedMeetingRecordingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAddedMeetingRecordingsInput, UserUncheckedUpdateWithoutAddedMeetingRecordingsInput>
  }

  export type UserUpdateWithoutAddedMeetingRecordingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAddedMeetingRecordingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    createdTasks?: TaskUncheckedUpdateManyWithoutCreatedByNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    userProjects?: ProjectUserUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutActorNestedInput
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatedByNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
    createdMeetings?: TeamMeetingUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type TeamUpsertWithoutRecordingsInput = {
    update: XOR<TeamUpdateWithoutRecordingsInput, TeamUncheckedUpdateWithoutRecordingsInput>
    create: XOR<TeamCreateWithoutRecordingsInput, TeamUncheckedCreateWithoutRecordingsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutRecordingsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutRecordingsInput, TeamUncheckedUpdateWithoutRecordingsInput>
  }

  export type TeamUpdateWithoutRecordingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedTeamsNestedInput
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
    projects?: ProjectUpdateManyWithoutTeamNestedInput
    meetings?: TeamMeetingUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutRecordingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutTeamNestedInput
    meetings?: TeamMeetingUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TaskCreateManyUserInput = {
    id?: string
    name: string
    description: string
    status?: string
    dueDate?: Date | string | null
    projectId: string
    createdById: string
    solutionDescription?: string | null
  }

  export type TaskCreateManyCreatedByInput = {
    id?: string
    name: string
    description: string
    status?: string
    dueDate?: Date | string | null
    projectId: string
    userId?: string | null
    solutionDescription?: string | null
  }

  export type ProjectCreateManyCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    teamId?: string | null
  }

  export type ProjectUserCreateManyUserInput = {
    id?: string
    projectId: string
    role?: $Enums.ProjectRole
    scope?: $Enums.ProjectCollaboratorScope
  }

  export type ActivityLogCreateManyActorInput = {
    id?: string
    projectId: string
    type: $Enums.ActivityType
    message: string
    createdAt?: Date | string
  }

  export type TeamCreateManyCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMemberCreateManyUserInput = {
    id?: string
    teamId: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
  }

  export type TeamMeetingCreateManyCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    teamId: string
    projectId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeetingRecordingCreateManyAddedByInput = {
    id?: string
    title: string
    url: string
    description?: string | null
    createdAt?: Date | string
    meetingId: string
    teamId?: string | null
  }

  export type TaskUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
    project?: ProjectUpdateOneRequiredWithoutTasksNestedInput
    user?: UserUpdateOneWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutProjectNestedInput
    team?: TeamUpdateOneWithoutProjectsNestedInput
    meetings?: TeamMeetingUpdateManyWithoutProjectNestedInput
    users?: ProjectUserUpdateManyWithoutProjectNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
    meetings?: TeamMeetingUncheckedUpdateManyWithoutProjectNestedInput
    users?: ProjectUserUncheckedUpdateManyWithoutProjectNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUserUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFieldUpdateOperationsInput | $Enums.ProjectCollaboratorScope
    project?: ProjectUpdateOneRequiredWithoutUsersNestedInput
  }

  export type ProjectUserUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFieldUpdateOperationsInput | $Enums.ProjectCollaboratorScope
  }

  export type ProjectUserUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFieldUpdateOperationsInput | $Enums.ProjectCollaboratorScope
  }

  export type ActivityLogUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | $Enums.ActivityType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutActivityLogsNestedInput
  }

  export type ActivityLogUncheckedUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | $Enums.ActivityType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | $Enums.ActivityType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
    projects?: ProjectUpdateManyWithoutTeamNestedInput
    meetings?: TeamMeetingUpdateManyWithoutTeamNestedInput
    recordings?: MeetingRecordingUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutTeamNestedInput
    meetings?: TeamMeetingUncheckedUpdateManyWithoutTeamNestedInput
    recordings?: MeetingRecordingUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutMembersNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMeetingUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutMeetingsNestedInput
    project?: ProjectUpdateOneWithoutMeetingsNestedInput
    meetingRecordings?: MeetingRecordingUpdateManyWithoutMeetingNestedInput
  }

  export type TeamMeetingUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type TeamMeetingUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingRecordingUpdateWithoutAddedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: TeamMeetingUpdateOneRequiredWithoutMeetingRecordingsNestedInput
    team?: TeamUpdateOneWithoutRecordingsNestedInput
  }

  export type MeetingRecordingUncheckedUpdateWithoutAddedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingId?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MeetingRecordingUncheckedUpdateManyWithoutAddedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingId?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TeamMemberCreateManyTeamInput = {
    id?: string
    userId: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
  }

  export type ProjectCreateManyTeamInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode: string
    createdById: string
  }

  export type TeamMeetingCreateManyTeamInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    projectId?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeetingRecordingCreateManyTeamInput = {
    id?: string
    title: string
    url: string
    description?: string | null
    createdAt?: Date | string
    meetingId: string
    addedById: string
  }

  export type TeamMemberUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTeamMembersNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutProjectNestedInput
    createdBy?: UserUpdateOneRequiredWithoutProjectsNestedInput
    meetings?: TeamMeetingUpdateManyWithoutProjectNestedInput
    users?: ProjectUserUpdateManyWithoutProjectNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
    meetings?: TeamMeetingUncheckedUpdateManyWithoutProjectNestedInput
    users?: ProjectUserUncheckedUpdateManyWithoutProjectNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type TeamMeetingUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutMeetingsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedMeetingsNestedInput
    meetingRecordings?: MeetingRecordingUpdateManyWithoutMeetingNestedInput
  }

  export type TeamMeetingUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type TeamMeetingUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingRecordingUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: TeamMeetingUpdateOneRequiredWithoutMeetingRecordingsNestedInput
    addedBy?: UserUpdateOneRequiredWithoutAddedMeetingRecordingsNestedInput
  }

  export type MeetingRecordingUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingRecordingUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateManyProjectInput = {
    id?: string
    name: string
    description: string
    status?: string
    dueDate?: Date | string | null
    userId?: string | null
    createdById: string
    solutionDescription?: string | null
  }

  export type TeamMeetingCreateManyProjectInput = {
    id?: string
    title: string
    description?: string | null
    notes?: string | null
    scheduledAt: Date | string
    durationMinutes?: number | null
    status?: $Enums.MeetingStatus
    provider?: $Enums.MeetingProvider
    externalUrl?: string | null
    teamId: string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUserCreateManyProjectInput = {
    id?: string
    userId: string
    role?: $Enums.ProjectRole
    scope?: $Enums.ProjectCollaboratorScope
  }

  export type ActivityLogCreateManyProjectInput = {
    id?: string
    actorUserId: string
    type: $Enums.ActivityType
    message: string
    createdAt?: Date | string
  }

  export type TaskUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutTasksNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    solutionDescription?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TeamMeetingUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutMeetingsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedMeetingsNestedInput
    meetingRecordings?: MeetingRecordingUpdateManyWithoutMeetingNestedInput
  }

  export type TeamMeetingUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingRecordings?: MeetingRecordingUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type TeamMeetingUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | $Enums.MeetingStatus
    provider?: EnumMeetingProviderFieldUpdateOperationsInput | $Enums.MeetingProvider
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUserUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFieldUpdateOperationsInput | $Enums.ProjectCollaboratorScope
    user?: UserUpdateOneRequiredWithoutUserProjectsNestedInput
  }

  export type ProjectUserUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFieldUpdateOperationsInput | $Enums.ProjectCollaboratorScope
  }

  export type ProjectUserUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    scope?: EnumProjectCollaboratorScopeFieldUpdateOperationsInput | $Enums.ProjectCollaboratorScope
  }

  export type ActivityLogUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | $Enums.ActivityType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: UserUpdateOneRequiredWithoutActivityLogsNestedInput
  }

  export type ActivityLogUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorUserId?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | $Enums.ActivityType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorUserId?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | $Enums.ActivityType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingRecordingCreateManyMeetingInput = {
    id?: string
    title: string
    url: string
    description?: string | null
    createdAt?: Date | string
    addedById: string
    teamId?: string | null
  }

  export type MeetingRecordingUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addedBy?: UserUpdateOneRequiredWithoutAddedMeetingRecordingsNestedInput
    team?: TeamUpdateOneWithoutRecordingsNestedInput
  }

  export type MeetingRecordingUncheckedUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addedById?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MeetingRecordingUncheckedUpdateManyWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addedById?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}