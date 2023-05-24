alter table "public"."answers_files" alter column "file_key" drop not null;
alter table "public"."answers_files" add column "file_key" text;
