alter table "public"."answers" add column "signature" text
 not null unique;
