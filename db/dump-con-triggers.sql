PGDMP  )    )                 }         	   movita_db    17.2    17.2 B    J           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            K           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            L           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            M           1262    16535 	   movita_db    DATABASE     |   CREATE DATABASE movita_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Italian_Italy.1252';
    DROP DATABASE movita_db;
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            N           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4            �            1255    16681    check_inserimento_valutazione()    FUNCTION     /  CREATE FUNCTION public.check_inserimento_valutazione() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Verifica se l'utente ha partecipato all'evento
    IF NOT EXISTS (
        SELECT *
        FROM partecipazione
        WHERE id_evento = NEW.id_evento
          AND id_utente = NEW.id_utente
          AND annullata = false
    ) THEN
        RAISE EXCEPTION 'L''utente con id % non ha partecipato all''evento con id %', NEW.id_utente, NEW.id_evento;
    END IF;

    -- Verifica se l'evento è già iniziato
    IF NEW.data < (SELECT data
                FROM evento
                WHERE id = NEW.id_evento) THEN
        RAISE EXCEPTION 'Non è possibile inserire una valutazione prima dell''inizio dell''evento con id %', NEW.id_evento;
    END IF;

    RETURN NEW;
END;
$$;
 6   DROP FUNCTION public.check_inserimento_valutazione();
       public               postgres    false    4            �            1255    16672    decrementa_num_partecipanti()    FUNCTION     k  CREATE FUNCTION public.decrementa_num_partecipanti() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Decrementa num_partecipanti se la partecipazione è annullata
    IF NEW.annullata = true THEN
        UPDATE evento
        SET num_partecipanti = num_partecipanti - 1
        WHERE id = NEW.id_evento;
    END IF;
    RETURN NEW;
END;
$$;
 4   DROP FUNCTION public.decrementa_num_partecipanti();
       public               postgres    false    4            �            1255    16689    set_valutazione_media()    FUNCTION     �  CREATE FUNCTION public.set_valutazione_media() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Aggiorna la valutazione media di tutti gli eventi dello stesso creatore
    UPDATE evento
    SET valutazione_media = (
        SELECT AVG(p.valutazione)::NUMERIC(10, 2)
        FROM recensione p
        WHERE p.id_evento IN (
            SELECT id
            FROM evento
            WHERE creatore = (
                SELECT creatore
                FROM evento
                WHERE id = NEW.id
            )
        )
    )
    WHERE creatore = (
        SELECT creatore
        FROM evento
        WHERE id = NEW.id
    );

    RETURN NEW;
END;
$$;
 .   DROP FUNCTION public.set_valutazione_media();
       public               postgres    false    4            �            1255    16670    update_num_partecipanti()    FUNCTION     �  CREATE FUNCTION public.update_num_partecipanti() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Controlla se l'evento ha raggiunto il numero massimo di partecipanti
    IF (SELECT num_partecipanti FROM evento WHERE id = NEW.id_evento) >= 
       (SELECT max_num_partecipanti FROM evento WHERE id = NEW.id_evento) THEN
        RAISE EXCEPTION 'Il numero massimo di partecipanti è stato raggiunto per l''evento con id %', NEW.id_evento;
    END IF;

    -- Incrementa num_partecipanti se la partecipazione non è annullata
    IF NEW.annullata = false THEN
        UPDATE evento
        SET num_partecipanti = num_partecipanti + 1
        WHERE id = NEW.id_evento;
    END IF;

    RETURN NEW;
END;
$$;
 0   DROP FUNCTION public.update_num_partecipanti();
       public               postgres    false    4            �            1255    16678    update_valutazione_media()    FUNCTION     �  CREATE FUNCTION public.update_valutazione_media() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Aggiorna la valutazione media di tutti gli eventi dello stesso creatore
    UPDATE evento
    SET valutazione_media = (
        SELECT AVG(p.valutazione)::NUMERIC(10, 2)
        FROM recensione p
        WHERE p.id_evento IN (
            SELECT id
            FROM evento
            WHERE creatore = (
                SELECT creatore
                FROM evento
                WHERE id = NEW.id_evento
            )
        )
    )
    WHERE creatore = (
        SELECT creatore
        FROM evento
        WHERE id = NEW.id_evento
    );

    RETURN NEW;
END;
$$;
 1   DROP FUNCTION public.update_valutazione_media();
       public               postgres    false    4            �            1259    16536    amicizia    TABLE     c   CREATE TABLE public.amicizia (
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
       public               postgres    false    4    218            O           0    0    categoria_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;
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
       public               postgres    false    220    4            P           0    0    evento_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.evento_id_seq OWNED BY public.evento.id;
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
       public               postgres    false    225    4            Q           0    0    utente_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.utente_id_seq OWNED BY public.utente.id;
          public               postgres    false    226            z           2604    16567    categoria id    DEFAULT     l   ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);
 ;   ALTER TABLE public.categoria ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    218            {           2604    16568 	   evento id    DEFAULT     f   ALTER TABLE ONLY public.evento ALTER COLUMN id SET DEFAULT nextval('public.evento_id_seq'::regclass);
 8   ALTER TABLE public.evento ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    220                       2604    16570 	   utente id    DEFAULT     f   ALTER TABLE ONLY public.utente ALTER COLUMN id SET DEFAULT nextval('public.utente_id_seq'::regclass);
 8   ALTER TABLE public.utente ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    225            =          0    16536    amicizia 
   TABLE DATA           :   COPY public.amicizia (id_utente1, id_utente2) FROM stdin;
    public               postgres    false    217   �a       >          0    16539 	   categoria 
   TABLE DATA           :   COPY public.categoria (id, nome, descrizione) FROM stdin;
    public               postgres    false    218   b       @          0    16543    evento 
   TABLE DATA           �   COPY public.evento (id, nome, data, prezzo, citta, indirizzo, num_partecipanti, max_num_partecipanti, eta_minima, descrizione, valutazione_media, creatore) FROM stdin;
    public               postgres    false    220   !b       A          0    16548    evento_categoria 
   TABLE DATA           C   COPY public.evento_categoria (id_evento, id_categoria) FROM stdin;
    public               postgres    false    221   �b       C          0    16553    partecipazione 
   TABLE DATA           O   COPY public.partecipazione (id_utente, id_evento, data, annullata) FROM stdin;
    public               postgres    false    223   �b       G          0    16653    persona_categoria 
   TABLE DATA           E   COPY public.persona_categoria (id_persona, id_categoria) FROM stdin;
    public               postgres    false    227   c       D          0    16556 
   recensione 
   TABLE DATA           b   COPY public.recensione (id_utente, id_evento, titolo, descrizione, valutazione, data) FROM stdin;
    public               postgres    false    224    c       E          0    16561    utente 
   TABLE DATA           "  COPY public.utente (id, email, password, nome, immagine_profilo, citta, azienda, persona_cognome, azienda_p_iva, azienda_indirizzo, azienda_recapito, premium, premium_data_inizio, premium_data_fine, admin, data_creazione, data_ultima_modifica, mostra_consigli_eventi, username) FROM stdin;
    public               postgres    false    225   �c       R           0    0    categoria_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categoria_id_seq', 1, false);
          public               postgres    false    219            S           0    0    evento_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.evento_id_seq', 4, true);
          public               postgres    false    222            T           0    0    utente_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.utente_id_seq', 4, true);
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
       public                 postgres    false    225            �           2620    16671 *   partecipazione after_insert_partecipazione    TRIGGER     �   CREATE TRIGGER after_insert_partecipazione AFTER INSERT ON public.partecipazione FOR EACH ROW EXECUTE FUNCTION public.update_num_partecipanti();
 C   DROP TRIGGER after_insert_partecipazione ON public.partecipazione;
       public               postgres    false    228    223            �           2620    16673 -   partecipazione decrementa_numero_partecipanti    TRIGGER     �   CREATE TRIGGER decrementa_numero_partecipanti BEFORE UPDATE ON public.partecipazione FOR EACH ROW EXECUTE FUNCTION public.decrementa_num_partecipanti();
 F   DROP TRIGGER decrementa_numero_partecipanti ON public.partecipazione;
       public               postgres    false    229    223            �           2620    16674 -   partecipazione incrementa_numero_partecipanti    TRIGGER     �   CREATE TRIGGER incrementa_numero_partecipanti BEFORE UPDATE ON public.partecipazione FOR EACH ROW EXECUTE FUNCTION public.update_num_partecipanti();
 F   DROP TRIGGER incrementa_numero_partecipanti ON public.partecipazione;
       public               postgres    false    228    223            �           2620    16690 &   evento update_evento_valutazione_media    TRIGGER     �   CREATE TRIGGER update_evento_valutazione_media AFTER INSERT ON public.evento FOR EACH ROW EXECUTE FUNCTION public.set_valutazione_media();
 ?   DROP TRIGGER update_evento_valutazione_media ON public.evento;
       public               postgres    false    220    243            �           2620    16685 *   recensione update_evento_valutazione_media    TRIGGER     �   CREATE TRIGGER update_evento_valutazione_media AFTER INSERT OR UPDATE ON public.recensione FOR EACH ROW EXECUTE FUNCTION public.update_valutazione_media();
 C   DROP TRIGGER update_evento_valutazione_media ON public.recensione;
       public               postgres    false    224    242            �           2620    16684 %   recensione valida_valutazione_trigger    TRIGGER     �   CREATE TRIGGER valida_valutazione_trigger BEFORE INSERT OR UPDATE ON public.recensione FOR EACH ROW EXECUTE FUNCTION public.check_inserimento_valutazione();
 >   DROP TRIGGER valida_valutazione_trigger ON public.recensione;
       public               postgres    false    241    224            �           2606    16646    evento fk_creatore    FK CONSTRAINT     �   ALTER TABLE ONLY public.evento
    ADD CONSTRAINT fk_creatore FOREIGN KEY (creatore) REFERENCES public.utente(id) ON DELETE CASCADE;
 <   ALTER TABLE ONLY public.evento DROP CONSTRAINT fk_creatore;
       public               postgres    false    220    225    4758            �           2606    16590     evento_categoria fk_id_categoria    FK CONSTRAINT     �   ALTER TABLE ONLY public.evento_categoria
    ADD CONSTRAINT fk_id_categoria FOREIGN KEY (id_categoria) REFERENCES public.categoria(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.evento_categoria DROP CONSTRAINT fk_id_categoria;
       public               postgres    false    218    4746    221            �           2606    16595    partecipazione fk_id_evento    FK CONSTRAINT     �   ALTER TABLE ONLY public.partecipazione
    ADD CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.partecipazione DROP CONSTRAINT fk_id_evento;
       public               postgres    false    4748    223    220            �           2606    16600    recensione fk_id_evento    FK CONSTRAINT     �   ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.recensione DROP CONSTRAINT fk_id_evento;
       public               postgres    false    4748    220    224            �           2606    16605    evento_categoria fk_id_evento    FK CONSTRAINT     �   ALTER TABLE ONLY public.evento_categoria
    ADD CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.evento_categoria DROP CONSTRAINT fk_id_evento;
       public               postgres    false    4748    220    221            �           2606    16610    partecipazione fk_id_utente    FK CONSTRAINT     �   ALTER TABLE ONLY public.partecipazione
    ADD CONSTRAINT fk_id_utente FOREIGN KEY (id_utente) REFERENCES public.utente(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.partecipazione DROP CONSTRAINT fk_id_utente;
       public               postgres    false    225    4758    223            �           2606    16615    recensione fk_id_utente    FK CONSTRAINT     �   ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT fk_id_utente FOREIGN KEY (id_utente) REFERENCES public.utente(id) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.recensione DROP CONSTRAINT fk_id_utente;
       public               postgres    false    4758    224    225            �           2606    16620    amicizia fk_id_utente1    FK CONSTRAINT     �   ALTER TABLE ONLY public.amicizia
    ADD CONSTRAINT fk_id_utente1 FOREIGN KEY (id_utente1) REFERENCES public.utente(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.amicizia DROP CONSTRAINT fk_id_utente1;
       public               postgres    false    4758    217    225            �           2606    16625    amicizia fk_id_utente2    FK CONSTRAINT     �   ALTER TABLE ONLY public.amicizia
    ADD CONSTRAINT fk_id_utente2 FOREIGN KEY (id_utente2) REFERENCES public.evento(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.amicizia DROP CONSTRAINT fk_id_utente2;
       public               postgres    false    217    220    4748            �           2606    16663 5   persona_categoria persona_categoria_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.persona_categoria
    ADD CONSTRAINT persona_categoria_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categoria(id) ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.persona_categoria DROP CONSTRAINT persona_categoria_id_categoria_fkey;
       public               postgres    false    218    227    4746            �           2606    16658 3   persona_categoria persona_categoria_id_persona_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.persona_categoria
    ADD CONSTRAINT persona_categoria_id_persona_fkey FOREIGN KEY (id_persona) REFERENCES public.utente(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.persona_categoria DROP CONSTRAINT persona_categoria_id_persona_fkey;
       public               postgres    false    225    227    4758            =      x������ � �      >      x������ � �      @   {   x�3�t-K�+�wJ����4202�50�50R00�#NK=CcN���Լ�Dΰ�D���̼Ģ|NNC���)���Ģ̼|�T��̲Ԣ�X*����1�	�-��ř���P�L��ːh�b���� \0<&      A      x������ � �      C   *   x�3�4�4202�50�52�L�2F0D0�0A����� �Z�      G      x������ � �      D   �   x��л�@��z�)�^,`b�Ƃ�[���K���b,|z+(h��|'98���KY�����ô�@:��0��x�ҥ*�V��Nңub�	wEp t��}Xz�5�5���ʼ	��ɍ��r����
k�`I���q��bG�5H�L�'3��)��ؐU	      E   �  x���KO�0��ί`�-���y�hii�MiKͣ!q���"t�E�,ft�s��%O��8��+|9>�h���Pmӝ�f�G�|�CZK��lgt�*�������������<z��D}���M ��K�/	���A�A)dL�>'E`t��zeZ��j�ټ��齼���5UWVP�j#}v��t���*�ݶ��;yoF�͘��7�^���L���?�����"CĈ��sR�i�$�Xd�)>ϱ��i�TL;�7�����SV�!S�2qlJo�,�Z1{�5�����D�s�E��<3(�S���0�$VT��\�6���6��i;Oul�:�l��p�N�˻p�i]T�/�������y���QZ��f�ɛ__�\7�)b��sR����%I� "�,     