alter table "public"."answers_files" add constraint "answers_files_answer_id_file_hash_key" unique (answer_id, file_hash);
alter table "public"."answers_files"
  add constraint "answers_files_answer_id_fkey"
  foreign key (answer_id)
  references "public"."answers"
  (id) on update cascade on delete cascade;
alter table "public"."answers_files" alter column "answer_id" drop not null;
alter table "public"."answers_files" add column "answer_id" int4;
