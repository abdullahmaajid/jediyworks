-- AlterTable
ALTER TABLE "collaborators" ADD COLUMN     "banner_url" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "logo_url" TEXT,
ADD COLUMN     "personal_website" TEXT,
ADD COLUMN     "skills" TEXT[];

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'collaborator',
    "collaborator_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_collaborator_id_key" ON "users"("collaborator_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE CASCADE ON UPDATE CASCADE;
