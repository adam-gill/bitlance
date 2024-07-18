-- CreateEnum
CREATE TYPE "Role" AS ENUM ('FREELANCER', 'CLIENT', 'BOTH');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'CLOSED', 'COMPLETED', 'INPROGRESS');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('DESIGN', 'MUSIC', 'PROGRAMMING', 'DIGITAL_MARKETING', 'VIDEO', 'WRITING', 'TRANSLATION', 'BUSINESS', 'CONSULTING', 'AI', 'GAMING', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'FREELANCER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Client" (
    "c_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_name" TEXT NOT NULL,
    "company_description" TEXT,
    "website/Link" TEXT,
    "total_jobs_posted" INTEGER,
    "total_amount_spent" DOUBLE PRECISION,
    "avg_rating" DOUBLE PRECISION,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("c_id")
);

-- CreateTable
CREATE TABLE "Freelancer" (
    "f_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bio" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "portfolio_link" TEXT NOT NULL,
    "social_link" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_jobs_completed" INTEGER,
    "total_earnings" DOUBLE PRECISION,
    "avg_rating" DOUBLE PRECISION,

    CONSTRAINT "Freelancer_pkey" PRIMARY KEY ("f_id")
);

-- CreateTable
CREATE TABLE "Job" (
    "job_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "client_address" TEXT NOT NULL,
    "freelancer_id" TEXT,
    "client_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "f_rating" DOUBLE PRECISION,
    "c_rating" DOUBLE PRECISION,
    "status" "Status" NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "JobFreelancer" (
    "id" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "freelancer_id" TEXT NOT NULL,
    "freelancer_address" TEXT NOT NULL,

    CONSTRAINT "JobFreelancer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_company_name_key" ON "Client"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "Client_user_id_key" ON "Client"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Freelancer_user_id_key" ON "Freelancer"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "JobFreelancer_job_id_freelancer_id_key" ON "JobFreelancer"("job_id", "freelancer_id");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freelancer" ADD CONSTRAINT "Freelancer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "Freelancer"("f_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobFreelancer" ADD CONSTRAINT "JobFreelancer_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobFreelancer" ADD CONSTRAINT "JobFreelancer_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "Freelancer"("f_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobFreelancer" ADD CONSTRAINT "JobFreelancer_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;
