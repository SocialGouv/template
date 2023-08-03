alter table "public"."files"
  add constraint "files_answers_files_id_fkey"
  foreign key ("answers_files_id")
  references "public"."answers_files"
  ("id") on update cascade on delete cascade;
