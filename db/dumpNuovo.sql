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
    nome character varying(255) NOT NULL,
    descrizione text
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
    nome character varying(255) NOT NULL,
    data timestamp without time zone NOT NULL,
    prezzo numeric(10,2) NOT NULL,
    citta character varying(255) NOT NULL,
    indirizzo character varying(255) NOT NULL,
    num_partecipanti integer NOT NULL,
    max_num_partecipanti integer NOT NULL,
    eta_minima smallint DEFAULT 0 NOT NULL,
    descrizione text,
    valutazione_media numeric(2,1) DEFAULT 0 NOT NULL,
    creatore integer NOT NULL,
    CONSTRAINT evento_valutazione_media_check CHECK (((valutazione_media >= (0)::numeric) AND (valutazione_media <= (5)::numeric)))
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
-- Name: partecipazione; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partecipazione (
    id_utente integer NOT NULL,
    id_evento integer NOT NULL,
    data date NOT NULL,
    annullata boolean NOT NULL
);


ALTER TABLE public.partecipazione OWNER TO postgres;

--
-- Name: persona_categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.persona_categoria (
    id_persona integer NOT NULL,
    id_categoria integer NOT NULL
);


ALTER TABLE public.persona_categoria OWNER TO postgres;

--
-- Name: recensione; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recensione (
    id_utente integer NOT NULL,
    id_evento integer NOT NULL,
    titolo character varying(255),
    descrizione character varying(255),
    valutazione smallint NOT NULL,
    data date DEFAULT CURRENT_DATE NOT NULL,
    CONSTRAINT recensione_valutazione_check CHECK (((valutazione >= 0) AND (valutazione <= 5)))
);


ALTER TABLE public.recensione OWNER TO postgres;

--
-- Name: utente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utente (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character(60) NOT NULL,
    nome character varying(255) NOT NULL,
    immagine_profilo character varying(255),
    citta character varying(255) NOT NULL,
    azienda boolean DEFAULT false NOT NULL,
    persona_cognome character varying(255),
    azienda_p_iva character(11),
    azienda_indirizzo character varying(255),
    azienda_recapito character(9),
    premium boolean DEFAULT false NOT NULL,
    premium_data_inizio date,
    premium_data_fine date,
    admin boolean DEFAULT false NOT NULL,
    data_creazione timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    data_ultima_modifica timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mostra_consigli_eventi boolean NOT NULL,
    username character varying(255) NOT NULL
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

COPY public.categoria (id, nome, descrizione) FROM stdin;
\.


--
-- Data for Name: evento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evento (id, nome, data, prezzo, citta, indirizzo, num_partecipanti, max_num_partecipanti, eta_minima, descrizione, valutazione_media, creatore) FROM stdin;
\.


--
-- Data for Name: evento_categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evento_categoria (id_evento, id_categoria) FROM stdin;
\.


--
-- Data for Name: partecipazione; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partecipazione (id_utente, id_evento, data, annullata) FROM stdin;
\.


--
-- Data for Name: persona_categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.persona_categoria (id_persona, id_categoria) FROM stdin;
\.


--
-- Data for Name: recensione; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recensione (id_utente, id_evento, titolo, descrizione, valutazione, data) FROM stdin;
\.


--
-- Data for Name: utente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utente (id, email, password, nome, immagine_profilo, citta, azienda, persona_cognome, azienda_p_iva, azienda_indirizzo, azienda_recapito, premium, premium_data_inizio, premium_data_fine, admin, data_creazione, data_ultima_modifica, mostra_consigli_eventi, username) FROM stdin;
1	admin@gmail.com	$2a$10$DHGex1yr8l3kle51PH0UZep2QHApUe6U44uUWgUNILJs6Y1qDa/du	Admin	\N	none	f	\N	\N	\N	\N	f	\N	\N	t	2025-01-25 19:49:02.294389	2025-01-25 19:49:02.294389	f	ADMIN
2	prova@example.com	password123                                                 	Nome Prova	https://example.com/immagine.jpg	Roma	f	Cognome Prova	12345678901	Via Prova 123	123456789	f	\N	\N	f	2025-01-26 15:13:01.924352	2025-01-26 15:13:01.924352	t	username_prova
3	giggi@gmail.com	$2a$10$otFGd9f.OO6awdRj7.KMW.Q46BN8mPeae9jpd3Ht8zyth5.k2Z4.q	Giggi	\N	CS	f	Cc	\N	\N	\N	f	\N	\N	f	2025-01-26 16:08:28.657601	2025-01-26 16:08:28.657601	t	giggi
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
-- Name: utente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utente_id_seq', 3, true);


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
-- Name: persona_categoria persona_categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona_categoria
    ADD CONSTRAINT persona_categoria_pkey PRIMARY KEY (id_persona, id_categoria);


--
-- Name: recensione recensione_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT recensione_pkey PRIMARY KEY (id_utente, id_evento);


--
-- Name: utente utente_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_email_key UNIQUE (email);


--
-- Name: utente utente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_pkey PRIMARY KEY (id);


--
-- Name: utente utente_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_username_key UNIQUE (username);


--
-- Name: evento fk_creatore; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento
    ADD CONSTRAINT fk_creatore FOREIGN KEY (creatore) REFERENCES public.utente(id) ON DELETE CASCADE;


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
    ADD CONSTRAINT fk_id_utente2 FOREIGN KEY (id_utente2) REFERENCES public.utente(id) ON DELETE CASCADE;


--
-- Name: persona_categoria persona_categoria_id_categoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona_categoria
    ADD CONSTRAINT persona_categoria_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categoria(id) ON DELETE CASCADE;


--
-- Name: persona_categoria persona_categoria_id_persona_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona_categoria
    ADD CONSTRAINT persona_categoria_id_persona_fkey FOREIGN KEY (id_persona) REFERENCES public.utente(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

