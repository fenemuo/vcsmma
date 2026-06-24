import prisma from "@/lib/prisma";

await prisma.quiz.create({
  data: {
    title: "CPU Scheduling",
  },
});
