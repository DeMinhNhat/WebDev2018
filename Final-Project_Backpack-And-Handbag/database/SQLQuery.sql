CREATE DATABASE qlbh;
USE qlbh;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE TABLE `categories` (
	`CatID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`CatName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY (`CatID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `brands` (
	`BraID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`BraName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`Origin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY (`BraID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `users` (
	`f_ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`f_Username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`f_Password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`f_Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`f_DOB` date NOT NULL,
	`f_Gender` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
	`f_Phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
	`f_Permission` int(11) NOT NULL,
	PRIMARY KEY (`f_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `products` (
	`ProID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`ProName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`TinyDes` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	`FullDes` text COLLATE utf8_unicode_ci NOT NULL,
	`Price` int(11) NOT NULL,
	`CatID` int(11) UNSIGNED NOT NULL,
	`BraID` int(11) UNSIGNED NOT NULL,
	`Quantity` int(11) NOT NULL,
	`Clicks` int(11) NOT NULL DEFAULT 0,
	`SoldQuantity` int(11) NOT NULL DEFAULT 0,
	`ImportDate` date NOT NULL,
	`SaleOff` int(11) UNSIGNED NOT NULL DEFAULT 0,
	PRIMARY KEY (`ProID`),
	INDEX CatId (CatID),
	FOREIGN KEY (`CatID`) REFERENCES categories(`CatID`) ON DELETE CASCADE,
	INDEX BraId (BraID),
	FOREIGN KEY (`BraID`) REFERENCES brands(`BraID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `orders` (
	`OrderID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`OrderDate` datetime NOT NULL,
	`UserID` int(11) UNSIGNED NOT NULL,
	`Total` bigint(20) NOT NULL,
	`State` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,	-- Đã giao = 1 | Chưa giao = 0
	PRIMARY KEY (`OrderID`),
	INDEX UserId (UserID),
	FOREIGN KEY (`UserID`) REFERENCES users(`f_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `orderdetails` (
	`ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`OrderID` int(11) UNSIGNED NOT NULL,
	`ProID` int(11) UNSIGNED NOT NULL,
	`Quantity` int(11) NOT NULL,
	`Amount` int(11) NOT NULL,
	PRIMARY KEY (`ID`),
	INDEX OrderId (OrderID),
	FOREIGN KEY (`OrderID`) REFERENCES orders(`OrderID`) ON DELETE CASCADE,
	INDEX ProId (ProID),
	FOREIGN KEY (`ProID`) REFERENCES products(`ProID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

insert into  brands (BraID,BraName,Origin) value ( 1, "Herschel", "Canada");
insert into  brands (BraID,BraName,Origin) value ( 2, "Nike", "Amenica");
insert into  brands (BraID,BraName,Origin) value ( 3, "North-face", "Amenica");
insert into  brands (BraID,BraName,Origin) value ( 4, "Swiss-gear", " Switzerland");
insert into  brands (BraID,BraName,Origin) value ( 5, "Under-armour", "America");

insert into  categories (CatID,CatName) value ( 1, "Túi vắt chéo thân");
insert into  categories (CatID,CatName) value ( 2, "Túi xách");
insert into  categories (CatID,CatName) value ( 3, "Ba lô đeo vai");
insert into  categories (CatID,CatName) value ( 4, "Túi du lịch");
insert into  categories (CatID,CatName) value ( 5, "Túi người đưa thư");

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate) VALUES
(1, "Alder Crossbody","Organized and Elegant", "Features a clip-fastened strap, allowing it to be carried as a clutch, keep items organized within your bag.",
29.99,1,1,22,10,'2018-07-01'),
(2, "Bamfield Tote","Strong and Sweet", "Features an ample zippered main compartment, along with an external storage sleeve and tactical patch detailing.",
79.99,2,1,34,22,'2018-04-20'),
(3, "Dawson Backpack","Dumb and Young", "Crafted for everyday exploration, the Dawson backpack features a hidden drawcord cinch closure and additional storage with distinctive strap details.",
69.99,3,1,45,13,'2017-06-15'),
(4, "Gorge Duffle","Robust and Strong", "Rendered in a lightweight water-resistant fabric with the added protection of a reinforced Ballistic nylon base,features an oversized U-shape zippered lid and Herschel Supply's signature shoe compartment.",
139.99,4,1,12,72,'2017-02-22'),
(5, "Mica Tote","Sweet and Young", "The contemporary Mica tote features a zippered compartment with extended handles that allow it to be comfortably worn on the shoulder.",
49.99,2,1,26,5,'2018-06-21'),
(6, "Novel Duffle","Picturesque and Width", "The Major League Baseball® Herschel Novel™ duffle is an ideal weekender that features a side-access shoe compartment, along with iconic team logos and colors.",
99.99,4,1,37,9,'2018-01-19'),
(7, "Odell Messenger","Schoolly and Pure", "The functional Odell messenger features a streamlined design with a clip-fastened seatbelt webbing strap and ample main compartment.",
69.99,5,1,29,15,'2018-02-18'),
(8, "Pop Quiz Messenger","Young and Workplace", "The Herschel Pop Quiz™ Messenger is the quintessential modern shoulder bag with convenient compartments, including a protective laptop sleeve.",
89.99,5,1,10,29,'2018-06-27'),
(9, "Retreat Backpack","Schoolly and Travelly", "The Herschel Retreat™ Mid-Volume backpack is a streamlined rendition of a classic mountaineering style, featuring a drawcord cinch closure and a strap detailed top flap.",
79.99,3,1,50,40,'2018-05-01'),
(10, "Woven Crossbody","Pretty and Girly", "Worn over the shoulder, carried as a clutch, or used to keep items organized within your bag, this versatile accessory is finished with subtle Herschel Supply branding.",
39.99,1,1,28,44,'2018-03-23'),
(11, "Alpha Adapt Crossbody","Sporty and Containable", "The Nike Alpha Adapt Big Kids' Crossbody Duffel Bag offers powerful durability and multiple carrying options for practice days or weekend trips.",
30,1,2,20,90,'2018-03-07'),
(12, "Basketball Backpack","Sporty and Firmly", "The Nike Hoops Elite Max Air Team 2.0 Graphic Basketball Backpack is designed with an innovative zip system so you can access your gear from any angle.",
90,3,2,18,12,'2018-04-11'),
(13, "Core Small Crossbody","Windy and Big", "Featured a main zip compartment, a front zip compartment and a bonded zip pocket for all your essentials, with an adjustable shoulder strap for custom comfort.",
20,1,2,30,120,'2018-06-01'),
(14, "Gym Club Duffel","Handsome and Strong", "The Nike Gym Club Kids' Duffel Bag offers spacious storage and multiple carrying options so you can comfortably transport your gear from school to practice, the studio and your next game.",
35,4,2,90,122,'2018-10-21'),
(15 , "Gym Tote","Comfy and Practical", "The Nike Gym Tote Bag features dual handles and a spacious main compartment for convenient storage when you're on the move.",
35,2,2,100,130,'2018-09-01'),
(16, "Hoops Elite Duffel","Blue and Strong", "A cushioned shoulder strap and water-resistant fabric deliver comfort and durable protection for essential equipment.",
80,4,2,20,20,'2018-07-02'),
(17, "Paul Smith Messenger","Schoolly and Menly", "Features an adjustable shoulder strap, a foldover top with magnetic closure, an internal zipped pocket, internal slip pockets, an embossed internal logo stamp.",
597,5,2,3,5,'2018-11-02'),
(18, "Responder Backpack","Wildy and Naturally", "The Nike SFS Responder Backpack is inspired by military essentials for durability, optimum function and versatility anywhere you go.",
180,3,2,20,30,'2018-08-06'),
(19, "Sportswear Tote","Delicately and Girly", "The Nike Sportswear AF1 Tote Bag features cord handles that wrap around a large main compartment to create the perfect every day carryall.",
85,2,2,15,49,'2018-06-03'),
(20, "Watanabe Man Messenger","Menly and Firmly", "Red MAN messenger bag from Junya Watanabe Comme Des Garçons.",
132,5,2,60,69,'2017-05-01'),
(21, "Apex Gym Duffel","Cozily and Sporty", "Keep all of your indoor and outdoor exercise gear organized and ready to go with this voluminous 45-liter duffel.",
210,4,3,10,15,'2017-09-13'),
(22, "Bardu Crossbody","Schoolly and distributive", "Features main compartment with slip-in pocket and key fob. Front stash pocket with pen slots. Secure velcro and buckle closure for main compartment.",
20,1,3,200,300,'2018-01-15'),
(23, "Base Camp Duffel","Travelly and Wildy", "The 31-liter capacity provides ideal storage for overnighters or day trips and the exterior zip pocket stashes keys or a passport.",
190,4,3,13,20,'2018-07-17'),
(24, "Face Recon Backpack","Schoolly and Strong", "Iconic 31-liter backpack updated with a stretch front stash pocket and improved organization. Padded, fleece-lined tablet sleeve located in the front compartment for quick access.",
60,3,3,100,67,'2018-03-02'),
(25, "Field Crossbody","Dumb and Schoolly", "Keep your cell easily-accessible in the shoulder-strap pocket, and use the main compartment to store an additional layer.",
69,1,3,50,102,'2018-04-03'),
(26, "Heist Messenger","Elegant and Young", "Built for hauling lunches and 15 in. laptops, the roomy Timbuk2 Heist messenger bag has a quilted back panel and an ambidextrous cross-body strap that makes transporting your essentials a breeze.",
100,5,3,100,300,'2018-08-04'),
(27, "Jester Backpack","Sporty and Young", "Our classic 29-liter Jester was redesigned with a comfortable back panel and shoulder straps. Padded laptop sleeve in the main compartment protects your goods from bumps and falls.",
38,3,3,150,231,'2018-08-13'),
(28, "Nylon Tote","Containable and Convenient", "The North Face® hits the ground running with the On The Run Bag. Performance-driven tote bag with multiple storage options. Divided mesh pocket keeps gear separated.",
10,2,3,5,0,'2018-08-12'),
(29, "Rainy Tote","Convenient and Decent", "We're donating $1 million to The Trust For Public Land to help build public climbing walls in U.S. communities.",
29,2,3,90,500,'2018-09-25'),
(30, "Timbuk Messenger","Fastly and Containable", "With versatile straps that let you easily convert this from briefcase to backpack to messenger bag, the svelte Timbuk2 Heist briefcase makes commuting with a computer feel like a walk in the park.",
50,5,3,99,46,'2018-05-08'),
(31, "1900 Duffel","Sporty and Neat", "Catch hold of the SWISSGEAR 1900 duffel bag and carry it to places in the city and beyond. With an easy-to-reach front pocket, have access to your frequently used items and embark on easier travels.",
60,4,4,60,30,'2018-03-22'),
(32, "Black Backpack","Schoolly and Containable", "Look no further than the SWISSGEAR 3598 backpack to meet your carrying preferences. It’s an everyday backpack that entails modern functionality for commuters and travelers.",
40,3,4,120,15,'2018-08-12'),
(33, "Black Messenger","Workplace and Decent", "This daily bag supply’s all the functions and accessibility that is needed for any occasion. Designed with a padded laptop sleeve compartment for extra protection , your valuable laptop will be safely secured.",
99,5,4,100,190,'2018-06-01'),
(34, "Black Tote","Acient and Firmly", "Interior zippered pocket. Removable adjustable shoulder strap. Rear pocket unzips to become a Pass-Thru trolley sleeve to slide over the handle of wheeled luggage for easy travel.",
78,2,4,101,89,'2018-04-13'),
(35, "Day Crossbody","Daily and Dymamic", "Want a sporty bag to carry your essentials and show some flair – the Jewel CrossBody bag is the one.",
12,1,4,10,40,'2018-06-01'),
(36, "Getaway Messenger","Convenient and Elegant", "Equipped with an integrated 13” laptop pocket, organizer pockets, and mesh interior water bottle pocket. Sporty yet sophisticated, this messenger bag is uniquely crafted.",
40,5,4,50,405,'2018-10-17'),
(37, "Jewel CrossBody","Dymamic and Girly", "Want a sporty bag to carry your essentials and show some flair – the Jewel CrossBody bag is the one.",
15,1,4,200,600,'2018-12-18'),
(38, "Laptop Backpack","Containable and Strong", "Its padded contoured shoulder straps with hanging loops allow comfortable carry while the soft, cushioned back panel provides optimum back support. Never embark on your daily commute without this distinguished SWISSGEAR companion.",
60,3,4,60,79,'2018-01-02'),
(39, "Laptop Tote","Immaculate and Acient", "Classic design women laptop tote bag up to 15.6 inch, everyday carrying for work travel, Best for Mother's Day gifts. INDEPENDENT LAPTOP PROTECTIVE LAYER: One main protective layer  about 0.6cm thick with top elastic clasp.",
69,2,4,27,43,'2018-09-05'),
(40, "Rolling Duffel","Travelly and Strong", "An exterior zippered pocket keeps accessories within reach. Made of durable 840D dobby polyester fabric.",
99,4,4,80,20,'2018-07-22'),
(41, "Big Tote","Containable and Firmly", "Under Armour mission is to make all athletes better through passion, design and the relentless pursuit of innovation.",
86,2,5,200,90,'2018-11-22'),
(42, "Classic Messenger","Young and Schoolly", "Internal organizer for pens, phones, and other small stuff, Internal water bottle pocket. Coordinating Strap Pad included, Cross strap not compatible with XS messenger, Fully adjustable shoulder strap with a permanent, super comfortable airmesh strap pad.",
38,5,5,18,140,'2018-07-28'),
(43, "Compel Sling Crossbody","Sporty and Dumb", "UA Storm technology repels water without sacrificing breathability. Soft-lined laptop sleeve—holds up to 15” MacBook Pro or similarly sized laptop.",
54,1,5,56,49,'2018-02-30'),
(44, "Laptop Messenger","Classic and Basic", "UA- compliant laptop portage meets urban sophistication. Send your bag through security without removing devices.",
54,5,5,59,38,'2018-03-19'),
(45, "Packable Backpack","Convenient and Schoolly", "UA Storm technology repels water without sacrificing breathability. Extra large zippered main compartment. Adjustable shoulder straps. Comfort grab handle on top of bag. Can be packed up into carrying pouch for easy compact storing when not in use.",
30,3,5,200,110,'2018-04-01'),
(46, "Rhino Duffle","Containable and Strong", "UA Storm technology delivers an element-battling, highly water-resistant finish. Tough, abrasion-resistant bottom & side panels.",
45,4,5,100,77,'2018-04-09'),
(47, "Rocket Crossbody","Sweet and Ingenuous", "Large main compartment to stash all your gear for the day. Top fold over panel features snap closure to stay secure.",
69,1,5,33,330,'2018-02-18'),
(48, "Run Tote","Firmly and Classic", "UA Storm technology repels water to protect your gear from the elements. Main compartment zips shut on top with reflective pulls. Side stash pocket lined with soft Velboa to protect valuables.",
67,2,5,66,99,'2018-07-15'),
(49, "SC30 Backpack","Strong and Containable", "Tough, abrasion-resistant bottom panel. Soft, paded laptop & tablet sleeves.",
55,3,5,44,33,'2018-05-30'),
(50, "Undeniable Duffle","Containable and Sporty", "UA Storm technology delivers an element-battling, highly water-resistant finish. Tough, abrasion-resistant bottom & side panels. Large front zippered organization pocket. Adjustable, padded, HeatGear® shoulder strap for total comfort. Padded top grab handle.",
109,4,5,90,10,'2018-06-27');
