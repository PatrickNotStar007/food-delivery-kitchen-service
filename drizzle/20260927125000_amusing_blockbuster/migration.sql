CREATE TYPE "statuses" AS ENUM('pending', 'recieved');--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"order_id" uuid NOT NULL,
	"customerName" varchar(100) NOT NULL,
	"item" varchar(100) NOT NULL,
	"status" "statuses" DEFAULT 'recieved'::"statuses" NOT NULL,
	"created_at" timestamp DEFAULT now()
);
