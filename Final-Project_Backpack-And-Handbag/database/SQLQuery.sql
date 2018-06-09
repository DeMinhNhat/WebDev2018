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
	PRIMARY KEY (`BraID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `users` (
	`f_ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`f_Username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`f_Password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`f_Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`f_Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`f_DOB` date NOT NULL,
	`f_Permission` int(11) NOT NULL,
	PRIMARY KEY (`f_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tui thêm số lần click với ngày nhập sp vào đây để bik được sản phẩm được xem nhiều nhất, mới nhất
-- Trong phần yêu cầu có xuất xứ (chắc là made in ở đâu) => tui k bik cho cái này vào database hay dùng đinh dạng html cho vào fullDes như thầy chỉ

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
	`ImportDate` date NOT NULL,
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
	PRIMARY KEY (`OrderID`),
	INDEX UserId (UserID),
	FOREIGN KEY (`UserID`) REFERENCES users(`f_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- mỗi order có nhiều order details chứa các sp (mỗi order details là 1 sp được chọn mua trong 1 order) (tui nghĩ là thế :3)
CREATE TABLE `orderdetails` (
	`ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`OrderID` int(11) UNSIGNED NOT NULL,
	`ProID` int(11) UNSIGNED NOT NULL,
	`Quantity` int(11) NOT NULL,
	`Price` bigint(20) NOT NULL,
	`Amount` int(11) NOT NULL,
	PRIMARY KEY (`ID`),
	INDEX OrderId (OrderID),
	FOREIGN KEY (`OrderID`) REFERENCES orders(`OrderID`) ON DELETE CASCADE,
	INDEX ProId (ProID),
	FOREIGN KEY (`ProID`) REFERENCES products(`ProID`) ON DELETE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
 -- tui chưa bik cái amount để làm gì

insert into  brands (BraID,BraName) value ( 1, "Herschel");
insert into  brands (BraID,BraName) value ( 2, "Nike");
insert into  brands (BraID,BraName) value ( 3, "North-face");
insert into  brands (BraID,BraName) value ( 4, "Swiss-gear");
insert into  brands (BraID,BraName) value ( 5, "Under-armour");

insert into  categories (CatID,CatName) value ( 1, "Crossbody")	;
insert into  categories (CatID,CatName) value ( 2, "Tote");
insert into  categories (CatID,CatName) value ( 3, "Backpack");
insert into  categories (CatID,CatName) value ( 4, "Duffle");
insert into  categories (CatID,CatName) value ( 5, "Messenger");

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (1, "Alder Crossbody","Tier 3", "Features a clip-fastened strap, allowing it to be carried as a clutch, keep items organized within your bag.",29.99,1,1,10,10,'2018-07-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (2, "Bamfield Tote","Tier 2", "Features an ample zippered main compartment, along with an external storage sleeve and tactical patch detailing",79.99,2,1,10,22,'2018-06-020');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (3, "Dawson Backpack","Tier 2", "Crafted for everyday exploration, the Dawson backpack features a hidden drawcord cinch closure and additional storage with distinctive strap details.",69.99,3,1,10,13,'2017-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (4, "Gorge Duffle","Tier 1", "Rendered in a lightweight water-resistant fabric with the added protection of a reinforced Ballistic nylon base,features an oversized U-shape zippered lid and Herschel Supply's signature shoe compartment.",139.99,4,1,10,22,'2017-02-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (5, "Mica Tote","Tier 3", "The contemporary Mica tote features a zippered compartment with extended handles that allow it to be comfortably worn on the shoulder.",49.99,2,1,10,0,'2018-06-21');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (6, "Novel Duffle ","Tier 2", "The Major League Baseball® Herschel Novel™ duffle is an ideal weekender that features a side-access shoe compartment, along with iconic team logos and colors.",99.99,4,1,10,3,'2018-01-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (7, "Odell Messenger","Tier 2", "The functional Odell messenger features a streamlined design with a clip-fastened seatbelt webbing strap and ample main compartment.",69.99,5,1,10,4,'2018-02-21');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (8, "Pop Quiz Messenger","Tier 2", "The Herschel Pop Quiz™ Messenger is the quintessential modern shoulder bag with convenient compartments, including a protective laptop sleeve.",89.99,5,1,10,30,'2018-06-22');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (9, "Retreat Backpack","Tier 2", "The Herschel Retreat™ Mid-Volume backpack is a streamlined rendition of a classic mountaineering style, featuring a drawcord cinch closure and a strap detailed top flap.",79.99,3,1,10,12,'2018-05-11');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (10, "Woven Crossbody","Tier 3", "Worn over the shoulder, carried as a clutch, or used to keep items organized within your bag, this versatile accessory is finished with subtle Herschel Supply branding.",39.99,1,1,10,12,'2018-03-08');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (11, "Alpha Adapt Crossbody","Tier 3", "The Nike Alpha Adapt Big Kids' Crossbody Duffel Bag offers powerful durability and multiple carrying options for practice days or weekend trips.",30,1,2,10,11,'2018-03-02');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (12, "Basketball Backpack","Tier 2", "The Nike Hoops Elite Max Air Team 2.0 Graphic Basketball Backpack is designed with an innovative zip system so you can access your gear from any angle.",90,3,2,10,2,'2018-04-11');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (13, "Core Small Crossbody","Tier 3", "Featured a main zip compartment, a front zip compartment and a bonded zip pocket for all your essentials, with an adjustable shoulder strap for custom comfort.",20,1,2,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (14, "Gym Club Duffel","Tier 3", "The Nike Gym Club Kids' Duffel Bag offers spacious storage and multiple carrying options so you can comfortably transport your gear from school to practice, the studio and your next game.",35,4,2,10,0,'2018-10-21');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (15 , "Gym Tote","Tier 3", "The Nike Gym Tote Bag features dual handles and a spacious main compartment for convenient storage when you're on the move.",35,2,2,10,11,'2018-09-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (16, "Hoops Elite Duffel","Tier 2", "A cushioned shoulder strap and water-resistant fabric deliver comfort and durable protection for essential equipment.",80,4,2,10,20,'2018-07-02');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (17, "Paul Smith Messenger","Tier 1", "Features an adjustable shoulder strap, a foldover top with magnetic closure, an internal zipped pocket, internal slip pockets, an embossed internal logo stamp.",597,5,2,10,16,'2018-06-02');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (18, "Responder Backpack","Tier 1", "The Nike SFS Responder Backpack is inspired by military essentials for durability, optimum function and versatility anywhere you go.",180,3,2,10,12,'2018-06-06');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (19, "Sportswear Tote","Tier 2", "The Nike Sportswear AF1 Tote Bag features cord handles that wrap around a large main compartment to create the perfect every day carryall.",85,2,2,10,20,'2018-06-03');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (20, "Watanabe Man Messenger","Tier 1", "Red MAN messenger bag from Junya Watanabe Comme Des Garçons. ",132,5,2,10,0,'2017-05-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (21, "Apex Gym Duffel","Tier 1", "Keep all of your indoor and outdoor exercise gear organized and ready to go with this voluminous 45-liter duffel.",210,4,3,10,15,'2017-09-13');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (22, "Bardu Crossbody","Tier 3", "Features main compartment with slip-in pocket and key fob. Front stash pocket with pen slots. Secure velcro and buckle closure for main compartment.",20,1,3,10,22,'2018-04-15');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (23, "Base Camp Duffel","Tier 1", "The 31-liter capacity provides ideal storage for overnighters or day trips and the exterior zip pocket stashes keys or a passport. ",190,4,3,10,0,'2018-04-17');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (24, "Face Recon Backpack","Tier 2", "Iconic 31-liter backpack updated with a stretch front stash pocket and improved organization. Padded, fleece-lined tablet sleeve located in the front compartment for quick access. ",60,3,3,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (25, "Field Crossbody","Tier 2", "Keep your cell easily-accessible in the shoulder-strap pocket, and use the main compartment to store an additional layer.",69,1,3,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (26, "Heist Messenger","Tier 1", "Built for hauling lunches and 15 in. laptops, the roomy Timbuk2 Heist messenger bag has a quilted back panel and an ambidextrous cross-body strap that makes transporting your essentials a breeze.",100,5,3,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (27, "Jester Backpack","Tier 3", "Our classic 29-liter Jester was redesigned with a comfortable back panel and shoulder straps. Padded laptop sleeve in the main compartment protects your goods from bumps and falls. ", 38,3,3,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (28, "Nylon Tote","Tier 3", "The North Face® hits the ground running with the On The Run Bag. Performance-driven tote bag with multiple storage options. Divided mesh pocket keeps gear separated.",10,2,3,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (29, "Rainy Tote","Tier 3", "We're donating $1 million to The Trust For Public Land to help build public climbing walls in U.S. communities. ",29,2,3,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (30, "Timbuk Messenger","Tier 2", "With versatile straps that let you easily convert this from briefcase to backpack to messenger bag, the svelte Timbuk2 Heist briefcase makes commuting with a computer feel like a walk in the park.",50,5,3,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (31, "1900 Duffel","Tier 2", "Catch hold of the SWISSGEAR 1900 duffel bag and carry it to places in the city and beyond. With an easy-to-reach front pocket, have access to your frequently used items and embark on easier travels.",60,4,4,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (32, "Black Backpack","Tier 3", "Look no further than the SWISSGEAR 3598 backpack to meet your carrying preferences. It’s an everyday backpack that entails modern functionality for commuters and travelers.",40,3,4,10,15,'2018-08-12');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (33, "Black Messenger","Tier 2", "This daily bag supply’s all the functions and accessibility that is needed for any occasion. Designed with a padded laptop sleeve compartment for extra protection , your valuable laptop will be safely secured.",99,5,4,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (34, "Black Tote","Tier 2", "Interior zippered pocket. Removable adjustable shoulder strap. Rear pocket unzips to become a Pass-Thru trolley sleeve to slide over the handle of wheeled luggage for easy travel.",79,2,4,10,22,'2018-07-13');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (35, "Day Crossbody","Tier 3", "Want a sporty bag to carry your essentials and show some flair – the Jewel CrossBody bag is the one.",12,1,4,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (36, "Getaway Messenger","Tier 3", "Equipped with an integrated 13” laptop pocket, organizer pockets, and mesh interior water bottle pocket. Sporty yet sophisticated, this messenger bag is uniquely crafted.",40,5,4,10,23,'2018-01-17');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (37, "Jewel CrossBody","Tier 3", "Want a sporty bag to carry your essentials and show some flair – the Jewel CrossBody bag is the one.",15,1,4,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (38, "Laptop Backpack","Tier 2", "Its padded contoured shoulder straps with hanging loops allow comfortable carry while the soft, cushioned back panel provides optimum back support. Never embark on your daily commute without this distinguished SWISSGEAR companion. ",60,3,4,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (39, "Laptop Tote","Tier 2", "Classic design women laptop tote bag up to 15.6 inch, everyday carrying for work travel, Best for Mother's Day gifts. INDEPENDENT LAPTOP PROTECTIVE LAYER: One main protective layer  about 0.6cm thick with top elastic clasp.",69,2,4,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (40, "Rolling Duffel","Tier 2", "An exterior zippered pocket keeps accessories within reach. Made of durable 840D dobby polyester fabric.",99,4,4,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (41, "Big Tote","Tier 2", "Under Armour mission is to make all athletes better through passion, design and the relentless pursuit of innovation.",86,2,5,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (42, "Classic Messenger","Tier 3", "Internal organizer for pens, phones, and other small stuff, Internal water bottle pocket. Coordinating Strap Pad included, Cross strap not compatible with XS messenger, Fully adjustable shoulder strap with a permanent, super comfortable airmesh strap pad.",38,5,5,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (43, "Compel Sling Crossbody","Tier 2", "UA Storm technology repels water without sacrificing breathability. Soft-lined laptop sleeve—holds up to 15” MacBook Pro or similarly sized laptop.",54,1,5,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (44, "Laptop Messenger","Tier 2", "UA- compliant laptop portage meets urban sophistication. Send your bag through security without removing devices.",54,5,5,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (45, "Packable Backpack","Tier 3", "UA Storm technology repels water without sacrificing breathability. Extra large zippered main compartment. Adjustable shoulder straps. Comfort grab handle on top of bag. Can be packed up into carrying pouch for easy compact storing when not in use.",30,3,5,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (46, "Rhino Duffle","Tier 3", "UA Storm technology delivers an element-battling, highly water-resistant finish. Tough, abrasion-resistant bottom & side panels.",45,4,5,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (47, "Rocket Crossbody","Tier 2", "Large main compartment to stash all your gear for the day. Top fold over panel features snap closure to stay secure.",69,1,5,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (48, "Run Tote","Tier 2", "UA Storm technology repels water to protect your gear from the elements. Main compartment zips shut on top with reflective pulls. Side stash pocket lined with soft Velboa to protect valuables.",67,2,5,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (49, "SC30 Backpack","Tier 2", "Tough, abrasion-resistant bottom panel. Soft, paded laptop & tablet sleeves.",55,3,5,10,0,'2018-06-01');

INSERT INTO products (ProID, ProName, TinyDes, FullDes, Price, CatID, BraID, Quantity, Clicks, ImportDate)
VALUES (50, "Undeniable Duffle","Tier 1", "UA Storm technology delivers an element-battling, highly water-resistant finish. Tough, abrasion-resistant bottom & side panels. Large front zippered organization pocket. Adjustable, padded, HeatGear® shoulder strap for total comfort. Padded top grab handle.",109,4,5,10,0,'2018-06-01');
