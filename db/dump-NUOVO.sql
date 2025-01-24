PGDMP  1                     }         	   movita_db    17.2    17.2 7    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            @           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            A           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            B           1262    16535 	   movita_db    DATABASE     |   CREATE DATABASE movita_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Italian_Italy.1252';
    DROP DATABASE movita_db;
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            C           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4            �            1259    16536    amicizia    TABLE     c   CREATE TABLE public.amicizia (
    id_utente1 integer NOT NULL,
    id_utente2 integer NOT NULL
);
    DROP TABLE public.amicizia;
       public         heap r       postgres    false    4            �            1259    16539 	   categoria    TABLE     {   CREATE TABLE public.categoria (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    descrizione text
);
    DROP TABLE public.categoria;
       public         heap r       postgres    false    4            �            1259    16542    categoria_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.categoria_id_seq;
       public               postgres    false    218    4            D           0    0    categoria_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;
          public               postgres    false    219            �            1259    16543    evento    TABLE     }  CREATE TABLE public.evento (
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
    DROP TABLE public.evento;
       public         heap r       postgres    false    4            �            1259    16548    evento_categoria    TABLE     l   CREATE TABLE public.evento_categoria (
    id_evento integer NOT NULL,
    id_categoria integer NOT NULL
);
 $   DROP TABLE public.evento_categoria;
       public         heap r       postgres    false    4            �            1259    16551    evento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.evento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.evento_id_seq;
       public               postgres    false    4    220            E           0    0    evento_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.evento_id_seq OWNED BY public.evento.id;
          public               postgres    false    222            �            1259    16553    partecipazione    TABLE     �   CREATE TABLE public.partecipazione (
    id_utente integer NOT NULL,
    id_evento integer NOT NULL,
    data date NOT NULL,
    annullata boolean NOT NULL
);
 "   DROP TABLE public.partecipazione;
       public         heap r       postgres    false    4            �            1259    16653    persona_categoria    TABLE     n   CREATE TABLE public.persona_categoria (
    id_persona integer NOT NULL,
    id_categoria integer NOT NULL
);
 %   DROP TABLE public.persona_categoria;
       public         heap r       postgres    false    4            �            1259    16556 
   recensione    TABLE     _  CREATE TABLE public.recensione (
    id_utente integer NOT NULL,
    id_evento integer NOT NULL,
    titolo character varying(255),
    descrizione character varying(255),
    valutazione smallint NOT NULL,
    data date DEFAULT CURRENT_DATE NOT NULL,
    CONSTRAINT recensione_valutazione_check CHECK (((valutazione >= 0) AND (valutazione <= 5)))
);
    DROP TABLE public.recensione;
       public         heap r       postgres    false    4            �            1259    16561    utente    TABLE     k  CREATE TABLE public.utente (
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
    DROP TABLE public.utente;
       public         heap r       postgres    false    4            �            1259    16566    utente_id_seq    SEQUENCE     �   CREATE SEQUENCE public.utente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.utente_id_seq;
       public               postgres    false    4    225            F           0    0    utente_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.utente_id_seq OWNED BY public.utente.id;
          public               postgres    false    226            u           2604    16567    categoria id    DEFAULT     l   ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);
 ;   ALTER TABLE public.categoria ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    218            v           2604    16568 	   evento id    DEFAULT     f   ALTER TABLE ONLY public.evento ALTER COLUMN id SET DEFAULT nextval('public.evento_id_seq'::regclass);
 8   ALTER TABLE public.evento ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    220            z           2604    16570 	   utente id    DEFAULT     f   ALTER TABLE ONLY public.utente ALTER COLUMN id SET DEFAULT nextval('public.utente_id_seq'::regclass);
 8   ALTER TABLE public.utente ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    225            2          0    16536    amicizia 
   TABLE DATA           :   COPY public.amicizia (id_utente1, id_utente2) FROM stdin;
    public               postgres    false    217   nG       3          0    16539 	   categoria 
   TABLE DATA           :   COPY public.categoria (id, nome, descrizione) FROM stdin;
    public               postgres    false    218   �G       5          0    16543    evento 
   TABLE DATA           �   COPY public.evento (id, nome, data, prezzo, citta, indirizzo, num_partecipanti, max_num_partecipanti, eta_minima, descrizione, valutazione_media, creatore) FROM stdin;
    public               postgres    false    220   �G       6          0    16548    evento_categoria 
   TABLE DATA           C   COPY public.evento_categoria (id_evento, id_categoria) FROM stdin;
    public               postgres    false    221   �G       8          0    16553    partecipazione 
   TABLE DATA           O   COPY public.partecipazione (id_utente, id_evento, data, annullata) FROM stdin;
    public               postgres    false    223   �G       <          0    16653    persona_categoria 
   TABLE DATA           E   COPY public.persona_categoria (id_persona, id_categoria) FROM stdin;
    public               postgres    false    227   �G       9          0    16556 
   recensione 
   TABLE DATA           b   COPY public.recensione (id_utente, id_evento, titolo, descrizione, valutazione, data) FROM stdin;
    public               postgres    false    224   H       :          0    16561    utente 
   TABLE DATA           "  COPY public.utente (id, email, password, nome, immagine_profilo, citta, azienda, persona_cognome, azienda_p_iva, azienda_indirizzo, azienda_recapito, premium, premium_data_inizio, premium_data_fine, admin, data_creazione, data_ultima_modifica, mostra_consigli_eventi, username) FROM stdin;
    public               postgres    false    225   9H       G           0    0    categoria_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categoria_id_seq', 1, false);
          public               postgres    false    219            H           0    0    evento_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.evento_id_seq', 1, false);
          public               postgres    false    222            I           0    0    utente_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.utente_id_seq', 1, false);
          public               postgres    false    226            �           2606    16572    amicizia amicizia_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.amicizia
    ADD CONSTRAINT amicizia_pkey PRIMARY KEY (id_utente1, id_utente2);
 @   ALTER TABLE ONLY public.amicizia DROP CONSTRAINT amicizia_pkey;
       public                 postgres    false    217    217            �           2606    16574    categoria categoria_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categoria_pkey;
       public                 postgres    false    218            �           2606    16576 &   evento_categoria evento_categoria_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.evento_categoria
    ADD CONSTRAINT evento_categoria_pkey PRIMARY KEY (id_evento, id_categoria);
 P   ALTER TABLE ONLY public.evento_categoria DROP CONSTRAINT evento_categoria_pkey;
       public                 postgres    false    221    221            �           2606    16578    evento evento_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.evento
    ADD CONSTRAINT evento_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.evento DROP CONSTRAINT evento_pkey;
       public                 postgres    false    220            �           2606    16580 "   partecipazione partecipazione_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.partecipazione
    ADD CONSTRAINT partecipazione_pkey PRIMARY KEY (id_utente, id_evento);
 L   ALTER TABLE ONLY public.partecipazione DROP CONSTRAINT partecipazione_pkey;
       public                 postgres    false    223    223            �           2606    16657 (   persona_categoria persona_categoria_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.persona_categoria
    ADD CONSTRAINT persona_categoria_pkey PRIMARY KEY (id_persona, id_categoria);
 R   ALTER TABLE ONLY public.persona_categoria DROP CONSTRAINT persona_categoria_pkey;
       public                 postgres    false    227    227            �           2606    16582    recensione recensione_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT recensione_pkey PRIMARY KEY (id_utente, id_evento);
 D   ALTER TABLE ONLY public.recensione DROP CONSTRAINT recensione_pkey;
       public                 postgres    false    224    224            �           2606    16640    utente utente_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_email_key UNIQUE (email);
 A   ALTER TABLE ONLY public.utente DROP CONSTRAINT utente_email_key;
       public                 postgres    false    225            �           2606    16584    utente utente_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.utente DROP CONSTRAINT utente_pkey;
       public                 postgres    false    225            �           2606    16669    utente utente_username_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_username_key UNIQUE (username);
 D   ALTER TABLE ONLY public.utente DROP CONSTRAINT utente_username_key;
       public                 postgres    false    225            �           2606    16646    evento fk_creatore    FK CONSTRAINT     �   ALTER TABLE ONLY public.evento
    ADD CONSTRAINT fk_creatore FOREIGN KEY (creatore) REFERENCES public.utente(id) ON DELETE CASCADE;
 <   ALTER TABLE ONLY public.evento DROP CONSTRAINT fk_creatore;
       public               postgres    false    220    225    4753            �           2606    16590     evento_categoria fk_id_categoria    FK CONSTRAINT     �   ALTER TABLE ONLY public.evento_categoria
    ADD CONSTRAINT fk_id_categoria FOREIGN KEY (id_categoria) REFERENCES public.categoria(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.evento_categoria DROP CONSTRAINT fk_id_categoria;
       public               postgres    false    221    4741    218            �           2606    16595    partecipazione fk_id_evento    FK CONSTRAINT     �   ALTER TABLE ONLY public.partecipazione
    ADD CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.partecipazione DROP CONSTRAINT fk_id_evento;
       public               postgres    false    4743    220    223            �           2606    16600    recensione fk_id_evento    FK CONSTRAINT     �   ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.recensione DROP CONSTRAINT fk_id_evento;
       public               postgres    false    4743    220    224            �           2606    16605    evento_categoria fk_id_evento    FK CONSTRAINT     �   ALTER TABLE ONLY public.evento_categoria
    ADD CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.evento_categoria DROP CONSTRAINT fk_id_evento;
       public               postgres    false    221    4743    220            �           2606    16610    partecipazione fk_id_utente    FK CONSTRAINT     �   ALTER TABLE ONLY public.partecipazione
    ADD CONSTRAINT fk_id_utente FOREIGN KEY (id_utente) REFERENCES public.utente(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.partecipazione DROP CONSTRAINT fk_id_utente;
       public               postgres    false    4753    223    225            �           2606    16615    recensione fk_id_utente    FK CONSTRAINT     �   ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT fk_id_utente FOREIGN KEY (id_utente) REFERENCES public.utente(id) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.recensione DROP CONSTRAINT fk_id_utente;
       public               postgres    false    224    225    4753            �           2606    16620    amicizia fk_id_utente1    FK CONSTRAINT     �   ALTER TABLE ONLY public.amicizia
    ADD CONSTRAINT fk_id_utente1 FOREIGN KEY (id_utente1) REFERENCES public.utente(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.amicizia DROP CONSTRAINT fk_id_utente1;
       public               postgres    false    217    225    4753            �           2606    16625    amicizia fk_id_utente2    FK CONSTRAINT     �   ALTER TABLE ONLY public.amicizia
    ADD CONSTRAINT fk_id_utente2 FOREIGN KEY (id_utente2) REFERENCES public.evento(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.amicizia DROP CONSTRAINT fk_id_utente2;
       public               postgres    false    217    4743    220            �           2606    16663 5   persona_categoria persona_categoria_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.persona_categoria
    ADD CONSTRAINT persona_categoria_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categoria(id) ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.persona_categoria DROP CONSTRAINT persona_categoria_id_categoria_fkey;
       public               postgres    false    227    218    4741            �           2606    16658 3   persona_categoria persona_categoria_id_persona_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.persona_categoria
    ADD CONSTRAINT persona_categoria_id_persona_fkey FOREIGN KEY (id_persona) REFERENCES public.utente(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.persona_categoria DROP CONSTRAINT persona_categoria_id_persona_fkey;
       public               postgres    false    4753    227    225            2      x������ � �      3      x������ � �      5      x������ � �      6      x������ � �      8      x������ � �      <      x������ � �      9      x������ � �      :      x������ � �     