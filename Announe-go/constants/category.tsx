import {
  LayoutDashboard,
  UserCheck,
  BadgeDollarSign,
  Briefcase,
  Newspaper,
  MessageCircle,
  Search,
  ChevronRight,
} from "lucide-react";

export const category = {
  admin: [
    {
      대시보드: [
        {
          label: "대시보드",
          href: "/admin/dashboard",
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
      ],
    },
    {
      회원관리: [
        {
          label: "회원가입 승인 관리",
          href: "/admin/signup-requests",
          icon: <UserCheck className="w-4 h-4" />,
        },
        {
          label: "광고주 목록 관리",
          href: "/admin/advertisers",
          icon: <BadgeDollarSign className="w-4 h-4" />,
        },
        {
          label: "업체 목록 관리",
          href: "/admin/agencies",
          icon: <Briefcase className="w-4 h-4" />,
        },
      ],
    },
    {
      순위관리: [
        {
          label: "플레이스",
          href: "/admin/place-rank",
          icon: <UserCheck className="w-4 h-4" />,
        },
        {
          label: "카페",
          href: "/admin/advertisers",
          icon: <BadgeDollarSign className="w-4 h-4" />,
        },
        {
          label: "블로그",
          href: "/admin/agencies",
          icon: <Briefcase className="w-4 h-4" />,
        },
      ],
    },
    {
      포스팅관리: [
        {
          label: "언론기사 관리",
          href: "/admin/press",
          icon: <Newspaper className="w-4 h-4" />,
        },
        {
          label: "카페 침투 관리",
          href: "/admin/cafe-infiltration",
          icon: <MessageCircle className="w-4 h-4" />,
        },
      ],
    },
  ],
  advertisers: [
    {
      label: "대시보드",
      href: "/advertisers/dashboard",
      icon: "",
      isView: true,
    },
    {
      label: "플레이스 순위 목록",
      href: "/advertiser/place-rank/tracking",
      icon: "",
      isView: true,
    },
    {
      label: "블로그 순위 목록",
      href: "/advertiser/blog-rank/tracking",
      icon: "",
      isView: true,
    },
    {
      label: "카페 순위 목록",
      href: "/advertiser/cafe-rank/tracking",
      icon: "",
      isView: true,
    },
    {
      label: "블로그 포스팅 목록",
      href: "/advertiser/blog-posting",
      icon: "",
      isView: true,
    },
    {
      label: "언론기사 목록",
      href: "/advertisers/news-articles",
      icon: "",
      isView: true,
    },
    {
      label: "카페 침투 목록",
      href: "/advertisers/cafe-infiltration",
      icon: "",
      isView: true,
    },
  ],
  agency: [
    {
      label: "대시보드",
      href: "/agency/dashboard",
      icon: "",
      isView: true,
    },
    {
      label: "플레이스 순위 관리",
      href: "/agency/place-rank",
      icon: "",
      isView: true,
    },
    {
      label: "플레이스 순위 등록",
      href: "/agency/place-rank/new",
      icon: "",
      isView: true,
    },
    {
      label: "블로그 순위 관리",
      href: "/agency/blog-rank",
      icon: "",
      isView: true,
    },
    {
      label: "블로그 순위 등록",
      href: "/agency/blog-rank/new",
      icon: "",
      isView: true,
    },
    {
      label: "카페 순위 관리",
      href: "/agency/cafe-rank",
      icon: "",
      isView: true,
    },
    {
      label: "카페 순위 등록",
      href: "/agency/cafe-rank/new",
      icon: "",
      isView: true,
    },
  ],
};
