BEGIN TRANSACTION;
ALTER TABLE "public"."answers" DROP CONSTRAINT "answers_pkey";

ALTER TABLE "public"."answers"
    ADD CONSTRAINT "answers_pkey" PRIMARY KEY ("uuid");
COMMIT TRANSACTION;
