-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "issuer" TEXT;

-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "certificates" JSONB,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "features" JSONB,
ADD COLUMN     "proficiency" INTEGER,
ADD COLUMN     "relatedTechnologies" JSONB,
ADD COLUMN     "useCases" JSONB;

-- AlterTable
ALTER TABLE "TechnologyCategory" ADD COLUMN     "color" TEXT;

-- CreateTable
CREATE TABLE "KnowledgeCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "noteCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeNote" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "readingTime" INTEGER,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "KnowledgeNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KnowledgeTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeNoteTag" (
    "noteId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "KnowledgeNoteTag_pkey" PRIMARY KEY ("noteId","tagId")
);

-- CreateTable
CREATE TABLE "GitHubRepo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "forks" INTEGER NOT NULL DEFAULT 0,
    "issues" INTEGER NOT NULL DEFAULT 0,
    "language" TEXT,
    "languageColor" TEXT,
    "url" TEXT,
    "topics" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GitHubRepo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "industry" TEXT,
    "logo" TEXT,
    "url" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitHubProfile" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "bio" TEXT,
    "totalStars" INTEGER NOT NULL DEFAULT 0,
    "totalForks" INTEGER NOT NULL DEFAULT 0,
    "totalRepos" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GitHubProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeCategory_slug_key" ON "KnowledgeCategory"("slug");

-- CreateIndex
CREATE INDEX "KnowledgeCategory_slug_idx" ON "KnowledgeCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeNote_slug_key" ON "KnowledgeNote"("slug");

-- CreateIndex
CREATE INDEX "KnowledgeNote_slug_idx" ON "KnowledgeNote"("slug");

-- CreateIndex
CREATE INDEX "KnowledgeNote_categoryId_idx" ON "KnowledgeNote"("categoryId");

-- CreateIndex
CREATE INDEX "KnowledgeNote_deletedAt_idx" ON "KnowledgeNote"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeTag_slug_key" ON "KnowledgeTag"("slug");

-- CreateIndex
CREATE INDEX "KnowledgeTag_slug_idx" ON "KnowledgeTag"("slug");

-- CreateIndex
CREATE INDEX "KnowledgeNoteTag_tagId_idx" ON "KnowledgeNoteTag"("tagId");

-- CreateIndex
CREATE INDEX "GitHubRepo_stars_idx" ON "GitHubRepo"("stars");

-- CreateIndex
CREATE INDEX "GitHubRepo_updatedAt_idx" ON "GitHubRepo"("updatedAt");

-- CreateIndex
CREATE INDEX "Client_featured_idx" ON "Client"("featured");

-- CreateIndex
CREATE INDEX "Client_order_idx" ON "Client"("order");

-- CreateIndex
CREATE UNIQUE INDEX "GitHubProfile_username_key" ON "GitHubProfile"("username");

-- CreateIndex
CREATE INDEX "GitHubProfile_username_idx" ON "GitHubProfile"("username");

-- CreateIndex
CREATE INDEX "Activity_createdAt_idx" ON "Activity"("createdAt");

-- CreateIndex
CREATE INDEX "Activity_entityType_idx" ON "Activity"("entityType");

-- CreateIndex
CREATE INDEX "Activity_userId_idx" ON "Activity"("userId");

-- CreateIndex
CREATE INDEX "Achievement_featured_idx" ON "Achievement"("featured");

-- AddForeignKey
ALTER TABLE "KnowledgeNote" ADD CONSTRAINT "KnowledgeNote_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "KnowledgeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeNoteTag" ADD CONSTRAINT "KnowledgeNoteTag_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "KnowledgeNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeNoteTag" ADD CONSTRAINT "KnowledgeNoteTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "KnowledgeTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

