USE garage_app;

CREATE TABLE roles (
    Id_role INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL
);

CREATE TABLE user (
    Id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL,
    Prenom VARCHAR(50) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Mdp VARCHAR(255) NOT NULL,
    Id_role INT NOT NULL
);

CREATE TABLE services (
    Id_serv INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Id_user INT NOT NULL
);

CREATE TABLE avis (
    Id_avis INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL,
    Prenom VARCHAR(50) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    Date DATE,
    Note INT NOT NULL,
    Status VARCHAR(50) NOT NULL,
    Id_user INT
);

CREATE TABLE messages (
    Id_messages INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Objet VARCHAR(100) NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Nom VARCHAR(50) NOT NULL,
    Prenom VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Telephone VARCHAR(15) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    Id_user INT NOT NULL
);

CREATE TABLE jours (
    Id_jours INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL
);

CREATE TABLE horaires (
    Id_horaire INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Horaire_ouverture TIME NOT NULL,
    Horaire_fermeture TIME NOT NULL,
    Horaire_ouverture_aprem TIME NULL,
    Horaire_fermeture_aprem TIME NULL,
    Id_jours INT NOT NULL
);

CREATE TABLE annonces (
    Id_annonces INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL,
    Date_publication DATETIME NOT NULL,
    IsVisible BOOLEAN NOT NULL,
    Carburant VARCHAR(30) NOT NULL,
    Transmission VARCHAR(30) NOT NULL,
    Id_voiture INT NOT NULL,
    Id_user INT NOT NULL
);

CREATE TABLE voitures
(
    Id_voiture INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Kilometrage INT NOT NULL,
    Annee INT NOT NULL,
    Prix INT NOT NULL,
    Id_modeles INT NOT NULL
);

CREATE TABLE images
(
    Id_images INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL,
    Url VARCHAR(100) NOT NULL,
    Id_voiture INT NOT NULL
);

CREATE TABLE voiture_equipements
(
    Id_voiture INT NOT NULL,
    Id_options INT NOT NULL
);

CREATE TABLE equipements_options
(
    Id_options INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL
);

CREATE TABLE modeles
(
    Id_modeles INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL,
    Id_marques INT NOT NULL
);

CREATE TABLE marque
(
    Id_marques INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL
);

INSERT INTO `roles` (`ID_role`, `Nom`) VALUES (1, 'Administrateur'), (2, 'Employé');

INSERT INTO `user` (`Id_user`, `Nom`, `Prenom`, `Email`, `Mdp`, `Id_role`) VALUES
(1, 'Parrot', 'Vincent', 'vincent.parrot@garage.com', '$2b$10$Hiq83fd2mF8jlhcrDDMKY.g7pcv2ergWYrkCaaiIP.vW98J7bi6jG', 1),
(3, 'Employé', 'Maxime', 'employe.maxime@garage.com', '$2b$10$7eXvFjuAQE3xvSkv8Hn6S.2cLQUBVKZtUp.nv24Cr90ztI4gFxcaC', 2);

INSERT INTO `services` (`Id_serv`, `Nom`, `Type`, `Id_user`) VALUES
(1, 'Réparation de Moteur', 'Mécanique', 1),
(2, 'Changement de Freins', 'Mécanique', 1),
(3, 'Diagnostic Électronique', 'Mécanique', 1),
(4, 'Réparation de Transmission', 'Mécanique', 1),
(5, 'Entretien des Suspensions', 'Mécanique', 1),
(6, 'Réparation de Bosses', 'Carrosserie', 1),
(7, 'Peinture Automobile', 'Carrosserie', 1),
(8, 'Réparation de Pare-chocs', 'Carrosserie', 1),
(9, 'Débosselage Sans Peinture (DSP)', 'Carrosserie', 1),
(10, 'Réparation de Rayures', 'Carrosserie', 1),
(11, 'Entretien Périodique', 'Révision', 1),
(12, 'Diagnostic de Performance', 'Révision', 1),
(13, 'Inspection de Sécurité', 'Révision', 1),
(14, 'Révision Pré-achat', 'Révision', 1),
(15, 'Contrôle des Émissions', 'Révision', 1);

INSERT INTO `avis` (`ID_avis`, `Nom`, `Prenom`, `Description`, `Date`, `Note`, `Status`, `ID_user`) VALUES
(1, 'Gavinet', 'Maxime', 'Ceci est un test API', '2024-01-20', 5, 'approuvé', NULL),
(2, 'Studi', 'Formation', 'Votre application est vraiment bien faites ! Vous etes vraiment très doué, biensur ceci est toujours un test je veux juste voir si mon carrrousel fonctionne a merveille, je sais ce n\'est pas ce qu\'il y a de mieux a voir mais pour tester ya rien de mieux !', '2024-01-20', 5, 'approuvé', 1);

INSERT INTO `messages` (`ID_messages`, `Objet`, `Type`, `Nom`, `Prenom`, `Email`, `Telephone`, `Description`, `ID_user`) VALUES
(1, 'Réparation de Moteur', 'Mécanique', 'Gavinet', 'Maxime', 'gavinetm26@gmail.com', '0616683209', 'Ceci est un test pour voir si je récupère bien les messages ', 0);


INSERT INTO `jours` (`ID_jours`, `Nom`) VALUES
(1, 'Lundi'),
(2, 'Mardi'),
(3, 'Mercredi'),
(4, 'Jeudi'),
(5, 'Vendredi'),
(6, 'Samedi'),
(7, 'Dimanche');

INSERT INTO `horaires` (`ID_horaire`, `Horaire_ouverture`, `Horaire_fermeture`, `Horaire_ouverture_aprem`, `Horaire_fermeture_aprem`, `ID_jours`) VALUES
(1, '08:45:00', '12:00:00', '14:00:00', '18:00:00', 1),
(2, '08:45:00', '12:00:00', '14:00:00', '18:00:00', 2),
(3, '08:45:00', '12:00:00', '14:00:00', '18:00:00', 3),
(4, '08:45:00', '12:00:00', '14:00:00', '18:00:00', 4),
(5, '08:45:00', '12:00:00', '14:00:00', '18:00:00', 5),
(6, '08:45:00', '12:00:00', '00:00:00', '00:00:00', 6);

INSERT INTO `annonces` (`ID_annonces`, `Nom`, `Date_publication`, `IsVisible`, `Carburant`, `Transmission`, `ID_voiture`, `ID_user`) VALUES
(1, 'Chevrolet Chevelle', '2024-02-16 13:47:30', 1, 'Essence', 'Manuelle', 1, 1),
(2, 'Chevrolet Bel Air', '2024-02-13 14:08:40', 1, 'Essence', 'Manuelle', 2, 1),
(3, 'Chevrolet Corvette C1', '2024-02-13 14:08:40', 1, 'Essence', 'Manuelle', 3, 1),
(4, 'Chevrolet Impala', '2024-02-13 14:08:41', 1, 'Essence', 'Manuelle', 4, 1),
(5, 'Chevrolet Camaro', '2024-02-13 14:08:41', 1, 'Essence', 'Manuelle', 5, 1),
(6, 'Porsche 356', '2024-02-13 14:08:42', 1, 'Essence', 'Manuelle', 6, 1),
(7, 'Porsche 911', '2024-02-13 14:08:42', 1, 'Essence', 'Manuelle', 7, 1),
(8, 'Porsche 912', '2024-02-13 14:08:43', 1, 'Essence', 'Manuelle', 8, 1),
(9, 'Ford Mustang', '2024-02-13 14:08:44', 1, 'Essence', 'Manuelle', 13, 1),
(10, 'Ford F-Series', '2024-02-13 14:08:44', 1, 'Essence', 'Manuelle', 11, 1),
(11, 'Ford Torino', '2024-02-13 11:29:58', 1, 'Essence', 'Manuelle', 12, 1),
(12, 'Porsche 914', '2024-02-13 16:37:53', 1, 'Essence', 'Manuelle', 9, 1),
(13, 'Porsche 924', '2024-02-17 14:59:45', 0, 'Essence', 'Manuelle', 10, 1);

INSERT INTO `voitures` (`ID_voiture`, `Kilometrage`, `Annee`, `Prix`, `ID_modeles`) VALUES
(1, 120000, 1974, 25000, 1),
(2, 100000, 1957, 30000, 2),
(3, 80000, 1962, 70000, 3),
(4, 90000, 1965, 25000, 4),
(5, 110000, 1969, 40000, 5),
(6, 70000, 1960, 80000, 11),
(7, 85000, 1975, 95000, 12),
(8, 90000, 1969, 60000, 13),
(9, 110000, 1973, 20000, 14),
(10, 120000, 1980, 15000, 15),
(11, 150000, 1965, 20000, 6),
(12, 130000, 1971, 18000, 7),
(13, 90000, 1967, 35000, 8),
(14, 95000, 1963, 30000, 9),
(15, 100000, 1966, 15000, 10),
(16, 80000, 1965, 15000, 16),
(17, 90000, 1970, 10000, 17),
(18, 85000, 1972, 12000, 18);

INSERT INTO `equipements_options` (`ID_options`, `Nom`) VALUES
(1, 'Climatisation'),
(2, 'Vitres électriques'),
(3, 'Phares antibrouillard'),
(4, 'Toits ouvrants'),
(5, 'Jantes en alliages'),
(6, 'Ordinateurs de bord'),
(7, 'Vitres teintées'),
(8, 'Systèmes de verrouillage centralisé'),
(9, 'Moteurs V8');

INSERT INTO `marque` (`ID_marques`, `Nom`) VALUES
(1, 'Chevrolet'),
(2, 'Ford'),
(3, 'Porsche'),
(4, 'Fiat'),
(5, 'Volkswagen'),
(6, 'Alfa Romeo'),
(7, 'Jaguar'),
(8, 'Mercedez-Benz'),
(9, 'Cadillac'),
(10, 'Peugeot');

INSERT INTO `modeles` (`ID_modeles`, `Nom`, `ID_marques`) VALUES
(1, 'Chevrolet Chevelle', 1),
(2, 'Chevrolet Bel Air', 1),
(3, 'Chevrolet Corvette C1', 1),
(4, 'Chevrolet Impala', 1),
(5, 'Chevrolet Camaro', 1),
(6, 'Ford F-Series', 2),
(7, 'Ford Torino', 2),
(8, 'Ford Mustang', 2),
(9, 'Ford Thunderbird', 2),
(10, 'Ford Galaxie', 2),
(11, 'Porsche 356', 3),
(12, 'Porsche 911', 3),
(13, 'Porsche 912', 3),
(14, 'Porsche 914', 3),
(15, 'Porsche 924', 3),
(16, 'Fiat 500', 4),
(17, 'Fiat 600', 4),
(18, 'Fiat 124', 4),
(19, 'Fiat 128', 4),
(20, 'Fiat X1/9', 4),
(21, 'Volkswagen Beetle', 5),
(22, 'Volkswagen Type 2', 5),
(23, 'Volkswagen Type 3', 5),
(24, 'Volkswagen Karmann Ghia', 5),
(25, 'Volkswagen Golf Mk1', 5),
(26, 'Alfa Romeo Giulietta', 6),
(27, 'Alfa Romeo Giuilia', 6),
(28, 'Alfa Romeo Spider', 6),
(29, 'Alfa Romeo Alfetta', 6),
(30, 'Alfa Romeo GTV', 6),
(31, 'Jaguar XK120', 7),
(32, 'Jaguar Mark 2', 7),
(33, 'Jaguar E-Type', 7),
(34, 'Jaguar XJ6', 7),
(35, 'Jaguar XJS', 7),
(36, 'Mercedes-Benz 300 SL', 8),
(37, 'Mercedes-Benz W108', 8),
(38, 'Mercedes-Benz W116', 8),
(39, 'Mercedes-Benz R107', 8),
(40, 'Mercedes-Benz W123', 8),
(41, 'Cadillac Series 62', 9),
(42, 'Cadillac Eldorado', 9),
(43, 'Cadillac DeVille', 9),
(44, 'Cadillac Fleetwood', 9),
(45, 'Cadillac Seville', 9),
(46, 'Peugeot 203', 10),
(47, 'Peugeot 404', 10),
(48, 'Peugeot 504', 10),
(49, 'Peugeot 204', 10),
(50, 'Peugeot 505', 10);

INSERT INTO `images` (`ID_images`, `Nom`, `Url`, `ID_voiture`) VALUES
(1, 'image-f279d04d-9965-4e01-bf7c-34844d53a691.jpg', 'Public\\Uploads\\image-f279d04d-9965-4e01-bf7c-34844d53a691.jpg', 1),
(2, 'image-77081e9e-3b8e-43f4-b529-45d67b15554b.webp', 'Public\\Uploads\\image-77081e9e-3b8e-43f4-b529-45d67b15554b.webp', 2),
(3, 'image-a8361e7e-4832-4c49-88e3-e1aec7c485bc.webp', 'Public\\Uploads\\image-a8361e7e-4832-4c49-88e3-e1aec7c485bc.webp', 2),
(4, 'image-4c8d8dd7-fb7e-4ed9-87b0-a37f2e5ec6cd.webp', 'Public\\Uploads\\image-4c8d8dd7-fb7e-4ed9-87b0-a37f2e5ec6cd.webp', 3),
(5, 'image-75088ef5-52e4-4b07-b203-5d5390d8a29d.webp', 'Public\\Uploads\\image-75088ef5-52e4-4b07-b203-5d5390d8a29d.webp', 4),
(6, 'image-dd53a91d-2e61-45e8-a098-07d532f58e9e.webp', 'Public\\Uploads\\image-dd53a91d-2e61-45e8-a098-07d532f58e9e.webp', 5),
(7, 'image-fe765c34-a97f-451b-a379-b22e3500b09f.webp', 'Public\\Uploads\\image-fe765c34-a97f-451b-a379-b22e3500b09f.webp', 6),
(8, 'image-14c7b7b6-cb74-43a4-ae3a-bf3c6173a2f0.webp', 'Public\\Uploads\\image-14c7b7b6-cb74-43a4-ae3a-bf3c6173a2f0.webp', 7),
(9, 'image-4e020f6b-c779-42e9-8258-c8712389025f.webp', 'Public\\Uploads\\image-4e020f6b-c779-42e9-8258-c8712389025f.webp', 8),
(10, 'image-c7ef103b-276d-4c83-bebd-239642c64f08.webp', 'Public\\Uploads\\image-c7ef103b-276d-4c83-bebd-239642c64f08.webp', 9),
(11, 'image-a2f6c612-c5cf-4225-b7a9-6504a1a35fc1.webp', 'Public\\Uploads\\image-a2f6c612-c5cf-4225-b7a9-6504a1a35fc1.webp', 10),
(12, 'image-3671d547-ff8d-40e2-adab-34a0df3a8124.webp', 'Public\\Uploads\\image-3671d547-ff8d-40e2-adab-34a0df3a8124.webp', 11),
(13, 'image-be78233a-7039-40cc-94a6-d656c6752f82.webp', 'Public\\Uploads\\image-be78233a-7039-40cc-94a6-d656c6752f82.webp', 12),
(14, 'image-ccdfa297-bbc6-4f35-a4c0-556ea123e4da.webp', 'Public\\Uploads\\image-ccdfa297-bbc6-4f35-a4c0-556ea123e4da.webp', 13),
(18, 'image-fef57e3e-136d-4af8-8c0a-413eb547b3ca.webp', 'Public\\Uploads\\image-fef57e3e-136d-4af8-8c0a-413eb547b3ca.webp', 2),
(19, 'image-9d1ca3b9-4513-4e17-911d-8ff68a559c0a.webp', 'Public\\Uploads\\image-9d1ca3b9-4513-4e17-911d-8ff68a559c0a.webp', 1),
(20, 'image-e4e772e2-eedc-4881-b986-e22451b5a54d.webp', 'Public\\Uploads\\image-e4e772e2-eedc-4881-b986-e22451b5a54d.webp', 1),
(21, 'image-4e32876e-e1b6-4075-aaf5-6568c5181f22.webp', 'Public\\Uploads\\image-4e32876e-e1b6-4075-aaf5-6568c5181f22.webp', 3),
(22, 'image-1de297e9-2b4f-433e-a95b-f116bb2cfcdf.webp', 'Public\\Uploads\\image-1de297e9-2b4f-433e-a95b-f116bb2cfcdf.webp', 4),
(23, 'image-fa2005bb-676a-4e36-beee-9ddeeec6c044.webp', 'Public\\Uploads\\image-fa2005bb-676a-4e36-beee-9ddeeec6c044.webp', 5),
(24, 'image-89f786e4-cae3-406b-a237-5de4cea4963e.webp', 'Public\\Uploads\\image-89f786e4-cae3-406b-a237-5de4cea4963e.webp', 6),
(25, 'image-3ab74f97-1a92-4045-991a-068ce7f3da34.webp', 'Public\\Uploads\\image-3ab74f97-1a92-4045-991a-068ce7f3da34.webp', 7),
(26, 'image-0034bd3c-1c56-4b63-9dc9-8df1fbf9f879.webp', 'Public\\Uploads\\image-0034bd3c-1c56-4b63-9dc9-8df1fbf9f879.webp', 8),
(27, 'image-846c1bb5-64b2-4ee6-827a-60853cb1f39d.webp', 'Public\\Uploads\\image-846c1bb5-64b2-4ee6-827a-60853cb1f39d.webp', 9),
(28, 'image-88ffc7e5-deda-48bb-989b-a11b38322aa6.webp', 'Public\\Uploads\\image-88ffc7e5-deda-48bb-989b-a11b38322aa6.webp', 13),
(29, 'image-0f23bf85-7188-44b7-a75e-93a4563a12b7.webp', 'Public\\Uploads\\image-0f23bf85-7188-44b7-a75e-93a4563a12b7.webp', 11),
(30, 'image-a0740634-3b24-4647-9e8f-284674c34f96.webp', 'Public\\Uploads\\image-a0740634-3b24-4647-9e8f-284674c34f96.webp', 12);