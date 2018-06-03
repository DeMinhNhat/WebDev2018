CREATE DATABASE qlbh;
USE qlbh;

CREATE TABLE `categories` (
	`CatID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`CatName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY (`CatID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `brands` (
	`BraID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`BraName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY (`BraID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `users` (
	`f_ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`f_Username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`f_Password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`f_Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`f_Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`f_DOB` date NOT NULL,
	`f_Permission` int(11) NOT NULL,
	PRIMARY KEY (`f_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tui thêm số lần click với ngày nhập sp vào đây để bik được sản phẩm được xem nhiều nhất, mới nhất
-- Trong phần yêu cầu có xuất xứ (chắc là made in ở đâu) => tui k bik cho cái này vào database hay dùng đinh dạng html cho vào fullDes như thầy chỉ
CREATE TABLE `products` (
	`ProID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`ProName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`TinyDes` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	`FullDes` text COLLATE utf8_unicode_ci NOT NULL,
	`Price` int(11) NOT NULL,
	`CatID` int(11) NOT NULL,
	`BraID` int(11) NOT NULL,
	`Quantity` int(11) NOT NULL,
	`Clicks` int(11) NOT NULL DEFAULT 0,
	`ImportDate` date NOT NULL,
	PRIMARY KEY (`ProID`),
	CONSTRAINT FK_P_C FOREIGN KEY (`CatID`) REFERENCES categories(`CatID`),
	CONSTRAINT FK_P_B FOREIGN KEY (`BraID`) REFERENCES branches(`BraID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `orders` (
	`OrderID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`OrderDate` datetime NOT NULL,
	`UserID` int(11) NOT NULL,
	`Total` bigint(20) NOT NULL,
	PRIMARY KEY (`OrderID`),
	CONSTRAINT FK_O_U FOREIGN KEY (`UserID`) REFERENCES users(`f_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- mỗi order có nhiều order details chứa các sp (mỗi order details là 1 sp được chọn mua trong 1 order) (tui nghĩ là thế :3)
CREATE TABLE `orderdetails` (
	`ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`OrderID` int(11) NOT NULL,
	`ProID` int(11) NOT NULL,
	`Quantity` int(11) NOT NULL,
	`Price` bigint(20) NOT NULL,
	`Amount` int(11) NOT NULL,
	PRIMARY KEY (`ID`),
	CONSTRAINT FK_OD_O FOREIGN KEY (`OrderID`) REFERENCES orders(`OrderID`),
	CONSTRAINT FK_OD_P FOREIGN KEY (`ProID`) REFERENCES products(`ProID`)
	) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
 -- tui chưa bik cái amount để làm gì