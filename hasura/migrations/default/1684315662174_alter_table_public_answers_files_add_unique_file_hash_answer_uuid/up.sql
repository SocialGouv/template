alter table "public"."answers_files" add constraint "answers_files_file_hash_answer_uuid_key" unique ("file_hash", "answer_uuid");
