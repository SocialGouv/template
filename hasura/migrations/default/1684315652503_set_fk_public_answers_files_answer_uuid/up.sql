alter table "public"."answers_files"
  add constraint "answers_files_answer_uuid_fkey"
  foreign key ("answer_uuid")
  references "public"."answers"
  ("uuid") on update cascade on delete cascade;
