alter table "public"."answers" drop constraint "answers_pkey";
alter table "public"."answers"
    add constraint "answers_pkey"
    primary key ("id");
