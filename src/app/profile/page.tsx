"use client";
import UploadImage from "@/src/components/profile/upload";
import UsernameInput from "../../components/profile/username.component";

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <UsernameInput />
      <UploadImage />
    </div>
  );
}
