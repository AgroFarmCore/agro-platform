export interface DatabaseRuntimeConfig {
  provider: "postgresql";
  schemaPath: string;
}

export const databaseRuntimeConfig: DatabaseRuntimeConfig = {
  provider: "postgresql",
  schemaPath: "packages/database/prisma/schema.prisma",
};
