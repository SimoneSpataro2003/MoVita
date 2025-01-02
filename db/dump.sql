--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: my_schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA my_schema;


ALTER SCHEMA my_schema OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: amicizia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.amicizia (
    id_utente1 integer NOT NULL,
    id_utente2 integer NOT NULL
);


ALTER TABLE public.amicizia OWNER TO postgres;

--
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    id integer NOT NULL,
    nome character varying(20) NOT NULL
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- Name: categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categoria_id_seq OWNER TO postgres;

--
-- Name: categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;


--
-- Name: evento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evento (
    id integer NOT NULL,
    priorita smallint NOT NULL,
    citta character varying(20) NOT NULL,
    via character varying(40) NOT NULL,
    numero_civico smallint,
    data timestamp without time zone NOT NULL,
    numero_partecipanti smallint NOT NULL,
    max_num_partecipanti smallint NOT NULL,
    prezzo smallint,
    descrizione text,
    id_utente integer NOT NULL
);


ALTER TABLE public.evento OWNER TO postgres;

--
-- Name: evento_categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evento_categoria (
    id_evento integer NOT NULL,
    id_categoria integer NOT NULL
);


ALTER TABLE public.evento_categoria OWNER TO postgres;

--
-- Name: evento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evento_id_seq OWNER TO postgres;

--
-- Name: evento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evento_id_seq OWNED BY public.evento.id;


--
-- Name: evento_id_utente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evento_id_utente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evento_id_utente_seq OWNER TO postgres;

--
-- Name: evento_id_utente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evento_id_utente_seq OWNED BY public.evento.id_utente;


--
-- Name: partecipazione; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partecipazione (
    id_utente integer NOT NULL,
    id_evento integer NOT NULL,
    data date NOT NULL
);


ALTER TABLE public.partecipazione OWNER TO postgres;

--
-- Name: recensione; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recensione (
    id_utente integer NOT NULL,
    id_evento integer NOT NULL,
    titolo character varying(20) NOT NULL,
    testo text NOT NULL,
    valutazione smallint NOT NULL,
    data date NOT NULL
);


ALTER TABLE public.recensione OWNER TO postgres;

--
-- Name: utente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utente (
    id integer NOT NULL,
    tipo smallint NOT NULL,
    verificato boolean,
    username character varying(20) NOT NULL,
    password character varying(64) NOT NULL,
    luogo character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    credito integer NOT NULL,
    immagine_profilo smallint,
    eta smallint NOT NULL,
    valutazione smallint
);


ALTER TABLE public.utente OWNER TO postgres;

--
-- Name: utente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.utente_id_seq OWNER TO postgres;

--
-- Name: utente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utente_id_seq OWNED BY public.utente.id;


--
-- Name: categoria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);


--
-- Name: evento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento ALTER COLUMN id SET DEFAULT nextval('public.evento_id_seq'::regclass);


--
-- Name: evento id_utente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento ALTER COLUMN id_utente SET DEFAULT nextval('public.evento_id_utente_seq'::regclass);


--
-- Name: utente id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente ALTER COLUMN id SET DEFAULT nextval('public.utente_id_seq'::regclass);


--
-- Data for Name: amicizia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.amicizia (id_utente1, id_utente2) FROM stdin;
\.


--
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categoria (id, nome) FROM stdin;
\.


--
-- Data for Name: evento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evento (id, priorita, citta, via, numero_civico, data, numero_partecipanti, max_num_partecipanti, prezzo, descrizione, id_utente) FROM stdin;
\.


--
-- Data for Name: evento_categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evento_categoria (id_evento, id_categoria) FROM stdin;
\.


--
-- Data for Name: partecipazione; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partecipazione (id_utente, id_evento, data) FROM stdin;
\.


--
-- Data for Name: recensione; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recensione (id_utente, id_evento, titolo, testo, valutazione, data) FROM stdin;
\.


--
-- Data for Name: utente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utente (id, tipo, verificato, username, password, luogo, email, credito, immagine_profilo, eta, valutazione) FROM stdin;
\.


--
-- Name: categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_id_seq', 1, false);


--
-- Name: evento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evento_id_seq', 1, false);


--
-- Name: evento_id_utente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evento_id_utente_seq', 1, false);


--
-- Name: utente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utente_id_seq', 1, false);


--
-- Name: amicizia amicizia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amicizia
    ADD CONSTRAINT amicizia_pkey PRIMARY KEY (id_utente1, id_utente2);


--
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);


--
-- Name: evento_categoria evento_categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento_categoria
    ADD CONSTRAINT evento_categoria_pkey PRIMARY KEY (id_evento, id_categoria);


--
-- Name: evento evento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento
    ADD CONSTRAINT evento_pkey PRIMARY KEY (id);


--
-- Name: partecipazione partecipazione_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partecipazione
    ADD CONSTRAINT partecipazione_pkey PRIMARY KEY (id_utente, id_evento);


--
-- Name: recensione recensione_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT recensione_pkey PRIMARY KEY (id_utente, id_evento);


--
-- Name: utente utente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_pkey PRIMARY KEY (id);


--
-- Name: evento evento_id_utente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento
    ADD CONSTRAINT evento_id_utente_fkey FOREIGN KEY (id_utente) REFERENCES public.utente(id);


--
-- Name: evento_categoria fk_id_categoria; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento_categoria
    ADD CONSTRAINT fk_id_categoria FOREIGN KEY (id_categoria) REFERENCES public.categoria(id) ON DELETE CASCADE;


--
-- Name: partecipazione fk_id_evento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partecipazione
    ADD CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id) ON DELETE CASCADE;


--
-- Name: recensione fk_id_evento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id) ON DELETE CASCADE;


--
-- Name: evento_categoria fk_id_evento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento_categoria
    ADD CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id) ON DELETE CASCADE;


--
-- Name: partecipazione fk_id_utente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partecipazione
    ADD CONSTRAINT fk_id_utente FOREIGN KEY (id_utente) REFERENCES public.utente(id) ON DELETE CASCADE;


--
-- Name: recensione fk_id_utente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT fk_id_utente FOREIGN KEY (id_utente) REFERENCES public.utente(id) ON DELETE CASCADE;


--
-- Name: amicizia fk_id_utente1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amicizia
    ADD CONSTRAINT fk_id_utente1 FOREIGN KEY (id_utente1) REFERENCES public.utente(id) ON DELETE CASCADE;


--
-- Name: amicizia fk_id_utente2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amicizia
    ADD CONSTRAINT fk_id_utente2 FOREIGN KEY (id_utente2) REFERENCES public.evento(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

