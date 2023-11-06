CREATE TABLE `purchases` (
	`userId` varchar(255) NOT NULL,
	`productId` varchar(255) NOT NULL,
	`cost` double(10,2) NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `purchases_productId_userId` PRIMARY KEY(`productId`,`userId`)
);
