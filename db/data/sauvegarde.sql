--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: campaign; Type: TABLE; Schema: public; Owner: arbre
--

CREATE TABLE public.campaign (
    id integer NOT NULL,
    user_id integer,
    name text NOT NULL,
    image text,
    description text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.campaign OWNER TO arbre;

--
-- Name: campaign_id_seq; Type: SEQUENCE; Schema: public; Owner: arbre
--

ALTER TABLE public.campaign ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.campaign_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: commandline; Type: TABLE; Schema: public; Owner: arbre
--

CREATE TABLE public.commandline (
    id integer NOT NULL,
    order_id integer NOT NULL,
    tree_id integer NOT NULL,
    quantity integer,
    commandline_total integer,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.commandline OWNER TO arbre;

--
-- Name: commandline_id_seq; Type: SEQUENCE; Schema: public; Owner: arbre
--

ALTER TABLE public.commandline ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.commandline_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: order; Type: TABLE; Schema: public; Owner: arbre
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    order_date date NOT NULL,
    status text NOT NULL,
    total integer,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."order" OWNER TO arbre;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: arbre
--

ALTER TABLE public."order" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: orders; Type: TABLE; Schema: public; Owner: arbre
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    order_date date NOT NULL,
    status text NOT NULL,
    total integer,
    paid boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.orders OWNER TO arbre;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: arbre
--

ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tree; Type: TABLE; Schema: public; Owner: arbre
--

CREATE TABLE public.tree (
    id integer NOT NULL,
    campaign_id integer NOT NULL,
    user_id integer,
    name text NOT NULL,
    description text NOT NULL,
    image text,
    price numeric,
    date_of_purchase date,
    status text,
    planting_date date,
    gps_coordinates public.geometry(Point),
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.tree OWNER TO arbre;

--
-- Name: tree_id_seq; Type: SEQUENCE; Schema: public; Owner: arbre
--

ALTER TABLE public.tree ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tree_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: arbre
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    telephone text NOT NULL,
    birthday date NOT NULL,
    locality text NOT NULL,
    role text DEFAULT 'user'::text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."user" OWNER TO arbre;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: arbre
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: campaign; Type: TABLE DATA; Schema: public; Owner: arbre
--

COPY public.campaign (id, user_id, name, image, description, "createdAt", "updatedAt") FROM stdin;
1	1	Amazonie	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/logo_arbre_design_v3hvaa.jpg	restaurer et preserver nos precieux ecosystemes	2024-12-30 17:17:08.95407+01	\N
2	2	Vert	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/tree_nature_k8jxgj.jpg	Cette campagne vise a planter une variete d\\arbres indigenes	2024-12-30 17:17:08.95407+01	\N
3	3	Europe	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/logo_arbre_design_v3hvaa.jpg	restaurer et preserver nos precieux ecosystemes	2024-12-30 17:17:08.95407+01	\N
4	4	Asie	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/tree_nature_k8jxgj.jpg	Cette campagne vise a planter une variete d\\arbres indigenes	2024-12-30 17:17:08.95407+01	\N
5	5	Organic	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/logo_arbre_design_v3hvaa.jpg	restaurer et preserver nos precieux ecosystemes	2024-12-30 17:17:08.95407+01	\N
6	6	Eco	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/tree_nature_k8jxgj.jpg	Cette campagne vise a planter une variete d\\arbres indigenes	2024-12-30 17:17:08.95407+01	\N
7	7	Greenleaf	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/logo_arbre_design_v3hvaa.jpg	restaurer et preserver nos precieux ecosystemes	2024-12-30 17:17:08.95407+01	\N
8	8	Nature	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/tree_nature_k8jxgj.jpg	Cette campagne vise a planter une variete d\\arbres indigenes	2024-12-30 17:17:08.95407+01	\N
\.


--
-- Data for Name: commandline; Type: TABLE DATA; Schema: public; Owner: arbre
--

COPY public.commandline (id, order_id, tree_id, quantity, commandline_total, "createdAt", "updatedAt") FROM stdin;
1	1	1	2	40	2024-12-30 17:24:06.072+01	2024-12-30 17:24:06.073+01
2	2	1	3	60	2024-12-30 17:26:30.951+01	2024-12-30 17:26:30.951+01
3	3	1	1	20	2024-12-30 17:28:42.315+01	2024-12-30 17:28:42.315+01
4	4	1	1	20	2024-12-30 17:46:15.381+01	2024-12-30 17:46:15.381+01
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: arbre
--

COPY public."order" (id, user_id, order_date, status, total, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: arbre
--

COPY public.orders (id, user_id, order_date, status, total, paid, "createdAt", "updatedAt") FROM stdin;
1	11	2024-12-30	En attente	40	t	2024-12-30 17:24:06.055+01	2024-12-30 17:24:06.056+01
2	11	2024-12-30	En attente	60	t	2024-12-30 17:26:30.938+01	2024-12-30 17:26:30.938+01
3	11	2024-12-30	En attente	20	t	2024-12-30 17:28:42.302+01	2024-12-30 17:28:42.302+01
4	11	2024-12-30	En attente	20	t	2024-12-30 17:46:15.369+01	2024-12-30 17:46:15.369+01
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: tree; Type: TABLE DATA; Schema: public; Owner: arbre
--

COPY public.tree (id, campaign_id, user_id, name, description, image, price, date_of_purchase, status, planting_date, gps_coordinates, "createdAt", "updatedAt") FROM stdin;
1	1	1	Chene	Un chene magnifique et fort	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432096/pexels-tobiasbjorkli-2360670_bputsr.jpg	20.00	2021-01-01	Planted	2021-02-01	0101000020E61000002FDD2406819505407958A835CD334840	2024-12-30 17:17:08.95407+01	\N
2	2	2	Erable	Un erable a sucre robuste	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432413/pexels-photo-12345930_rkiwfr.jpg	15.00	2021-01-01	Planted	2021-03-01	0101000020E6100000D044D8F0F44A0740CC7F48BF7DB54840	2024-12-30 17:17:08.95407+01	\N
3	3	3	Sapin	Le sapin est un genre de plantes vivaces	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432096/pexels-tobiasbjorkli-2360670_bputsr.jpg	20.00	2021-01-01	En attente	2021-02-01	0101000020E6100000B515FBCBEE891C405AF5B9DA8A1D4840	2024-12-30 17:17:08.95407+01	\N
4	4	4	Baobab	Un arbre tres distinctif avec un tronc massif et renfle	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432413/pexels-photo-12345930_rkiwfr.jpg	15.00	2021-01-01	validated	2021-03-01	0101000020E6100000234A7B832F0C1D4042CF66D5E7DA4540	2024-12-30 17:17:08.95407+01	\N
5	5	5	Ficus	Le ficus est un genre botanique relevant de la famille des Moraceae	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432096/pexels-tobiasbjorkli-2360670_bputsr.jpg	20.00	2021-01-01	Planted	2021-02-01	0101000020E6100000423EE8D9AC7A1540CBA145B6F3A54540	2024-12-30 17:17:08.95407+01	\N
6	6	6	Catalpa	Genre botanique de plantes fleuries de la famille des Bignoniaceae	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432413/pexels-photo-12345930_rkiwfr.jpg	15.00	2021-01-01	Planted	2021-03-01	0101000020E610000087A757CA324402C0E17A14AE47014840	2024-12-30 17:17:08.95407+01	\N
7	7	7	Alnus	Genre botanique d’arbres et arbustes relevant de la famille des Betulaceae	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432096/pexels-tobiasbjorkli-2360670_bputsr.jpg	20.00	2021-01-01	Planted	2021-02-01	0101000020E6100000A2B437F8C2640040EC51B81E85F34740	2024-12-30 17:17:08.95407+01	\N
8	8	8	Olivier	Un arbre emblematique mediterraneen, souvent associe a la paix et a la sagesse	https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432413/pexels-photo-12345930_rkiwfr.jpg	15.00	2021-01-01	Planted	2021-03-01	0101000020E610000046B6F3FDD4381340E10B93A982F94540	2024-12-30 17:17:08.95407+01	\N
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: arbre
--

COPY public."user" (id, email, password, firstname, lastname, telephone, birthday, locality, role, "createdAt", "updatedAt") FROM stdin;
1	partner1@gmail.com	Password1@	Nicolas	MARTIN	1234567890	1990-01-01	Paris	partner	2024-12-30 17:17:08.95407+01	\N
2	partner2@gmail.com	Password2@	Jean	BERNARD	1234567891	1980-01-01	Paris	partner	2024-12-30 17:17:08.95407+01	\N
3	partner3@gmail.com	Password3@	Georges	DUBOIS	1234567892	1970-01-01	Paris	partner	2024-12-30 17:17:08.95407+01	\N
4	partner4@gmail.com	Password4@	Christian	CLEMENT	1234567893	1960-01-01	Paris	partner	2024-12-30 17:17:08.95407+01	\N
5	partner5@gmail.com	Password5@	Emma	DURAND	1234567894	1950-01-01	Paris	partner	2024-12-30 17:17:08.95407+01	\N
6	partner6@gmail.com	Password6@	Louise	DIDIER	1234567895	2000-01-01	Paris	partner	2024-12-30 17:17:08.95407+01	\N
7	partner7@gmail.com	Password7@	Lea	ROCHER	1234567896	2001-01-01	Paris	partner	2024-12-30 17:17:08.95407+01	\N
8	partner8@gmail.com	Password8@	Sofia	LAROCHE	1234567897	1985-01-01	Paris	partner	2024-12-30 17:17:08.95407+01	\N
9	Admin1@gmail.com	Password1@	Admin	DAVID	1234567890	1990-01-01	Paris	admin	2024-12-30 17:17:08.95407+01	\N
10	User1@gmail.com	Password1@	Maco	USER1	1234567890	1990-01-01	Paris	user	2024-12-30 17:17:08.95407+01	\N
11	User5@gmail.com	$2b$10$qTxJ53hI4lgiKDG/fc2fFeLu9JevzxMqepmr0dyAnCL1G.1qjCbrm	david	user1	0778542365	2023-02-24	ST OUEN	user	2024-12-30 17:23:09.717+01	2024-12-30 17:23:34.848+01
12	foo-bar@example.com	$2b$10$I7/vmT.XYrv5XD/Wv8te3uhEIyHUWsFa6Ik3VkWps15yjTLRhbrv2	ZAP	ZAP	9999999999	2024-12-30	ZAP	user	2024-12-30 17:58:27.136+01	2024-12-30 17:58:27.144+01
\.


--
-- Name: campaign_id_seq; Type: SEQUENCE SET; Schema: public; Owner: arbre
--

SELECT pg_catalog.setval('public.campaign_id_seq', 8, true);


--
-- Name: commandline_id_seq; Type: SEQUENCE SET; Schema: public; Owner: arbre
--

SELECT pg_catalog.setval('public.commandline_id_seq', 4, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: arbre
--

SELECT pg_catalog.setval('public.order_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: arbre
--

SELECT pg_catalog.setval('public.orders_id_seq', 4, true);


--
-- Name: tree_id_seq; Type: SEQUENCE SET; Schema: public; Owner: arbre
--

SELECT pg_catalog.setval('public.tree_id_seq', 8, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: arbre
--

SELECT pg_catalog.setval('public.user_id_seq', 242, true);


--
-- Name: campaign campaign_pkey; Type: CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public.campaign
    ADD CONSTRAINT campaign_pkey PRIMARY KEY (id);


--
-- Name: commandline commandline_pkey; Type: CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public.commandline
    ADD CONSTRAINT commandline_pkey PRIMARY KEY (id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: tree tree_pkey; Type: CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public.tree
    ADD CONSTRAINT tree_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: campaign campaign_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public.campaign
    ADD CONSTRAINT campaign_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: commandline commandline_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public.commandline
    ADD CONSTRAINT commandline_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: commandline commandline_tree_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public.commandline
    ADD CONSTRAINT commandline_tree_id_fkey FOREIGN KEY (tree_id) REFERENCES public.tree(id);


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: tree tree_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public.tree
    ADD CONSTRAINT tree_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaign(id);


--
-- Name: tree tree_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: arbre
--

ALTER TABLE ONLY public.tree
    ADD CONSTRAINT tree_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

