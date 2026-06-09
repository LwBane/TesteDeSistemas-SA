-- ==> CÓDIGO EM POSTGREE

CREATE TABLE IF NOT EXISTS livro (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    ano INT
);

-- Inserindo dados
INSERT INTO livro (titulo, autor, genero, quantidade) VALUES
('Dom Quixote', 'Miguel de Cervantes', 'Clássico', 3),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Infantil', 5);

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- ===> CÓDIGO EM SQL 

-- CREATE DATABASE IF NOT EXISTS biblioteca_api;
-- USE biblioteca_api;

-- -- // Tabela de livros // 

-- CREATE TABLE IF NOT EXISTS livro (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     titulo VARCHAR(255) NOT NULL,
--     autor VARCHAR(255) NOT NULL,
--     genero VARCHAR(100) NOT NULL,
--     quantidade INT NOT NULL DEFAULT 0
-- );

-- -- == Populando a tabela == 

-- INSERT INTO livro (titulo, autor, genero, quantidade) VALUES
-- ('Dom Quixote', 'Miguel de Cervantes', 'Clássico', 3),
-- ('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Infantil', 5);

-- -- // Tabela de usuários // 
-- -- CREATE TABLE IF NOT EXISTS usuario (
-- --     id INT AUTO_INCREMENT PRIMARY KEY,
-- --     nome VARCHAR(255) NOT NULL,
-- --     email VARCHAR(255) NOT NULL UNIQUE,
-- --     senha VARCHAR(255) NOT NULL
-- -- );