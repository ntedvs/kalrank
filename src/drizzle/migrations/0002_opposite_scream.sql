ALTER TABLE "users" ADD COLUMN "type" text DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE "ranks" ADD CONSTRAINT "ranks_position_userId_unique" UNIQUE("position","userId");