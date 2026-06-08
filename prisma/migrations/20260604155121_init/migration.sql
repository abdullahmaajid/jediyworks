-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "thumbnail_url" TEXT,
    "thumbnail_alt" TEXT,
    "category" TEXT NOT NULL,
    "pillar" TEXT NOT NULL,
    "client_name" TEXT,
    "year" INTEGER,
    "duration" TEXT,
    "live_link" TEXT,
    "problem" TEXT,
    "execution" TEXT,
    "impact" TEXT,
    "tech_stack" TEXT[],
    "review_rating" INTEGER,
    "review_quote" TEXT,
    "review_author" TEXT,
    "review_title" TEXT,
    "gallery_images" JSONB NOT NULL DEFAULT '[]',
    "video_embeds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" TEXT NOT NULL DEFAULT 'draft',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collaborators" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "alias" TEXT,
    "branding_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "default_role" TEXT,
    "photo_url" TEXT,
    "bio" TEXT,
    "position_line" TEXT,
    "social_ig" TEXT,
    "social_linkedin" TEXT,
    "social_youtube" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "profile_visible" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_links" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "collaborator_id" TEXT NOT NULL,
    "role_in_project" TEXT NOT NULL,

    CONSTRAINT "credit_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inbox" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "collaborators_slug_key" ON "collaborators"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "credit_links_project_id_collaborator_id_key" ON "credit_links"("project_id", "collaborator_id");

-- AddForeignKey
ALTER TABLE "credit_links" ADD CONSTRAINT "credit_links_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_links" ADD CONSTRAINT "credit_links_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE CASCADE ON UPDATE CASCADE;
