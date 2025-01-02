CREATE TABLE utente(
	id serial PRIMARY KEY,
	tipo smallint NOT NULL,
	verificato boolean,
	username varchar(20) NOT NULL,
	password varchar(64) NOT NULL,
	luogo varchar(20) NOT NULL,
	email varchar(255) NOT NULL,
	credito int NOT NULL,
	immagine_profilo smallint,
	eta smallint NOT NULL,
	valutazione smallint	

);

CREATE TABLE evento(
	id serial PRIMARY KEY,
	priorita smallint NOT NULL,
	citta varchar(20) NOT NULL,
	via varchar(40) NOT NULL,
	numero_civico smallint,
	data timestamp NOT NULL,
	numero_partecipanti smallint NOT NULL,
	max_num_partecipanti smallint NOT NULL,
	prezzo smallint,
	descrizione text,
	id_utente serial references utente(id) NOT NULL

);

CREATE TABLE partecipazione (
    id_utente INT NOT NULL,
    id_evento INT NOT NULL,
    data DATE NOT NULL,
    PRIMARY KEY (id_utente, id_evento),
    CONSTRAINT fk_id_utente FOREIGN KEY (id_utente) REFERENCES utente(id) ON DELETE CASCADE,
    CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES evento(id) ON DELETE CASCADE
);

CREATE TABLE recensione (
    id_utente INT NOT NULL,
    id_evento INT NOT NULL,
    titolo varchar(20) NOT NULL,
    testo text NOT NULL, 
    valutazione smallint NOT NULL,
    data DATE NOT NULL,
    PRIMARY KEY (id_utente, id_evento),
    CONSTRAINT fk_id_utente FOREIGN KEY (id_utente) REFERENCES utente(id) ON DELETE CASCADE,
    CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES evento(id) ON DELETE CASCADE
);

CREATE TABLE amicizia (
    id_utente1 INT NOT NULL,
    id_utente2 INT NOT NULL,
   
    PRIMARY KEY (id_utente1, id_utente2),
    CONSTRAINT fk_id_utente1 FOREIGN KEY (id_utente1) REFERENCES utente(id) ON DELETE CASCADE,
    CONSTRAINT fk_id_utente1 FOREIGN KEY (id_utente2) REFERENCES evento(id) ON DELETE CASCADE
);

CREATE TABLE categoria(
	id serial PRIMARY KEY,	
	nome varchar(20) NOT NULL
	
);

CREATE TABLE evento_categoria (
    id_evento INT NOT NULL,
    id_categoria INT NOT NULL,
   
    PRIMARY KEY (id_evento, id_categoria),
    CONSTRAINT fk_id_evento FOREIGN KEY (id_evento) REFERENCES evento(id) ON DELETE CASCADE,
    CONSTRAINT fk_id_categoria FOREIGN KEY (id_categoria) REFERENCES categoria(id) ON DELETE CASCADE
);