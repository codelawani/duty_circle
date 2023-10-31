"use client";
import UploadImage from "@/src/components/images/upload";
import UsernameInput from "./username.component";
export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <UsernameInput />
      <UploadImage />
    </div>
  );
}
