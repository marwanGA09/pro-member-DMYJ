--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: ademk
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO ademk;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: ademk
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Role; Type: TYPE; Schema: public; Owner: ademk
--

CREATE TYPE public."Role" AS ENUM (
    'user',
    'admin'
);


ALTER TYPE public."Role" OWNER TO ademk;

--
-- Name: Sector; Type: TYPE; Schema: public; Owner: ademk
--

CREATE TYPE public."Sector" AS ENUM (
    'economy',
    'academy',
    'social',
    'dawah',
    'management',
    'other'
);


ALTER TYPE public."Sector" OWNER TO ademk;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Member; Type: TABLE; Schema: public; Owner: ademk
--

CREATE TABLE public."Member" (
    id integer NOT NULL,
    sex character varying(10) NOT NULL,
    profession character varying(80),
    address character varying(250) NOT NULL,
    phone character varying(20) NOT NULL,
    email character varying(100),
    note text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    book_number text NOT NULL,
    created_by integer NOT NULL,
    date_of_birth timestamp(3) without time zone,
    membership_amount integer NOT NULL,
    profile_image text,
    signed_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    full_name character varying(150) NOT NULL
);


ALTER TABLE public."Member" OWNER TO ademk;

--
-- Name: Member_id_seq; Type: SEQUENCE; Schema: public; Owner: ademk
--

CREATE SEQUENCE public."Member_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Member_id_seq" OWNER TO ademk;

--
-- Name: Member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ademk
--

ALTER SEQUENCE public."Member_id_seq" OWNED BY public."Member".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: ademk
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    first_name character varying(80) NOT NULL,
    middle_name character varying(80) NOT NULL,
    last_name character varying(80) NOT NULL,
    date_of_birth date,
    email character varying(100) NOT NULL,
    sector public."Sector" DEFAULT 'economy'::public."Sector" NOT NULL,
    password character varying(200) NOT NULL,
    role public."Role" DEFAULT 'user'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    phone_number character varying(20) NOT NULL
);


ALTER TABLE public."User" OWNER TO ademk;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: ademk
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO ademk;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ademk
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: ademk
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO ademk;

--
-- Name: Member id; Type: DEFAULT; Schema: public; Owner: ademk
--

ALTER TABLE ONLY public."Member" ALTER COLUMN id SET DEFAULT nextval('public."Member_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: ademk
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Member; Type: TABLE DATA; Schema: public; Owner: ademk
--

COPY public."Member" (id, sex, profession, address, phone, email, note, "createdAt", "updatedAt", book_number, created_by, date_of_birth, membership_amount, profile_image, signed_date, full_name) FROM stdin;
2	male	\N	dhera	2348977	\N	\N	2024-12-13 21:04:19.502	2024-12-13 21:04:19.502	7897402	7	\N	78	\N	2024-12-13 21:04:19.502	adem kedir galiyo
3	male	\N	dhera	2344357	\N	\N	2024-12-13 21:08:01.24	2024-12-13 21:08:01.24	78902	7	\N	78	\N	2024-12-13 21:08:01.24	adem kedir galiyo
4	male	\N	dhera	224242	\N	\N	2024-12-13 21:08:15.63	2024-12-13 21:08:15.63	132	9	\N	78	\N	2024-12-13 21:08:15.63	adem kedir galiyo
5	male	\N	dhera	2242942	\N	\N	2024-12-13 21:08:30.156	2024-12-13 21:08:30.156	1322	9	\N	78	\N	2024-12-13 21:08:30.156	adem kedir galiyo
7	male	\N	dhera	2242	\N	\N	2024-12-13 21:09:16.157	2024-12-13 21:09:16.157	1302	8	\N	78	\N	2024-12-13 21:09:16.157	adem kedir galiyo
25	male	\N	dhera	2142	\N	\N	2024-12-13 21:49:46.771	2024-12-13 21:49:46.771	02	7	\N	78	\N	2024-12-13 21:49:46.771	adem kedir galiyo
29	male	\N	dhera	2112	\N	\N	2024-12-14 17:54:49.625	2024-12-14 17:54:49.625	021	16	\N	78	\N	2024-12-14 17:54:49.625	adem kedir galiyo
30	male	\N	dhera	26432	\N	\N	2024-12-14 17:55:01.764	2024-12-14 17:55:01.764	35021	16	\N	78	\N	2024-12-14 17:55:01.764	adem kedir galiyo
33	male	\N	dhera	54374553	\N	\N	2024-12-14 17:55:54.234	2024-12-14 17:55:54.234	0021	15	\N	78	\N	2024-12-14 17:55:54.234	adem kedir galiyo
34	male	\N		87089	\N	\N	2024-12-14 17:56:57.913	2024-12-14 17:52:44.743	78	14	\N	90	\N	2024-01-01 00:00:00	asdfkl
36	female	\N	dhera	54000553	\N	\N	2024-12-14 18:58:43.294	2024-12-14 18:58:43.294	55021	14	\N	78	\N	2024-12-14 18:58:43.294	adem kedir galiyo
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: ademk
--

COPY public."User" (id, username, first_name, middle_name, last_name, date_of_birth, email, sector, password, role, "createdAt", "updatedAt", phone_number) FROM stdin;
5	ademkg	ademkg	dssd	kljkj	2024-11-26	ademkg@gmail.com	academy	$2b$11$MBEOLz8U9vsOcGcu9h/f5etqOrLAhOrcU81Qcs50zu7HGi2asxfPu	admin	2024-12-13 08:00:19.062	2024-12-13 08:00:19.062	789907253472
7	ademkg1	ademkg	dssd	kljkj	2024-11-26	ademkg1@gmail.com	academy	$2b$11$FEzDqDSZ2DsHh9WsLZntsOLlJdjVQSGK4U3ZQxg/jdIUDdpU16tqa	admin	2024-12-13 18:26:41.982	2024-12-13 18:26:41.982	78990725342
8	ademkg2	ademkg	dssd	kljkj	2024-11-26	ademkg2@gmail.com	academy	$2b$11$ytLiye/uyMJtikwDVMjb4OH3HmmLdghu3iAHvCVrdVCq8zhPl29QG	admin	2024-12-13 18:31:13.167	2024-12-13 18:31:13.167	78990725
9	suuudiii	suuudiii	suuudiii	suuudiii	\N	suuudiii@gmail.com	management	$2b$11$KFZWFvgPu3/x0gIBpdAHF.sASQifXnBIwoOMhhbTPP7xdrIfr.ggO	user	2024-12-13 18:51:57.163	2024-12-13 18:51:57.163	2057893425
12	4	ademkg	dssd	kljkj	2024-11-26	ade4mkg@gmail.com	academy	$2b$11$hcXU19JQlNw3JaMR.YiytuCCEnXgfRWgsNBLbnqaO62O0mSHPcuAi	admin	2024-12-14 17:49:32.005	2024-12-14 17:49:32.005	78990725472
14	44	ademkg	dssd	kljkj	2024-11-26	ad44mkg@gmail.com	academy	$2b$11$dmX1lYbU/Nvd36slu3zH5ehVlGJYGBzMvYAqNYOhME9rHik14dIXq	admin	2024-12-14 17:49:56.802	2024-12-14 17:49:56.802	78990772
15	434	ademkg	dssd	kljkj	2024-11-26	ad43mkg@gmail.com	academy	$2b$11$Yz6g7mUpu/N831FTO9kJCuYDjrS9IVXKlo4GewzsoCDNFHX.JkCfa	admin	2024-12-14 17:50:13.167	2024-12-14 17:50:13.167	7893672
16	434sg	ademkg	dssd	kljkj	2024-11-26	ad43mkg@agmail.com	academy	$2b$11$SGGMXYzd0umUJqs1pe6B9OcNSsHi6hHvImoDq3sSCDI0HsFBSDxBm	admin	2024-12-14 17:50:27.532	2024-12-14 17:50:27.532	78938672
17	434vsg	ademkg	dssd	kljkj	2024-11-26	ad43mkg@agail.com	academy	$2b$11$blFq.71cFwFXCDUjW/ZrgOnkqWBy2XvwQe5I4xqVe1OYFdqSH11Lm	admin	2024-12-14 17:50:50.712	2024-12-14 17:50:50.712	7893872
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: ademk
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
33b7cc16-94bc-4356-a71e-219bac0a952c	0773a1706885dc2488546b22855914055805f0c42269184169c30d170a384665	2024-12-12 15:29:23.018068+03	20241212122922_add_member_model	\N	\N	2024-12-12 15:29:22.978165+03	1
9021dfc2-d9cb-4adc-91b7-df1b6bdc39a5	1792f9b7ea2626370b3a6c3a77dee6a06b8aee3d1d9a4928c943409062ad98fe	2024-12-13 10:05:06.398481+03	20241213070506_change_naming_convention	\N	\N	2024-12-13 10:05:06.352468+03	1
ad22bc88-75ef-470e-8e21-fe582da1ec64	09771b6c668b49339f316bd8245f64d9a102dc3f27d2f88b4fceb6d1f3abe7a4	2024-12-13 22:26:34.578046+03	20241213192634_change_name_format	\N	\N	2024-12-13 22:26:34.561069+03	1
\.


--
-- Name: Member_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ademk
--

SELECT pg_catalog.setval('public."Member_id_seq"', 36, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ademk
--

SELECT pg_catalog.setval('public."User_id_seq"', 17, true);


--
-- Name: Member Member_pkey; Type: CONSTRAINT; Schema: public; Owner: ademk
--

ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: ademk
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: ademk
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Member_book_number_key; Type: INDEX; Schema: public; Owner: ademk
--

CREATE UNIQUE INDEX "Member_book_number_key" ON public."Member" USING btree (book_number);


--
-- Name: Member_email_key; Type: INDEX; Schema: public; Owner: ademk
--

CREATE UNIQUE INDEX "Member_email_key" ON public."Member" USING btree (email);


--
-- Name: Member_id_key; Type: INDEX; Schema: public; Owner: ademk
--

CREATE UNIQUE INDEX "Member_id_key" ON public."Member" USING btree (id);


--
-- Name: Member_phone_key; Type: INDEX; Schema: public; Owner: ademk
--

CREATE UNIQUE INDEX "Member_phone_key" ON public."Member" USING btree (phone);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: ademk
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_id_key; Type: INDEX; Schema: public; Owner: ademk
--

CREATE UNIQUE INDEX "User_id_key" ON public."User" USING btree (id);


--
-- Name: User_phone_number_key; Type: INDEX; Schema: public; Owner: ademk
--

CREATE UNIQUE INDEX "User_phone_number_key" ON public."User" USING btree (phone_number);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: ademk
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Member Member_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ademk
--

ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: ademk
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

