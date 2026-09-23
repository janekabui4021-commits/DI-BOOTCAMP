

CREATE TABLE IF NOT EXISTS actors (
    actor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age DATE NOT NULL,
    number_oscars INT NOT NULL
);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES 
    ('Matt', 'Damon', '1970-10-08', 1),
    ('George', 'Clooney', '1961-05-06', 2),
    ('Brad', 'Pitt', '1963-12-18', 1),
    ('Jennifer', 'Aniston', '1969-02-11', 0);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('John', 'Smith', '1990-01-01', 2);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('Unknown', 'Unknown', '1990-01-01', 0);

SELECT * FROM actors;