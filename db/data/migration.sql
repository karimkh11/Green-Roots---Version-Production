 BEGIN;
   
SET CLIENT_ENCODING TO 'UTF-8';

   DROP TABLE IF EXISTS "user" CASCADE;
   DROP TABLE IF EXISTS "campaign" CASCADE;
   DROP TABLE IF EXISTS "tree" CASCADE;
   DROP TABLE IF EXISTS "orders" CASCADE;
   DROP TABLE IF EXISTS "commandline" CASCADE;
  

CREATE TABLE "user" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"email" TEXT UNIQUE NOT NULL,
"password" TEXT NOT NULL,
"firstname" TEXT NOT NULL,
"lastname" TEXT NOT NULL,
"telephone" TEXT NOT NULL,
"birthday" DATE NOT NULL,
"locality" TEXT NOT NULL,
"role" TEXT NOT NULL DEFAULT 'user',
"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
"updatedAt" TIMESTAMPTZ NULL
);

CREATE TABLE "campaign" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INTEGER REFERENCES "user"("id"),
  "name" TEXT NOT NULL,
  "image" TEXT,
  "description" TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW (),
  "updatedAt" TIMESTAMPTZ NULL
);


CREATE TABLE "tree" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "campaign_id" INTEGER REFERENCES "campaign"("id") NOT NULL,
    "user_id" INTEGER REFERENCES "user"("id"),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "price" NUMERIC,
    "date_of_purchase" DATE,
    "status" TEXT,
    "planting_date" DATE,
    "gps_coordinates"  GEOMETRY(POINT),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "orders" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INTEGER REFERENCES "user"("id") NOT NULL,
  "order_date" DATE NOT NULL,
  "status" TEXT NOT NULL,
  "total" INTEGER,
  "paid" BOOLEAN NOT NULL DEFAULT FALSE,  -- Ajout de la colonne 'paid'
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ
);


CREATE TABLE "commandline" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"order_id" INTEGER REFERENCES "orders"("id") NOT NULL,
"tree_id" INTEGER REFERENCES "tree"("id") NOT NULL,
"quantity" INTEGER,
"commandline_total" INTEGER,
"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
"updatedAt" TIMESTAMPTZ NULL
);
 COMMIT;