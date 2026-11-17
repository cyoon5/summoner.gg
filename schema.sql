--
-- PostgreSQL database dump
--

\restrict O7bIQtVhYIhx76oOLhFcB0MWqWU6fBPLYOUWd1Lssz7YEXRCtc3pbpHVWUhtfha

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

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
-- Name: account; Type: TABLE; Schema: public; Owner: summoner_gg_app
--

CREATE TABLE public.account (
    puuid character varying(78) NOT NULL,
    game_name character varying(50) NOT NULL,
    tag_line character varying(20) NOT NULL,
    platform character varying(30) CONSTRAINT account_region_not_null NOT NULL
);


ALTER TABLE public.account OWNER TO summoner_gg_app;

--
-- Name: ban; Type: TABLE; Schema: public; Owner: summoner_gg_app
--

CREATE TABLE public.ban (
    match_id character varying(50) NOT NULL,
    champion_key integer NOT NULL,
    team character varying(10) NOT NULL
);


ALTER TABLE public.ban OWNER TO summoner_gg_app;

--
-- Name: champion; Type: TABLE; Schema: public; Owner: summoner_gg_app
--

CREATE TABLE public.champion (
    champion_id character varying(50) CONSTRAINT champion_champion_name_not_null NOT NULL,
    champion_name character varying(50) CONSTRAINT champion_champion_name_not_null1 NOT NULL,
    champion_key integer NOT NULL
);


ALTER TABLE public.champion OWNER TO summoner_gg_app;

--
-- Name: item; Type: TABLE; Schema: public; Owner: summoner_gg_app
--

CREATE TABLE public.item (
    item_id integer NOT NULL,
    item_name character varying(50) NOT NULL
);


ALTER TABLE public.item OWNER TO summoner_gg_app;

--
-- Name: match; Type: TABLE; Schema: public; Owner: summoner_gg_app
--

CREATE TABLE public.match (
    match_id character varying(50) NOT NULL,
    queue_id integer CONSTRAINT match_game_mode_not_null NOT NULL,
    match_duration integer CONSTRAINT match_game_duration_not_null NOT NULL,
    match_date timestamp with time zone NOT NULL,
    game_version character varying(20) NOT NULL
);


ALTER TABLE public.match OWNER TO summoner_gg_app;

--
-- Name: participant; Type: TABLE; Schema: public; Owner: summoner_gg_app
--

CREATE TABLE public.participant (
    puuid character varying(78) NOT NULL,
    match_id character varying(50) NOT NULL,
    kills integer DEFAULT 0 NOT NULL,
    deaths integer DEFAULT 0 NOT NULL,
    assists integer DEFAULT 0 NOT NULL,
    role character varying(20),
    creep_score integer DEFAULT 0 NOT NULL,
    damage_dealt integer DEFAULT 0 NOT NULL,
    gold integer DEFAULT 0 NOT NULL,
    champion_level integer DEFAULT 0 NOT NULL,
    vision_score integer DEFAULT 0 NOT NULL,
    team character varying(10) NOT NULL,
    win boolean NOT NULL,
    champion_key integer NOT NULL
);


ALTER TABLE public.participant OWNER TO summoner_gg_app;

--
-- Name: participantitem; Type: TABLE; Schema: public; Owner: summoner_gg_app
--

CREATE TABLE public.participantitem (
    puuid character varying(78) NOT NULL,
    match_id character varying(50) NOT NULL,
    item_id integer NOT NULL,
    slot integer NOT NULL
);


ALTER TABLE public.participantitem OWNER TO summoner_gg_app;

--
-- Name: participantrune; Type: TABLE; Schema: public; Owner: summoner_gg_app
--

CREATE TABLE public.participantrune (
    puuid character varying(78) NOT NULL,
    match_id character varying(50) NOT NULL,
    slot_type character varying(30) NOT NULL,
    rune_id integer NOT NULL
);


ALTER TABLE public.participantrune OWNER TO summoner_gg_app;

--
-- Name: participantspell; Type: TABLE; Schema: public; Owner: summoner_gg_app
--

CREATE TABLE public.participantspell (
    puuid character varying(78) NOT NULL,
    match_id character varying(50) NOT NULL,
    spell_id integer NOT NULL,
    slot integer NOT NULL
);


ALTER TABLE public.participantspell OWNER TO summoner_gg_app;

--
-- Name: ranksnapshot; Type: TABLE; Schema: public; Owner: summoner_gg_app
--

CREATE TABLE public.ranksnapshot (
    snapshot_id bigint NOT NULL,
    puuid character varying(78) NOT NULL,
    tier character varying(20),
    division character varying(10),
    league_points integer,
    snapshot_date timestamp with time zone NOT NULL
);


ALTER TABLE public.ranksnapshot OWNER TO summoner_gg_app;

--
-- Name: ranksnapshot_snapshot_id_seq; Type: SEQUENCE; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE public.ranksnapshot ALTER COLUMN snapshot_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ranksnapshot_snapshot_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: rune; Type: TABLE; Schema: public; Owner: summoner_gg_app
--

CREATE TABLE public.rune (
    rune_id integer NOT NULL,
    rune_name character varying(50) NOT NULL
);


ALTER TABLE public.rune OWNER TO summoner_gg_app;

--
-- Name: spell; Type: TABLE; Schema: public; Owner: summoner_gg_app
--

CREATE TABLE public.spell (
    spell_id integer NOT NULL,
    spell_name character varying(50) NOT NULL
);


ALTER TABLE public.spell OWNER TO summoner_gg_app;

--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (puuid);


--
-- Name: ban ban_pkey; Type: CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.ban
    ADD CONSTRAINT ban_pkey PRIMARY KEY (match_id, champion_key, team);


--
-- Name: champion champion_pkey; Type: CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.champion
    ADD CONSTRAINT champion_pkey PRIMARY KEY (champion_key);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (item_id);


--
-- Name: match match_pkey; Type: CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT match_pkey PRIMARY KEY (match_id);


--
-- Name: participant participant_pkey; Type: CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participant
    ADD CONSTRAINT participant_pkey PRIMARY KEY (puuid, match_id);


--
-- Name: participantitem participantitem_pkey; Type: CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participantitem
    ADD CONSTRAINT participantitem_pkey PRIMARY KEY (puuid, match_id, item_id);


--
-- Name: participantrune participantrune_pkey; Type: CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participantrune
    ADD CONSTRAINT participantrune_pkey PRIMARY KEY (puuid, match_id, slot_type);


--
-- Name: participantspell participantspell_pkey; Type: CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participantspell
    ADD CONSTRAINT participantspell_pkey PRIMARY KEY (puuid, match_id, spell_id);


--
-- Name: ranksnapshot ranksnapshot_pkey; Type: CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.ranksnapshot
    ADD CONSTRAINT ranksnapshot_pkey PRIMARY KEY (snapshot_id);


--
-- Name: rune rune_pkey; Type: CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.rune
    ADD CONSTRAINT rune_pkey PRIMARY KEY (rune_id);


--
-- Name: spell spell_pkey; Type: CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.spell
    ADD CONSTRAINT spell_pkey PRIMARY KEY (spell_id);


--
-- Name: ban ban_champion_key_fkey; Type: FK CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.ban
    ADD CONSTRAINT ban_champion_key_fkey FOREIGN KEY (champion_key) REFERENCES public.champion(champion_key) ON UPDATE CASCADE;


--
-- Name: ban ban_match_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.ban
    ADD CONSTRAINT ban_match_id_fkey FOREIGN KEY (match_id) REFERENCES public.match(match_id) ON DELETE CASCADE;


--
-- Name: participant participant_champion_key_fkey; Type: FK CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participant
    ADD CONSTRAINT participant_champion_key_fkey FOREIGN KEY (champion_key) REFERENCES public.champion(champion_key) ON UPDATE CASCADE;


--
-- Name: participant participant_match_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participant
    ADD CONSTRAINT participant_match_id_fkey FOREIGN KEY (match_id) REFERENCES public.match(match_id) ON DELETE CASCADE;


--
-- Name: participant participant_puuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participant
    ADD CONSTRAINT participant_puuid_fkey FOREIGN KEY (puuid) REFERENCES public.account(puuid) ON DELETE CASCADE;


--
-- Name: participantitem participantitem_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participantitem
    ADD CONSTRAINT participantitem_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item(item_id);


--
-- Name: participantitem participantitem_puuid_match_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participantitem
    ADD CONSTRAINT participantitem_puuid_match_id_fkey FOREIGN KEY (puuid, match_id) REFERENCES public.participant(puuid, match_id) ON DELETE CASCADE;


--
-- Name: participantrune participantrune_puuid_match_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participantrune
    ADD CONSTRAINT participantrune_puuid_match_id_fkey FOREIGN KEY (puuid, match_id) REFERENCES public.participant(puuid, match_id) ON DELETE CASCADE;


--
-- Name: participantrune participantrune_rune_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participantrune
    ADD CONSTRAINT participantrune_rune_id_fkey FOREIGN KEY (rune_id) REFERENCES public.rune(rune_id);


--
-- Name: participantspell participantspell_puuid_match_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participantspell
    ADD CONSTRAINT participantspell_puuid_match_id_fkey FOREIGN KEY (puuid, match_id) REFERENCES public.participant(puuid, match_id) ON DELETE CASCADE;


--
-- Name: participantspell participantspell_spell_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.participantspell
    ADD CONSTRAINT participantspell_spell_id_fkey FOREIGN KEY (spell_id) REFERENCES public.spell(spell_id);


--
-- Name: ranksnapshot ranksnapshot_puuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: summoner_gg_app
--

ALTER TABLE ONLY public.ranksnapshot
    ADD CONSTRAINT ranksnapshot_puuid_fkey FOREIGN KEY (puuid) REFERENCES public.account(puuid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict O7bIQtVhYIhx76oOLhFcB0MWqWU6fBPLYOUWd1Lssz7YEXRCtc3pbpHVWUhtfha

