BEGIN;
   
SET CLIENT_ENCODING TO 'UTF-8';

-- Vider les tables avec CASCADE

TRUNCATE TABLE "user" CASCADE;
TRUNCATE TABLE "campaign" CASCADE;
TRUNCATE TABLE "tree" CASCADE;
-- Insérer des utilisateurs
INSERT INTO "user" (email, password, firstname, lastname, telephone, birthday, locality, role) VALUES
('partner1@gmail.com', 'Password1@', 'Nicolas', 'MARTIN', '1234567890', '1990-01-01', 'Paris', 'partner'),
('partner2@gmail.com', 'Password2@', 'Jean', 'BERNARD', '1234567891', '1980-01-01', 'Paris', 'partner'),
('partner3@gmail.com', 'Password3@', 'Georges', 'DUBOIS', '1234567892', '1970-01-01', 'Paris', 'partner'),
('partner4@gmail.com', 'Password4@', 'Christian', 'CLEMENT', '1234567893', '1960-01-01', 'Paris', 'partner'),
('partner5@gmail.com', 'Password5@', 'Emma', 'DURAND', '1234567894', '1950-01-01', 'Paris', 'partner'),
('partner6@gmail.com', 'Password6@', 'Louise', 'DIDIER', '1234567895', '2000-01-01', 'Paris', 'partner'),
('partner7@gmail.com', 'Password7@', 'Lea', 'ROCHER', '1234567896', '2001-01-01', 'Paris', 'partner'),
('partner8@gmail.com', 'Password8@', 'Sofia', 'LAROCHE', '1234567897', '1985-01-01', 'Paris', 'partner'),
('Admin1@gmail.com', 'Password1@', 'Admin', 'DAVID', '1234567890', '1990-01-01', 'Paris', 'admin'),
('User1@gmail.com', 'Password1@', 'Maco', 'USER1', '1234567890', '1990-01-01', 'Paris', 'user');

-- Insérer des campagnes
INSERT INTO "campaign" (user_id, name, description, image) VALUES
(1, 'Amazonie', 'restaurer et preserver nos precieux ecosystemes', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/logo_arbre_design_v3hvaa.jpg'),
(2, 'Vert', 'Cette campagne vise a planter une variete d\arbres indigenes', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/tree_nature_k8jxgj.jpg'),
(3, 'Europe', 'restaurer et preserver nos precieux ecosystemes', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/logo_arbre_design_v3hvaa.jpg'),
(4, 'Asie', 'Cette campagne vise a planter une variete d\arbres indigenes', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/tree_nature_k8jxgj.jpg'),
(5, 'Organic', 'restaurer et preserver nos precieux ecosystemes', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/logo_arbre_design_v3hvaa.jpg'),
(6, 'Eco', 'Cette campagne vise a planter une variete d\arbres indigenes', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/tree_nature_k8jxgj.jpg'),
(7, 'Greenleaf', 'restaurer et preserver nos precieux ecosystemes', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/logo_arbre_design_v3hvaa.jpg'),
(8, 'Nature', 'Cette campagne vise a planter une variete d\arbres indigenes', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716435342/tree_nature_k8jxgj.jpg');

-- Insérer des arbres
INSERT INTO "tree" (campaign_id, user_id, name, description, image, price, date_of_purchase, status, planting_date, gps_coordinates) VALUES
(1, 1, 'Chene', 'Un chene magnifique et fort', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432096/pexels-tobiasbjorkli-2360670_bputsr.jpg', 20.00, '2021-01-01', 'Planted', '2021-02-01', '(49.1805, 1.8989)'),
(2, 2, 'Erable', 'Un erable a sucre robuste', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432413/pexels-photo-12345930_rkiwfr.jpg', 15.00, '2021-01-01', 'Planted', '2021-03-01', '(49.1805, 1.8989)'),
(3, 3, 'Sapin', 'Le sapin est un genre de plantes vivaces', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432096/pexels-tobiasbjorkli-2360670_bputsr.jpg', 20.00, '2021-01-01', 'Planted', '2021-02-01', '(49.1805, 1.8989)'),
(4, 4, 'Baobab', 'Un arbre tres distinctif avec un tronc massif et renfle', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432413/pexels-photo-12345930_rkiwfr.jpg', 15.00, '2021-01-01', 'Planted', '2021-03-01', '(49.1805, 1.8989)'),
(5, 5, 'Ficus', 'Le ficus est un genre botanique relevant de la famille des Moraceae', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432096/pexels-tobiasbjorkli-2360670_bputsr.jpg', 20.00, '2021-01-01', 'Planted', '2021-02-01', '(49.1805, 1.8989)'),
(6, 6, 'Catalpa', 'Genre botanique de plantes fleuries de la famille des Bignoniaceae', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432413/pexels-photo-12345930_rkiwfr.jpg', 15.00, '2021-01-01', 'Planted', '2021-03-01', '(49.1805, 1.8989)'),
(7, 7, 'Alnus', 'Genre botanique d’arbres et arbustes relevant de la famille des Betulaceae', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432096/pexels-tobiasbjorkli-2360670_bputsr.jpg', 20.00, '2021-01-01', 'Planted', '2021-02-01', '(49.1805, 1.8989)'),
(8, 8, 'Olivier', 'Un arbre emblematique mediterraneen, souvent associe a la paix et a la sagesse', 'https://res.cloudinary.com/dg2qhwbkt/image/upload/c_fill,w_600,h_600,ar_1:1/v1716432413/pexels-photo-12345930_rkiwfr.jpg', 15.00, '2021-01-01', 'Planted', '2021-03-01', '(49.1805, 1.8989)');


 COMMIT;




