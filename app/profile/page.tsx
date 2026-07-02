import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "Profile — VCSMMA",
  description: "View and manage your VCSMMA profile, settings, and progress summary.",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
