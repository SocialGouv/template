SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
CREATE TABLE public.books (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);
ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);
