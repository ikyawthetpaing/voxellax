CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `cartItem` (
	`userId` varchar(255) NOT NULL,
	`productId` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `cartItem_productId_userId` PRIMARY KEY(`productId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `collection-product` (
	`collectionId` varchar(255) NOT NULL,
	`productId` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `collection` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`privacy` enum('public','private','unlisted') NOT NULL DEFAULT 'private',
	`createdAt` timestamp DEFAULT (now()),
	`userId` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `like` (
	`userId` varchar(255) NOT NULL,
	`productId` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `like_productId_userId` PRIMARY KEY(`productId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`price` double(10,2) NOT NULL DEFAULT 0,
	`category` varchar(255) NOT NULL,
	`subcategory` varchar(255),
	`images` json DEFAULT ('[]'),
	`files` json DEFAULT ('[]'),
	`createdAt` timestamp DEFAULT (now()),
	`storeId` varchar(255) NOT NULL,
	CONSTRAINT `product_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `store` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`avatar` json DEFAULT ('null'),
	`cover` json DEFAULT ('null'),
	`contactEmail` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`userId` varchar(255) NOT NULL,
	CONSTRAINT `store_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	`role` enum('user','seller','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
