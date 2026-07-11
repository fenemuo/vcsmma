//create a layout component for learn page that exports children 

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Center | VCSMMA",
  description:
    "Interactive lessons for CPU Scheduling and Memory Management Algorithms.",
};

const LearnLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  );
};

export default LearnLayout;