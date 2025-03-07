import MainLayout from "./layout/MainLayout";
import { Typography } from "antd";

const { Title } = Typography;

export default function Dashboard() {
  return (
    <MainLayout>
      <Title level={2}>Dashboard</Title>
      <p>Welcome to your GreenTrack dashboard!</p>
    </MainLayout>
  );
}
