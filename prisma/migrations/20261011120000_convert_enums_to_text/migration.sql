-- Align database with schema.prisma: these columns are String in the
-- Prisma datamodel but were created as PostgreSQL enums by the init migration.

ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE TEXT USING ("role"::text);
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'EDITOR';

ALTER TABLE "Technology" ALTER COLUMN "experienceLevel" DROP DEFAULT;
ALTER TABLE "Technology" ALTER COLUMN "experienceLevel" TYPE TEXT USING ("experienceLevel"::text);
ALTER TABLE "Technology" ALTER COLUMN "experienceLevel" SET DEFAULT 'INTERMEDIATE';

ALTER TABLE "TechnologyExperience" ALTER COLUMN "experienceLevel" DROP DEFAULT;
ALTER TABLE "TechnologyExperience" ALTER COLUMN "experienceLevel" TYPE TEXT USING ("experienceLevel"::text);
ALTER TABLE "TechnologyExperience" ALTER COLUMN "experienceLevel" SET DEFAULT 'INTERMEDIATE';

ALTER TABLE "Achievement" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Achievement" ALTER COLUMN "type" TYPE TEXT USING ("type"::text);
ALTER TABLE "Achievement" ALTER COLUMN "type" SET DEFAULT 'MILESTONE';

ALTER TABLE "Resource" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Resource" ALTER COLUMN "type" TYPE TEXT USING ("type"::text);
ALTER TABLE "Resource" ALTER COLUMN "type" SET DEFAULT 'GUIDE';

ALTER TABLE "StartupIdea" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "StartupIdea" ALTER COLUMN "status" TYPE TEXT USING ("status"::text);
ALTER TABLE "StartupIdea" ALTER COLUMN "status" SET DEFAULT 'IDEA';

ALTER TABLE "LearningJourney" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "LearningJourney" ALTER COLUMN "status" TYPE TEXT USING ("status"::text);
ALTER TABLE "LearningJourney" ALTER COLUMN "status" SET DEFAULT 'CURRENT';

DROP TYPE IF EXISTS "Role";
DROP TYPE IF EXISTS "ExperienceLevel";
DROP TYPE IF EXISTS "AchievementType";
DROP TYPE IF EXISTS "ResourceType";
DROP TYPE IF EXISTS "StartupStatus";
DROP TYPE IF EXISTS "LearningStatus";
