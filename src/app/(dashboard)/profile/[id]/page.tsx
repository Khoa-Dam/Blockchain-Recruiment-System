"use client";
import { useProfile } from "@/hooks/useProfile";
import { useAdmin } from "@/hooks/useAdmin";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { uploadToIPFS } from "@/services/ipfs";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Loader2 } from "lucide-react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import Loading from "@/components/Loading";
import image from "@/../public/avatars/image.png";
import { ToastAction } from "@/components/ui/toast";

export default function ProfilePage() {
  const params = useParams();
  const walletAddress = params.id as string;
  const { isAdmin } = useAdmin();
  const {
    profile,
    hasProfile,
    createProfile,
    updateProfile,
    isLoading,
    loadProfile,
  } = useProfile(walletAddress);
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    avatar: "",
    github: "",
    linkedin: "",
    role: "Frontend Developer",
    skills: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar || "");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (hasProfile) {
        await loadProfile();
      }
    };

    fetchProfile();
  }, [hasProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        avatar: profile.avatar || "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
        role: profile.role || "Frontend Developer",
        skills: profile.skills || "",
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [profile]);

  if (isLoading) {
    return <Loading />;
  }

  const handleEditToggle = () => {
    console.log("Toggling edit state. Current state:", isEditing);
    setIsEditing((prev) => !prev);
    console.log(isEditing);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingProfile(true);
    try {
      let avatarUrlToUse = avatarUrl || profile?.avatar || "";
      if (uploadMethod === "file" && avatar) {
        avatarUrlToUse = await uploadToIPFS(avatar);
      }

      const profileData = {
        ...formData,
        avatar: avatarUrlToUse,
      };

      if (hasProfile) {
        await updateProfile({
          args: [
            profileData.fullName,
            profileData.avatar,
            profileData.github,
            profileData.linkedin,
            profileData.role,
            profileData.skills,
          ],
        });
      } else {
        await createProfile({
          args: [
            profileData.fullName,
            profileData.avatar,
            profileData.github,
            profileData.linkedin,
            profileData.role,
            profileData.skills,
          ],
        });
      }

      toast({
        title: "Success",
        description: hasProfile ? "Profile updated!" : "Profile created!",
      });

      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        variant: "destructive",
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            {isEditing ? "Edit Profile" : "User Profile"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 relative rounded-full overflow-hidden mb-3 border-4 border-primary">
              <Image
                src={formData.avatar || image}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold">
              {formData.fullName || "New User"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {formData.role || "Role not specified"}
            </p>
          </div>

          {isEditing || !hasProfile ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  className="bg-[#F9F9F9]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="uploadMethod">Avatar Upload Method</Label>
                <select
                  id="uploadMethod"
                  value={uploadMethod}
                  onChange={(e) => {
                    setUploadMethod(e.target.value as "file" | "url");
                    setAvatar(null);
                    setAvatarUrl("");
                  }}
                  className="w-full border rounded p-2"
                >
                  <option value="file">Upload Image</option>
                  <option value="url">Enter Image URL</option>
                </select>
              </div>

              {uploadMethod === "file" ? (
                <div className="space-y-2">
                  <Label htmlFor="avatar">Upload Avatar</Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAvatar(file);
                        setAvatarPreview(URL.createObjectURL(file));
                        setAvatarUrl("");
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="avatarUrl">Avatar URL</Label>
                  <Input
                    id="avatarUrl"
                    value={avatarUrl}
                    onChange={(e) => {
                      setAvatarUrl(e.target.value);
                      setAvatar(null);
                    }}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full border rounded p-2"
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">
                    Full Stack Developer
                  </option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="QA Engineer">QA Engineer</option>
                  <option value="Software Architect">Software Architect</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Textarea
                  id="skills"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  placeholder="Enter your skills (e.g., JavaScript, React, Solidity)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">GitHub Profile</Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoadingProfile}
              >
                {isLoadingProfile ? (
                  <ClipLoader size={20} color="#fff" />
                ) : hasProfile ? (
                  "Update Profile"
                ) : (
                  "Create Profile"
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Github className="w-6 h-6 text-primary" />
                <a
                  href={profile?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {profile?.github || "Not provided"}
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Linkedin className="w-6 h-6 text-primary" />
                <a
                  href={profile?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {profile?.linkedin || "Not provided"}
                </a>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Skills</h2>
                <p className="bg-secondary p-3 rounded-md">
                  {profile?.skills || "Not provided"}
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={handleEditToggle}
            className="mt-6 w-full"
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
