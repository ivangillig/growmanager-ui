import { Layout, Menu } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Image from "next/image";

const { Header, Content, Sider } = Layout;

export default function MainLayout({ children }) {
  const router = useRouter();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => router.push("/dashboard"),
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => router.push("/profile"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => router.push("/settings"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{ display: "flex", alignItems: "center", padding: "0 24px" }}
      >
        <div className="logo">
          <Image
            src="/images/logo-white.svg"
            alt="GreenTrack Logo"
            width={32}
            height={32}
          />
          <span style={{ marginLeft: "12px", color: "white" }}>GreenTrack</span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} theme="light">
          <Menu
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
            defaultSelectedKeys={[router.pathname.slice(1) || "dashboard"]}
          />
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
              borderRadius: "4px",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
