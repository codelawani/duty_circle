import {
  Home,
  ListTodo,
  UserCircle2,
  BookOpenIcon,
  UserCircle2Icon,
} from "lucide-react";
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Duty Circle",
  description:
    "DutyCircle is a unique application designed to merge task management with public accountability." +
    "Users can create and manage personal tasks while also choosing to share them publicly." +
    "The public sharing feature transforms a simple task into a commitment, offering users an external motivation to accomplish their goals." +
    "The public feed showcases tasks from various users, giving an opportunity for users to connect over shared objectives or interests." +
    "Users can form accountability circles where they can nudge each other for pending tasks, strengthening the community feel and adding an extra layer of motivation.",
  mainNav: [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Doc",
      href: "/api-doc",
      icon: BookOpenIcon,
    },
    {
      title: "tasks",
      href: "/tasks",
      icon: ListTodo,
    },
    {
      title: "profile",
      href: "/profile",
      icon: UserCircle2Icon,
    },
    // {
    //   title: 'circles',
    //   href: '/circles',
    //   icon: UserCircle2,
    // },
  ],
  links: {
    twitter: "https://twitter.com/codelawani",
    github: "https://github.com/codelawani/dutycircle",
    docs: "https://next-swagger-doc.productsway.com",
  },
};
