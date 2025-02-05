PGDMP  +    3                }         	   movita_db    17.2    17.2 L    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16926 	   movita_db    DATABASE     |   CREATE DATABASE movita_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Italian_Italy.1252';
    DROP DATABASE movita_db;
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4            �            1255    16927    check_inserimento_valutazione()    FUNCTION     /  CREATE FUNCTION public.check_inserimento_valutazione() RETURNS trigger
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
       public               postgres    false    4            �            1255    16928    decrementa_num_partecipanti()    FUNCTION     k  CREATE FUNCTION public.decrementa_num_partecipanti() RETURNS trigger
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
       public               postgres    false    4            �            1255    16929    disabilita_consigli_eventi()    FUNCTION     )  CREATE FUNCTION public.disabilita_consigli_eventi() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Imposta mostra_consigli_eventi a false per l'utente associato
    UPDATE utente
    SET mostra_consigli_eventi = false
    WHERE id = NEW.id_persona;

    RETURN NEW;
END;
$$;
 3   DROP FUNCTION public.disabilita_consigli_eventi();
       public               postgres    false    4            �            1255    16930    set_valutazione_media()    FUNCTION     �  CREATE FUNCTION public.set_valutazione_media() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Aggiorna la valutazione media di tutti gli eventi dello stesso creatore
    UPDATE evento
    SET valutazione_media = COALESCE((
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
    ), 0.0) -- Se il valore Š NULL, imposta 0.0
    WHERE creatore = (
        SELECT creatore
        FROM evento
        WHERE id = NEW.id
    );

    RETURN NEW;
END;
$$;
 .   DROP FUNCTION public.set_valutazione_media();
       public               postgres    false    4            �            1255    16931    update_num_partecipanti()    FUNCTION     �  CREATE FUNCTION public.update_num_partecipanti() RETURNS trigger
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
       public               postgres    false    4            �            1255    16932    update_valutazione_media()    FUNCTION     �  CREATE FUNCTION public.update_valutazione_media() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Aggiorna la valutazione media di tutti gli eventi dello stesso creatore
    UPDATE evento
    SET valutazione_media = COALESCE((
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
    ), 0.0) -- Se il valore Š NULL, imposta 0.0
    WHERE creatore = (
        SELECT creatore
        FROM evento
        WHERE id = NEW.id
    );

    RETURN NEW;
END;
$$;
 1   DROP FUNCTION public.update_valutazione_media();
       public               postgres    false    4            �            1259    16933    amicizia    TABLE     c   CREATE TABLE public.amicizia (
    id_utente1 integer NOT NULL,
    id_utente2 integer NOT NULL
);
    DROP TABLE public.amicizia;
       public         heap r       postgres    false    4            �            1259    16936 	   categoria    TABLE     {   CREATE TABLE public.categoria (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    descrizione text
);
    DROP TABLE public.categoria;
       public         heap r       postgres    false    4            �            1259    16941    categoria_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.categoria_id_seq;
       public               postgres    false    4    218            �           0    0    categoria_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;
          public               postgres    false    219            �            1259    16942    evento    TABLE     }  CREATE TABLE public.evento (
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
       public         heap r       postgres    false    4            �            1259    16950    evento_categoria    TABLE     l   CREATE TABLE public.evento_categoria (
    id_evento integer NOT NULL,
    id_categoria integer NOT NULL
);
 $   DROP TABLE public.evento_categoria;
       public         heap r       postgres    false    4            �            1259    16953    evento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.evento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.evento_id_seq;
       public               postgres    false    220    4            �           0    0    evento_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.evento_id_seq OWNED BY public.evento.id;
          public               postgres    false    222            �            1259    16954 	   pagamento    TABLE     �   CREATE TABLE public.pagamento (
    id integer NOT NULL,
    titolo character varying(255) NOT NULL,
    ammontare integer NOT NULL,
    data date NOT NULL,
    id_utente integer NOT NULL
);
    DROP TABLE public.pagamento;
       public         heap r       postgres    false    4            �            1259    16957    pagamento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pagamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.pagamento_id_seq;
       public               postgres    false    4    223            �           0    0    pagamento_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.pagamento_id_seq OWNED BY public.pagamento.id;
          public               postgres    false    224            �            1259    16958    partecipazione    TABLE     �   CREATE TABLE public.partecipazione (
    id_utente integer NOT NULL,
    id_evento integer NOT NULL,
    data date NOT NULL,
    annullata boolean NOT NULL
);
 "   DROP TABLE public.partecipazione;
       public         heap r       postgres    false    4            �            1259    16961    persona_categoria    TABLE     n   CREATE TABLE public.persona_categoria (
    id_persona integer NOT NULL,
    id_categoria integer NOT NULL
);
 %   DROP TABLE public.persona_categoria;
       public         heap r       postgres    false    4            �            1259    16964 
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
       public         heap r       postgres    false    4            �            1259    16971    utente    TABLE     k  CREATE TABLE public.utente (
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
       public         heap r       postgres    false    4            �            1259    16981    utente_id_seq    SEQUENCE     �   CREATE SEQUENCE public.utente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.utente_id_seq;
       public               postgres    false    4    228            �           0    0    utente_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.utente_id_seq OWNED BY public.utente.id;
          public               postgres    false    229            �           2604    16982    categoria id    DEFAULT     l   ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);
 ;   ALTER TABLE public.categoria ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    218            �           2604    16983 	   evento id    DEFAULT     f   ALTER TABLE ONLY public.evento ALTER COLUMN id SET DEFAULT nextval('public.evento_id_seq'::regclass);
 8   ALTER TABLE public.evento ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    220            �           2604    16984    pagamento id    DEFAULT     l   ALTER TABLE ONLY public.pagamento ALTER COLUMN id SET DEFAULT nextval('public.pagamento_id_seq'::regclass);
 ;   ALTER TABLE public.pagamento ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223            �           2604    16985 	   utente id    DEFAULT     f   ALTER TABLE ONLY public.utente ALTER COLUMN id SET DEFAULT nextval('public.utente_id_seq'::regclass);
 8   ALTER TABLE public.utente ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    229    228            w          0    16933    amicizia 
   TABLE DATA           :   COPY public.amicizia (id_utente1, id_utente2) FROM stdin;
    public               postgres    false    217   �n       x          0    16936 	   categoria 
   TABLE DATA           :   COPY public.categoria (id, nome, descrizione) FROM stdin;
    public               postgres    false    218   �n       z          0    16942    evento 
   TABLE DATA           �   COPY public.evento (id, nome, data, prezzo, citta, indirizzo, num_partecipanti, max_num_partecipanti, eta_minima, descrizione, valutazione_media, creatore) FROM stdin;
    public               postgres    false    220   4u       {          0    16950    evento_categoria 
   TABLE DATA           C   COPY public.evento_categoria (id_evento, id_categoria) FROM stdin;
    public               postgres    false    221   �u       }          0    16954 	   pagamento 
   TABLE DATA           K   COPY public.pagamento (id, titolo, ammontare, data, id_utente) FROM stdin;
    public               postgres    false    223   v                 0    16958    partecipazione 
   TABLE DATA           O   COPY public.partecipazione (id_utente, id_evento, data, annullata) FROM stdin;
    public               postgres    false    225   <v       �          0    16961    persona_categoria 
   TABLE DATA           E   COPY public.persona_categoria (id_persona, id_categoria) FROM stdin;
    public               postgres    false    226   sv       �          0    16964 
   recensione 
   TABLE DATA           b   COPY public.recensione (id_utente, id_evento, titolo, descrizione, valutazione, data) FROM stdin;
    public               postgres    false    227   �v       �          0    16971    utente 
   TABLE DATA           "  COPY public.utente (id, email, password, nome, immagine_profilo, citta, azienda, persona_cognome, azienda_p_iva, azienda_indirizzo, azienda_recapito, premium, premium_data_inizio, premium_data_fine, admin, data_creazione, data_ultima_modifica, mostra_consigli_eventi, username) FROM stdin;
    public               postgres    false    228   lw       �           0    0    categoria_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categoria_id_seq', 45, true);
          public               postgres    false    219            �           0    0    evento_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.evento_id_seq', 4, true);
          public               postgres    false    222            �           0    0    pagamento_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.pagamento_id_seq', 2, true);
          public               postgres    false    224            �           0    0    utente_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.utente_id_seq', 5, true);
          public               postgres    false    229            �           2606    16987    amicizia amicizia_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.amicizia
    ADD CONSTRAINT amicizia_pkey PRIMARY KEY (id_utente1, id_utente2);
 @   ALTER TABLE ONLY public.amicizia DROP CONSTRAINT amicizia_pkey;
       public                 postgres    false    217    217            �           2606    16989    categoria categoria_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categoria_pkey;
       public                 postgres    false    218            �           2606    16991 &   evento_categoria evento_categoria_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.evento_categoria
    ADD CONSTRAINT evento_categoria_pkey PRIMARY KEY (id_evento, id_categoria);
 P   ALTER TABLE ONLY public.evento_categoria DROP CONSTRAINT evento_categoria_pkey;
       public                 postgres    false    221    221            �           2606    16993    evento evento_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.evento
    ADD CONSTRAINT evento_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.evento DROP CONSTRAINT evento_pkey;
       public                 postgres    false    220            �           2606    16995    pagamento pagamento_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.pagamento
    ADD CONSTRAINT pagamento_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.pagamento DROP CONSTRAINT pagamento_pkey;
       public                 postgres    false    223            �           2606    16997 "   partecipazione partecipazione_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.partecipazione
    ADD CONSTRAINT partecipazione_pkey PRIMARY KEY (id_utente, id_evento);
 L   ALTER TABLE ONLY public.partecipazione DROP CONSTRAINT partecipazione_pkey;
       public                 postgres    false    225    225            �           2606    16999 (   persona_categoria persona_categoria_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.persona_categoria
    ADD CONSTRAINT persona_categoria_pkey PRIMARY KEY (id_persona, id_categoria);
 R   ALTER TABLE ONLY public.persona_categoria DROP CONSTRAINT persona_categoria_pkey;
       public                 postgres    false    226    226            �           2606    17001    recensione recensione_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT recensione_pkey PRIMARY KEY (id_utente, id_evento);
 D   ALTER TABLE ONLY public.recensione DROP CONSTRAINT recensione_pkey;
       public                 postgres    false    227    227            �           2606    17003    utente utente_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_email_key UNIQUE (email);
 A   ALTER TABLE ONLY public.utente DROP CONSTRAINT utente_email_key;
       public                 postgres    false    228            �           2606    17005    utente utente_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.utente DROP CONSTRAINT utente_pkey;
       public                 postgres    false    228            �           2606    17007    utente utente_username_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_username_key UNIQUE (username);
 D   ALTER TABLE ONLY public.utente DROP CONSTRAINT utente_username_key;
       public                 postgres    false    228            �           2620    17008 *   partecipazione after_insert_partecipazione    TRIGGER     �   CREATE TRIGGER after_insert_partecipazione AFTER INSERT ON public.partecipazione FOR EACH ROW EXECUTE FUNCTION public.update_num_partecipanti();
 C   DROP TRIGGER after_insert_partecipazione ON public.partecipazione;
       public               postgres    false    233    225            �           2620    17009 -   partecipazione decrementa_numero_partecipanti    TRIGGER     �   CREATE TRIGGER decrementa_numero_partecipanti BEFORE UPDATE ON public.partecipazione FOR EACH ROW EXECUTE FUNCTION public.decrementa_num_partecipanti();
 F   DROP TRIGGER decrementa_numero_partecipanti ON public.partecipazione;
       public               postgres    false    225    231            �           2620    17010 -   partecipazione incrementa_numero_partecipanti    TRIGGER     �   CREATE TRIGGER incrementa_numero_partecipanti BEFORE UPDATE ON public.partecipazione FOR EACH ROW EXECUTE FUNCTION public.update_num_partecipanti();
 F   DROP TRIGGER incrementa_numero_partecipanti ON public.partecipazione;
       public               postgres    false    233    225            �           2620    17011 0   persona_categoria trg_disabilita_consigli_eventi    TRIGGER     �   CREATE TRIGGER trg_disabilita_consigli_eventi AFTER INSERT ON public.persona_categoria FOR EACH ROW EXECUTE FUNCTION public.disabilita_consigli_eventi();
 I   DROP TRIGGER trg_disabilita_consigli_eventi ON public.persona_categoria;
       public               postgres    false    232    226            �           2620    17012 &   evento update_evento_valutazione_media    TRIGGER     �   CREATE TRIGGER update_evento_valutazione_media AFTER INSERT ON public.evento FOR EACH ROW EXECUTE FUNCTION public.set_valutazione_media();
 ?   DROP TRIGGER update_evento_valutazione_media ON public.evento;
       public               postgres    false    235    220            �           2620    17013 *   recensione update_evento_valutazione_media    TRIGGER     �   CREATE TRIGGER update_evento_valutazione_media AFTER INSERT OR UPDATE ON public.recensione FOR EACH ROW EXECUTE FUNCTION public.update_valutazione_media();
 C   DROP TRIGGER update_evento_valutazione_media ON public.recensione;
       public               postgres    false    234    227            �           2620    17014 %   recensione valida_valutazione_trigger    TRIGGER     �   CREATE TRIGGER valida_valutazione_trigger BEFORE INSERT OR UPDATE ON public.recensione FOR EACH ROW EXECUTE FUNCTION public.check_inserimento_valutazione();
 >   DROP TRIGGER valida_valutazione_trigger ON public.recensione;
       public               postgres    false    227    230            �           2606    17015    evento fk_creatore    FK CONSTRAINT     �   ALTER TABLE ONLY public.evento
    ADD CONSTRAINT fk_creatore FOREIGN KEY (creatore) REFERENCES public.utente(id) ON DELETE CASCADE;
 <   ALTER TABLE ONLY public.evento DROP CONSTRAINT fk_creatore;
       public               postgres    false    4816    220    228            �           2606    17020     evento_categoria fk_id_categoria    FK CONSTRAINT     �   ALTER TABLE ONLY public.evento_categoria
    ADD CONSTRAINT fk_id_categoria FOREIGN KEY (id_categoria) REFERENCES public.categoria(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.evento_categoria DROP CONSTRAINT fk_id_categoria;
       public               postgres    false    4800    218    221            �           2606    17025    partecipazione fk_id_evento    FK CONSTRAINT     �   ALTER TABLE ONLY public.partecipazione
    ADD CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.partecipazione DROP CONSTRAINT fk_id_evento;
       public               postgres    false    225    220    4802            �           2606    17030    recensione fk_id_evento    FK CONSTRAINT     �   ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.recensione DROP CONSTRAINT fk_id_evento;
       public               postgres    false    227    4802    220            �           2606    17035    evento_categoria fk_id_evento    FK CONSTRAINT     �   ALTER TABLE ONLY public.evento_categoria
    ADD CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.evento_categoria DROP CONSTRAINT fk_id_evento;
       public               postgres    false    220    221    4802            �           2606    17040    partecipazione fk_id_utente    FK CONSTRAINT     �   ALTER TABLE ONLY public.partecipazione
    ADD CONSTRAINT fk_id_utente FOREIGN KEY (id_utente) REFERENCES public.utente(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.partecipazione DROP CONSTRAINT fk_id_utente;
       public               postgres    false    4816    228    225            �           2606    17045    recensione fk_id_utente    FK CONSTRAINT     �   ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT fk_id_utente FOREIGN KEY (id_utente) REFERENCES public.utente(id) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.recensione DROP CONSTRAINT fk_id_utente;
       public               postgres    false    227    228    4816            �           2606    17050    amicizia fk_id_utente1    FK CONSTRAINT     �   ALTER TABLE ONLY public.amicizia
    ADD CONSTRAINT fk_id_utente1 FOREIGN KEY (id_utente1) REFERENCES public.utente(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.amicizia DROP CONSTRAINT fk_id_utente1;
       public               postgres    false    217    228    4816            �           2606    17055    amicizia fk_id_utente2    FK CONSTRAINT     y   ALTER TABLE ONLY public.amicizia
    ADD CONSTRAINT fk_id_utente2 FOREIGN KEY (id_utente2) REFERENCES public.utente(id);
 @   ALTER TABLE ONLY public.amicizia DROP CONSTRAINT fk_id_utente2;
       public               postgres    false    228    217    4816            �           2606    17060    pagamento fk_user    FK CONSTRAINT     s   ALTER TABLE ONLY public.pagamento
    ADD CONSTRAINT fk_user FOREIGN KEY (id_utente) REFERENCES public.utente(id);
 ;   ALTER TABLE ONLY public.pagamento DROP CONSTRAINT fk_user;
       public               postgres    false    228    223    4816            �           2606    17065 5   persona_categoria persona_categoria_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.persona_categoria
    ADD CONSTRAINT persona_categoria_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categoria(id) ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.persona_categoria DROP CONSTRAINT persona_categoria_id_categoria_fkey;
       public               postgres    false    218    226    4800            �           2606    17070 3   persona_categoria persona_categoria_id_persona_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.persona_categoria
    ADD CONSTRAINT persona_categoria_id_persona_fkey FOREIGN KEY (id_persona) REFERENCES public.utente(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.persona_categoria DROP CONSTRAINT persona_categoria_id_persona_fkey;
       public               postgres    false    4816    226    228            w      x������ � �      x   7  x�eV]n�6~֞Bp޵c;���-�6���2K�ʬ)�BR�O9D�Ѓ�$�����,`��|��o��Mu-�pHR��vg��x[wC����r���nlM!٘l-��|�^m�����2���݁=��uo��w6�e�am}=���� ��Wg�=S
R���Yz���� #jړ3+�zu^]ӎ'<|5������'�<�s�N�8i�����<�W��k빣�c��I�[׭W%P8?9P��{qF�Ugw��ԁ�����x,��4���R�����q'�{\f1��)f
-��/�gc������S�c|��FB��:Bal�6����up���j�{<����rP�)W֫7� �x�C�<�Xw�i�_�(���7Y��GE�~��^mN��V_���K,՘-G�����L��ါʕi8��m6Ս�h$&�w��3����}�:�]/�<�B+> k;US�+I�@{K��Y�%�7�.<#�hqg�NR&�+�~ x펌�nl�]ȍ��s=r8�����X�K���ai��;V�$Ps?Ԅ%j�.��b���얯�`�9Y
�؅zG�\,pL��-7�9:3���{y'��! ��r��ɀ����`'�D���N(4uKG�b2��]!��;���{��`W�N�2Qld=eFj	���
Z���J�30�T���P����G
���'�T���'�9�J��iuk��$�*��k�	����t�޶��2��:<�f�<3��;H�6>���Z�3(��"v�.<�̏�]6 �7�a��#j���kN�e''5r�9i?�ޘ�+�3\ޗ��B�?�"��!��R�P�� "uW�rF�Y�:��*���U���3;Ybe�������ǻ�*�	J�nM� $�;��M;�I�p���p����PE}z*�h[ ���q�훁qC�<'y-S���ER!$;���$��l/����~�iE4����ںzǪ�Zｍ:B� "�4�WK�F�;z�Y�[�Qy��h�g8�a0ؾ�uƾ0Z�Jnp��Ȫ�$��9;�~"�%�/�zUM�(�py�i�17�քL��#p�P�,垔{0�Vo��Z�'f����.�����|B4����[\"��?HA���A�����}=Y����S}h!����7��5F���
��,���i#��;��Lu�S�_��;+�,B:�Ny�<�#��T�v��w�4����[P/���[5�Q7��I O!J#S=��|��UR�um	t��>4-���rW)B�|�ng�#�ׄa�N�+��4�Fm8*��+l���Jh�ħ'�v�߼��,J.!h;j'o�-�zN�Q5��<��ý���F�Wy�\v�4h$�� t��(;���� ��b���ݱ�*\;�㉽6�V;E��̚����n�{�ns[]c�0xc�Aa����#w܁�n�n�cx��`���r�,sZ	g��Z����Nt�om�����e���{�A}��f�<{9 6��ԑ�����ұ���(��̋�nX��B^7�e�r3/cn���~_�6�5�-�^��^�V���      z   �   x���1�0���+�݆\��uTt먓K�T1M��7������}�ɧ�{#�V�m�i�F�vs��d��٧��Kp�sɍ���.xscH��a�c��#�`��RB��ɫŲ�Vϩ�X����z�l�8g^ㆀ�F�R���>�      {   "   x�3��2�bS al"́��W� J�Z      }   %   x�3�,(�/K�440�4204�#NS.#\1z\\\ S�         '   x�3�4�4202�50�52�L�2D0�0A����� ��      �   <   x�˹�0��(�#��^��%;� �l9r��TB����)o`��^*��G��G�/)9      �   �   x��л�@��z�)�^,`b�Ƃ�[���K���b,|z+(h��|'98���KY�����ô�@:��0��x�ҥ*�V��Nңub�	wEp t��}Xz�5�5���ʼ	��ɍ��r����
k�`I���q��bG�5H�L�'3��)��ؐU	      �   �  x���Io�0 ��ί�+����N�@X���U��F�B�R~��A3RK�䃭'����q��(}	�]���v՘�E]5��j'�5�P�b��p�i��ۍ�t�༂�3��|�@�5�H��~{�{��*� "]�u~�$ac�^B�#���9��(ϳ�;�����_����ˆ���}y���<]8f���^�A�7�I��a��5k�lZдʊ�4�EA}z�!��+�g!A��I�-G�d�A���4�fF��tܰ�j�?�?�Y��Ӄ�L�2�G�p}+����4�EV}��[��(�(>��}\��� Ɏ��O���6��L�MT��lf%�����qc��s~�쉇?���UB���+y��d��eI,��`���"8�P洺6UF�u�B�~�k(�޲&^P�V^�w1q�8*Br�������45�O��QŊ��c��f��^h[�-��?A]H�8� Ҏ�H�(piR�ޞyg���9�     