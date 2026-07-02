"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  username: string;
  phone?: string;
  work?: string;
  experience?: string;
  education?: string;
  profileImage?: string;
};

type QuizPerformance = {
  id: string;
  score: number;
  totalPoints: number;
  percentage: number;
  completedAt: string;
};

export default function ProfileClient() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [performances, setPerformances] = useState<QuizPerformance[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    experience: "",
    education: "",
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchProfile();
    }
  }, [status, session]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setProfile(data.user);
      setPerformances(data.performances || []);
      setProfileImage(data.user.profileImage || null);
      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        work: data.user.work || "",
        experience: data.user.experience || "",
        education: data.user.education || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const updateRes = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileImage: base64 }),
        });

        if (updateRes.ok) {
          setProfileImage(base64);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      setProfile(data.user);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone || "",
        work: profile.work || "",
        experience: profile.experience || "",
        education: profile.education || "",
      });
    }
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete account");

      // Redirect to login after successful deletion
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100">
          <p className="text-base text-slate-400">Loading profile...</p>
        </section>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100">
          <p className="text-base text-slate-400">Please log in to view your profile.</p>
        </section>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100">
          <p className="text-base text-slate-400">Unable to load profile.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Your Profile</h1>
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          <FiEdit2 size={16} />
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Professional Profile Card Template */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 shadow-2xl">
        <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-5 lg:gap-12">
          {/* LEFT SECTION - Profile Picture & Contact */}
          <div className="lg:col-span-2">
            {/* Profile Picture Section */}
            <div className="mb-8 flex justify-center">
              <div className="relative h-56 w-56 rounded-full border-8 border-emerald-600 bg-slate-900/50 overflow-hidden shadow-2xl lg:h-64 lg:w-64">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile picture"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-emerald-400/50">
                    <span className="text-8xl">👤</span>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Picture Button */}
            {isEditing && (
              <label className="mb-8 block rounded-lg border-2 border-dashed border-slate-600 bg-slate-900/70 px-4 py-3 text-center cursor-pointer hover:bg-slate-800/70 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-sm font-medium text-slate-300">Upload Picture</p>
                <p className="text-xs text-slate-500">Min 50×80px</p>
              </label>
            )}

            {/* Contact Section */}
            <div className="mb-8 space-y-4 border-t border-slate-700 pt-6">
              <h3 className="text-lg font-bold uppercase tracking-wider text-emerald-400">Contact</h3>
              <div className="space-y-3 text-sm text-slate-300">
                {profile.phone ? (
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📱</span>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex-1 rounded bg-slate-800 px-2 py-1 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    ) : (
                      <span>{profile.phone}</span>
                    )}
                  </div>
                ) : isEditing ? (
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📱</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Add phone"
                      className="flex-1 rounded bg-slate-800 px-2 py-1 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                ) : null}

                <div className="flex items-center gap-3">
                  <span className="text-lg">✉️</span>
                  <span>{profile.email}</span>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-3 border-t border-slate-700 pt-6">
              <h3 className="text-lg font-bold uppercase tracking-wider text-emerald-400">Education</h3>
              {isEditing ? (
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="Add your education details"
                  className="w-full rounded bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                />
              ) : (
                <p className="text-sm leading-6 text-slate-300">
                  {profile.education || "-"}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SECTION - Name, Work Experience & More */}
          <div className="lg:col-span-3">
            {/* Name & Title Section */}
            <div className="mb-8">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded bg-slate-800 px-3 py-2 text-3xl font-bold text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:text-4xl"
                  />
                  <input
                    type="text"
                    name="work"
                    value={formData.work}
                    onChange={handleInputChange}
                    placeholder="Your title/position"
                    className="w-full rounded bg-slate-800 px-3 py-2 text-lg font-semibold text-slate-300 uppercase tracking-wide placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-emerald-400 lg:text-4xl">{profile.name}</h2>
                  <p className="mt-2 text-lg font-semibold uppercase tracking-wide text-slate-400">
                    {profile.work || "OS Learner"}
                  </p>
                </>
              )}
              <div className="mt-4 h-0.5 w-16 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
            </div>

            {/* Experience Section */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-emerald-400">
                Experience
              </h3>
              {isEditing ? (
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Add your work experience"
                  className="w-full rounded bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={4}
                />
              ) : (
                <p className="text-sm leading-7 text-slate-300">
                  {profile.experience || "No experience added yet."}
                </p>
              )}
            </div>

            {/* Expertise/Skills Section */}
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-bold uppercase tracking-wider text-emerald-400">
                Expertise
              </h3>
              <p className="text-sm text-slate-300">
                Operating Systems • CPU Scheduling • Memory Management • Process Management
              </p>
            </div>

            {/* Quiz Performance Section */}
            <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-emerald-400">
                Recent Quiz Performance
              </h3>

              {performances.length === 0 ? (
                <p className="text-sm text-slate-400">No quiz attempts yet.</p>
              ) : (
                <div className="space-y-3">
                  {performances.slice(0, 3).map((perf, idx) => (
                    <div
                      key={perf.id}
                      className="flex items-center justify-between rounded-lg bg-slate-800/50 px-3 py-2 text-sm"
                    >
                      <span className="text-slate-300">
                        {new Date(perf.completedAt).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${
                            perf.percentage >= 60
                              ? "text-emerald-400"
                              : "text-amber-400"
                          }`}
                        >
                          {perf.percentage}%
                        </span>
                        <span className="text-xs text-slate-500">
                          {perf.score}/{perf.totalPoints}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save/Cancel Buttons */}
      {isEditing && (
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-400"
          >
            <FiCheck size={18} />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
          >
            <FiX size={18} />
            Cancel
          </button>
        </div>
      )}

      {/* All Quiz Performance */}
      {!isEditing && performances.length > 0 && (
        <section className="mt-12 rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">All Quiz Performance</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {performances.map((perf) => (
              <div key={perf.id} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">
                  {new Date(perf.completedAt).toLocaleDateString()}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`text-2xl font-bold ${
                      perf.percentage >= 60
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }`}
                  >
                    {perf.percentage}%
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {perf.score}/{perf.totalPoints} pts
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Delete Account Section */}
      {!isEditing && (
        <section className="mt-12 rounded-3xl border border-rose-800/50 bg-rose-950/20 p-8">
          <h2 className="mb-2 text-2xl font-bold text-rose-400">Danger Zone</h2>
          <p className="mb-6 text-sm text-rose-300/80">
            Deleting your account is permanent and cannot be undone. All your data will be lost.
          </p>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500"
          >
            Delete Account
          </button>
        </section>
      )}
    </main>
  );
}

